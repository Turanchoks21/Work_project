import { createRouter, createWebHistory } from 'vue-router'
import WeatherInput from '../components/WeatherInput.vue';
import WeatherDisplay from '../components/WeatherDisplay.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WeatherDisplay',
      component: WeatherDisplay,
    },
    {
      path: '/weather-input',
      name: 'WeatherInput',
      component: WeatherInput,
    },
  ]
})

export default router
