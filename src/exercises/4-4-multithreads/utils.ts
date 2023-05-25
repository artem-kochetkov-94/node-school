import { Worker } from "worker_threads";

export function generateArray(from: number, to: number): number[] {
  let array = [];

  for (let i = from; i <= to; i++) {
    array.push(i + 1);
  }

  return array;
}

export const generateArrays = (
  arraysCount: number,
  itemsCount: number
): number[][] => {
  const result = [];
  const divider = itemsCount / arraysCount;

  for (let i = 0; i < arraysCount; i++) {
    result.push(generateArray(i * divider + 1, divider * (i + 1)));
  }

  return result;
};

export function compute(array: number[]): number {
  return array.filter((item) => item % 3 === 0).length;
}

export const computeWorker = (array: number[]): Promise<number> => {
  return new Promise((resolve) => {
    const worker = new Worker("./build/exercises/4-4-multithreads/worker.js", {
      workerData: {
        array,
      },
    });

    worker.on("message", (msg) => {
      resolve(msg);
    });
  });
};
