import "./App.css";
import cloud from './cloud.png';
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={cloud} alt="clouds"/><span>Weather App</span>
      </div>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
