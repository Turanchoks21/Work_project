<template>
    <div v-if="weatherLoaded" class="current-weather">
      <div class="city-info">
        <h2>{{ selectedCity }}</h2>
        <div class="map-cell">
          <Map :selectedCity="selectedCity" />
        </div>
      </div>
      <div class="weather-info">
        <p class="temperature">Температура: {{ temperature }}°C</p>
        <p class="description">Описание: {{ description }}</p>
        <p class="extra-info">Влажность: {{ humidity }}%, Порывы ветра: {{ windSpeed }} м/с</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import Map from './MapWeather.vue';
  
  export default {
    props: ['selectedCity'],
    components: {
      Map,
    },
    setup(props) {
      const temperature = ref('');
      const description = ref('');
      const humidity = ref('');
      const windSpeed = ref('');
      const weatherLoaded = ref(false);
  
      async function showWeather() {
        try {
          const apiKey = 'd76774aebcd4655f95ed4847639da2af';
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.selectedCity}&units=metric&appid=${apiKey}`;
  
          const weatherResponse = await fetch(weatherUrl);
          const weatherData = await weatherResponse.json();
  
          if (weatherData && weatherData.main) {
            temperature.value = weatherData.main.temp;
            description.value = weatherData.weather[0].description;
            humidity.value = weatherData.main.humidity;
            windSpeed.value = weatherData.wind.speed;
            weatherLoaded.value = true;
          }
        } catch (error) {
          console.log('Error fetching weather data:', error);
        }
      }
  
      onMounted(() => {
        showWeather();
      });
  
      watch(() => props.selectedCity, () => {
        showWeather();
      });
  
      return {
        temperature,
        description,
        humidity,
        windSpeed,
        weatherLoaded,
      };
    },
  };
  </script>
  
  <style scoped>
  @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
  @import url('../css/CurrentWeather.css');
  
  .map-cell {
    position: relative;
    width: 100%;
    height: 300px;
  }
  </style>
  