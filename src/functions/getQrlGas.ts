export const getQrlGas = (gas: string) => {
  try {
    let precisionFloat = parseFloat(Number(gas).toString()).toFixed(16);
    if (Number(precisionFloat) == 0) return "0.0 QRL";
    let deleteIndex = precisionFloat.indexOf(".") + 1;
    while (
      deleteIndex < precisionFloat.length &&
      precisionFloat[deleteIndex] === "0"
    ) {
      deleteIndex++;
    }
    return `${precisionFloat.substring(0, deleteIndex + 1)} QRL`;
  } catch (error) {
    return `${gas} QRL`;
  }
};
