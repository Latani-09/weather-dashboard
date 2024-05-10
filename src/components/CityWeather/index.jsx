import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchWeather } from "../../services/services";
import { formatTime, getDateTime } from "../../utils/DateTimeHelper";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
export default function CityWeather() {
  const [cityWeatherData, setCityWeather] = useState();
  const [isLoading, setIsloading] = useState(true);
  const id = useParams();
  const loadCityData = async () => {
    let storageId = "weatherData" + id.CityID; //to store weather data for current city
    let jsonData = null;
    let cachedData = localStorage.getItem("weatherData"); //get data from cached list data
    let cachedcityData = localStorage.getItem(storageId); //get data from chacehd city data
    if (cachedcityData) {
      jsonData = JSON.parse(cachedcityData);
    } else if (cachedData) {
      jsonData = JSON.parse(cachedData);
    }

    //if cached data within 5min found then set with cached data;
    if (
      jsonData != null &&
      parseInt(jsonData.cachedTime) + 5 * 60 >
        Math.floor(new Date().getTime() / 1000)
    ) {
      jsonData.data.forEach((city) => {
        if (city.id === id.CityID) {
          setCityWeather(city);
          setIsloading(false);
        }
      });
    } else {
      localStorage.removeItem("weatherData");
      localStorage.removeItem(storageId);

      let cityWeatherData = await fetchWeather(id.CityID);
      if (cityWeatherData != null) {
        localStorage.setItem(
          storageId,
          JSON.stringify({
            cachedTime: Math.floor(new Date().getTime() / 1000).toString(),
            data: cityWeatherData,
          })
        );

        setCityWeather(cityWeatherData[0]);
        setIsloading(false);
      }
    }
  };
  useEffect(() => {
    loadCityData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className="container">
          <div className="row ">
            <div
              className="col sm-12 col-md-10 weather-view"
             
            >
              <Link to="/">
                <div className="row">
                  <button className="button-style"
                   
                  >
                    {" "}
                    &larr;
                  </button>
                </div>
              </Link>
              <div className="row">
                <h2>
                  {cityWeatherData.name + "," + cityWeatherData.sys.country}
                </h2>
              </div>
              <div className="row">
                <p>{getDateTime(cityWeatherData.dt)}</p>
              </div>

              <div className="row " >
                <div className="col-1"></div>
                <div className="col-5 " >
                  <div className="row ">
                    <div
                      className="col-12 desc-img-view"
                    
                    >
                      <img
                        src={`http://openweathermap.org/img/wn/${cityWeatherData.weather[0].icon}.png`}
                        alt="weather icon"
                      ></img>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 desc" >
                      <p>{cityWeatherData.weather[0].description}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="col-5 temp-view"
                 
                >
                  <h1>
                    {String(cityWeatherData.main.temp).split(".")[0] + "\u2103"}
                  </h1>
                  <div>
                    Temp min:
                    {String(cityWeatherData.main.temp_min).split(".")[0] +
                      "\u2103"}
                  </div>
                  <div>
                    Temp max:
                    {String(cityWeatherData.main.temp_max).split(".")[0] +
                      "\u2103"}
                  </div>
                </div>
                <div className="col-1"></div>
              </div>
              <div

              >
                <div
                  className="col-4 weather-grp2"
            
                >
                  <div>Pressure: {cityWeatherData.main.pressure} hPa</div>
                  <div>Humidity: {cityWeatherData.main.humidity}%</div>
                  <div>Visibility: {cityWeatherData.visibility}</div>
                </div>
                <div
                  className="col-4 weather-grp2"

                >
                  <span>&#x27B6;</span> {/**&#x27A4; */}
                  <p>
                    {cityWeatherData.wind.speed}m/s {cityWeatherData.wind.deg}{" "}
                    deg
                  </p>
                </div>
                <div className="col-4 sun-rise-set" >
                  <div>
                    Sunrise :{" "}
                    {formatTime(
                      cityWeatherData.sys.sunrise + cityWeatherData.sys.timezone
                    )}
                  </div>
                  <div>
                    Sunset :{" "}
                    {formatTime(
                      cityWeatherData.sys.sunset + cityWeatherData.sys.timezone
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </>
    );
  }
}
