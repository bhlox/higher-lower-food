export function isEvenNum(num: number) {
  return Math.abs(num % 2) === 0;
}

export function shuffleArray([...arr]) {
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

export function splitNumbers(value: string | number) {
  const removedDecimals = removeDecimals(value);
  return removedDecimals.split("").map(Number);
}
