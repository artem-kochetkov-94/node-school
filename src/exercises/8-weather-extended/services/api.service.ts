import axios from "axios";
import { getKeyValue, WEATHER_DICTIONARY } from "./storage.service.js";
import { IWeather } from "../types.js";

const iconMap: Record<string, string> = {
  "01": "☀️",
  "02": "🌤️",
  "03": "☁️",
  "04": "☁️",
  "09": "🌧️",
  "10": "🌦️",
  "11": "🌩️",
  "13": "❄️",
  "50": "🌫️",
};

const getWeather = async (city: string, language = "ru"): Promise<IWeather> => {
  const token = await getKeyValue(WEATHER_DICTIONARY.token);

  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }

  const { data } = await axios.get(`${process.env.API_URL}/weather`, {
    params: {
      q: city,
      appid: token,
      lang: language,
      units: "metric",
    },
  });

  return data;
};

export { getWeather, iconMap };
