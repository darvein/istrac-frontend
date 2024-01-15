<template>
  <base-layout>
    <template #header>
    </template>

    <div class="place-detail" v-if="place">
      <div class="place-header">
        <h1 class="place-title">{{ place.name }}</h1>
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
        <div v-if="currentTab === 'Photos'" class="place-photos">
          <div v-for="photo in place.photos" :key="photo.id" class="photo-card" @click="openPhoto(photo.image_url)">
            <img :src="photo.image_url" :alt="place.name" class="photo-image" />
          </div>
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
  },
  setup(props) {
    const place = ref<Place | null>(null);
    const currentTab = ref('Photos');
    const tabs = ['Photos', 'Videos', 'Comments', 'Information'];
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

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
  border-bottom-color: #007bff;
  color: #007bff;
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
