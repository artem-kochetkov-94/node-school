import { parentPort, workerData } from "worker_threads";
import { compute } from "./utils";

function computeWorker({ array }: { array: number[] }): number {
  return compute(array);
}

parentPort?.postMessage(computeWorker(workerData));
