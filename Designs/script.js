//DOM elements
const currentCity = document.getElementById("currentCity"); // goes into the html
const currentWeather = document.getElementById ("currentWeather"); // goes into the html
const currentTemp = document.getElementById ("currentTemp"); // goes into the html
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
//const sun = document.getElementById("sun");
const weatherDescription = document.getElementById('weatherDescription')
//const button = document.getElementById('button')
//const searchBar = document.getElementById('searchBar');
const weeklyForecast =document.getElementById('weeklyForecast');
//const five = document.getElementById('five')
const currentForecast=document.getElementById('currentForecast') //if else
//const currentIcon= document.getElementById('currentIcon')


let apiKey = "366992a63dda0e641051649e46de5fed";

// const weatherIcon = item.weather[0].icon

fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&appid=366992a63dda0e641051649e46de5fed")
.then((response) => {
    return response.json()
})
.then((data) => {
    console.log(data);
    currentCity.innerHTML = data.name; 
    currentTemp.innerHTML = `${data.main.temp.toFixed()}` + "°C";  //rounding" remove decimals
    currentWeather.innerHTML = data.weather[0].main;
    weatherDescription.innerHTML = data.weather[0].description;
    
   const rise = new Date(data.sys.sunrise * 1000);
   const up = rise.toLocaleString([], {
     timeStyle: "short",
   });
   const set = new Date(data.sys.sunset * 1000);
   const down = set.toLocaleString([], {
     timeStyle: "short",
   });
   sunrise.innerHTML = `Sunrise: ${up} `;
   sunset.innerHTML = `Sunset: ${down} `;
        console.log(`${up} ${down}`);
      
const fiveDayForecast = () => {

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&appid=366992a63dda0e641051649e46de5fed") //forecast
    .then((response) => {
      return response.json();
    })    
    .then ((data) => {
      const filteredForecast = data.list.filter((item) => item.dt_txt.includes("00:00:00"));//data: the the API response. List: the conditions// return 5 days forecast
  
      filteredForecast.forEach((item) => {
        const date = new Date(item.dt * 1000); 
        const weatherTemperature = item.main.temp.toFixed(1)
        const weatherIcon = item.weather[0].icon 
        const weatherDescription = item.weather[0].description
  
      weeklyForecast.innerHTML += `
        <div class="day-design">
          <p> ${new Date(date).toLocaleDateString("en-US", { weekday: "long", })} </p>
          <img class p ="icons" src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">  
          <p> ${weatherTemperature}° </p> 
          </div>
      `;
    }); 
    console.log(filteredForecast);
  }); 
}
  fiveDayForecast()
})