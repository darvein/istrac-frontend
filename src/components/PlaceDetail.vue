<template>
  <base-layout>
    <template #header>
    </template>

    <template #sidebar>
      <listing-detail-options></listing-detail-options>
    </template>

    <div class="place-detail" v-if="place">
      <div class="place-header">
        <h2 class="place-title">{{ place.name }}</h2>
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
          <div v-for="photo in place.photos" :key="photo.id" class="photo-card" @click="openPhoto(photo.original_url)">
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
  flex: none;
}

.place-header p {
  margin: 0 0 0 15px; /* Remove margin from the paragraph */
  font-size: 1em; /* Adjust the font size as needed */
  max-width: 60%;
  flex: none;
}

.place-description {
  font-size: 1.2em;
  color: #555;
  flex: none;
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
  cursor: pointer;
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


@media (max-width: 768px) { /* Adjust the max-width as needed for your design */
  .place-title {
    margin: 0;
  }

  .place-header p {
    margin: 0;
    max-width: 100%;
  }

  .place-description {
    color: #555;
  }

  .place-detail {
    padding: 10px; /* Add padding for smaller screens */
  }

  .place-header {
    text-align: center; /* Center the header on small screens */
    display: block;
  }

  .place-title {
    font-size: 24px; /* Adjust font size for smaller screens */
  }

  .tabs {
    display: flex;
    flex-wrap: wrap; /* Wrap tabs on smaller screens */
    justify-content: center; /* Center tabs */
    margin-bottom: 10px; /* Add some space below the tabs */
  }

  .tabs button {
    flex: 1 1 auto; /* Allow buttons to grow and shrink */
    margin: 5px; /* Add margin around buttons */
    padding: 10px; /* Increase padding for better touch targets */
  }

  .tab-content {
    /* Adjust tab content styles for mobile if necessary */
  }

  .place-photos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: auto;
    gap: 10px;
  }

  .photo-card {
    /* Adjust photo card styles for mobile if necessary */
  }

  .fullscreen-overlay {
    /* Adjust fullscreen overlay styles for mobile if necessary */
  }

  .fullscreen-image {
    width: 100%; /* Ensure the image is not larger than the screen */
    height: auto; /* Maintain aspect ratio */
  }
}
</style>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'; // Import 'ref' here
import BaseLayout from '@/components/BaseLayout.vue';
import ListingDetailOptions from '@/components/ListingDetailOptions.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PlaceDetail',
  components: {
    BaseLayout,
    ListingDetailOptions,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentTab = ref('Fotos'); // 'ref' is now imported
    const tabs = ['Fotos', 'Videos', 'Information'];
    const selectedPhoto = ref<string | null>(null); // 'ref' is now imported

    // Fetch place details when the component is mounted
    onMounted(() => {
      // Convert the route param to a number safely
      const placeId = Number(route.params.id);
      if (!isNaN(placeId)) {
        store.dispatch('fetchPlaceDetail', placeId);
      }
    });

    // Use a computed property to access the place details from the Vuex store
    const place = computed(() => {
      // Convert the route param to a number safely
      const placeId = Number(route.params.id);
      if (!isNaN(placeId)) {
        return store.getters.getPlaceDetail(placeId);
      }
      return null;
    });

    const openPhoto = (url: string) => {
      selectedPhoto.value = url;
    };

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
