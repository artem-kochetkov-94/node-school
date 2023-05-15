import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  WEATHER_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";
import { isAxiosError } from "axios";

const saveToken = async (token: string): Promise<void> => {
  if (!token.length) {
    printError("Не передан token");
    return;
  }
  try {
    await saveKeyValue(WEATHER_DICTIONARY.token, token);
    printSuccess("Токен сохранён");
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    }
  }
};

const saveCity = async (city: string): Promise<void> => {
  if (!city.length) {
    printError("Не передан город");
    return;
  }

  try {
    await saveKeyValue(
      WEATHER_DICTIONARY.city,
      city.split(",").map((city) => city.trim())
    );
    printSuccess("Город сохранён");
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    }
  }
};

const saveLanguage = async (language: string): Promise<void> => {
  if (!language.length) {
    printError("Не передан язык");
    return;
  }

  try {
    await saveKeyValue(WEATHER_DICTIONARY.language, language);
    printSuccess("Язык сохранён");
  } catch (e) {
    if (e instanceof Error) {
      printError(e.message);
    }
  }
};

const getForcast = async () => {
  try {
    const city = await getKeyValue(WEATHER_DICTIONARY.city);
    const language = await getKeyValue(WEATHER_DICTIONARY.language);

    if (!city) {
      return;
    }

    const weather = await Promise.all(
      city.map((city: string) => getWeather(city, language))
    );

    weather.forEach((w) => {
      printWeather(w, getIcon(w.weather[0].icon), language);
    });
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        printError("Неверно указан город");
      } else if (e?.response?.status === 401) {
        printError("Неверно указан токен");
      } else {
        printError(e.message);
      }
    } else if (e instanceof Error) {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  if (args.l) {
    return saveLanguage(args.l);
  }

  return getForcast();
};

initCLI();
