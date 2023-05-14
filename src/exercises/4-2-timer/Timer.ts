import { ITime } from "./types";

export abstract class AbstractTimer {
  public start(options: ITime): void {
    performance.mark("start");
    const { hours, minutes, seconds } = options;

    const ms = seconds * 1000 + minutes * 60 * 1000 + hours * 60 * 60 * 1000;

    setTimeout(() => {
      this.showMessage("Finish!");
      performance.mark("end");
      performance.measure("timer", "start", "end");
    }, ms);
  }

  protected abstract showMessage(message: string): void;
}

export class Timer extends AbstractTimer {
  protected showMessage(message: string): void {
    console.log(message);
  }
}
