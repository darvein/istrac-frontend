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
import { defineComponent, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ListingItems',
  setup() {
    const store = useStore();
    const route = useRoute();

    // Fetch places when the component is mounted
    onMounted(() => {
      store.dispatch('fetchPlaces', route.params.city as string || 'default');
    });

    // Watch for changes in the route parameters and fetch new data
    watch(() => route.params.city, (newCity, oldCity) => {
      if (newCity !== oldCity) {
        store.dispatch('fetchPlaces', newCity as string || 'default');
      }
    });

    const places = computed(() => {
      const slug = route.params.city as string || 'default';
      return store.getters.getPlacesBySlug(slug);
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
