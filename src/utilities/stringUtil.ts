class StringUtil {
  static getSplitAddress(accountAddress: string, splitLength: number = 4) {
    const prefix = accountAddress.substring(0, 2);
    const idSplit: string[] = [];
    for (let i = 2; i < accountAddress.length; i += splitLength) {
      idSplit.push(accountAddress.substring(i, i + splitLength));
    }

    return [prefix, ...idSplit].join(" ");
  }
}

export default StringUtil;
