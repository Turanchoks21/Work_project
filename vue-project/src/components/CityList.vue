<template>
    <div class="city-list">
      <label for="city">Выберите город:</label>
      <select id="city" v-model="selectedCity" class="form-control">
        <option v-for="city in cities" :value="city">{{ city }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCity: '',
        cities: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов', 'Кривой Рог', 'Николаев', 'Мариуполь', 'Винница', 'Херсон', 'Полтава', 'Чернигов', 'Черкассы', 'Житомир'],
      };
    },
    watch: {
      selectedCity() {
        this.$emit('select', this.selectedCity);
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