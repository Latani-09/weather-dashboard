// WeatherModel.js

class WeatherModel {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.coordinates = { lon: data.coord.lon, lat: data.coord.lat };
      this.timestamp = data.dt;
      this.temperature = data.main.temp;
      this.feelsLike = data.main.feels_like;
      this.pressure = data.main.pressure;
      this.humidity = data.main.humidity;
      this.visibility = data.visibility;
      this.cloudiness = data.clouds.all;
      this.sunrise = data.sys.sunrise;
      this.sunset = data.sys.sunset;
      this.country = data.sys.country;
      this.timezone = data.sys.timezone;
      this.weatherIcon = data.weather[0].icon;
    }
  }
  
  export default WeatherModel;
  