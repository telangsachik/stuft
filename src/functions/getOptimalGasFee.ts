export const getOptimalGasFee = (gas: string, tokenSymbol?: string) => {
  const symbol = tokenSymbol ?? "QRL";
  try {
    if (Number(gas) == 0) return `0.0 ${symbol}`;
    let precisionFloat = parseFloat(Number(gas).toString()).toFixed(16);
    let deleteIndex = precisionFloat.length - 1;
    const postDecimalIndex = precisionFloat.indexOf(".") + 2;

    while (
      deleteIndex >= postDecimalIndex &&
      precisionFloat[deleteIndex] === "0"
    ) {
      deleteIndex--;
    }

    precisionFloat = precisionFloat.substring(0, deleteIndex + 1);

    let postDecimalString = precisionFloat.substring(
      precisionFloat.indexOf(".") + 1,
    );
    let i = 0;
    while (i < postDecimalString.length && postDecimalString[i] === "0") {
      i++;
    }
    postDecimalString = postDecimalString.substring(0, i + 4);
    i = postDecimalString.length - 1;
    while (i > 0) {
      if (postDecimalString[i] === "0") {
        i--;
      } else {
        break;
      }
    }
    postDecimalString = postDecimalString.substring(0, i + 1);

    return `${precisionFloat.substring(0, precisionFloat.indexOf(".") + 1).concat(postDecimalString)} ${symbol}`;
  } catch (error) {
    return `${gas} ${symbol}`;
  }
};
