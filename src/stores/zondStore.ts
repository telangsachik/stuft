import { ZOND_PROVIDER } from "@/configuration/zondConfig";
import {
  ERC_20_CONTRACT_ABI,
  ERC_20_TOKEN_UNITS_OF_GAS,
} from "@/constants/erc20Token";
import { NATIVE_TOKEN_UNITS_OF_GAS } from "@/constants/nativeToken";
import { getHexSeedFromMnemonic } from "@/functions/getHexSeedFromMnemonic";
import { getOptimalTokenBalance } from "@/functions/getOptimalTokenBalance";
import StorageUtil from "@/utilities/storageUtil";
import Web3, {
  TransactionReceipt,
  Web3ZondInterface,
  utils,
} from "@theqrl/web3";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

type ActiveAccountType = {
  accountAddress: string;
};

type ZondAccountType = {
  accountAddress: string;
  accountBalance: string;
};

type ZondAccountsType = {
  accounts: ZondAccountType[];
  isLoading: boolean;
};

class ZondStore {
  zondInstance?: Web3ZondInterface;
  zondConnection = {
    isConnected: false,
    isLoading: false,
    zondNetworkName: "",
    blockchain: "",
  };
  zondAccounts: ZondAccountsType = { accounts: [], isLoading: false };
  activeAccount: ActiveAccountType = { accountAddress: "" };

  constructor() {
    makeAutoObservable(this, {
      zondInstance: observable.struct,
      zondConnection: observable.struct,
      zondAccounts: observable.struct,
      activeAccount: observable.struct,
      selectBlockchain: action.bound,
      setActiveAccount: action.bound,
      fetchZondConnection: action.bound,
      fetchAccounts: action.bound,
      getAccountBalance: action.bound,
      getNativeTokenGas: action.bound,
      signAndSendNativeToken: action.bound,
      getErc20TokenDetails: action.bound,
      getErc20TokenGas: action.bound,
      signAndSendErc20Token: action.bound,
      storeProviderState: action.bound,
    });
    this.initializeBlockchain();
  }

  async initializeBlockchain() {
    const selectedBlockChain = await StorageUtil.getBlockChain();
    const { name, url } = ZOND_PROVIDER[selectedBlockChain];
    this.zondConnection = {
      ...this.zondConnection,
      zondNetworkName: name,
      blockchain: selectedBlockChain,
    };
    const zondHttpProvider = new Web3.providers.HttpProvider(url);
    const { zond } = new Web3({ provider: zondHttpProvider });
    this.zondInstance = zond;

    await this.fetchZondConnection();
    await this.fetchAccounts();
    await this.validateActiveAccount();
    await this.storeProviderState();
  }

  async selectBlockchain(selectedBlockchain: string) {
    await StorageUtil.setBlockChain(selectedBlockchain);
    await this.initializeBlockchain();
  }

  async setActiveAccount(activeAccount?: string) {
    await StorageUtil.setActiveAccount(
      this.zondConnection.blockchain,
      activeAccount,
    );
    this.activeAccount = {
      ...this.activeAccount,
      accountAddress: activeAccount ?? "",
    };

    let storedAccountList: string[] = [];
    try {
      const accountListFromStorage = await StorageUtil.getAccountList(
        this.zondConnection.blockchain,
      );
      storedAccountList = [...accountListFromStorage];
      if (activeAccount) {
        storedAccountList.push(activeAccount);
      }
      storedAccountList = [...new Set(storedAccountList)];
    } finally {
      await StorageUtil.setAccountList(
        this.zondConnection.blockchain,
        storedAccountList,
      );
      await this.fetchAccounts();
    }
  }

  async fetchZondConnection() {
    this.zondConnection = { ...this.zondConnection, isLoading: true };
    try {
      const isListening = (await this.zondInstance?.net.isListening()) ?? false;
      runInAction(() => {
        this.zondConnection = {
          ...this.zondConnection,
          isConnected: isListening,
        };
      });
    } catch (error) {
      runInAction(() => {
        this.zondConnection = { ...this.zondConnection, isConnected: false };
      });
    } finally {
      runInAction(() => {
        this.zondConnection = { ...this.zondConnection, isLoading: false };
      });
    }
  }

