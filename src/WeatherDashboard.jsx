import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWeather } from "./services";
import {formatTime,getDateTime} from  './DateTimeHelper'

const WeatherDashboard = () => {
  const [Weather, setWeather] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const colors = [
    "rgb(156, 58, 58)",
    "rgb(222, 148, 90)",
    "rgb(64, 182, 129)",
    "rgb(56, 110, 231)",
    "rgb(98, 73, 204)",
  ];

  const loadData = async () => {
    const cityData = require("./cities.json"); //read json data from file
    const cityCodes = []; //intialize
    cityData.List.forEach((city) => {
      cityCodes.push(city.CityCode);
    });
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
              <div
                className="col-lg-5 col-md-5 col-sm-11 col-11  weathercard"
                style={{ margin: "20px 20px", padding: "5px" }}
              >
                <div
                  className="row"
                  style={{
                    minHeight: "max-content",
                    backgroundColor: `${colors[index % 5]}`,
                    position: "relative",
                  }}
                >
                  <Link
                    to={`cityWeather/${city.id}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url('./cardbg.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div
                        className="row"
                        style={{
                          margin: "0px 0px 0px 0px",
                          background: `linear-gradient(to top,${
                            colors[index % 5]
                          } 10%,rgba(255, 255, 255, 0.1) 90%)`,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div className="col-md-7">
                          <div
                            className="row weatherEntry"
                            style={{ margin: "10px 0px 0px 0px" }}
                          >
                            <h4>{city.name + "," + city.sys.country}</h4>
                          </div>
                          <div className="row weatherEntry">
                            <p>{getDateTime(city.dt)}</p>
                          </div>

                          <div className="row weatherEntry">
                            <div className="col-4">
                              <img
                                src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`}
                                alt="weather description"
                              ></img>
                            </div>
                            <div className="col-8">
                              <h6>{city.weather[0].description}</h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div
                            className="row tempStyle"
                            style={{ font: "Times New Roman" }}
                          >
                            <h1>
                              {String(city.main.temp).split(".")[0] + "\u2103"}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div
                  className="row"
                  style={{
                    backgroundColor: "rgba(5, 6, 66, 0.96)",
                    color: "whitesmoke",
                    padding: "10px",
                    fontSize: "12px",
                  }}
                >
                  <div
                    className="col-md-4 col-sm-4 "
                    style={{
                      borderRight: "solid 1px white",
                      textAlign: "left",
                      display: "table",
                      margin: "0 auto",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-11 col-sm-11  " style={{}}>
                        Pressure: {city.main.pressure} hPa
                      </div>
                      <div className="col-md-11 col-sm-11 ">
                        Humidity: {city.main.humidity}%
                      </div>
                      <div className="col-md-11 col-sm-11 ">
                        Visibility: {city.visibility}
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-4 col-sm-4"
                    style={{ borderRight: "solid 2px white" }}
                  >
                    <span>&#x27B6;</span> {/**&#x27A4; */}
                    <p>
                      <span>{city.wind.speed}m/s</span>{" "}
                      <span>{city.wind.deg} deg</span>
                    </p>
                  </div>
                  <div
                    className="col-md-4 col-sm-4"
                    style={{ textAlign: "right" }}
                  >
                    <div className="row m-1">
                      Sunrise :{" "}
                      {formatTime(city.sys.sunrise + city.sys.timezone)}
                    </div>
                    <div className="row m-1">
                      Sunset : {formatTime(city.sys.sunset + city.sys.timezone)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default WeatherDashboard;
