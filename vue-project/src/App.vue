<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          Weather
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">The weather of my city</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/weather-input" class="nav-link">View the weather for another city</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/monthly-weather" class="nav-link">The weather forecast</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  font-size: 24px;
}

.navbar-brand svg {
  margin-right: 5px;
}

.nav-link {
  font-size: 18px;
}

.my-custom-navbar {
  background-color: #bbb128;
  color: #5e3335;
}
</style>