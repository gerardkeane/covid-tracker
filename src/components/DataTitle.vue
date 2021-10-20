<template>
  <div class="text-center">
    <h2 class="text-5xl font-bold">{{ text }}</h2>
    <div class="text-xl mt-4 mb-10">{{ timeStamp }}</div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "DataTitle",
  props: ["text", "dataDate"],
  computed: {
    timeStamp: function() {
      return moment(this.dataDate).format("Do MMMM YYYY, h:mm:ss a");
    },
  },
};
</script>
<style></style>
