<template>
  <div class="container">
    <h1>Введите данные</h1>
    <div class="form-group">
      <label for="city">Город:</label>
      <input id="city" v-model="city" class="form-control" placeholder="Введите город">
    </div>
    <div class="form-group">
      <label for="region">Область:</label>
      <input id="region" v-model="region" class="form-control" placeholder="Введите область">
    </div>
    <button class="btn btn-primary" @click="showWeather">Показать погоду</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const city = ref('');
    const region = ref('');

    function showWeather() {
      if (city.value && region.value) {
        $router.push({
          name: 'WeatherDisplay',
          query: {
            city: '',
            region: '',
          },
        });
      }
    }

    return {
      city,
      region,
      showWeather,
    };
  },
};
</script>
<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
</style>