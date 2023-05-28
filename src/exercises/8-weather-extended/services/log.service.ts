import chalk from "chalk";
import dedent from "dedent-js";
import { IWeather } from "../types.js";

const DICTIONARY: Record<string, any> = {
	title: {
		en: "lalala",
		ru: "lalala"
	},
}

const printError = (error: string): void => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (message: string): void => {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = (): void => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
  );
};

const printWeather = (res: IWeather, icon: string, language = "ru"): void => {
  console.log(
    dedent`${chalk.bgYellow(" WEATHER ")} ${DICTIONARY.title[language]} ${res.name}
		${icon} ${res.weather[0].description}
		${res.main.temp} ${res.main.feels_like}
		${res.main.humidity}%
		${res.wind.speed}
		`
  );
};

export { printError, printSuccess, printHelp, printWeather };
