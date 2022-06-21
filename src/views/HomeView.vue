<template>
  <div class="home">
    <default-weather></default-weather>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultWeather from '@/components/DefaultWeather.vue';


export default defineComponent({
  name: 'HomeView',
  components: {
    DefaultWeather,
  },
});
</script>
