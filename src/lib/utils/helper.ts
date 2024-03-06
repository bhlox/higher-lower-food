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

export function generateRandomHexColor() {
  const color =
    "#" +
    Math.floor(Math.random() * (0xffffff + 1))
      .toString(16)
      .padStart(6, "0"); // in case the number is too small to fill 6 hex digits
  return color;
}

export function adjustColor(color: string, amount: number) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

export function getRandomIndex(arr: any[]) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  return randomIndex;
}

export function convertToRoman(num: number) {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  } as const;
  let str = "";

  for (let i of Object.keys(roman) as Array<keyof typeof roman>) {
    const q = Math.floor(num / roman[i]);
    num -= q * roman[i];
    str += i.repeat(q);
  }

  return str;
}
export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
