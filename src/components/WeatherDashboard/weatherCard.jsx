import { Link } from "react-router-dom";
import "./index.css";
import { OpenWeatherIconURL } from "../../constants/constant";


const WeatherCard = ({ city, index }) => {
  const colorIndex = (index % 5) + 1;
  return (
    <>
      <div className="card-wrapper">
        <div>
          <div className={`row card-frame bg-color-${colorIndex}`}>
            <Link
              to={`cityWeather/${city.id}`}
              state={{ color: `${colorIndex}` }}
            >
              <div className="card-main">
                <div className="row card-close">
                  <div>
                    <img
                      src="../close.png"
                      alt="close"
                      width="10px"
                      height="10px"
                    />
                  </div>
                </div>
                <div className={`row  gradient-color-${colorIndex}`}>
                  <div className="col-md-7 weather-entry">
                    <div className="row">
                      <h4>{city.name + "," + city.country}</h4>
                    </div>
                    <div className="row ">
                      <p>{city.time}</p>
                    </div>
                    <div className="row ">
                      <div>
                        <img
                          src={`${OpenWeatherIconURL}${city.weatherIcon}.png`}
                          alt="weather description"
                        ></img>
                        <span>{city.description}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 card-temp">
                    <h1>{city.temperature + "\u2103"}</h1>
                    <div>
                      Temp min:
                      <span> {city.temp_min + "\u2103"}</span>
                    </div>
                    <div>
                      Temp max:
                      <span> {city.temp_max + "\u2103"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="row weather-sub ">
            <div className=" col-sm-4 sub-grp-1">
              <div>
                <p>Pressure: {city.pressure} hPa</p>
                <p>Humidity: {city.humidity}%</p>
                <p>Visibility: {city.visibility}</p>
              </div>
            </div>

            <div className=" col-sm-4 wind-style">
              <div>
                <img
                  src="../direction2.png"
                  alt="arrow symbol"
                  height="40px"
                  width="auto"
                />
                <p>
                  <span>{city.windSpeed}m/s</span>{" "}
                  <span>{city.direction} deg</span>
                </p>
              </div>
            </div>

            <div className="col-sm-4 sun-rise-set flex-col">
              <div>
                <p>Sunrise: {city.sunrise}</p>
                <p>Sunset: {city.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
