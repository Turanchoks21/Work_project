import { createRouter, createWebHistory } from 'vue-router'
import WeatherDisplay from '../components/WeatherDisplay.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WeatherDisplay',
      component: WeatherDisplay,
    },
  ]
})

export default router
