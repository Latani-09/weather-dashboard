import { units,openWeatherDataURL } from "../constants/constant";
const fetchWeather = async (ids) => {
  const apiKey = process.env.REACT_APP_WEATHERAPPID;

  try {

    let url = `${openWeatherDataURL}?id=${ids}&units=${units}&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    return data.list;
  } catch (e) {
    return e.message;
  } 
};

export { fetchWeather };
