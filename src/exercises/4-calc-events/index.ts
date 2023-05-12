import { sum } from "./sum";
import { multiply } from "./multiply";
import { TypedEventEmitter } from "../../utils/TypedEventEmitter";
import type { CalcEventTypes } from "./types";

let firstNum = process.argv[2];
let secondNum = process.argv[3];
let operation = process.argv[4];

if (!Number.isFinite(+firstNum)) {
  throw new Error("firstNum is not a number");
}
if (!Number.isFinite(+secondNum)) {
  throw new Error("secondNum is not a number");
}

const eventEmmiter = new TypedEventEmitter<CalcEventTypes>();
eventEmmiter.on("sum", (a, b) => console.log(sum(a, b)));
eventEmmiter.on("multiply", (a, b) => console.log(multiply(a, b)));

if (operation === "sum" || operation === "multiply") {
  eventEmmiter.emit(operation, +firstNum, +secondNum);
} else {
  throw new Error("invalid operation");
}
