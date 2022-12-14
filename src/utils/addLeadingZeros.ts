export const addLeadingZeros = (num: string, totalLength: number) => {
  return num.padStart(totalLength, "0");
};
