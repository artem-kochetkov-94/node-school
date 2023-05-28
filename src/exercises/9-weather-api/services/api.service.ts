import axios, { AxiosResponse } from "axios";
import { IWeather } from "../types.js";

const API_KEY = "5f0a6ff7bc268ee37960adc16b351fb9";

const getWeather = async (city: string): Promise<IWeather> => {
  const { data } = await axios.get<any, AxiosResponse<IWeather, any>, any>(
    `${process.env.API_URL}/weather`,
    {
      params: {
        q: city,
        appid: API_KEY,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};

export { getWeather };
