<template>
  <div class="home">
    <input-search-weather :getCity="getNewCity" ></input-search-weather>
    <search-weather :cityQuery="searchCity" v-if="searchCity.length > 0"></search-weather>
    <default-weather v-else></default-weather>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultWeather from '@/components/DefaultWeather.vue';
import InputSearchWeather from '@/components/InputSearchWeather.vue';
import SearchWeather from '@/components/SearchWeather.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    DefaultWeather,
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

<style scoped>

.home{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color:#F0F8FF;
}

</style>
