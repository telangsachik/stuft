import { WindowPostMessageStream } from "@theqrl/zond-wallet-provider/post-message-stream";
import { initializeProvider } from "@theqrl/zond-wallet-provider/providers";
import log from "loglevel";
import { v4 as uuid } from "uuid";
import {
  ZOND_POST_MESSAGE_STREAM,
  ZOND_WALLET_PROVIDER_INFO,
} from "./constants/streamConstants";

const initializeInPageScript = () => {
  try {
    const zondStream = new WindowPostMessageStream({
      name: ZOND_POST_MESSAGE_STREAM.INPAGE,
      target: ZOND_POST_MESSAGE_STREAM.CONTENT_SCRIPT,
    });

    initializeProvider({
      connectionStream: zondStream,
      logger: log,
      providerInfo: {
        uuid: uuid(),
        name: ZOND_WALLET_PROVIDER_INFO.NAME,
        icon: ZOND_WALLET_PROVIDER_INFO.ICON,
        rdns: ZOND_WALLET_PROVIDER_INFO.RDNS,
      },
    });
  } catch (error) {
    console.warn(
      "Zond Wallet: Failed to initialize the in-page script\n",
      error,
    );
  }
};

// This function accounces the zond wallet provider(based on EIP-6963), to be detected by the dApps.
initializeInPageScript();
