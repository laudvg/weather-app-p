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
          <h1 class="temperature-now ml-3">
            {{Math.round(data.main?.temp)}}&deg;
          </h1>
        </div>
      </div>
      <div class="info" style="padding-right:.75rem;">
        <div class="row weather-description" style="margin-right:.2rem;">
          <div class="d-flex justify-content-end">
            <h6>Humidity <span class="material-icons-outlined md-14">water_drop</span>{{data.main?.humidity}}&nbsp;%</h6>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Feels like<span class="material-icons-outlined md-14">landscape</span>{{Math.round(data.main?.feels_like)}}&deg;</h6>
          </div>
          <div class="d-flex justify-content-end">
            <h6>Max<span class="material-icons-outlined md-14">arrow_upward</span>{{Math.round(data.main?.temp_max)}}&deg;</h6>
          </div>
        </div>
        <div class="row weather-description">
          <div class="d-flex justify-content-beggining">
            <h6>Press.<span class="material-icons-outlined md-14">compare_arrows</span>{{data.main?.pressure}}&nbsp;hPa</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <h6>Clouds<span class="material-icons-outlined md-14">cloud</span>{{data.clouds?.all}}&nbsp;%</h6>
          </div>
          <div class="d-flex justify-content-beggining">
            <h6>Min<span class="material-icons-outlined md-14">arrow_downward</span>{{Math.round(data.main?.temp_min)}}&deg;</h6>
          </div>
        </div>
      </div>
      <div class="sunrise-sunset mt-2">
        <h5>
        <span class="material-icons-outlined md-18">wb_twilight</span>
          Sunrise&nbsp;{{setSunrise()}} h.
        </h5>
        <h5>
        <span class="material-icons-outlined md-18">nights_stay</span>        
          Sunset&nbsp;{{setSunset()}} h.
        </h5>
      </div>
    </div>
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
import { searchtWeather } from '@/services/bySearchAPICall';
import ForecastCard from './ForecastCard.vue';
import {forecastTypes} from '@/types/forecastTypes';
import {getForecast} from '@/services/byForecastAPICall'

export default defineComponent({
name: 'DefaultWeather',
  components: { 
    ForecastCard 
  },
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
      const value = await searchtWeather(this.cityQuery);
      this.data = value;
      this.searchForecast();
    },
    
    async searchForecast():Promise<void>{
      const value = await getForecast(this.latitude, this.longitude);
      this.forecastData = value;
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
    this.sunValues();
  },
  watch: {
    cityQuery: {
      immediate: true,
      handler: 'searchWeather',
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

.sunrise-sunset{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: baseline;
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
  font-size: .75rem;
}
</style>