/**
 * A utility for handling string related operations
 */
class StringUtil {
  /**
   * A function for splitting the address with spaces between them, making the address more readable.
   */
  static getSplitAddress(
    accountAddress: string,
    splitLength: number = 5,
    prefixLength = accountAddress?.startsWith("Z") ? 1 : 2,
  ) {
    const prefix = accountAddress?.substring(0, prefixLength);
    const addressSplit: string[] = [];
    for (let i = prefixLength; i < accountAddress?.length; i += splitLength) {
      addressSplit.push(accountAddress?.substring(i, i + splitLength));
    }
    return { prefix, addressSplit };
  }
}

export default StringUtil;
