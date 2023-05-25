import { ITime } from "./types";

export class Timer {
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

  private showMessage(message: string): void {
    console.log(message);
  }
}
