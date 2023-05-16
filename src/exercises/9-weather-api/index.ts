import express, { Request, Response } from "express";
import { isAxiosError } from "axios";
import { getWeather } from "./services/api.service";

const port = 8005;
const app = express();

app.get("/weather", async (req: Request, res: Response) => {
  if (!req.query.city || typeof req.query.city !== "string") {
    return res.status(400).send("Bad request");
  }

  try {
    const weather = await getWeather(req.query.city);
    res.send(weather);
  } catch (e) {
    if (isAxiosError(e) && e.response?.status) {
      res.status(e.response?.status).send(e.response?.statusText);
      return;
    }

    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на https://localhost:${port}`);
});
