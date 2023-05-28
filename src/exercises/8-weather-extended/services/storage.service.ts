import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

const WEATHER_DICTIONARY = {
  token: "token",
  city: "city",
  language: "language"
};

const saveKeyValue = async (key: string, value: any): Promise<any> => {
  let data: Record<string, any> = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file.toString());
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string): Promise<any> => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file.toString());
    return data[key];
  }

  return undefined;
};

const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { saveKeyValue, getKeyValue, WEATHER_DICTIONARY };
