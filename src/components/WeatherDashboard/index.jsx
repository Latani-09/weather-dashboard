import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/style.css";
import { useState, useEffect } from "react";
import { fetchWeather } from "../../services/services";
import WeatherCard from "./weatherCard";
import {cityCodes} from "../../constants/constant";
const WeatherDashboard = () => {
  const [Weather, setWeather] = useState("");
  const [isLoading, setIsloading] = useState(true);


  const loadData = async () => {
    
    let ids = cityCodes.join(",");
    let cachedData = localStorage.getItem("weatherData");
    let jsonData = JSON.parse(cachedData);
    
    if (
      jsonData &&
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
              <WeatherCard city={city}  index={index}/>
            ))}
        </div>
      </div>
    </div>
  );
};
export default WeatherDashboard;
