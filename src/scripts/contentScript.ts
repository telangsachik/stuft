import PortStream from "extension-port-stream";
import { pipeline } from "readable-stream";
import browser from "webextension-polyfill";

import {
  ObjectMultiplex,
  Substream,
} from "@theqrl/zond-wallet-provider/object-multiplex";
import { WindowPostMessageStream } from "@theqrl/zond-wallet-provider/post-message-stream";
import {
  EXTENSION_MESSAGES,
  ZOND_POST_MESSAGE_STREAM,
  ZOND_WALLET_PROVIDER_NAME,
} from "./constants/streamConstants";
import { checkForLastError } from "./utils/scriptUtils";

type MessageType = {
  name: string;
  data: {
    jsonrpc: string;
    method: string;
    params?: Record<string, unknown>[];
    id: string;
    origin?: string;
  };
};

let pageMux: ObjectMultiplex;
let pageChannel: Substream;

let extensionPort: browser.Runtime.Port;
let extensionStream: PortStream | null;
let extensionMux: ObjectMultiplex;
let extensionChannel: Substream;

// The field below is used to ensure that replay is done only once for each restart.
let hasExtensionConnectSent = false;

const setupPageStreams = () => {
  // the transport-specific streams for communication between inpage and background
  const pageStream = new WindowPostMessageStream({
    name: ZOND_POST_MESSAGE_STREAM.CONTENT_SCRIPT,
    target: ZOND_POST_MESSAGE_STREAM.INPAGE,
  });

  // create and connect channel muxers
  // so we can handle the channels individually
  pageMux = new ObjectMultiplex();
  pageMux.setMaxListeners(25);

  pipeline(pageMux, pageStream, pageMux, (err: Error | null) => {
    console.warn("ZondWeb3Wallet: Inpage Multiplex", err);
  });

  pageChannel = pageMux.createStream(ZOND_WALLET_PROVIDER_NAME);
};

/**
 * The function notifies inpage when the extension stream connection is ready. When the
 * 'zondWeb3Wallet_chainChanged' method is received from the extension, it implies that the
 * background state is completely initialized and it is ready to process method calls.
 * This is used as a notification to replay any pending messages in MV3.
 */
async function onDataExtensionStream(message: MessageType) {
  if (
    hasExtensionConnectSent &&
    message.data.method === "zondWeb3Wallet_chainChanged"
  ) {
    hasExtensionConnectSent = false;
    window.postMessage(
      {
        target: ZOND_POST_MESSAGE_STREAM.INPAGE, // the post-message-stream "target"
        data: {
          // this object gets passed to `object-multiplex`
          name: ZOND_WALLET_PROVIDER_NAME, // the `object-multiplex` channel name
          data: {
            jsonrpc: "2.0",
            method: "ZOND_WALLET_EXTENSION_CONNECT_CAN_RETRY",
          },
        },
      },
      window.location.origin,
    );
  }
}

/** Destroys all of the extension streams */
const destroyExtensionStreams = () => {
  pageChannel.removeAllListeners();

  extensionMux.removeAllListeners();
  extensionMux.destroy();

  extensionChannel.removeAllListeners();
  extensionChannel.destroy();

  extensionStream = null;
};

/**
 * This listener destroys the extension streams when the extension port is disconnected,
 * so that streams may be re-established later when the extension port is reconnected.
 */
export const onDisconnectExtensionStream = (err: unknown) => {
  const runtimeLastError = checkForLastError();
  const lastErr = err || runtimeLastError;

  extensionPort.onDisconnect.removeListener(onDisconnectExtensionStream);

  destroyExtensionStreams();

  /**
   * If an error is found, reset the streams. When running two or more dapps, resetting the service
   * worker may cause the error, "Error: Could not establish connection. Receiving end does not
   * exist.", due to a race-condition. The disconnect event may be called by runtime.connect which
   * may cause issues. We suspect that this is a chromium bug as this event should only be called
   * once the port and connections are ready. Delay time is arbitrary.
   */
  if (lastErr) {
    console.warn(`${JSON.stringify(lastErr)}\nResetting the streams.`);
    setTimeout(setupExtensionStreams, 1000);
  }
};

/**
 * This function must ONLY be called in pipeline destruction/close callbacks.
 * Notifies the inpage context that streams have failed, via window.postMessage.
 * Relies on 'object-multiplex' and 'post-message-stream' implementation details.
 */
function notifyInpageOfStreamFailure() {
  window.postMessage(
    {
      target: ZOND_POST_MESSAGE_STREAM.INPAGE, // the post-message-stream "target"
      data: {
        // this object gets passed to `object-multiplex`
        name: ZOND_WALLET_PROVIDER_NAME, // the `object-multiplex` channel name
        data: {
          jsonrpc: "2.0",
          method: "ZOND_WALLET_STREAM_FAILURE",
        },
      },
    },
    window.location.origin,
  );
}

const setupExtensionStreams = () => {
  hasExtensionConnectSent = true;
  extensionPort = browser.runtime.connect({
    name: ZOND_POST_MESSAGE_STREAM.CONTENT_SCRIPT,
  });
  extensionStream = new PortStream(extensionPort);
  extensionStream.on("data", onDataExtensionStream);

  // create and connect channel muxers
  // so we can handle the channels individually
  extensionMux = new ObjectMultiplex();
  extensionMux.setMaxListeners(25);

  pipeline(extensionMux, extensionStream, extensionMux, (err: Error | null) => {
    console.warn("ZondWeb3Wallet: Background Multiplex", err);
    notifyInpageOfStreamFailure();
  });

  // forward communication across inpage-background for these channels only
  extensionChannel = extensionMux.createStream(ZOND_WALLET_PROVIDER_NAME);
  pipeline(pageChannel, extensionChannel, pageChannel, (error: Error | null) =>
    console.warn(
      `ZondWeb3Wallet: Muxed traffic for channel "${ZOND_WALLET_PROVIDER_NAME}" failed.`,
      error,
    ),
  );

  extensionPort.onDisconnect.addListener(onDisconnectExtensionStream);
};

const prepareListeners = () => {
  // listens to messages coming from the service worker(browser.tabs.sendMessage)
  browser.runtime.onMessage.addListener((message: MessageType) => {
    if (message.name === EXTENSION_MESSAGES.READY) {
      if (!extensionStream) {
        setupExtensionStreams();
      }
      return Promise.resolve(
        "ZondWeb3Wallet: handled service worker ready message",
      );
    }
  });
};

const initializeContentScript = () => {
  try {
    setupPageStreams();
    setupExtensionStreams();
    prepareListeners();
  } catch (error) {
    console.warn(
      "ZondWeb3Wallet: Failed to initialize the content script\n",
      error,
    );
  }
};

initializeContentScript();
