const getCityCodes = (cityData) => {
  const cityCodes = []; //intialize
  cityData.List.forEach((city) => {
    cityCodes.push(city.CityCode);
  });
  return cityCodes;
};
export default getCityCodes;
