import StorageUtil from "@/utilities/storageUtil";
import { JsonRpcEngine } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { createEngineStream } from "@theqrl/zond-wallet-provider/json-rpc-middleware-stream";
import PortStream from "extension-port-stream";
import { pipeline } from "readable-stream";
import browser from "webextension-polyfill";
import {
  EXTENSION_MESSAGES,
  ZOND_POST_MESSAGE_STREAM,
  ZOND_WALLET_PROVIDER_NAME,
} from "./constants/streamConstants";
import { appendSenderDataMiddleware } from "./middlewares/appendSenderDataMiddleware";
import { blockUnSupportedMethodsMiddleware } from "./middlewares/blockUnSupportedMethodsMiddleware";
import { restrictedMethodsMiddleware } from "./middlewares/restrictedMethodsMiddleware";
import { unrestrictedMethodsMiddleware } from "./middlewares/unrestrictedMethodsMiddleware";
import { checkForLastError } from "./utils/scriptUtils";
import { setupMultiplex } from "./utils/streamUtils";

type ContentScriptType = browser.Scripting.RegisteredContentScript;

const registerScripts = async () => {
  const previouslyRegisteredScriptIds = (
    await browser.scripting.getRegisteredContentScripts()
  ).map((script) => script.id);
  const contentScripts: ContentScriptType[] = [
    {
      id: "zondInPageScript",
      matches: ["<all_urls>"],
      js: ["src/scripts/inPageScript.js"],
      runAt: "document_start",
      allFrames: true,
      // @ts-expect-error.
      // This is important. The script must run in the "MAIN" world,
      // so that the zond provider will be available browser wide, not just isolated to the extension.
      world: "MAIN",
    },
  ];

  // This registers the in-page script to browser pages, if not already done.
  // "MAIN" world does not work if this script was invoked from manifest file instead.
  await browser.scripting.registerContentScripts(
    contentScripts.filter(
      (script) => !previouslyRegisteredScriptIds.includes(script.id),
    ),
  );
};

const prepareListeners = () => {
  browser.storage.onChanged.addListener(async () => {
    const storedDAppRequestData = await StorageUtil.getDAppRequestData();
    if (!!storedDAppRequestData) {
      // If there is a pending request, the badge with 1 notification will be displayed.
      browser.action.setBadgeText({ text: "1" });
      browser.action.setBadgeBackgroundColor({ color: "#4AAFFF" });
    } else {
      browser.action.setBadgeText({ text: "" });
    }
  });
};

/**
 * Sends a message to the dapp(s) content script to signal it can connect to the background as
 * the backend is not active. It is required to re-connect dapps after service worker re-activates.
 * For non-dapp pages, the message will be sent and ignored.
 */
const announceServiceWorkerReady = async () => {
  const tabs = await browser.tabs.query({
    url: "<all_urls>",
    windowType: "normal",
  });

  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id ?? 0, {
        name: EXTENSION_MESSAGES.READY,
      })
      .then(() => {
        checkForLastError();
      })
      .catch((error) => {
        // An error may happen if the contentscript is blocked from loading.
        checkForLastError();
        console.warn(`ZondWeb3Wallet: error from tab '${tab.title}'`, error);
      });
  }
};

/**
 * A method for creating a zond provider.
 * Middlewares are pushed to the engine here.
 */
const setupProviderEngineEip1193 = ({
  sender,
}: {
  sender: browser.Runtime.MessageSender;
}) => {
  const engine = new JsonRpcEngine();

  // If the requested method is not supported, this ends the request.
  engine.push(blockUnSupportedMethodsMiddleware);
  // Appends the sender details to the request.
  engine.push(appendSenderDataMiddleware({ sender }));
  // Handles the unrestricted method calls without requiring user's approval
  engine.push(unrestrictedMethodsMiddleware);
  // Handles the dApp's connect wallet functionality
  engine.push(restrictedMethodsMiddleware);

  return engine;
};

/**
 * A method for serving zond provider over a given stream.
 */
const setupProviderConnectionEip1193 = async (port: browser.Runtime.Port) => {
  const portStream = new PortStream(port);
  const mux = setupMultiplex(portStream);
  const outStream = mux.createStream(ZOND_WALLET_PROVIDER_NAME);
  const sender = port.sender;

  // messages between inpage and background
  const engine = setupProviderEngineEip1193({
    // @ts-ignore
    sender,
  });
  // setup connection
  const providerStream = createEngineStream({ engine });

  pipeline(outStream, providerStream, outStream, (err) => {
    console.warn("ZondWeb3Wallet: Error in stream pipeline\n", err);
    // handle any middleware cleanup
    // @ts-ignore
    engine?._middleware?.forEach((mid: any) => {
      if (mid.destroy && typeof mid.destroy === "function") {
        mid.destroy();
      }
    });
  });
};

const establishContenScriptConnection = () => {
  browser.runtime.onConnect.addListener(async (port) => {
    // Ensuring the port connected to is the content script
    if (port.name === ZOND_POST_MESSAGE_STREAM.CONTENT_SCRIPT) {
      await announceServiceWorkerReady();
      await setupProviderConnectionEip1193(port);
    }
  });
};

const initializeServiceWorker = async () => {
  try {
    await registerScripts();
    prepareListeners();
    establishContenScriptConnection();
  } catch (error) {
    console.warn(
      "ZondWeb3Wallet: Failed to initialize the service worker\n",
      error,
    );
  }
};

// This is the starting point of service worker of zond web3 wallet.
// This file is set as an entry in the "background" section of the manifest file.
initializeServiceWorker();
