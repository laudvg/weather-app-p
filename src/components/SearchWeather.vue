<template>
  <div class="card weather-now-card bg-primary">
    <div class="container weather-now">
      <div class="row">
        <div class="col d-flex flex-column align-items-center">
          <div class="row">
              <div class="today-date my-3">
                <h4>{{data.name}}, {{data.sys?.country}}</h4>
              </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex flex-column align-items-center">
          <h1 class="temperature-now ml-3 m-b0">
            {{Math.round(data.main?.temp)}}&deg;
          </h1>
          <h6>Feels like {{Math.round(data.main?.feels_like)}}&deg;</h6>
          <h6>Feels like</h6>
        </div>
      </div>
      <div class="row">
        <div class="today-date mb-2">
          <h4>Max {{Math.round(data.main?.temp_max)}}&deg; - Min {{Math.round(data.main?.temp_min)}}&deg;</h4>
        </div>
      </div>
      <div class="row weather-description">
        <div class="col">
          <div class="description d-flex justify-content-end">
            Pressure
          </div>
          <div class="description d-flex justify-content-end">
            Humidity
          </div>
          <div class="description d-flex justify-content-end">
            Clouds
          </div>
        </div>
        <div class="col">
          <div>|</div>
          <div>|</div>
          <div>|</div>
        </div>
        <div class="col">
          <div class="description">
            {{data.main?.pressure}}&nbsp;hPa 
          </div>
          <div class="description">
            {{data.main?.humidity}}&nbsp;%
          </div>
          <div class="description">
            {{data.clouds?.all}}&nbsp;%
          </div>
        </div>
      </div>
      <div class="row sunrise-sunset mt-2">
        <h5> sunrise
          Sunrise&nbsp;{{setSunrise()}}
        </h5>
        <h5> sunset
          Sunset&nbsp;{{setSunset()}}
        </h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {weatherTypes} from '../types/weatherTypes';
import { searchtWeather } from '@/services/searchCity';
import {getForecast} from '@/services/Forecast'
import {forecastTypes} from '@/types/forecastTypes'

export default defineComponent({
name: 'DefaultWeather',
  data() {
    return {
      latitude: 1,
      longitude: 1,
      data: {} as weatherTypes,
      date:'',
      hour:'',
      forecastData: {} as forecastTypes
    }
  },
  props: {
    cityQuery: {
      type: String,
      default: 'Berlin',
    },
  },
  methods: {
    async searchWeather():Promise<void>{
      console.log(this.cityQuery)
      const value = await searchtWeather(this.cityQuery);
      this.data = value;  
      // console.log("data", value);
    },
    
    async searchForecast():Promise<void>{
      console.log(this.latitude, this.longitude, 'onsearch')
      const value = await getForecast(this.latitude, this.longitude);
      this.forecastData = value;  
      console.log("data", this.data);
    },

    sunValues(){
      this.setSunrise();
      this.setSunset();
    },

    formatHours(timestamp: any){
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const formattedTime = hours + ':' + minutes.substr(-2);
      return formattedTime;
    },

    setSunrise(){
      const sunrise = this.data.sys?.sunrise;
      return this.formatHours(sunrise);
    },

    setSunset(){
      const sunset = this.data.sys?.sunset;
      return this.formatHours(sunset);
    },
  },
  created(){
    this.searchWeather();
  },
  watch: {
    cityQuery: {
      immediate: true,
      handler: 'searchWeather',
    },
  },
});
</script>

<style>
.weather-now-card{
  width: 25rem;
  height: 33rem;
  background-color: #47BFDF;
  color: #ffffff;
  font-size: 1rem;
  font-family: Poppins;
}

.weather-now{
  height: 20rem;
  height: 30rem;
  background-color:#ffffff82;
  border-radius: 5%;
  box-shadow: 2px 2px 5px #ffffff;
}

.weather-description{
  width: 15rem;
  font-weight: 500;
}

.today-date{
  font-weight: 600;
}

.temperature-now{
  font-size: 8rem;
  text-shadow: 2px 2px 10px #cac9c9;
}
</style>





