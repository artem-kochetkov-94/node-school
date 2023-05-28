import { AbstractTimer } from "../4-2-timer/Timer";
import notifier from "node-notifier";

export class TimerNotify extends AbstractTimer {
  protected showMessage(message: string): void {
    notifier.notify(message);
  }
}
