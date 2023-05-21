import { sum } from "./sum";
import { multiply } from "./multiply";

class App {
  private operations: Record<string, Function> = {};

  constructor() {
    this.initOperations();
  }

  initOperations() {
    this.operations = {
      sum: (a: number, b: number): void => {
        console.log(sum(a, b));
      },
      multiply: (a: number, b: number): void => {
        console.log(multiply(a, b));
      },
    };
  }

  execute(operation: string, ...args: unknown[]) {
    try {
      if (!this.operations[operation]) {
        throw new Error("Invalid operation");
      }

      this.operations[operation](...args);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }
}

const [, , firstArg, secondArg, operation] = process.argv;
const firstNum = Number(firstArg);
const secondNum = Number(secondArg);

const app = new App();
app.execute(operation, firstNum, secondNum);
