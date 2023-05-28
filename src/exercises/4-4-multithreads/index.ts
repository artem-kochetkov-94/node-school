import { performanceObserver } from "./performanceObserver";
import { compute, computeWorker, generateArray, generateArrays } from "./utils";
import os from "os";

function calcSync(): number {
  performance.mark("startSync");

  const result = compute(generateArray(1, 300_000));
  performance.mark("endSync");
  performance.measure("sync", "startSync", "endSync");

  return result;
}

async function calcAsyc() {
  performance.mark("startThread");

  const result = await Promise.all(
    generateArrays(os.cpus().length, 300_000).map((array) =>
      computeWorker(array)
    )
  );
  performance.mark("endThread");
  performance.measure("thread", "startThread", "endThread");

  return result.reduce((acc, curr) => acc + curr, 0);
}

async function main() {
  performanceObserver.observe({ entryTypes: ["measure"] });
  console.log(calcSync());
  console.log(await calcAsyc());
}

main();
