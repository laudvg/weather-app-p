<template>
  <div class="card weather-now-card bg-primary">
    <div class="container weather-now">
      <div class="row">
        <div class="col d-flex flex-column align-items-center">
          <div class="row">
              <div class="today-date my-3">
                <h4>city and country</h4>
                <!-- <h4>{{weatherSearch.name}}, {{weatherSearch.sys.country}}</h4> -->
              </div>
          </div>
          <div class="row today-date">
                <h4>hour</h4>
                <!-- {{hour}} -->
          </div>
          <div class="row today-date">
                <h4>date</h4>
                 <!-- {{date}} -->
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col d-flex flex-column align-items-center">
          <h1 class="temperature-now ml-3 m-b0">
          30º
            <!-- {{Math.round(weatherSearch.main.temp)}}&deg; -->
          </h1>
          <!-- <h6>Feels like {{Math.round(weatherSearch.main.feels_like)}}&deg;</h6> -->
          <h6>Feels like</h6>
        </div>
      </div>
      <div class="row">
        <div class="today-date mb-2">
          <!-- <h4>Max {{Math.round(weatherSearch.main.temp_max)}}&deg; - Min {{Math.round(weatherSearch.main.temp_min)}}&deg;</h4> -->
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
            <!-- {{weatherSearch.main.pressure}} hPa --> 
            <!-- {{data.main.pressure}} hPa -->
          </div>
          <div class="description">
            <!-- {{weatherSearch.main.humidity}} % --> %
          </div>
          <div class="description">
            <!-- {{weatherSearch.clouds.all}} % --> %
          </div>
        </div>
      </div>
      <div class="row sunrise-sunset mt-2">
        <h5> sunrise
          <!-- Sunrise&nbsp;{{setSunrise()}} -->
        </h5>
        <h5> sunset
          <!-- Sunset&nbsp;{{setSunset()}} -->
        </h5>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import {weatherTypes} from '../types/weatherTypes';
import { defineComponent } from 'vue';
import { GeolocationTypes } from '../types/locationTypes';

export default defineComponent({
name: 'DefaultWeather',
  data() {
    return {
      coords: {} as GeolocationTypes,
      latitude: '',
      longitude: '',
    }
  },
  methods: {
    getGeolocalization(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.asignGeolocalization);
      } else {
        console.log("Cant get Geolocalization");
      }
    },
    asignGeolocalization(position: any): void {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      this.latitude = lat;
      this.longitude = lng;
    },
    

  },
  created(){
    this.getGeolocalization();
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