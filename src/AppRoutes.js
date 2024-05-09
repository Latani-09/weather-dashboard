import CityWeather from "./components/CityWeather/index";
import WeatherDashboard from "./components/WeatherDashboard/index";

const AppRoutes=[
    {index:true,
    element:<WeatherDashboard/>},
{
    path:'/cityWeather/:CityID',
    element:<CityWeather/>
}]
export default AppRoutes;