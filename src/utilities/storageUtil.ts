import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import { DAppRequestType } from "@/scripts/middlewares/middlewareTypes";
import { BaseProvider } from "@theqrl/zond-wallet-provider/providers";
import { PartialDeep } from "type-fest";
import browser from "webextension-polyfill";

const ACTIVE_PAGE_IDENTIFIER = "ACTIVE_PAGE";
const BLOCKCHAIN_SELECTION_IDENTIFIER = "BLOCKCHAIN_SELECTION";
const ACTIVE_ACCOUNT_IDENTIFIER = "ACTIVE_ACCOUNT";
const ACCOUNT_LIST_IDENTIFIER = "ACCOUNT_LIST";
const TRANSACTION_VALUES_IDENTIFIER = "TRANSACTION_VALUES";
const TOKENS_LIST_IDENTIFIER = "TOKENS_LIST";
const DAPP_REQUEST_DATA_IDENTIFIER = "DAPP_REQUEST_DATA";
const PROVIDER_STATE_IDENTIFIER = "PROVIDER_STATE";

type BlockchainType = keyof typeof ZOND_PROVIDER;
type TransactionValuesType = {
  receiverAddress?: string;
  amount?: number;
  mnemonicPhrases?: string;
  tokenDetails?: {
    isZrc20Token: boolean;
    tokenContractAddress: string;
    tokenDecimals: number;
    tokenIcon: string;
    tokenBalance: string;
    tokenName: string;
    tokenSymbol: string;
  };
};

/**
 * A utility for storing and retrieving states of different components to and from the browser storage.
 */
class StorageUtil {
  /**
   * A function for storing the transaction state values, so that the user need not fill in the field values if the extension is closed and opened again.
   * Call the getTransactionValues fuction to retieve the stored value.
   */
  static async setTransactionValues(
    blockchain: string,
    transactionValues: TransactionValuesType,
  ) {
    const transactionValuesIdentifier = `${blockchain}_${TRANSACTION_VALUES_IDENTIFIER}`;
    const transactionValuesWithDefaultValues = {
      receiverAddress: transactionValues.receiverAddress ?? "",
      amount: transactionValues.amount ?? 0,
      tokenDetails: transactionValues.tokenDetails,
    };
    await browser.storage.local.set({
      [transactionValuesIdentifier]: transactionValuesWithDefaultValues,
    });
  }

  static async getTransactionValues(blockchain: string) {
    const transactionValuesIdentifier = `${blockchain}_${TRANSACTION_VALUES_IDENTIFIER}`;
    let transactionValues: TransactionValuesType = {
      receiverAddress: "",
      amount: 0,
      mnemonicPhrases: "",
    };

    const storedTransactionValues = await browser.storage.local.get(
      transactionValuesIdentifier,
    );
    if (storedTransactionValues) {
      transactionValues = {
        ...transactionValues,
        ...storedTransactionValues[transactionValuesIdentifier],
      };
    }

    return transactionValues;
  }

  static async clearTransactionValues(blockchain: string) {
    const transactionValuesIdentifier = `${blockchain}_${TRANSACTION_VALUES_IDENTIFIER}`;
    await browser.storage.local.remove(transactionValuesIdentifier);
  }

  /**
   * A function for storing the accounts created and imported within the zond web3 wallet extension.
   * Call the getAccountList function to retrieve the stored value.
   */
  static async setAccountList(blockchain: string, accountList: string[]) {
    const blockChainAccountListIdentifier = `${blockchain}_${ACCOUNT_LIST_IDENTIFIER}`;
    await browser.storage.local.set({
      [blockChainAccountListIdentifier]: accountList,
    });
  }

  static async getAccountList(blockchain: string) {
    const blockChainAccountListIdentifier = `${blockchain}_${ACCOUNT_LIST_IDENTIFIER}`;
    const storedAccountList = await browser.storage.local.get(
      blockChainAccountListIdentifier,
    );

    return Object.keys(storedAccountList).length
      ? storedAccountList[blockChainAccountListIdentifier]
      : [];
  }

  /**
   * A function for storing the active account in the wallet.
   * Call the getActiveAccount function to retrieve the stored value, and clearActiveAccount for clearing the stored value.
   */
  static async setActiveAccount(blockchain: string, activeAccount?: string) {
    const blockChainAccountIdentifier = `${blockchain}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    if (activeAccount) {
      await browser.storage.local.set({
        [blockChainAccountIdentifier]: activeAccount ?? "",
      });
    } else {
      await browser.storage.local.remove(blockChainAccountIdentifier);
    }
  }

  static async getActiveAccount(blockchain: string) {
    const blockChainAccountIdentifier = `${blockchain}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    const storedActiveAccount = await browser.storage.local.get(
      blockChainAccountIdentifier,
    );
    return (storedActiveAccount?.[blockChainAccountIdentifier] ?? "") as string;
  }

  static async clearActiveAccount(blockchain: string) {
    const blockChainAccountIdentifier = `${blockchain}_${ACTIVE_ACCOUNT_IDENTIFIER}`;
    await browser.storage.local.remove(blockChainAccountIdentifier);
  }

  /**
   * A function for storing the blockchain selection.
   * Call the getBlockChain function to retrieve the stored value.
   */
  static async setBlockChain(selectedBlockchain: string) {
    await browser.storage.local.set({
      [BLOCKCHAIN_SELECTION_IDENTIFIER]: selectedBlockchain,
    });
  }

