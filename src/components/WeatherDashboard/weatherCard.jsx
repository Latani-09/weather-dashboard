import { Link } from "react-router-dom";
import { formatTime, getDateTime } from "../../utils/DateTimeHelper";
import { colors } from "../../constants/constant";
import './index.css'
const WeatherCard = ({ city, index }) => {

  
  return (
    <>
      <div
        className="col-lg-5 col-md-5 col-sm-11 col-11  weather-card"

      >
        <div
          className="row card-frame"
          style={{

            backgroundColor: `${colors[index % 5]}`,

          }}
        >
          <Link
            to={`cityWeather/${city.id}`}

          >
            <div className="card-main"

            >
              <div
                className="row card-cover"
                style={{background:`linear-gradient( ${colors[index%5]} 10%,rgba(255, 255, 255, 0.1) 90%)`}}
              >
                <div className="col-md-7">
                  <div
                    className="row weatherEntry"
                 
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
                    className="row card-temp"
                    
                  >
                    <h1>{String(city.main.temp).split(".")[0] + "\u2103"}</h1>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div
          className="row weather-sub "

        >
          <div
            className="col-md-4 col-sm-4 sub-grp-1 "

          >
            <div className="row">
              <div className="col-md-11 col-sm-11  " >
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
            className="col-md-4 col-sm-4 wind-style"
          >
            <span>&#x27B6;</span> {/**&#x27A4; */}
            <p>
              <span>{city.wind.speed}m/s</span> <span>{city.wind.deg} deg</span>
            </p>
          </div>
          <div className="col-md-4 col-sm-4 sun-rise-set" >
            <div className="row m-1">
              Sunrise : {formatTime(city.sys.sunrise + city.sys.timezone)}
            </div>
            <div className="row m-1">
              Sunset : {formatTime(city.sys.sunset + city.sys.timezone)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;