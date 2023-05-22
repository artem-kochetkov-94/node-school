import { getArgs } from "./helpers/args.js";
import { getWeather, iconMap } from "./services/api.service.js";
import { handleError } from "./services/error.service.js";
import {
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  saveKeyValue,
  WEATHER_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";
import dotenv from "dotenv";

const saveValue = async (
  key: string,
  value: string | string[]
): Promise<void> => {
  try {
    if (!value.length) {
      throw new Error(`Не передано значение для ${key}`);
    }

    await saveKeyValue(key, value);
    printSuccess(`${key} сохранён`);
  } catch (e) {
    handleError(e);
  }
};

const saveToken = async (token: string): Promise<void> => {
  await saveValue(WEATHER_DICTIONARY.token, token);
};

const saveCity = async (city: string): Promise<void> => {
  console.log("city", city);
  await saveValue(
    WEATHER_DICTIONARY.city,
    city.split(",").map((item) => item.trim())
  );
};

const saveLanguage = async (language: string): Promise<void> => {
  await saveValue(WEATHER_DICTIONARY.language, language);
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
      printWeather(
        w,
        iconMap[w.weather[0].icon ? w.weather[0].icon.slice(0, -1) : ""],
        language
      );
    });
  } catch (e) {
    handleError(e);
  }
};

const initCLI = () => {
  dotenv.config();
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