  static async getBlockChain() {
    const DEFAULT_BLOCKCHAIN = ZOND_PROVIDER.MAIN_NET.id;
    const storedBlockchain = await browser.storage.local.get(
      BLOCKCHAIN_SELECTION_IDENTIFIER,
    );

    return (storedBlockchain?.[BLOCKCHAIN_SELECTION_IDENTIFIER] ??
      DEFAULT_BLOCKCHAIN) as BlockchainType;
  }

  /**
   * A function for storing the route to be displayed on opening the extension.
   * Call the getActivePage function to retrieve the stored value, and clearActivePage for clearing the stored value.
   */
  static async setActivePage(activePage: string) {
    if (activePage) {
      await browser.storage.local.set({ [ACTIVE_PAGE_IDENTIFIER]: activePage });
    } else {
      await browser.storage.local.remove(ACTIVE_PAGE_IDENTIFIER);
    }
  }

  static async getActivePage() {
    const storedActivePage = await browser.storage.local.get(
      ACTIVE_PAGE_IDENTIFIER,
    );
    return (storedActivePage?.[ACTIVE_PAGE_IDENTIFIER] ?? "") as string;
  }

  static async clearActivePage() {
    await browser.storage.local.remove(ACTIVE_PAGE_IDENTIFIER);
  }

  /**
   * A function for storing the list of imported tokens.
   * Call the getTokenContractsList function to retrieve the stored value, and clearFromTokenList for clearing the stored value.
   */
  static async setTokenContractsList(
    blockchain: string,
    accountAddress: string,
    contractAddress: string,
  ) {
    const tokensListIdentifier = `${blockchain}_${TOKENS_LIST_IDENTIFIER}_${accountAddress.toUpperCase()}`;
    let storedTokensList = await this.getTokenContractsList(
      blockchain,
      accountAddress,
    );
    storedTokensList.push(contractAddress);

    await browser.storage.local.set({
      [tokensListIdentifier]: Array.from(new Set(storedTokensList)),
    });
  }

  static async getTokenContractsList(
    blockchain: string,
    accountAddress: string,
  ) {
    const tokensListIdentifier = `${blockchain}_${TOKENS_LIST_IDENTIFIER}_${accountAddress.toUpperCase()}`;
    const storedTokensList =
      await browser.storage.local.get(tokensListIdentifier);

    return (storedTokensList?.[tokensListIdentifier] ?? []) as string[];
  }

  static async clearFromTokenContractsList(
    blockchain: string,
    accountAddress: string,
    contractAddress: string,
  ) {
    const tokensListIdentifier = `${blockchain}_${TOKENS_LIST_IDENTIFIER}_${accountAddress.toUpperCase()}`;
    let storedTokensList = await this.getTokenContractsList(
      blockchain,
      accountAddress,
    );

    await browser.storage.local.set({
      [tokensListIdentifier]: Array.from(
        new Set(
          storedTokensList.filter((address) => address !== contractAddress),
        ),
      ),
    });
  }

  /**
   * A function for storing the reuqest info temporarily by the dApp, which will be read by the zond web3 wallet.
   * Call the getDAppRequestData function to retrieve the stored value, and clearFromTokenList for clearing the stored value.
   */
  static async setDAppRequestData(data: DAppRequestType) {
    const blockChain = await this.getBlockChain();
    const dAppRequestDataIdentifier = `${blockChain}_${DAPP_REQUEST_DATA_IDENTIFIER}`;
    await browser.storage.session.set({
      [dAppRequestDataIdentifier]: data,
    });
  }

  static async getDAppRequestData() {
    const blockChain = await this.getBlockChain();
    const dAppRequestDataIdentifier = `${blockChain}_${DAPP_REQUEST_DATA_IDENTIFIER}`;
    const storedDAppRequestData = await browser.storage.session.get(
      dAppRequestDataIdentifier,
    );
    return storedDAppRequestData[dAppRequestDataIdentifier] as
      | DAppRequestType
      | undefined;
  }

  static async clearDAppRequestData() {
    const blockChain = await this.getBlockChain();
    const dAppRequestDataIdentifier = `${blockChain}_${DAPP_REQUEST_DATA_IDENTIFIER}`;
    await browser.storage.session.remove(dAppRequestDataIdentifier);
  }

  /**
   * A function for storing the provider state of wallet.
   * This will be fetched as the initial state of the wallet provider, via the 'initialStateMiddleware' middleware.
   * Call the getProviderState function to retrieve the stored value, and clearFromTokenList for clearing the stored value.
   */
  static async setProviderState(
    providerState: PartialDeep<Parameters<BaseProvider["_initializeState"]>[0]>,
  ) {
    const blockChain = await this.getBlockChain();
    const providerStateIdentifier = `${blockChain}_${PROVIDER_STATE_IDENTIFIER}`;
    const storedProviderState = await this.getProviderState();
    await browser.storage.local.set({
      [providerStateIdentifier]: { ...storedProviderState, ...providerState },
    });
  }

  static async getProviderState() {
    const blockChain = await this.getBlockChain();
    const providerStateIdentifier = `${blockChain}_${PROVIDER_STATE_IDENTIFIER}`;
    const storedProviderState = await browser.storage.local.get(
      providerStateIdentifier,
    );
    const providerStateObject = storedProviderState[providerStateIdentifier]
      ? storedProviderState[providerStateIdentifier]
      : {};
    return {
      ...{ accounts: [], chainId: "", isUnlocked: false, networkVersion: "" },
      ...providerStateObject,
    } as Parameters<BaseProvider["_initializeState"]>[0];
  }
}

export default StorageUtil;
