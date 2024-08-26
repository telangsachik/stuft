import { Web3PromiEvent } from "@theqrl/web3-core";
import { DataFormat, TransactionReceipt } from "@theqrl/web3-types";
import { SendSignedTransactionEvents } from "@theqrl/web3-zond";
import { Web3Account } from "@theqrl/web3-zond-accounts";
import { web3 } from "./web3";

export class Wallet {
  private readonly account: Web3Account;
  public constructor(hexSeed: string) {
    this.account = web3.zond.accounts.seedToAccount(hexSeed);
  }
  public async sendEther(
    address: string,
    value: string
  ): Promise<
    Web3PromiEvent<TransactionReceipt, SendSignedTransactionEvents<DataFormat>>
  > {
    const tx = {
      from: this.account.address,
      to: address,
      value,
      gas: "21000",
      gasPrice: web3.utils.numberToHex(await web3.zond.getGasPrice()),
    };
    const signedTx = await web3.zond.accounts.signTransaction(
      tx,
      this.account.seed
    );

    return web3.zond.sendSignedTransaction<DataFormat>(signedTx.rawTransaction);
  }

  public getAccount() {
    return this.account;
  }

  public async getBalance(address?: string) {
    return web3.zond.getBalance(address ?? this.account.address);
  }
}
