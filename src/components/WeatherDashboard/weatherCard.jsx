import { Link } from "react-router-dom";
import { colors } from "../../constants/constant";
import "./index.css";

const WeatherCard = ({ city, index }) => {

  return (
    <>
      <div className="col-lg-5 col-md-5 col-sm-11 col-11  weather-card">
        <div className={`row card-frame bg-color-${(index % 5) + 1}`}>
          <Link to={`cityWeather/${city.id}`}>
            <div className="card-main">
              <div
                className={`row card-cover gradient-color-${(index % 5) + 1}`}
              >
                <div className="col-md-7">
                  <div className="row weather-entry">
                    <h4>{city.name + "," + city.country}</h4>
                  </div>
                  <div className="row weather-entry">
                    <p>{city.time}</p>
                  </div>

                  <div className="row weather-desc">
                    <div className="col-2"></div>
                    <div className="col-4">
                      <img
                        src={`http://openweathermap.org/img/wn/${city.weatherIcon}.png`}
                        alt="weather description"
                      ></img>
                    </div>
                    <div className="col-6">
                      <h6>{city.description}</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="row card-temp">
                    <h1>{String(city.temperature) + "\u2103"}</h1>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="row weather-sub ">
          <div className="col-md-4 col-sm-4 sub-grp-1 ">
            <div className="row">
              <div className="col-md-11 col-sm-11  ">
                Pressure: {city.pressure} hPa
              </div>
              <div className="col-md-11 col-sm-11 ">
                Humidity: {city.humidity}%
              </div>
              <div className="col-md-11 col-sm-11 ">
                Visibility: {city.visibility}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 wind-style">
            <span>&#x27B6;</span> {/**&#x27A4; */}
            <p>
              <span>{city.windSpeed}m/s</span> <span>{city.direction} deg</span>
            </p>
          </div>
          <div className="col-md-4 col-sm-4 sun-rise-set">
            <div className="row m-1">Sunrise : {city.sunrise}</div>
            <div className="row m-1">Sunset : {city.sunset}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
