import logo from './logo.svg';
import './App.css';
import WeatherDashboard from './WeatherDashboard';
import CityWeather from './CityWeather';
import {  useState } from 'react';
import {Routes,Route} from 'react-router-dom';
import AppRoutes from './AppRoutes';
function App() {



  return (
    <div className="App">
      <Routes>
        {AppRoutes.map((route,index)=>{
          const {element,...rest}=route;
          return <Route key={index} {...rest} element={element}/>
        })
        }
      </Routes>

    </div>
  );
}

export default App;
