import {
  OpenWeatherAPIURL,
  cacheExpirationTimeSec,
} from "../constants/constant";

const fetchWeather = async (ids) => {
  const API_Key = process.env.REACT_APP_WEATHERAPPID;
  const API_URL = OpenWeatherAPIURL;

  try {
    let url = `${API_URL}?id=${ids}&units=metric&appid=${API_Key}`;
    let response = await fetch(url);
    let data = await response.json();
    return data.list;
  } catch (e) {
    return e.message;
  }
};

const getCachedData = (key) => {
  let cachedData = sessionStorage.getItem(key);
  let jsonData = JSON.parse(cachedData);
  if (
    jsonData &&
    Array.isArray(jsonData.data) &&
    parseInt(jsonData.cachedTime) + cacheExpirationTimeSec >
      Math.floor(new Date().getTime() / 1000)
  ) {
    return { isFresh: true, data: jsonData.data };
  } else {
    return { isFresh: false };
  }
};

const setCachewithTime = (key, data) => {
  sessionStorage.setItem(
    key,
    JSON.stringify({
      cachedTime: Math.floor(new Date().getTime() / 1000).toString(),
      data: data,
    })
  );
};
export { fetchWeather, getCachedData, setCachewithTime };
