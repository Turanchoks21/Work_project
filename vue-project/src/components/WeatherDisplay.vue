<template>
  <div class="container">
    <h1>Погода</h1>
    <div v-if="weatherLoaded" class="current-weather">
      <div class="city-info">
        <h2>{{ cityName }}</h2>
      </div>
      <div class="weather-info">
        <p class="temperature">Температура: {{ temperature }}°C</p>
        <p class="description">Описание: {{ description }}</p>
        <p class="extra-info">Влажность: {{ humidity }}%, Порывы ветра: {{ windSpeed }} м/с</p>
      </div>
    </div>

    <div v-if="groupedWeather && Object.keys(groupedWeather).length">
      <h3>Погода на неделю</h3>
      <div class="weather-days">
        <div v-for="(weatherGroup, day) in groupedWeather" :key="day" class="weather-day">
          <h4>{{ day }}</h4>
          <div class="weather-items">
            <div v-for="dayWeather in weatherGroup" :key="dayWeather.time" class="weather-item">
              <p class="time">{{ dayWeather.time }}</p>
              <p class="temperature">{{ dayWeather.temperature }}°C</p>
              <p class="description">{{ dayWeather.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const cityName = ref('');
    const temperature = ref('');
    const description = ref('');
    const humidity = ref('');
    const windSpeed = ref('');
    const weatherLoaded = ref(false);
    const weeklyWeather = ref([]);
    const groupedWeather = ref({});
    const city = ref('Запорожье');

    async function showWeather() {
      await getWeather();
      await getWeeklyWeather();
    }

    async function getWeather() {
      try {
        const apiKey = 'd76774aebcd4655f95ed4847639da2af';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData && weatherData.main) {
          cityName.value = weatherData.name;
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

    function groupWeatherByDay(weeklyWeather) {
      const groupedWeather = {};
      weeklyWeather.forEach((dayWeather) => {
        const date = dayWeather.date;
        const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
        if (!groupedWeather[day]) {
          groupedWeather[day] = [];
        }
        groupedWeather[day].push(dayWeather);
      });
      return groupedWeather;
    }

    async function getWeeklyWeather() {
      try {
        const apiKey = 'd76774aebcd4655f95ed4847639da2af';
        const weeklyWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=metric&appid=${apiKey}`;

        const weeklyWeatherResponse = await fetch(weeklyWeatherUrl);
        const weeklyWeatherData = await weeklyWeatherResponse.json();

        if (weeklyWeatherData && weeklyWeatherData.list) {
          weeklyWeather.value = weeklyWeatherData.list.map((forecast) => ({
            date: forecast.dt_txt.split(' ')[0],
            time: forecast.dt_txt.split(' ')[1],
            temperature: forecast.main.temp,
            description: forecast.weather[0].description,
          }));

          groupedWeather.value = groupWeatherByDay(weeklyWeather.value);
        }
      } catch (error) {
        console.log('Error fetching weekly weather data:', error);
      }
    }

    onMounted(showWeather);

    return {
      cityName,
      temperature,
      description,
      humidity,
      windSpeed,
      weatherLoaded,
      city,
      weeklyWeather,
      groupedWeather,
    };
  },
};
</script>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
@import url('../css/WeatherWeek.css');
@import url('../css/CurrentWeather.css');
</style>