<!-- <template>
  <div>
    <div>
      <b-row class="d-flex flex-column align-items-center my-5">
      <div class="d-flex flex-row align-items-center">
        <span class="material-icons-outlined">location_on</span>
        <b-form-input v-model="placeQuery" placeholder="Search for a city" @keypress="searchWeather"> Berlin
        </b-form-input>
        <b-button>
          <span class="material-icons-outlined">search</span>
        </b-button>
      </div>
    </b-row>
    </div>
    <b-card class="weather-now-card" v-if="weatherSearch.main">
      <div class="weather-now">
        <b-row>
          <b-col class="d-flex flex-column align-items-center">
            <b-row>
              <div class="today-date my-3">
                <h4>{{weatherSearch.name}}, {{weatherSearch.sys.country}}</h4>
              </div>
            </b-row>
            <b-row>
              <div class="today-date">
                {{hour}}
              </div>
            </b-row>
            <b-row>
              <div class="today-date mb-2">
                {{date}}
              </div>
            </b-row>
            <b-row>
              <b-col class="d-flex flex-column align-items-center">
                <h1 class="temperature-now ml-3 m-b0">
                  {{Math.round(weatherSearch.main.temp)}}&deg;
                </h1>
                <h6>Feels like {{Math.round(weatherSearch.main.feels_like)}}&deg;</h6>
              </b-col>
            </b-row>
            <b-row>
              <div class="today-date mb-2">
                <h4>Max {{Math.round(weatherSearch.main.temp_max)}}&deg; - Min {{Math.round(weatherSearch.main.temp_min)}}&deg;</h4>
              </div>
            </b-row>
            <b-row class="weather-description">
              <b-col cols="5">
                <div class="description d-flex justify-content-end">
                  Pressure
                </div>
                <div class="description d-flex justify-content-end">
                  Humidity
                </div>
                <div class="description d-flex justify-content-end">
                  Clouds
                </div>
              </b-col>
              <b-col  cols="1">
                <div>|</div>
                <div>|</div>
                <div>|</div>
              </b-col>
              <b-col  cols="5">
                <div class="description">
                  {{weatherSearch.main.pressure}} hPa
                </div>
                <div class="description">
                  {{weatherSearch.main.humidity}} %
                </div>
                <div class="description">
                  {{weatherSearch.clouds.all}} %
                </div>
              </b-col>
            </b-row>
            <b-row class="sunrise-sunset mt-2" cols="12">
              <b-col>
                Sunrise&nbsp;{{setSunrise()}}
              </b-col>
              <b-col> 
                Sunset&nbsp;{{setSunset()}}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const searchWeather = Vue.extend ({
  name: 'searchWeather',
  data() {
    return {
      placeQuery: '',
      urlbase:'https://api.openweathermap.org/data/2.5/',
      weatherSearch: '',
      date:'',
      hour:'',
    }
  },
  methods: {
    searchWeather(e : any){
      if(e.key == "Enter") {
        fetch(`${this.urlbase}weather?q=${this.placeQuery}&units=metric&APPID=${process.env.VUE_APP_OPEN_WEATHER_KEY}`)
        .then(res => {
          return res.json();
        }). then(this.setSearch);
      }
    },
    setSearch(results){
      this.weatherSearch = results;
      this.setDate();
    },

    setDate(){
      const dates = new Date();
      const currentHourr =  dates.getHours() + ':' + dates.getMinutes();
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateLocale = dates.toLocaleDateString("en-US", dateOptions);
      this.date = dateLocale;
      this.hour = currentHourr;
    },

    formatHours(timestamp: number){
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const formattedTime = hours + ':' + minutes.substr(-2);
      return formattedTime;
    },


    setSunrise(){
      const sunrise = this.weatherSearch.sys.sunrise;
      return this.formatHours(sunrise);
    },

    setSunset(){
      const sunset = this.weatherSearch.sys.sunset;
      return this.formatHours(sunset);
    },
  },
  created(){
  },
});
export default searchWeather;

</script>
<style>

.weather-now-card{
  width: 25rem;
  height: 33rem;
  background-color: #47BFDF;
  color: #ffffff;
  font-size: 1rem;
  font-family: Poppins;
}

.weather-now{
  height: 20rem;
  height: 30rem;
  background-color:#ffffff82;
  border-radius: 5%;
  box-shadow: 2px 2px 5px #ffffff;
}

.weather-description{
  width: 15rem;
  font-weight: 500;
}

.today-date{
  font-weight: 600;
}

.temperature-now{
  font-size: 8rem;
  text-shadow: 2px 2px 10px #cac9c9;
}
</style> -->