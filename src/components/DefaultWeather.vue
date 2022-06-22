<template>
  <div class="card weather-now-card bg-primary">
    <div class="container weather-now">
      <div class="row">
        <div class="col d-flex flex-column align-items-center">
          <div class="row">
              <div class="today-date mt-2 mb-0">
                <h4>{{data.name}}, {{data.sys?.country}}</h4>
              </div>
          </div>
        </div>
      </div>
      <time-and-date></time-and-date>
      <div class="row">
        <div class="col d-flex flex-column align-items-center">
          <h1 class="temperature-now ml-3">
            {{Math.round(data.main?.temp)}}&deg;
          </h1>
        </div>
      </div>
      <div class="info mt-4">
        <div class="row weather-description" style="margin-right:.05rem;">
          <div class="d-flex justify-content-end">
            <h6>Humidity {{data.main?.humidity}}&nbsp;%</h6>
            <span class="material-icons-outlined md-14">water_drop</span>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Feels like  {{Math.round(data.main?.feels_like)}}&deg;</h6>
            <span class="material-icons-outlined md-14">landscape</span>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Max {{Math.round(data.main?.temp_max)}}&deg;</h6>
            <span class="material-icons-outlined md-14">arrow_upward</span>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Sunrise&nbsp;{{setSunrise()}}h.</h6>
            <span class="material-icons-outlined md-14">wb_twilight</span>
          </div>
        </div>
        <div class="row weather-description" style="margin-left:.05rem;">
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">compare_arrows</span>
            <h6>Press. {{data.main?.pressure}}&nbsp;hPa</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">cloud</span>
            <h6>Clouds {{data.clouds?.all}}&nbsp;%</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">arrow_downward</span>
            <h6>Min {{Math.round(data.main?.temp_min)}}&deg;</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <span class="material-icons-outlined md-14">nights_stay</span>
            <h6>Sunset&nbsp;{{setSunset()}}h.</h6>
          </div>
        </div>
      </div>
    </div>
    <h6 style="font-size:.75rem">Next Hours Forecast</h6>
    <div class="forecast-cards">
      <forecast-card 
        :tempAve="forecast.main.temp" 
        :tempMin="forecast.main.temp_min"
        :tempMax="forecast.main.temp_max"
        :day="forecast.dt"
        v-for="forecast in forecastData.list" v-bind:key="forecast.dt"
      ></forecast-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {weatherTypes} from '../types/weatherTypes';
import { getWeatherbyLocation } from '@/services/byLocationAPICall';
import ForecastCard from './ForecastCard.vue';
import {forecastTypes} from '@/types/forecastTypes';
import {getForecast} from '@/services/byForecastAPICall';
import TimeAndDate from './TimeAndDate.vue';

export default defineComponent({
  name: 'DefaultWeather',
  components: { 
    ForecastCard,
    TimeAndDate,
  },
  data() {
    return {
      latitude: 1,
      longitude: 1,
      data: {} as weatherTypes,
      date:'',
      hour:'',
      temperature: 1,
      temp_min:1,
      temp_max:1,
      forecastData: {} as forecastTypes,
    }
  },
  methods: {
    getGeolocalization(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.asignGeolocalization);
      } else {
        alert("The app requieres the Geolocation to continue");
      }
    },
    asignGeolocalization(position: any): void {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      this.latitude = lat;
      this.longitude = lng;
      this.searchWeatherbyLocation();
      this.searchForecast();
    },

    async searchWeatherbyLocation():Promise<void>{
      const value = await getWeatherbyLocation(this.latitude, this.longitude);
      this.data = value;
      this.temperature = value.main.temp;
      this.temp_min = value.main.temp_min;
      this.temp_max = value.main.temp_max;
    },
    
    async searchForecast():Promise<void>{
      const value = await getForecast(this.latitude, this.longitude);
      this.forecastData = value;
    },

    sunValues() : void {
      this.setSunrise();
      this.setSunset();
    },

    formatHours(timestamp: number){
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
    this.getGeolocalization();
    this.sunValues();
  },
  watch: {
    longitude: {
      immediate: true,
      handler: 'searchWeatherbyLocation',
    },
    latitude: {
      immediate: true,
      handler: 'searchWeatherbyLocation',
    },
  },
});
</script>

<style scoped>
.weather-now-card{
  width: 25rem;
  height: 33rem;
  color: #ffffff;
  font-size: 1rem;
  font-family: Poppins;
}

.weather-now{
  height: 20rem;
  height: 30rem;
  border-radius: 5%;
}

.weather-description{
  width: 15rem;
  font-weight: 500;
  font-size: .75rem;
}

.today-date{
  font-weight: 600;
}

.temperature-now{
  font-size: 8rem;
}

.forecast-cards{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.material-icons-outlined.md-18 { 
  font-size: 18px;
  margin-top: .1rem;
  margin-left: 0.75rem;
}

.material-icons-outlined.md-14 { 
  font-size: 14px;
  margin: 0rem 1rem 1rem 1rem;
}

.info{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}
</style>