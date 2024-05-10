import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";
import { useState, useEffect } from "react";
import { fetchWeather } from "../../services/services";
import WeatherCard from "./WeatherCard";
import getCityCodes from "../../utils/CityCodeUtils";
import cityData from "../../assets/cities.json";
import './index.css'
const WeatherDashboard = () => {
  const [Weather, setWeather] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const cityCodes = getCityCodes(cityData);
  const loadData = async () => {
    let ids = cityCodes.join(",");
    let cachedData = localStorage.getItem("weatherData");

    let jsonData = JSON.parse(cachedData);

    if (
      Array.isArray(jsonData.data)&&
      parseInt(jsonData.cachedTime) + 5 * 60 >
        Math.floor(new Date().getTime() / 1000)
    ) {
      setWeather(jsonData.data);
      setIsloading(false);
    } else {
      let weatherData = await fetchWeather(ids);
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
  };
  useEffect(() => {
    loadData();
    console.log('weather' ,Weather)
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
