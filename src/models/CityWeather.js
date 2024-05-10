// WeatherModel.js
import { formatTime, getDateTime } from "../utils/DateTimeHelper";
class CityWeatherModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.time = getDateTime(data.dt);
    this.country = data.country;
    this.temperature = String(cityWeatherData.main.temp).split(".")[0];
    this.pressure = data.main.pressure;
    this.humidity = data.main.humidity;
    this.visibility = data.visibility;
    this.windSpeed = data.wind.speed;
    this.windDirection = data.wind.deg;
    this.sunrise = formatTime(data.sys.sunrise + data.sys.timezone);
    this.sunset = formatTime(data.sys.sunset + data.sys.timezone);
    this.country = data.sys.country;
    this.timezone = data.sys.timezone;
    this.weatherIcon = data.weather[0].icon;
    this.description = data.weather[0].description;
    this.temp_min = String(data.main.temp_min).split(".")[0];
    this.temp_max = data.main.temp_max;
  }
}

export default CityWeatherModel;
