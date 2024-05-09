const cityData = require("../assets/cities.json"); //read json data from file

const cityCodes = []; //intialize
cityData.List.forEach((city) => {
  cityCodes.push(city.CityCode);
});
const colors = [
    "rgb(156, 58, 58)",
    "rgb(222, 148, 90)",
    "rgb(64, 182, 129)",
    "rgb(56, 110, 231)",
    "rgb(98, 73, 204)",
  ];
export { cityCodes,colors};