import { performanceObserver } from "./performanceObserver";
import { compute, computeWorker, generateArray } from "./utils";

function calcSync(): number {
  performance.mark("startSync");

  const result = compute(generateArray(1, 300_000));
  performance.mark("endSync");
  performance.measure("sync", "startSync", "endSync");

  return result;
}

async function calcAsyc() {
  performance.mark("startThread");

  const result = await Promise.all([
    computeWorker(generateArray(1, 50_000)),
    computeWorker(generateArray(50_001, 100_000)),
    computeWorker(generateArray(100_001, 150_000)),

    computeWorker(generateArray(150_001, 200_000)),
    computeWorker(generateArray(200_001, 250_000)),
    computeWorker(generateArray(250_001, 300_000)),
  ]);
  performance.mark("endThread");
  performance.measure("thread", "startThread", "endThread");

  return result.reduce((acc, curr) => acc + curr, 0);
}

async function main() {
  process.env.UV_THREADPOOL_SIZE = "6";
  performanceObserver.observe({ entryTypes: ["measure"] });
  console.log(calcSync());
  console.log(await calcAsyc());
}

main();
