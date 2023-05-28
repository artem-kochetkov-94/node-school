export function factorial(n: number): number {
  if (n == 1 || n == 0) {
    return 1;
  }

  return factorial(n - 1) * n;
}

export function compute({ array }: { array: number[] }): number[] {
  const arr = [];

  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }

  return array.map((el) => factorial(el));
}
