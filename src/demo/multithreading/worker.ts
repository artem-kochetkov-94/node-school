import { parentPort, workerData } from "worker_threads";
import { compute } from "./factorial";

parentPort?.postMessage(compute(workerData));
