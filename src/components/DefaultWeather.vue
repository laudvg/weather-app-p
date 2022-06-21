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
          <div class="row today-date">
              <h4>{{hour}}</h4>
          </div>
          <div class="row today-date">
              <h4>{{date}}</h4>
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
import {weatherTypes} from '../types/weatherTypes';
import { defineComponent } from 'vue';
import { getWeatherbyLocation } from '@/services/apiCalls';

export default defineComponent({
name: 'DefaultWeather',
  data() {
    return {
      latitude: 0,
      longitude: 0,
      data: {} as weatherTypes,
      date:'',
      hour:'',
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
    },

    async searchWeatherbyLocation():Promise<void>{
      console.log(this.latitude, this.longitude)
      const value = await getWeatherbyLocation(this.latitude, this.longitude);
      this.data = value;  
      // console.log("data", value);
    },
    
    addPlaceInfo(){
      this.setDate();
      this.setSunrise();
      this.setSunset();
    },

    setDate(){
      const dates = new Date();
      const currentHourr =  dates.getHours() + ':' + dates.getMinutes();
      const dateOptions: object = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const dateLocale = dates.toLocaleDateString("en-US", dateOptions);
      this.date = dateLocale;
      this.hour = currentHourr;
      console.log(this.date, this.hour);
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
    this.getGeolocalization();
    this.addPlaceInfo();
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