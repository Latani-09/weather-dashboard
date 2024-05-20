import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
function App() {
  return (
    <div className="App">
      <h5 className="header">
        <img src='./icons/04d.png' alt="clouds"/>Weather App
      </h5>
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
