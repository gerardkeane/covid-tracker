<template>
  <main v-if="loading" class="flex flex-col justify-center items-center">
    <v-icon class="text-gray-500" name="pr-spinner" animation="spin" scale="3" />
  </main>
  <main v-else class="">
    <DataTitle :text="title" :dataDate="dataDate" />
    <div v-if="stats.Country" class="grid md:grid-cols-4 gap-4 mb-4">
      <CountrySelect class="md:col-span-3" @get-country="getCountryData" :countries="countries" />
      <button
        @click="clearCountryData"
        class="bg-green-500 text-white rounded p-3 focus:outline-none hover:bg-green-300 disabled:opacity-50 disabled:bg-red-500"
      >
        Clear Country
      </button>
    </div>
    <div v-else class="grid md:grid-cols-1 mb-4">
      <CountrySelect @get-country="getCountryData" :countries="countries" />
    </div>
    <DataCard :stats="stats" />
    <hr class="mt-4 mb-4" />
    <DataTable :countries="countries" />
  </main>
</template>

<script>
import DataTitle from "@/components/DataTitle";
import DataCard from "@/components/DataCard";
import CountrySelect from "@/components/CountrySelect";
import DataTable from "@/components/DataTable";

export default {
  name: "Home",
  components: { DataTitle, DataCard, CountrySelect, DataTable },
  data() {
    return {
      loading: true,
      title: "Worldwide",
      dataDate: "",
      stats: {},
      countries: {},
    };
  },
  methods: {
    async fetchCovidData() {
      const res = await fetch("https://api.covid19api.com/summary");
      const data = await res.json();
      console.log(data);
      return data;
    },
    getCountryData(country) {
      this.stats = country;
      this.title = country.Country;
    },
    async clearCountryData() {
      this.loading = true;
      const data = await this.fetchCovidData();
      this.title = "Worldwide";
      this.stats = data.Global;
      this.loading = false;
    },
  },
  async created() {
    const data = await this.fetchCovidData();
    this.dataDate = data.Date;
    this.stats = data.Global;
    this.countries = data.Countries;
    this.loading = false;
  },
};
</script>
