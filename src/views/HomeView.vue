<template>
  <div class="home">
    <input-search-weather :getCity="getNewCity" ></input-search-weather>
    <time-and-date></time-and-date>
    <search-weather :cityQuery="searchCity" v-if="searchCity.length > 0"></search-weather>
    <default-weather v-else></default-weather>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultWeather from '@/components/DefaultWeather.vue';
import TimeAndDate from '@/components/TimeAndDate.vue';
import InputSearchWeather from '@/components/InputSearchWeather.vue';
import SearchWeather from '@/components/SearchWeather.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    DefaultWeather,
    TimeAndDate,
    InputSearchWeather,
    SearchWeather
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
