export const getOptimalTokenBalance = (
  balance: string,
  tokenSymbol?: string,
) => {
  const symbol = tokenSymbol ?? "QRL";
  try {
    if (Number(balance) == 0) return `0.0 ${symbol}`;
    const precisionFloat = parseFloat(
      balance.slice(0, balance.indexOf(".") + 5),
    ).toFixed(4);
    let deleteIndex = precisionFloat.length - 1;
    const postDecimalIndex = precisionFloat.indexOf(".") + 2;

    while (
      deleteIndex >= postDecimalIndex &&
      precisionFloat[deleteIndex] === "0"
    ) {
      deleteIndex--;
    }

    return `${precisionFloat.substring(0, deleteIndex + 1)} ${symbol}`;
  } catch (error) {
    return `${balance} ${symbol}`;
  }
};
