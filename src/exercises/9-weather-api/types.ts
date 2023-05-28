export interface IWeather {
  name: string;
  icon: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    feels_like: string;
    humidity: string;
    temp: string;
  };
  wind: {
    speed: string;
  };
}
