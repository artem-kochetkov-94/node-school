import { sum } from "./sum";
import { multiply } from "./multiply";

let firstNum = process.argv[2];
let secondNum = process.argv[3];
let operation = process.argv[4];

if (!Number.isFinite(+firstNum)) {
  throw new Error("firstNum is not a number");
}
if (!Number.isFinite(+secondNum)) {
  throw new Error("secondNum is not a number");
}

switch (operation) {
  case "sum": {
    console.log(sum(+firstNum, +secondNum));
    break;
  }
  case "multiply": {
    console.log(multiply(+firstNum, +secondNum));
    break;
  }
  default: {
    throw new Error("invalid operation");
  }
}
