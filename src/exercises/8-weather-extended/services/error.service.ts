import { isAxiosError } from "axios";
import { printError } from "./log.service.js";

export const handleNetworkError = (e: unknown) => {
  if (isAxiosError(e)) {
    if (e.response?.status === 404) {
      printError("Неверно указан город");
    } else if (e?.response?.status === 401) {
      printError("Неверно указан токен");
    } else {
      printError(e.message);
    }
  } else if (e instanceof Error) {
    handleError(e);
  }
};

export const handleError = (e: unknown) => {
  if (e instanceof Error) {
    printError(e.message);
  }
};
