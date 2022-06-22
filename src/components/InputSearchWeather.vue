<template>
  <div class="col-md-4 input-group input-group-sm mb-3 mt-3">
    <input type="text" size="sm" class="input-group-text" placeholder="Search a city" v-model="city" @keyup.enter="getCity(city)">
    <button type="button" class="btn btn-light" @click="getCity(city)">Search</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
 data() {
  return {
    city:'',
  }
 },
  props: {
    getCity: Function,
  },
});
</script>

<style>
.input-group {
   width:5rem;
   display: flex;
   flex-direction: row;
   justify-content: center;
}
</style>