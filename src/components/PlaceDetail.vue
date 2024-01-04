<template>
  <div class="place-detail" v-if="place">
    <div class="place-header">
      <h1 class="place-title">{{ place.name }}</h1>
      <p class="place-description">{{ place.description }}</p>
    </div>
    <div class="place-photos">
      <div v-for="photo in place.photos" :key="photo.id" class="photo-card">
        <img :src="photo.image_url" :alt="place.name" class="photo-image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';

interface Photo {
  id: number;
  image: string;
  image_url: string;
}

interface Place {
  id: number;
  name: string;
  description: string;
  photos: Photo[];
}

export default defineComponent({
  name: 'PlaceDetail',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const place = ref<Place | null>(null);

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/tplaces/${props.id}`);
        place.value = response.data;
      } catch (error) {
        console.error('There was an error fetching the place details:', error);
      }
    });

    return {
      place,
    };
  },
});
</script>

<style scoped>
.place-detail {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.place-header {
  text-align: center;
  margin-bottom: 30px;
}

.place-title {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}

.place-description {
  font-size: 1.2em;
  color: #555;
}

.place-photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.photo-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.photo-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.photo-card:hover .photo-image {
  transform: scale(1.05);
}
</style>
