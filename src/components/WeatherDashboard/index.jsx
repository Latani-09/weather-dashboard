import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { fetchWeather ,getCachedData,setCachewithTime} from "../../services/fetchWeatherServices";
import WeatherCard from "./WeatherCard";
import getCityCodes from "../../utils/CityCodeUtils";
import cityData from "../../assets/cities.json";
import "./index.css";
import WeatherModel from "../../models/Weather";
import { storageKey } from "../../constants/constant";
const WeatherDashboard = () => {
  const [Weather, setWeather] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const cityCodes = getCityCodes(cityData);
  const loadData = async () => {
    let ids = cityCodes.join(",");
    let cachedData=getCachedData(storageKey);
    if (cachedData.isFresh){
       setWeather(cachedData.data)
       setIsloading(false)
    }
     else {
      let weatherDataReceived = await fetchWeather(ids);
      if (Array.isArray(weatherDataReceived)) {
        const weatherData = weatherDataReceived.map(
          (item) => new WeatherModel(item)
        );
        if (weatherData) {
          setCachewithTime(storageKey,weatherData)
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

        <div className="addcitybar row ">
          <div className="input-container" >
            <input placeholder="Enter a city"/>
            <button>
              Add City
            </button>
          </div>
        </div>

        <div className="container flex-col">
          {Weather && Weather.map((city, index) => (
               <div className="card-wrapper"> 
                  <WeatherCard city={city} index={index} key={city.id} />
              </div>
          ))}
        </div>

      </div>
    </div>
  );
};
export default WeatherDashboard;
