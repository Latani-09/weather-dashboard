import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchWeather } from "../../services/weatherService";
import WeatherModel from "../../models/Weather";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom/dist";
import "./index.css";
import { OpenWeatherIconURL } from "../../constants/constant";
export default function CityWeather() {
  const [cityWeatherData, setCityWeather] = useState();
  const [isLoading, setIsloading] = useState(true);
  const isDevelopmentRun =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  const isMountedRef = useRef(!isDevelopmentRun);

  // get bg-color from link in  weather Card
  const location = useLocation();
  const { color } = location.state;
  const id = useParams();

  const loadCityData = async (id) => {
    try {
      const cityWeatherDataReceived = await fetchWeather(id.CityID);
      const weatherData = new WeatherModel(cityWeatherDataReceived[0]);
      if (weatherData) {
        setCityWeather(weatherData);
        setIsloading(false);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return undefined;
    }
    loadCityData(id);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="container">
          <div className="row city-container">
            <div
              className={`col sm-12 col-md-10 weather-view bg-color-${color} `}
            >
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
                          OpenWeatherIconURL +
                          cityWeatherData.weatherIcon +
                          ".png"
                        }
                        alt="weather icon"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 desc">
                      <p>{cityWeatherData.description}</p>
                    </div>
                  </div>
                </div>

                <div className="col-5 temp-view">
                  <h1>{cityWeatherData.temperature + "\u2103"}</h1>
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
                <div>
                <img
                  src="../direction2.png"
                  alt="arrow symbol"
                  height="40px"
                  width="auto"
                />
                  <p>
                    {cityWeatherData.windSpeed}m/s{" "}
                    {cityWeatherData.windDirection} deg
                  </p>
                  </div>
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
