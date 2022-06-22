<template>
  <div class="date">
    <div class='row today-date'>
      <h6>{{ date }}</h6>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TimeAndDate',
  data() {
    return {
      date: '',
      hour: '',
    };
  },
  methods: {
    addTimeDateInfo() {
      this.setDate();
    },

    setDate() {
      const dates = new Date();
      const dateOptions: object = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const dateLocale = dates.toLocaleDateString('en-US', dateOptions);
      this.date = dateLocale;
    },

    formatHours(timestamp: number) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();
      const formattedTime = hours + ':' + minutes.slice(-2);
      return formattedTime;
    },
  },
  created() {
    this.addTimeDateInfo();
  },
});
</script>

<style>
.date{
 margin-top:0px;

}
</style>