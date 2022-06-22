<template>
  <div class="card forecast-card bg-primary mb-2">
      <h6 class="temp">{{Math.round(tempAve)}}&deg;</h6>
      <h6 class="min-max">Today at {{formatedHour}}</h6>
    <div class="min-max-val">
      <span class="arrow material-icons-outlined md-12">arrow_upward</span>
      <h6 class="min-max">{{Math.round(tempMin)}}&deg;&nbsp;</h6>

      <span class="arrow material-icons-outlined md-12">arrow_downward</span>
      <h6 class="min-max">{{Math.round(tempMax)}}&deg;</h6>
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
  .min-max{
    font-size: .75rem;
  }
  .temp{
    font-size: 2rem;
    margin-left: 1rem;
    padding-right:.5rem;
    margin-top: .5rem;
  }
  .single-card{
    display: flex;
  }
  .forecast-card{
    width: 7rem;
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-content: center;
  }

  h6 .forecast-card{
    font-size: .75rem;
  }
  .material-icons-outlined.md-12 { 
    font-size: 12px;
    margin-top: .1rem;
  }
  .min-max-val{
    display: flex;
    flex-direction:row;
    justify-content: center;
    align-content: center;
  }

</style>