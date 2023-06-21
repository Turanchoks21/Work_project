<template>
  <div class="container">
    <h1>Погода</h1>
    <div v-if="weatherLoaded" class="current-weather">
      <div class="city-info">
        <h2>{{ selectedCity }}</h2>
      </div>
      <div class="weather-info">
        <p class="temperature">Температура: {{ temperature }}°C</p>
        <p class="description">Описание: {{ description }}</p>
        <p class="extra-info">Влажность: {{ humidity }}%, Порывы ветра: {{ windSpeed }} м/с</p>
      </div>
    </div>

    <div v-if="groupedWeather && Object.keys(groupedWeather).length">
      <h3>Погода на неделю</h3>
      <div class="weather-table">
        <div class="weather-row header">
          <div class="weather-cell">Дата</div>
          <div class="weather-cell">Температура (день/ночь)</div>
          <div class="weather-cell">Описание</div>
        </div>
        <div v-for="(weatherGroup, day) in groupedWeather" :key="day" class="weather-row">
          <div class="weather-cell">{{ day }}</div>
          <div class="weather-cell">{{ getTemperatureString(weatherGroup) }}</div>
          <div class="weather-cell">{{ getWeatherDescription(weatherGroup) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  props: ['selectedCity', 'cityList'],
  setup(props) {
    const temperature = ref('');
    const description = ref('');
    const humidity = ref('');
    const windSpeed = ref('');
    const weatherLoaded = ref(false);
    const weeklyWeather = ref([]);
    const groupedWeather = ref({});

    async function showWeather() {
      await getWeather();
      await getWeeklyWeather();
    }

    async function getWeather() {
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
        const weeklyWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.selectedCity}&units=metric&appid=${apiKey}`;

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

    function getTemperatureString(weatherGroup) {
      const temperatures = weatherGroup.map((dayWeather) => dayWeather.temperature);
      return `${Math.min(...temperatures)}°C / ${Math.max(...temperatures)}°C`;
    }

    function getWeatherDescription(weatherGroup) {
      const descriptions = weatherGroup.map((dayWeather) => dayWeather.description);
      const descriptionCounts = {};

      for (let description of descriptions) {
        if (descriptionCounts[description]) {
          descriptionCounts[description]++;
        } else {
          descriptionCounts[description] = 1;
        }
      }

      const mostCommonDescription = Object.keys(descriptionCounts).reduce((a, b) =>
        descriptionCounts[a] > descriptionCounts[b] ? a : b
      );

      return mostCommonDescription;
    }

    onMounted(showWeather);

    watch(() => props.selectedCity, () => {
      showWeather();
    });

    return {
      temperature,
      description,
      humidity,
      windSpeed,
      weatherLoaded,
      weeklyWeather,
      groupedWeather,
      getTemperatureString,
      getWeatherDescription,
    };
  },
};
</script>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
@import url('../css/CurrentWeather.css');
@import url('../css/WeatherWeek.css');
</style>