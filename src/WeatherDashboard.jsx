
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import {fetchWeather} from './services'

const WeatherDashboard=()=>{
  
  const [Weather,setWeather]=useState('');
const [isLoading,setIsloading]=useState(true);
/**
 * rgb(156, 58, 58)
 * rgb(222, 148, 78)
 * rgb(64, 182, 129)
 * rgb(98, 73, 204)
 * rgb(56, 142, 231)
 */
const colors=['rgb(156, 58, 58)','rgb(222, 148, 90)','rgb(64, 182, 129)','rgb(56, 110, 231)','rgb(98, 73, 204)']

 

 useEffect(()=>{
 
  const loadData=async()=>{
        const cityData=require('./cities.json');  //read json data from file
        const cityCodes=[];  //intialize
        cityData.List.forEach(city=>{cityCodes.push(city.CityCode)});
        let ids=cityCodes.join(',');
       let cachedData=localStorage.getItem('weatherData');
      // console.log('cached',cachedData);
       
         let jsonData=JSON.parse(cachedData);
         //console.log(jsonData,'expiry',parseInt(jsonData.cachedTime)+60,'current',Math.floor(new Date().getTime()/1000))\
         if (jsonData){
         console.log((Math.floor(new Date().getTime()/1000)-parseInt(jsonData.cachedTime))/60);}
         if (jsonData&&(parseInt(jsonData.cachedTime)+5*60)>Math.floor(new Date().getTime()/1000)){
           console.log('cached data found',jsonData)
           setWeather(jsonData.data);
           setIsloading(false);
         }
         else{

          let weatherData=await fetchWeather(ids);
          if (weatherData){
            localStorage.setItem('weatherData',JSON.stringify({cachedTime:(Math.floor(new Date().getTime() / 1000)).toString(),data:weatherData}))
            setWeather(weatherData);
            setIsloading(false);
          }
          }
        }
        loadData();
   }
,[])
 function formatTime(timeStamp){
      let  dateObj = new Date(timeStamp * 1000);

    // Get hours from the timestamp
    let hours = dateObj.getUTCHours();

    // Get minutes part from the timestamp
    let minutes = String(dateObj.getUTCMinutes()).padStart(2,'0');

    // Get seconds part from the timestamp
    let t =((Math.floor(hours/12)===1)?'pm':'am')//   am/pm)
      return String(hours%12).padStart(2,'0')+'.'+minutes+t; 
 }
  function getDateTime(timeStamp){
    let DateTime=new Date(timeStamp*1000);  
    let day= DateTime.toDateString().split(' ');  //date in (dd, month)
    let time=DateTime.toLocaleTimeString().split(':');  //get hour and min  format
    let [h,m,t]=[time[0]>12?time[0]-12:time[0],time[1],((Math.floor(time[0]/12)===1)?'pm':'am')]  //  time in  12h ( h,  min, am/pm)
    return h+'.'+m+t+' ,'+day[1]+' '+day[2];  
  }

  if (isLoading) return <div className="Loading">Loading...</div>;
  if (Weather===''){return null}
  return (
    <div>
      <div className=" container dashboard">
        <div className='row'>
        
      {Weather &&
        Weather.map((city, index) => (
    <div className='col-lg-5 col-md-5 col-sm-11 col-11  weathercard' style={{margin: '20px 20px',padding:'5px'}}>
    <div className='row' style={{ minHeight:'max-content', backgroundColor: `${colors[index % 5]}` ,position: 'relative' }}>
        <Link to={`cityWeather/${city.id}`} style={{ textDecoration: 'none', width: '100%', height: '100%' }}>
       <div style={{ width: '100%', height: '100%', backgroundImage: `url('./cardbg.png')`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div  className='row' style={{margin:'0px 0px 0px 0px',background: `linear-gradient(to top,${colors[index % 5]} 10%,rgba(255, 255, 255, 0.1) 90%)`, width: '100%', height: '100%'}}>
  
        <div className='col-md-7'>
          <div className='row weatherEntry' style={{ margin: '10px 0px 0px 0px' }}><h4>{city.name + ',' + city.sys.country}</h4></div>
          <div className='row weatherEntry'><p>{getDateTime(city.dt)}</p></div>
  
          <div className='row weatherEntry'>
  
            <div className='col-4'><img src={`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`} ></img></div>
            <div className='col-8'><h6>{city.weather[0].description}</h6></div>
          </div>
        </div>
        <div className='col-md-5'>
          <div className='row tempStyle' style={{font:'Times New Roman'}}><h1>{String(city.main.temp).split('.')[0] + '\u2103'}</h1></div>
  
        
      </div>
      

      </div>
      </div>

    </Link>
    </div>
    <div className="row" style={{backgroundColor:'rgba(5, 6, 66, 0.96)',color:"whitesmoke",padding:'10px',fontSize:'12px'}}>
              <div className='col-md-4 col-sm-4 ' style={{borderRight:'solid 1px white',textAlign:'left', display: 'table',  margin: '0 auto'  }}>
                <div className='row'>
                <div className='col-md-11 col-sm-11  ' style={{ }}>Pressure: {city.main.pressure} hPa</div>
                <div className='col-md-11 col-sm-11 '>Humidity: {city.main.humidity}%</div>
                <div className='col-md-11 col-sm-11 '>Visibility: {city.visibility}</div>
                </div>
              </div>
              <div className='col-md-4 col-sm-4'  style={{borderRight:'solid 2px white',}}>
                <span>&#x27B6;</span>    {/**&#x27A4; */}
                <p><span>{city.wind.speed}m/s</span>   <span>{city.wind.deg} deg</span></p>
              </div>
              <div className='col-md-4 col-sm-4' style={{textAlign:'right'}}>
                <div className='row m-1' >Sunrise : {formatTime(city.sys.sunrise+city.sys.timezone)}</div>
                <div className='row m-1'>Sunset : {formatTime(city.sys.sunset+city.sys.timezone)}</div>
                </div>
      </div>
  </div>
  
  
  
        ))}
       
        </div>
        </div>
 
        </div>)

}
export default WeatherDashboard;