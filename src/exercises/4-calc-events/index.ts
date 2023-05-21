import { sum } from "./sum";
import { multiply } from "./multiply";
import { TypedEventEmitter } from "../../utils/TypedEventEmitter";
import { CalcEventTypes, Operations } from "./types";

class App {
  private operations: Operations;
  private eventEmmiter = new TypedEventEmitter<CalcEventTypes>();

  constructor() {
    this.initOperations();
    this.bindEvents();
  }

  private initOperations(): void {
    this.operations = {
      sum: (a, b): void => console.log(sum(a, b)),
      multiply: (a, b): void => console.log(multiply(a, b)),
    };
  }

  private bindEvents(): void {
    const keys = Object.keys(this.operations);

    for (let key of keys) {
      this.eventEmmiter.on(key as keyof Operations, (...args): void => {
        this.operations[key as keyof Operations].apply(this, args);
      });
    }
  }

  public execute<T extends keyof CalcEventTypes>(
    operation: T,
    ...args: CalcEventTypes[T]
  ): void {
    try {
      if (!this.operations[operation]) {
        throw new Error("Invalid operation");
      }

      console.log("operation", operation);

      this.eventEmmiter.emit(operation, ...args);
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
app.execute(operation as keyof CalcEventTypes, firstNum, secondNum);
