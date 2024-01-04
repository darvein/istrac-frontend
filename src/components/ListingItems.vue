<template>
  <div class="listing-items">
    <div v-for="(place, index) in places" :key="index" class="place-card">
      <div class="card-image" v-if="place.photos.length > 0">
        <img :src="place.photos[0].image_url" :alt="place.name" />
      </div>
      <div class="card-body">
        <h2 class="card-title">{{ place.name }}</h2>
        <router-link :to="{ name: 'PlaceDetail', params: { id: place.id } }">[Ver Sitio]</router-link>
        <p class="card-description">{{ place.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';

// Define the structure of the photo using an interface
interface Photo {
  id: number;
  image: string;
  image_url: string;
}

// Define the structure of the place using an interface
interface Place {
  id: number;
  name: string;
  description: string;
  photos: Photo[];
}

export default defineComponent({
  name: 'ListingItems',
  setup() {
    const places = ref<Place[]>([]);

    // Fetch data from the API when the component is mounted
    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tplaces/');
        places.value = response.data;
      } catch (error) {
        console.error('There was an error fetching the places:', error);
      }
    });

    return {
      places,
    };
  },
});
</script>

<style scoped>
.listing-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.place-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px; /* Fixed width or you can make it responsive */
}

.card-image img {
  width: 100%;
  height: auto;
  display: block;
}

.card-body {
  padding: 15px;
  text-align: center;
}

.card-title {
  margin: 0;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.card-description {
  font-size: 1em;
  color: #666;
  line-height: 1.4;
}
</style>
