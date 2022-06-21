<template>
  <div class="input-group mb-3 w-5">
    <input type="text" class="form-control" placeholder="Search a city" v-model="city" @keyup.enter="getCity(city)">
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
  methods: {

  },

});
</script>

<style>

</style>