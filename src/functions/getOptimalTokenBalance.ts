export const getOptimalTokenBalance = (
  balance: string,
  tokenSymbol?: string,
) => {
  const symbol = tokenSymbol ?? "QRL";
  try {
    let precisionFloat = parseFloat(Number(balance).toString()).toFixed(4);
    if (Number(precisionFloat) == 0) return `0.0 ${symbol}`;
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
