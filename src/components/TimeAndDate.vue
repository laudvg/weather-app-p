<template>
  <div>
    <div class="row today-date">
      <h4>{{ hour }}</h4>
    </div>
    <div class="row today-date">
      <h4>{{ date }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TimeAndDate",
  data() {
    return {
      date: "",
      hour: "",
    };
  },
  methods: {
    addTimeDateInfo() {
      this.setDate();
    },

    setDate() {
      const dates = new Date();
      const currentHourr = dates.getHours() + ":" + dates.getMinutes();
      const dateOptions: object = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dateLocale = dates.toLocaleDateString("en-US", dateOptions);
      this.date = dateLocale;
      this.hour = currentHourr;
      console.log(this.date, this.hour);
    },

    formatHours(timestamp: any) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const formattedTime = hours + ":" + minutes.substr(-2);
      return formattedTime;
    },
  },
  created() {
    this.addTimeDateInfo();
  },
});
</script>

<style>
</style>