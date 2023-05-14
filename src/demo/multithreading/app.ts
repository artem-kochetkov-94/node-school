import { fork } from "child_process";
import { performanceObserver } from "./performanceObserver";
import { Worker } from "worker_threads";

const workerFunction = (array: number[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    performance.mark("startWorker");

    const worker = new Worker("./build/worker.js", {
      workerData: { array },
    });

    worker.on("message", (msg) => {
      console.log("Получено: ", msg);
      resolve(msg);
    });

    worker.on("exit", () => {
      console.log("exitWorker");
      performance.mark("endWorker");
      performance.measure("worker", "startWorker", "endWorker");
    });
  });
};

const forkFunction = (array: number[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    const forkProcess = fork("./build/fork.js");

    forkProcess.on("message", (msg) => {
      console.log("Получено: ", msg);
      resolve(msg);
    });

    forkProcess.on("exit", () => {
      console.log("exitFork");
      performance.mark("endFork");
      performance.measure("fork", "startFork", "endFork");
    });

    performance.mark("startFork");
    forkProcess.send({ array });
  });
};

async function main() {
  performanceObserver.observe({ entryTypes: ["measure"] });

  await workerFunction([25, 19, 48, 30]);
  await forkFunction([25, 19, 48, 30]);
}

main();
