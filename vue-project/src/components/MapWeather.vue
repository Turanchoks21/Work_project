<template>
    <div class="map-container" ref="mapContainer"></div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import L from 'leaflet';
  
  export default {
    props: ['selectedCity'],
    setup(props) {
      const mapContainer = ref(null);
      let map = null;
  
      onMounted(async () => {
        if (mapContainer.value) {
          map = L.map(mapContainer.value).setView([0, 0], 13);
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }).addTo(map);
  
          await createMarker();
        }
      });
  
      async function createMarker() {
        const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${props.selectedCity}&key=6604e573410b4ecbb54863fe4cfc3e82`;
        const geocodingResponse = await fetch(geocodingUrl);
        const geocodingData = await geocodingResponse.json();
  
        if (geocodingData.results && geocodingData.results.length > 0) {
          const { lat, lng } = geocodingData.results[0].geometry;
  
          const marker = L.marker([lat, lng]).addTo(map);
          map.panTo(marker.getLatLng());
        }
      }
  
      return {
        mapContainer,
      };
    },
  };
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 300px;
  }
  </style>
  