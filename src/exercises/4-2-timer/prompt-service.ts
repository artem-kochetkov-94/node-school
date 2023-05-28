import inquirer from "inquirer";

export class PromptService {
  public async input<T>(message: string) {
    const { result } = await inquirer.prompt<{ result: T }>([
      {
        name: "result",
        message,
      },
    ]);

    return result;
  }
}
