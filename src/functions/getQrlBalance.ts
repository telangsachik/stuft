export const getQrlBalance = (balance: string) => {
  try {
    let precisionFloat = parseFloat(Number(balance).toString()).toFixed(4);
    let deleteIndex = precisionFloat.length - 1;
    const postDecimalIndex = precisionFloat.indexOf(".") + 2;
    while (
      deleteIndex >= postDecimalIndex &&
      precisionFloat[deleteIndex] === "0"
    ) {
      deleteIndex--;
    }
    return `${precisionFloat.substring(0, deleteIndex + 1)} QRL`;
  } catch (error) {
    return `${balance} QRL`;
  }
};
