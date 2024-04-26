import CityWeather from "./CityWeather";
import WeatherDashboard from "./WeatherDashboard";

const AppRoutes=[
    {index:true,
    element:<WeatherDashboard/>},
{
    path:'/cityWeather/:CityID',
    element:<CityWeather/>
}]
export default AppRoutes;