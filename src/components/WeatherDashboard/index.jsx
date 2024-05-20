import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetchWeather } from "../../services/fetchWeatherServices";
import WeatherCard from "./WeatherCard";
import getCityCodes from "../../utils/CityCodeUtils";
import cityData from "../../assets/cities.json";
import "./index.css";
import WeatherModel from "../../models/Weather";
import { storageKey, cacheExpirationTimeMin } from "../../constants/constant";
const WeatherDashboard = () => {
  const [Weather, setWeather] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const cityCodes = getCityCodes(cityData);

  const loadData = async () => {
    let ids = cityCodes.join(",");
    let cachedData = sessionStorage.getItem(storageKey);

    let jsonData = JSON.parse(cachedData);
    if (
      jsonData &&
      Array.isArray(jsonData.data) &&
      parseInt(jsonData.cachedTime) + cacheExpirationTimeMin >
        Math.floor(new Date().getTime() / 1000)
    ) {
      const weatherData = jsonData.data;
      setWeather(weatherData);
      setIsloading(false);
    } else {
      let weatherDataReceived = await fetchWeather(ids);
      if (Array.isArray(weatherDataReceived)) {
        const weatherData = weatherDataReceived.map(
          (item) => new WeatherModel(item)
        );

        if (weatherData) {
          sessionStorage.setItem(
            storageKey,
            JSON.stringify({
              cachedTime: Math.floor(new Date().getTime() / 1000).toString(),
              data: weatherData,
            })
          );
          setWeather(weatherData);
          setIsloading(false);
        }
      } else {
        setIsloading(false);
        return (
          <div>
            <div className=" container dashboard">
              <div>Error fetching data</div>
            </div>
          </div>
        );
      }
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  if (isLoading)
    return (
      <div>
        <div className=" container dashboard">
          {" "}
          <div className="Loading">Loading...</div>
        </div>
      </div>
    );
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
