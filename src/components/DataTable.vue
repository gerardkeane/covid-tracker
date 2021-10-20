<template>
  <table class="table-auto mt-4 w-full">
    <thead>
      <tr class="bg-blue-200">
        <th @click="sort('Country')" class="border text-left px-8 py-4 cursor-pointer">
          Country<v-icon name="pr-sort" />
        </th>
        <th @click="sort('NewConfirmed')" class="border text-right px-8 py-4 cursor-pointer">
          <v-icon name="pr-sort" />New Cases
        </th>
        <th @click="sort('NewDeaths')" class="border text-right px-8 py-4 cursor-pointer">
          <v-icon name="pr-sort" />New Deaths
        </th>
        <th @click="sort('TotalConfirmed')" class="border text-right px-8 py-4 cursor-pointer">
          <v-icon name="pr-sort" />Total Cases
        </th>
        <th @click="sort('TotalDeaths')" class="border text-right px-8 py-4 cursor-pointer">
          <v-icon name="pr-sort" />Total Deaths
        </th>
        <!-- <th @click="sort('DeathRate')" class="border text-right px-8 py-4 cursor-pointer">Death Rate</th> -->
        <th class="border text-right px-8 py-4 ">Death Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="country in sortedCountries" :key="country.CountryCode">
        <td class="border px-8 py-4">{{ country.Country }}</td>
        <td class="border text-right px-8 py-4">
          {{ numberWithCommas(country.NewConfirmed) }}
        </td>
        <td class="border text-right px-8 py-4">
          {{ numberWithCommas(country.NewDeaths) }}
        </td>
        <td class="border text-right px-8 py-4">
          {{ numberWithCommas(country.TotalConfirmed) }}
        </td>
        <td class="border text-right px-8 py-4">
          {{ numberWithCommas(country.TotalDeaths) }}
        </td>
        <!-- <td class="border text-right px-8 py-4">{{ deathRate(country.TotalDeaths, country.TotalConfirmed) }}%</td> -->
        <td class="border text-right px-8 py-4">
          {{ ((country.TotalDeaths / country.TotalConfirmed) * 100).toFixed(2) }}%
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "DataTable",
  props: ["countries"],
  data() {
    return {
      currentSort: "TotalDeaths",
      currentSortDir: "desc",
    };
  },
  methods: {
    numberWithCommas(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
  },
  computed: {
    sortedCountries: function() {
      return this.countries.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === "desc") modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
    deathRate: function(deaths, cases) {
      return ((deaths / cases) * 100).toFixed(2);
    },
  },
};
</script>
<style></style>