  async fetchAccounts() {
    this.zondAccounts = { ...this.zondAccounts, isLoading: true };

    let storedAccountsList: string[] = [];
    const accountListFromStorage = await StorageUtil.getAccountList(
      this.zondConnection.blockchain,
    );
    storedAccountsList = accountListFromStorage;
    try {
      const accountsWithBalance: ZondAccountsType["accounts"] =
        await Promise.all(
          storedAccountsList.map(async (account) => {
            const accountBalance =
              (await this.zondInstance?.getBalance(account)) ?? BigInt(0);
            const convertedAccountBalance = getOptimalTokenBalance(
              utils.fromWei(accountBalance, "ether"),
            );
            return {
              accountAddress: account,
              accountBalance: convertedAccountBalance,
            };
          }),
        );
      runInAction(() => {
        this.zondAccounts = {
          ...this.zondAccounts,
          accounts: accountsWithBalance,
        };
      });
    } catch (error) {
      runInAction(() => {
        this.zondAccounts = {
          ...this.zondAccounts,
          accounts: storedAccountsList.map((account) => ({
            accountAddress: account,
            accountBalance: "0",
          })),
        };
      });
    } finally {
      runInAction(() => {
        this.zondAccounts = { ...this.zondAccounts, isLoading: false };
      });
    }
  }

  async validateActiveAccount() {
    const storedActiveAccount = await StorageUtil.getActiveAccount(
      this.zondConnection.blockchain,
    );

    const confirmedExistingActiveAccount =
      this.zondAccounts.accounts.find(
        (account) => account.accountAddress === storedActiveAccount,
      )?.accountAddress ?? "";
    if (!confirmedExistingActiveAccount) {
      await StorageUtil.clearActiveAccount(this.zondConnection.blockchain);
    }
    this.activeAccount = {
      ...this.activeAccount,
      accountAddress: confirmedExistingActiveAccount,
    };
  }

  async storeProviderState() {
    const chainId = (await this.zondInstance?.getChainId())?.toString() ?? "";
    const networkVersion =
      (await this.zondInstance?.net.getId())?.toString() ?? "";
    StorageUtil.setProviderState({ chainId: `0x${chainId}`, networkVersion });
  }

  async getGasFeeData() {
    const latestBlock = await this.zondInstance?.getBlock("latest");
    const baseFeePerGas = latestBlock?.baseFeePerGas ?? BigInt(0);
    const maxPriorityFeePerGas = utils.toWei("2", "gwei");
    const maxFeePerGas = baseFeePerGas + BigInt(maxPriorityFeePerGas);
    return {
      baseFeePerGas,
      maxPriorityFeePerGas,
      maxFeePerGas,
    };
  }

  getAccountBalance(accountAddress: string) {
    return (
      this.zondAccounts.accounts.find(
        (account) => account.accountAddress === accountAddress,
      )?.accountBalance ?? "0.0 QRL"
    );
  }

  async getNativeTokenGas() {
    const gasLimit = NATIVE_TOKEN_UNITS_OF_GAS;
    const baseFee = Number((await this.getGasFeeData()).baseFeePerGas);
    const priorityFee = Number(
      (await this.getGasFeeData()).maxPriorityFeePerGas,
    );
    return utils.fromWei(gasLimit * (baseFee + priorityFee), "ether");
  }

  async signAndSendNativeToken(
    from: string,
    to: string,
    value: number,
    mnemonicPhrases: string,
  ) {
    let transaction: {
      transactionReceipt?: TransactionReceipt;
      error: string;
    } = { transactionReceipt: undefined, error: "" };

    try {
      const transactionObject = {
        from,
        to,
        value: utils.toWei(value, "ether"),
        nonce: await this.zondInstance?.getTransactionCount(from),
        gasLimit: NATIVE_TOKEN_UNITS_OF_GAS,
        maxFeePerGas: Number((await this.getGasFeeData()).maxFeePerGas),
        maxPriorityFeePerGas: Number(
          (await this.getGasFeeData()).maxPriorityFeePerGas,
        ),
        type: 2,
      };
      const signedTransaction =
        await this.zondInstance?.accounts.signTransaction(
          transactionObject,
          getHexSeedFromMnemonic(mnemonicPhrases),
        );
      if (signedTransaction) {
        const transactionReceipt =
          await this.zondInstance?.sendSignedTransaction(
            signedTransaction?.rawTransaction,
          );
        transaction = { ...transaction, transactionReceipt };
      } else {
        throw new Error("Transaction could not be signed");
      }
    } catch (error) {
      transaction = {
        ...transaction,
        error: `Transaction could not be completed. ${error}`,
      };
    }

    return transaction;
  }

