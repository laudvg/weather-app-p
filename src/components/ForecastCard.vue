<template>
  <div class="card forecast-card bg-primary">
    <div>
      <h6>{{tempAve}}</h6>
      <h6>{{tempMin}}-{{tempMax}}</h6>
      <h6>{{formatedHour}}</h6>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name:'ForecastCard',
  props: {
    tempAve : Number,
    tempMin: Number,
    tempMax:Number,
    day:Number,
  },
  data(){
    return {
      formatedHour: '',
    }
  },
  methods: {
    formatHours(timestamp: any){
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const formattedTime = hours + ':' + minutes.substr(-2);
      this.formatedHour = formattedTime;
    },
  },
  mounted(){
    this.formatHours(this.day);
  }
})
</script>

<style>

</style>