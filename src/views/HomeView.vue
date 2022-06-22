<template>
  <div class="home">
    <input-search-weather :getCity="getNewCity" ></input-search-weather>
    <weather-card :cityQuery="searchCity"></weather-card>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WeatherCard from '@/components/WeatherCard.vue';
import InputSearchWeather from '@/components/InputSearchWeather.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    WeatherCard,
    InputSearchWeather,
},
  data(){
    return {
      searchCity: '',
    }
  },
  methods:{
    getNewCity(city: string): void{
      this.searchCity = city;
    }
  },
});
</script>

<style scoped>
.home{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
