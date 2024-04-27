
import './App.css';
import {Routes,Route} from 'react-router-dom';
import AppRoutes from './AppRoutes';
function App() {



  return (
    <div className="App">
      <h5 style={{color:"white", marginTop:'30px'}}><img  src='./icons/04d.png' alt='clouds' ></img>Weather App</h5>
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
