import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetchWeather } from "../../services/fetchWeatherServices";
import WeatherCard from "./WeatherCard";
import getCityCodes from "../../utils/CityCodeUtils";
import cityData from "../../assets/cities.json";
import "./index.css";
import WeatherModel from "../../models/Weather";
const WeatherDashboard = () => {
  const [Weather, setWeather] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const cityCodes = getCityCodes(cityData);
  const loadData = async () => {
    let ids = cityCodes.join(",");
    let cachedData = localStorage.getItem("weatherData");

    let jsonData = JSON.parse(cachedData);
    if (
      jsonData&&Array.isArray(jsonData.data) &&
      parseInt(jsonData.cachedTime) + 5 * 60 >
        Math.floor(new Date().getTime() / 1000)
    ) {
      console.log("weather data ", jsonData.data);

      const weatherData = jsonData.data;
      setWeather(weatherData);
      setIsloading(false);
    } else {
      let weatherDataReceived = await fetchWeather(ids);
      if (Array.isArray(weatherDataReceived)){
      console.log('received',weatherDataReceived )
      const weatherData = weatherDataReceived.map(item => new WeatherModel(item));
      
      if (weatherData) {
        localStorage.setItem(
          "weatherData",
          JSON.stringify({
            cachedTime: Math.floor(new Date().getTime() / 1000).toString(),
            data: weatherData,
          })
        );
        setWeather(weatherData);
        setIsloading(false);
      }
    }
    else {setIsloading(false);
    return(<div className="Loading">Error fetching data</div>)}
  };}
  useEffect(() => {
    loadData();
    console.log("weather", Weather);
  }, []);

  if (isLoading) return <div className="Loading">Loading...</div>;
  if (Weather === "") {
    return null;
  }
  return (
    <div>
      <div className=" container dashboard">
        <div className="row">
          {Weather &&
            Weather.map((city, index) => (
              <WeatherCard city={city} index={index} key={city.id} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default WeatherDashboard;
