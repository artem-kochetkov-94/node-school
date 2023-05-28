import { TimerNotify } from "./TimerNotify";
import { performanceObserver } from "../4-2-timer/performanceObserver";
import { PromptService } from "../4-2-timer/promptService";
import { ITime } from "../4-2-timer/types";

class App {
  private promptService: PromptService = new PromptService();

  private async prompt(): Promise<ITime> {
    const hours = await this.promptService.input<number>("hours");
    const minutes = await this.promptService.input<number>("minutes");
    const seconds = await this.promptService.input<number>("seconds");

    return { hours, minutes, seconds };
  }

  public async run() {
    performanceObserver.observe({ entryTypes: ["measure"] });

    const timer = new TimerNotify();
    const input = await this.prompt();

    timer.start(input);
  }
}

const app = new App();
app.run();
