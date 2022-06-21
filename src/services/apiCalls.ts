import {weatherTypes} from "../types/weatherTypes"

export const getWeatherbyLocation = async (lat: number, lon: number): Promise <weatherTypes> => 
  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.VUE_APP_OPEN_WEATHER_KEY}`)
  .then(res => {
    return res.json();
  })
 