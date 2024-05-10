import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchWeather } from "../../services/fetchWeatherServices";
import WeatherModel from "../../models/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  cacheExpirationTimeMin,
  storageKey,
  openWeatherIconURL,
} from "../../constants/constant";
export default function CityWeather() {
  const [cityWeatherData, setCityWeather] = useState();
  const [isLoading, setIsloading] = useState(true);
  const id = useParams();
  const loadCityData = async (id) => {
    const storageId_city = storageKey + id.CityID;
    const cachedListData = JSON.parse(localStorage.getItem(storageKey));
    const cachedCityData = JSON.parse(localStorage.getItem(storageId_city));

    if (cachedCityData && isFreshData(cachedCityData)) {
      setCityWeather(cachedCityData.data);
      setIsloading(false);
      return;
    } else if (cachedListData && isFreshData(cachedListData)) {
      const cityData = cachedListData.data.find(
        (city) => city.id.toString() === id.CityID
      );
      if (cityData) {
        setCityWeather(cityData);
        setIsloading(false);
        return;
      }
    }

    try {
      const cityWeatherDataReceived = await fetchWeather(id.CityID);
      const weatherData = new WeatherModel(cityWeatherDataReceived[0]);
      if (weatherData) {
        localStorage.setItem(
          storageId_city,
          JSON.stringify({
            cachedTime: Math.floor(new Date().getTime() / 1000).toString(),
            data: weatherData,
          })
        );
        setCityWeather(weatherData);
        setIsloading(false);
      }
    } catch (error) {
      console.error("Error loading city data:", error);
      // Handle error appropriately (e.g., display error message to the user)
    }
  };

  const isFreshData = (data) => {
    return (
      parseInt(data.cachedTime) + cacheExpirationTimeMin >
      Math.floor(new Date().getTime() / 1000)
    );
  };
  useEffect(() => {
    loadCityData(id);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="container">
          <div className="row ">
            <div className="col sm-12 col-md-10 weather-view">
              <Link to="/">
                <div className="row  weather-main ">
                  <button className="button-style"> &larr;</button>
                </div>
              </Link>
              <div className="row  weather-main ">
                <h2>{cityWeatherData.name + "," + cityWeatherData.country}</h2>
              </div>
              <div className="row  weather-main ">
                <p>{cityWeatherData.time}</p>
              </div>

              <div className="row  weather-main  ">
                <div className="col-1"></div>
                <div className="col-5 ">
                  <div className="row ">
                    <div className="col-12 desc-img-view">
                      <img
                        src={
                          openWeatherIconURL +
                          cityWeatherData.weatherIcon +
                          ".png"
                        }
                        alt="weather icon"
                      ></img>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 desc">
                      <p>{cityWeatherData.description}</p>
                    </div>
                  </div>
                </div>

                <div className="col-5 temp-view">
                  <h1>{cityWeatherData.temperature}</h1>
                  <div>
                    Temp min:
                    {cityWeatherData.temp_min + "\u2103"}
                  </div>
                  <div>
                    Temp max:
                    {cityWeatherData.temp_max + "\u2103"}
                  </div>
                </div>
                <div className="col-1"></div>
              </div>
              <div className="row weather-sub ">
                <div className="col-md-4 col-sm-4  weather-grp2">
                  <div>Pressure: {cityWeatherData.pressure} hPa</div>
                  <div>Humidity: {cityWeatherData.humidity}%</div>
                  <div>Visibility: {cityWeatherData.visibility}</div>
                </div>
                <div className="col-md-4 col-sm-4  weather-grp2">
                  <span>&#x27B6;</span> {/**&#x27A4; */}
                  <p>
                    {cityWeatherData.windSpeed}m/s{" "}
                    {cityWeatherData.windDirection} deg
                  </p>
                </div>
                <div className="col-md-4 col-sm-4 sun-rise-set">
                  <div>Sunrise : {cityWeatherData.sunrise}</div>
                  <div>Sunset : {cityWeatherData.sunset}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
