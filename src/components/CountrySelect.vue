<template>
  <div>
    <select v-model="selected" @change="onChange" class="w-full border-2 p-4 rounded">
      <option value="0">Select Country</option>
      <option v-for="country in countries" :value="country.ID">{{ country.Country }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "CountrySelect",
  props: ["countries"],
  data() {
    return {
      selected: 0,
    };
  },
  methods: {
    onChange() {
      const country = this.countries.find((item) => item.ID === this.selected);

      this.$emit("get-country", country);
    },
  },
};
</script>
<style></style>
