import useSWR from 'swr';
import 'bootstrap/dist/css/bootstrap.min.css';
const jsonData=require('./cities.json');  //read json data from file
const cityCodes=[];  //intialize
jsonData.List.forEach(city=>{cityCodes.push(city.CityCode)});
let id=cityCodes.join(',');
const fetcher=(...args)=>fetch(...args).then(res=>res.json());
const WeatherDashboard=()=>{
    const {
        data:weather,
        error,
        isValidating
    }=useSWR(`https://api.openweathermap.org/data/2.5/group?id=${id}&units=metric&appid=61513b8d8615d88c740dc427bb4d3c28`,fetcher);
      // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;
  console.log(weather);

  function getDateTime(timeStamp){
    let DateTime=new Date(timeStamp*1000);
    let day= DateTime.toDateString().split(' ');
    let time=DateTime.toLocaleTimeString().split(':');

    let [h,m,t]=[time[0]%12,time[1],((Math.floor(time[0]/12)==1)?'pm':'am')]
    return h+'.'+m+t+' ,'+day[1]+' '+day[2];
  }
  return (
    <div>
      <div>
      <div class="row">
   
      {weather &&
        weather.list.map((city, index) => (
          <div class="col-sm-6">  
          <ul>
         <li>{city.name}</li>
         <li>{city.weather[0].description}</li>
         <li>{city.main.temp+'\u2103'}</li>
         <li>{getDateTime(city.dt)}</li>
         
         </ul>
         </div>
        ))}
        </div>
        </div>
    </div>)

}
export default WeatherDashboard;