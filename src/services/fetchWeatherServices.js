const fetchWeather = async (ids) => {
  const apiKey = process.env.REACT_APP_WEATHERAPPID;
  const base_url = process.env.openWeatherDataURL;

  try {
    let url = `${base_url}?id=${ids}&units=metric&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    return data.list;
  } catch (e) {
    return e.message;
  }
};

const getCachedData = (key) => {
  const cacheExpirationTimeMin = process.env.cacheExpirationTimeMin;
  let cachedData = sessionStorage.getItem(key);
  let jsonData = JSON.parse(cachedData);
  if (jsonData &&
      Array.isArray(jsonData.data) &&
      parseInt(jsonData.cachedTime) + cacheExpirationTimeMin >
      Math.floor(new Date().getTime() / 1000)
  ) {
    return { isFresh: true, data: jsonData.data };
  } else return { isFresh: false };
};

const setCachewithTime = (key, data) => {
  sessionStorage.setItem(
    key,
    JSON.stringify({
      cachedTime: Math.floor(new Date().getTime()).toString(),
      data: data,
    })
  );
};
export { fetchWeather, getCachedData, setCachewithTime };
