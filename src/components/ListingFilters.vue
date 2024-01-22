<template>
  <aside class="listing-filters">
    <h2>Destinos</h2>
    
    <section class="listing-filters-section">
      <h3><i class="fas fa-map-marker-alt"></i> Lugares</h3>
      <ul class="filter-list">
        <li v-for="location in locations" :key="location.city">
          <router-link class="filter-item" :to="{ name: 'PlacesFilter', params: { city: location.slug } }">
            {{ location.city }}
          </router-link>
        </li>
      </ul>
    </section>


    <section class="listing-filters-section">
      <h3><i class="fas fa-tags"></i> Categorias</h3>
      <ul class="filter-list">
        <li v-for="category in categories" :key="category.name">
          <router-link class="filter-item" :to="{ name: 'CategoryFilter', params: { name: category.name } }">
            {{ category.name }}
          </router-link>
        </li>
      </ul>
    </section>

    <section class="listing-filters-section">
      <h3>Filtros</h3>
      <ul class="filter-list">
        <li class="filter-item">
          <i class="fas fa-search"></i>
          <span>Search</span>
        </li>
        <li class="filter-item">
          <i class="fas fa-sliders-h"></i>
          <span>More Filters</span>
        </li>
      </ul>
    </section>
  </aside>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';

interface Location {
  country: string;
  city: string;
  slug: string;
  latitude: string;
  longitude: string;
}

interface Category {
  name: string;
  description: string;
}

export default defineComponent({
  name: 'LocationsList',
  setup() {
    const locations = ref<Location[]>([]);
    const categories = ref<Category[]>([]);

    onMounted(async () => {
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      try {
        const [locationResponse, categoryResponse] = await Promise.all([
          axios.get(`${baseUrl}/api/locations/`),
          axios.get(`${baseUrl}/api/categories/`)
        ]);
        locations.value = locationResponse.data;
        categories.value = categoryResponse.data;
      } catch (error) {
        console.error('There was an error fetching data:', error);
      }
    });

    return {
      locations,
      categories,
    };
  },
});
</script>

<style scoped>
.listing-filters {
  /* Add styles for the sidebar here */
}

.listing-filters-section {
  border-bottom: 1px solid #ddd;
}

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-item {
  text-decoration: none; /* Removes the underline */
  color: #337ab7; /* Bootstrap primary color for links */
  display: block; /* Makes the link fill the container */
  padding: 5px 20px;
  transition: color 0.3s ease;
}

.filter-item:hover {
  color: #23527c; /* A darker shade for hover state */
  background-color: #f0f2f5;
}

.router-link-active {
  color: #1d2124; /* A darker color for the active state */
  font-weight: bold; /* Makes the active link bold */
}

.filter-item span {
  vertical-align: middle;
}

@media (max-width: 768px) {
  .listing-filters-section {
    border-bottom: none; /* Remove the border for a cleaner look on mobile */
  }

  .filter-list {
    padding: 0;
    margin: 0;
  }

  .filter-item {
    text-decoration: none; /* Keeps the underline removed */
    color: #333; /* Darker color for better readability */
    display: flex; /* Use flexbox for centering and spacing */
    align-items: center; /* Center items vertically */
    justify-content: center; /* Center items horizontally */
    padding: 15px; /* Larger padding for easier tapping */
    margin: 10px 0; /* Add some margin between buttons */
    background-color: #f7f7f7; /* Light background for the button */
    border-radius: 8px; /* Rounded corners for a button-like appearance */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
    transition: background-color 0.3s ease; /* Smooth background color transition */
  }

  .filter-item:hover {
    background-color: #e9ecef; /* Slightly darker background on hover */
    color: #23527c; /* A darker shade for hover state */
  }

  .router-link-active {
    color: #fff; /* White text for the active state */
    background-color: #007bff; /* Bootstrap primary color for the active state */
    font-weight: bold; /* Keeps the active link bold */
  }
}
</style>