  async getErc20TokenDetails(contractAddress: string) {
    let tokenDetails = {
      token: undefined,
      error: "",
    };

    const contractAbi = ERC_20_CONTRACT_ABI;

    if (this.zondInstance && this.zondInstance.Contract) {
      try {
        const contract = new this.zondInstance.Contract(
          contractAbi,
          contractAddress,
        );
        const name = (await contract.methods.name().call()) as string;
        const symbol = (await contract.methods.symbol().call()) as string;
        const decimals = (await contract.methods.decimals().call()) as bigint;
        const totalSupplyUnformatted = (await contract.methods
          .totalSupply()
          .call()) as bigint;
        const totalSupply =
          Number(totalSupplyUnformatted) / Math.pow(10, Number(decimals));
        const balanceUnformatted = (await contract.methods
          .balanceOf(this.activeAccount.accountAddress)
          .call()) as bigint;
        const balance =
          Number(balanceUnformatted) / Math.pow(10, Number(decimals));
        return {
          ...tokenDetails,
          token: { name, symbol, decimals, totalSupply, balance },
        };
      } catch (error) {
        return {
          ...tokenDetails,
          error:
            "Could not retreive the token with the entered contract address",
        };
      }
    }

    return tokenDetails;
  }

  async getErc20TokenGas(
    from: string,
    to: string,
    value: number,
    contractAddress: string,
    decimals: number,
  ) {
    if (this.zondInstance && this.zondInstance.Contract) {
      const contract = new this.zondInstance.Contract(
        ERC_20_CONTRACT_ABI,
        contractAddress,
      );
      const contractTransfer = contract.methods.transfer(
        to,
        BigInt(value * 10 ** decimals),
      );
      const gasLimit = Number(
        await contractTransfer.estimateGas({
          from,
        }),
      );
      const baseFee = Number((await this.getGasFeeData()).baseFeePerGas);
      const priorityFee = Number(
        (await this.getGasFeeData()).maxPriorityFeePerGas,
      );
      return utils.fromWei(gasLimit * (baseFee + priorityFee), "ether");
    }
    return "";
  }

  async signAndSendErc20Token(
    from: string,
    to: string,
    value: number,
    mnemonicPhrases: string,
    contractAddress: string,
    decimals: number,
  ) {
    let transaction: {
      transactionReceipt?: TransactionReceipt;
      error: string;
    } = { transactionReceipt: undefined, error: "" };

    const contractAbi = ERC_20_CONTRACT_ABI;

    if (this.zondInstance && this.zondInstance.Contract) {
      try {
        this.zondInstance.wallet?.add(getHexSeedFromMnemonic(mnemonicPhrases));
        this.zondInstance.transactionConfirmationBlocks = 12;
        const contract = new this.zondInstance.Contract(
          contractAbi,
          contractAddress,
        );
        const contractTransfer = contract.methods.transfer(
          to,
          BigInt(value * 10 ** decimals),
        );
        const transactionObject = {
          from,
          to: contractAddress,
          data: contractTransfer.encodeABI(),
          nonce: await this.zondInstance?.getTransactionCount(from),
          gasLimit: ERC_20_TOKEN_UNITS_OF_GAS,
          maxFeePerGas: Number((await this.getGasFeeData()).maxFeePerGas),
          maxPriorityFeePerGas: Number(
            (await this.getGasFeeData()).maxPriorityFeePerGas,
          ),
          type: 2,
        };

        const transactionReceipt = await this.zondInstance.sendTransaction(
          transactionObject,
          undefined,
          {
            checkRevertBeforeSending: true,
          },
        );

        transaction = {
          ...transaction,
          transactionReceipt,
        };
      } catch (error) {
        transaction = {
          ...transaction,
          error: `Transaction could not be completed. ${error}`,
        };
      }
    }

    return transaction;
  }
}

export default ZondStore;
