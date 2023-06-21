<template>
  <div
    id="app"
    :class="backgroundColorClass"
  >
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light"
      style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); border-radius: 16px;"
    >
      <div class="container">
        <a
          class="navbar-brand"
          href="#"
        > Weather App </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <div class="d-flex">
                <input
                  type="text"
                  v-model="searchInput"
                  class="form-control"
                  placeholder="Введите город"
                />
                <button
                  class="btn btn-primary ml-2"
                  @click="searchWeather"
                >
                  Поиск
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <WeatherDisplay
      v-if="selectedCity"
      :selectedCity="selectedCity"
    />
  </div>
</template>

<script>
import WeatherDisplay from "./components/WeatherDisplay.vue";
import CityList from "./components/CityList.vue";

export default {
  components: {
    WeatherDisplay,
    CityList,
  },
  data() {
    return {
      backgroundColorClass: "my-custom-navbar",
      searchInput: "",
      selectedCity: "",
    };
  },
  methods: {
    searchWeather() {
      this.selectedCity = this.searchInput;
    },
  },
};
</script>

<style>
@import url("../src/css/Base.css");
</style>
