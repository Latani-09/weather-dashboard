import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
export default function CityWeather(){
const id=useParams();
console.log(id.CityID)
const [cityWeatherData,setCityWeather]=useState();
const [isLoading,setIsloading]=useState(true);
let storageId='weatherData'+id.CityID;
 useEffect(()=>{
 
   async function fetchWeather(){
       let jsonData=null;
       let cachedData=localStorage.getItem('weatherData');
       let cachedcityData=localStorage.getItem(storageId);
      // console.log('cached',cachedData);
      if (cachedcityData){
         jsonData=JSON.parse(cachedcityData);
      } 
      else if (cachedData){
          jsonData=JSON.parse(cachedData);
        }
         console.log('jsonData',jsonData)
         //console.log(jsonData,'expiry',parseInt(jsonData.cachedTime)+60,'current',Math.floor(new Date().getTime()/1000))\
        // console.log('time',Math.floor(new Date().getTime()/1000),parseInt(jsonData.cachedTime)+5*60);
         if ((jsonData!=null)&&(parseInt(jsonData.cachedTime)+5*60)>Math.floor(new Date().getTime()/1000)){
           console.log('cached data found',jsonData);
           jsonData.data.forEach(city=>{if(city.id=id.CityID){
           setCityWeather(city)}});
           setIsloading(false)

         }

         else{

            localStorage.removeItem('weatherData')
           try{
       let url=`https://api.openweathermap.org/data/2.5/group?id=${id.CityID}&units=metric&appid=61513b8d8615d88c740dc427bb4d3c28`
       let response=await fetch(url)
       let data=await response.json();
    
       localStorage.setItem(storageId,JSON.stringify({cachedTime:(Math.floor(new Date().getTime() / 1000)).toString(),data:data.list}))
       setCityWeather(data.list[0]);
       setIsloading(false)
           }
     catch(e){
       console.log('error fetching data',e.message)
     }
     finally{
 console.log(cityWeatherData);
     }
   }
   }
   fetchWeather();
 },[])
  function getDateTime(timeStamp){
    let DateTime=new Date(timeStamp);  
    let day= DateTime.toDateString().split(' ');  //date in (dd, month)
    let time=DateTime.toLocaleTimeString().split(':');  //get hour and min  format
    let [h,m,t]=[time[0]>12?time[0]-12:time[0],time[1],((Math.floor(time[0]/12)===1)?'pm':'am')]  //  time in  12h ( h,  min, am/pm)
    return h+'.'+m+t+' ,'+day[1]+' '+day[2];  
  }
  function getTime(timeStamp){
   let  dateObj = new Date(timeStamp * 1000);

// Get hours from the timestamp
let hours = dateObj.getUTCHours();

// Get minutes part from the timestamp
let minutes = String(dateObj.getUTCMinutes()).padStart(2,'0');

// Get seconds part from the timestamp
let t =((Math.floor(hours/12)===1)?'pm':'am')//   am/pm)
    return String(hours%12).padStart(2,'0')+'.'+minutes+t; 
  }

    console.log('city weather ',cityWeatherData)
    if (isLoading){return <div>Loading</div>}
    return <>
    <div className="container">
        <div className="row"   style={{color:'white',marginTop:'50px'}}><span><strong>Weather App</strong></span></div>
        <div className="row">
           
 
            <div className="col sm-12 col-md-10 weather-card" style={{backgroundColor:'rgb(56, 142, 231)',color:'white'}} >
              
            <div className='row'><h2>{cityWeatherData.name+','+cityWeatherData.sys.country}</h2></div>
             <div className='row'><p>{getDateTime(cityWeatherData.dt)}</p></div>

              <div className='row '>
                <div className="col-1"></div>
                <div className="col-5" style={{margin:'5px'}}>
                  <div className="row " ><div className='col-12' style={{height:'auto',width:'100%'}}><img src={`http://openweathermap.org/img/wn/${cityWeatherData.weather[0].icon}.png`} style={{width:'auto'}}></img></div></div>
             <div className="row"><div className='col-12' style={{width:'100%'}}><p>{cityWeatherData.weather[0].description}</p></div></div>
             </div>
             
             <div className='col-5' style={{marginLeft:'5px',borderLeft:'solid 1px white'}}>
             <h1>{String(cityWeatherData.main.temp).split('.')[0]+'\u2103'}</h1>
             <div>Temp min:{String(cityWeatherData.main.temp_min).split('.')[0]+'\u2103'}</div>
             <div>Temp max:{String(cityWeatherData.main.temp_max).split('.')[0]+'\u2103'}</div>
             </div>
             <div className="col-1"></div>
             </div>
             <div className="row" style={{backgroundColor:'rgba(0,0,0,0.8)',color:"whitesmoke",padding:'30px'}}>
              <div className='col-4' style={{borderRight:'solid 1px white',textAlign:'left'}}>
                <div>Pressure: {cityWeatherData.main.pressure} hPa</div>
                <div>Humidity: {cityWeatherData.main.humidity}%</div>
                <div>Visibility: {cityWeatherData.visibility}</div>
              </div>
              <div className='col-4'  style={{borderRight:'solid 2px white'}}>
                <span>&#x27B6;</span>    {/**&#x27A4; */}
                <p>{cityWeatherData.wind.speed}m/s   {cityWeatherData.wind.deg} deg</p>
              </div>
              <div className='col-4' style={{textAlign:'right'}}>
                <div >Sunrise : {getTime(cityWeatherData.sys.sunrise+cityWeatherData.sys.timezone)}</div>
                <div>Sunset : {getTime(cityWeatherData.sys.sunset+cityWeatherData.sys.timezone)}</div>
                </div>
             </div>
             </div>
        <div className="col-md-1"></div>         
            
        </div>
    
        </div></>

}