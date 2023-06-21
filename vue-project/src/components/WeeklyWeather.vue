<template>
  <div v-if="groupedWeather && Object.keys(groupedWeather).length">
    <h3 class="title-style">Погода на неделю</h3>
    <div class="weather-table">
      <div
        class="weather-row header"
        style="width: 100%;"
      >
        <div class="weather-cell">Дата</div>
        <div class="weather-cell">Температура (день/ночь)</div>
        <div class="weather-cell">Описание</div>
      </div>
      <div
        v-for="(weatherGroup, day) in groupedWeather"
        :key="day"
        class="weather-row"
      >
        <div class="weather-cell">{{ day }}</div>
        <div class="weather-cell">{{ getTemperatureString(weatherGroup) }}</div>
        <div class="weather-cell">{{ getWeatherDescription(weatherGroup) }}</div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';

export default {
  props: ['selectedCity'],
  setup(props) {
    const weeklyWeather = ref([]);
    const groupedWeather = ref({});

    async function showWeeklyWeather() {
      await getWeeklyWeather();
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

    onMounted(showWeeklyWeather);

    return {
      weeklyWeather,
      groupedWeather,
      getTemperatureString(weatherGroup) {
        const temperatures = weatherGroup.map((dayWeather) => dayWeather.temperature);
        return `${Math.min(...temperatures)}°C / ${Math.max(...temperatures)}°C`;
      },
      getWeatherDescription(weatherGroup) {
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
      },
    };
  },
};
</script>
  
<style scoped>@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
@import url('../css/WeatherWeek.css');</style>