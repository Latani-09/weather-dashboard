const fetchWeather = async (ids) => {
  const apiKey = process.env.REACT_APP_WEATHERAPPID;
  console.log(apiKey);
  
  try {

    let url = `https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    return data.list;
  } catch (e) {
    return e.message;
  } finally {
  }
};

export { fetchWeather };
