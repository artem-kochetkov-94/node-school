import { compute } from "./factorial";

process.on("message", (msg: { array: number[] }): void => {
  process.send && process.send(compute(msg));
  process.disconnect();
});
