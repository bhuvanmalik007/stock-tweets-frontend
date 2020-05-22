export const checkIdenticalArrays = (arr1, arr2) =>
  arr1.length === arr2.length &&
  arr1.sort().every((value, index) => value === arr2.sort()[index]);
