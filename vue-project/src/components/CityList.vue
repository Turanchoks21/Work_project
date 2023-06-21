<template>
    <div class="city-list">
      <label for="city">Выберите город:</label>
      <select id="city" v-model="selectedCity" class="form-control">
        <option v-for="city in cities" :value="city.name">{{ city.name }}</option>
      </select>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selectedCity: '',
        cities: [
          { name: 'Киев', coordinates: { lat: 50.4501, lng: 30.5234 } },
          { name: 'Харьков', coordinates: { lat: 49.9935, lng: 36.2304 } },
          { name: 'Одесса', coordinates: { lat: 46.4825, lng: 30.7233 } },
          { name: 'Днепр', coordinates: { lat: 48.4647, lng: 35.0462 } },
          { name: 'Донецк', coordinates: { lat: 48.0159, lng: 37.8029 } },
          { name: 'Запорожье', coordinates: { lat: 47.8388, lng: 35.1396 } },
          { name: 'Львов', coordinates: { lat: 49.8397, lng: 24.0297 } },
          { name: 'Кривой Рог', coordinates: { lat: 47.9108, lng: 33.3915 } },
          { name: 'Николаев', coordinates: { lat: 46.9750, lng: 31.9946 } },
          { name: 'Мариуполь', coordinates: { lat: 47.0971, lng: 37.5432 } },
          { name: 'Винница', coordinates: { lat: 49.2328, lng: 28.4801 } },
          { name: 'Херсон', coordinates: { lat: 46.6354, lng: 32.6169 } },
          { name: 'Полтава', coordinates: { lat: 49.5883, lng: 34.5514 } },
          { name: 'Чернигов', coordinates: { lat: 51.4982, lng: 31.2890 } },
          { name: 'Черкассы', coordinates: { lat: 49.4444, lng: 32.0598 } },
          { name: 'Житомир', coordinates: { lat: 50.2547, lng: 28.6587 } },
        ],
      };
    },
    watch: {
      selectedCity() {
        const city = this.cities.find((item) => item.name === this.selectedCity);
        this.$emit('select', city);
      },
    },
  };
  </script>
  <style scoped>
  h1 {
    font-size: 24px;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  li {
    margin-bottom: 5px;
  }
  </style>