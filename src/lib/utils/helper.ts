import { NUMBER_TO_FETCH } from "../constants";

export function isEvenNum(num: number) {
  return Math.abs(num % 2) === 0;
}

export function shuffleArray<T>([...arr]: T[]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

export function removeDecimals(value: string | number) {
  return value.toString().replace(".00", "").trim();
}

export function isNull<T>(value: T) {
  return value === null;
}

export function customTimeout(seconds: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
}

export function splitNumbers(value: number) {
  const removedDecimals = removeDecimals(value);
  return removedDecimals.split("").map(Number);
}

export function isIndexQualifiedToFetch(
  index: number
): index is typeof NUMBER_TO_FETCH {
  return (
    Math.abs(
      (+index.toString().at(-1)! === 0 ? 1 : +index.toString().at(-1)!) %
        NUMBER_TO_FETCH
    ) === 0
  );
}

export function arrayHasValue<T>(value: T[]) {
  return value.length > 0;
}
