import axios from "axios";
import { getKeyValue, WEATHER_DICTIONARY } from "./storage.service.js";
import { IWeather } from "../types.js";

const getIcon = (icon: string): string => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️";
    case "02":
      return "🌤️";
    case "03":
      return "☁️";
    case "04":
      return "☁️";
    case "09":
      return "🌧️";
    case "10":
      return "🌦️";
    case "11":
      return "🌩️";
    case "13":
      return "❄️";
    case "50":
      return "🌫️";
    default: {
      return "";
    }
  }
};

const getWeather = async (
  city: string,
  language = "ru"
): Promise<IWeather> => {
  const token = await getKeyValue(WEATHER_DICTIONARY.token);

  if (!token) {
    throw new Error(
      "Не задан ключ API, задайте его через команду -t [API_KEY]"
    );
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: language,
        units: "metric",
      },
    }
  );

  return data;
};

export { getWeather, getIcon };
