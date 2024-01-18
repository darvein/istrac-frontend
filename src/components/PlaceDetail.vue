<template>
  <base-layout>
    <template #header>
    </template>

    <template #sidebar>
      <listing-detail-options></listing-detail-options>
    </template>

    <div class="place-detail" v-if="place">
      <div class="place-header">
        <h1 class="place-title">{{ place.name }}</h1>
        <p>{{ place.description }}</p>
      </div>
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: currentTab === tab }"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="tab-content">
        <div v-if="currentTab === 'Fotos'" class="place-photos">
          <div v-for="photo in place.photos" :key="photo.id" class="photo-card" @click="openPhoto(photo.image_url)">
            <img :src="photo.image_url" :alt="place.name" class="photo-image" />
          </div>
        </div>
        <div v-if="currentTab === 'Information'" class="place-information">
          <h3>Descripcion</h3>
          <p>{{ place.description }} </p>
        </div>
        <!-- Add content for other tabs here -->
      </div>

      <!-- Fullscreen photo overlay -->
      <div v-if="selectedPhoto" class="fullscreen-overlay" @click="selectedPhoto = null">
        <img :src="selectedPhoto" class="fullscreen-image" />
      </div>
    </div>

    <template #footer>
    </template>
  </base-layout>
</template>




<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import BaseLayout from '@/components/BaseLayout.vue';
import ListingDetailOptions from '@/components/ListingDetailOptions.vue';
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
  // Add other properties like videos and comments if they exist
}

export default defineComponent({
  name: 'PlaceDetail',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  components: {
    BaseLayout,
    ListingDetailOptions,
  },
  setup(props) {
    const place = ref<Place | null>(null);
    const currentTab = ref('Fotos');
    const tabs = ['Fotos', 'Videos', 'Information'];
    const selectedPhoto = ref<string | null>(null);

    const openPhoto = (url: string) => {
      selectedPhoto.value = url;
    };

    onMounted(async () => {
      try {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/tplaces/${props.id}`);
        place.value = response.data;
      } catch (error) {
        console.error('There was an error fetching the place details:', error);
      }
    });

    return {
      place,
      currentTab,
      tabs,
      selectedPhoto,
      openPhoto,
    };
  },
});
</script>

<style scoped>
.place-detail {
  margin: auto;
  padding: 10px;
}

.place-header {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Vertically center the items */
  padding: 10px; /* Add some padding for spacing */
  margin-bottom: 20px;
}

.place-title {
  margin: 0; /* Remove margin from the title */
  font-weight: 800;
  font-size: 2em; /* Adjust the font size as needed */
  flex: 0 0 auto;
}

.place-header p {
  margin: 0 0 0 15px; /* Remove margin from the paragraph */
  font-size: 1em; /* Adjust the font size as needed */
  max-width: 60%;
  flex: 1;
}

.place-description {
  font-size: 1.2em;
  color: #555;
}

.place-photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); /* Flexible columns */
  grid-auto-rows: auto; /* Auto-adjusting row sizes */
  gap: 10px;
}

.photo-card {
  align-items: center; /* Aligns items vertically in the center */
  justify-content: center; 

  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  aspect-ratio: 16 / 9; /* Example ratio, adjust as needed */
}

.photo-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image covers the card completely */
  display: block;
}

.photo-card:hover .photo-image {
  transform: scale(1.05);
}

.tabs {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
  border-bottom: 1px solid #3c95d0;
}

.tabs button {
  padding: 10px 20px;
  border: none;
  border-bottom: 2px solid transparent;
  background-color: #f0f2f5;
  margin-right: 10px;
  cursor: pointer;
  outline: none;
}

.tabs button:hover {
  background-color: #e0e0e0;
}

.tabs button.active {
  color: #007bff;
  border-bottom: 1px solid #fbfdfe;
}

.tab-content {
  /* Styles for the tab content area */
}

.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* High z-index to ensure it's on top of other content */
}

.fullscreen-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
</style>
