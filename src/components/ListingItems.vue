<template>
  <div class="listing-items">
    <div class="card-image" v-if="places.length <= 0">
      <h3>No hay resultados</h3>
    </div>
    <div v-for="(place, index) in places" :key="index" class="place-card">
      <router-link :to="{ name: 'PlaceDetail', params: { id: place.id } }" class="card-image-link">
        <div class="card-image" v-if="place.photos.length > 0">
          <img :src="place.photos[0].image_url" :alt="place.name" />
          <div class="card-icons">
            <span class="icon-comments">10<i class="fas fa-comments"></i></span>
            <span class="icon-likes">15 <i class="fas fa-thumbs-up"></i></span>
          </div>
        </div>
      </router-link>
      <div class="card-body">
        <h2 class="card-title">{{ place.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
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
    const route = useRoute();

    // Method to fetch places based on the city slug
    const fetchPlaces = async (citySlug?: string) => {
      try {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const url = citySlug
          ? `${baseUrl}/api/tplaces/?location=${citySlug}`
          : `${baseUrl}/api/tplaces/`;
        const response = await axios.get(url);
        places.value = response.data;
      } catch (error) {
        console.error('There was an error fetching the places:', error);
      }
    };

    // Fetch data from the API when the component is mounted
    onMounted(async () => {
      fetchPlaces(route.params.slug as string | undefined);
    });

    watch(() => route.params.city, (newSlug, oldSlug) => {
      if (newSlug !== oldSlug) {
        fetchPlaces(newSlug as string);
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.place-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.card-image {
  height: 200px; /* Set a fixed height for the image container */
  overflow: hidden; /* Hide any overflow */
}

.card-image img {
  width: 100%; /* Full width of the container */
  height: 100%; /* Full height of the container */
  object-fit: cover; /* Cover the container while preserving aspect ratio */
  display: block;
}

.card-body {
  padding: 10px; /* Reduced padding */
  text-align: left; /* Align text to the left */
  position: relative; /* Position relative for potential absolute elements inside */
}

.card-title {
  font-size: 1.0em; /* Smaller font size */
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); /* Subtle text shadow for depth */
  overflow: hidden; /* Ensure no overflow */
  white-space: nowrap; /* No wrapping */
  text-overflow: ellipsis; /* Add ellipsis for text overflow */
}

.card-image {
  position: relative; /* Set the card-image to relative so we can position icons absolutely within it */
}

.card-icons {
  position: absolute; /* Position the icons absolutely to the top-right of the card-image */
  top: 10px; /* Spacing from the top */
  right: 10px; /* Spacing from the right */
  display: flex;
}

.icon-comments,
.icon-likes {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7); /* Semi-transparent background for better visibility */
  border-radius: 10px; /* Rounded corners for the icon backgrounds */
  padding: 5px 8px; /* Padding inside the icon backgrounds */
  margin-left: 5px; /* Space between icons */
  color: #333; /* Icon color */
  font-size: 0.8em; /* Icon font size */
}

.icon-comments i,
.icon-likes i {
  margin-left: 5px; /* Space between icon and text */
}

/* Optional: Add some hover effects to the icons for interactivity */
.icon-comments:hover,
.icon-likes:hover {
  color: #333;
  cursor: pointer;
}

</style>
