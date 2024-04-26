
const  fetchWeather=async(ids)=>{
     
  
        try{
            console.log('fetching weather data');
    let url=`https://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=61513b8d8615d88c740dc427bb4d3c28`
    let response=await fetch(url);
    let data=await response.json();
    return data.list;
  
        }
  catch(e){
    console.log(e.message)
    return e.message;
  }
  finally{

  }
}

const  fetchCityWeather=async(id)=>{
    try{
        let url=`https://api.openweathermap.org/data/2.5/group?id=${id}&units=metric&appid=61513b8d8615d88c740dc427bb4d3c28`
        let response=await fetch(url)
        let data=await response.json();
        console.log('city weather data fetched',id,data)
        debugger
        return data.list;
            }
      catch(e){
        console.log('error fetching data',e.message)
      }
      finally{

      }
    }
export {fetchWeather,fetchCityWeather};

