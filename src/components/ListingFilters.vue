<template>
  <aside class="listing-filters">
    <h2>Destinos Turísticos</h2>
    
    <div class="listing-filters-section">
      <h3><i class="fas fa-map-marker-alt"></i> Lugares</h3>
      <ul class="filter-list">
        <li class="filter-item-li" v-for="location in locations" :key="location.city">
          <router-link :to="{ name: 'PlacesFilter', params: { city: location.slug } }">
            <div class="filter-item">
              <span>{{ location.city }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="listing-filters-section">
      <h3><i class="fas fa-tags"></i> Categorias</h3>
      <ul class="filter-list">
        <li class="filter-item-li" v-for="category in categories" :key="category.name">
          <div class="filter-item">
            <span>{{ category.name }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="listing-filters-section">
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
    </div>
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
      try {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/locations/`);
        locations.value = response.data;
      } catch (error) {
        console.error('There was an error fetching the locations:', error);
      }

      try {
        const baseUrl = process.env.VUE_APP_API_BASE_URL;
        const response = await axios.get(`${baseUrl}/api/categories/`);
        categories.value = response.data;
      } catch (error) {
        console.error('There was an error fetching the categories:', error);
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
  display: flex;
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
}

.filter-item-li .active {
 color: #1d2124;
 font-weight: bold;
 text-decoration: none;
}

.filter-item i {
  margin-right: 8px;
  color: #2f3132;
}

.filter-item:hover {
  background-color: #f0f2f5;
}

h2 {
  font-size: 1.2em;
  color: #333;
  padding: 0.5em 0;
  margin: 0;
}

h3 {
  font-size: 1em;
  color: #333;
  padding: 0.5em 0;
  margin-bottom: 0em;
}

.filter-item span {
  text-decoration: none;
  color: #337ab7; /* Bootstrap primary color for links */
  transition: color 0.3s ease;
}

.filter-item span:hover {
  color: #23527c; /* A darker shade for hover state */
}


.filter-item a {
 text-decoration: none; /* Removes the underline */
 color: inherit; /* Inherits the color from the parent */
 display: block; /* Makes the link fill the container */
}

/* Style for the active router-link */
.filter-item .router-link-active {
 color: #1d2124; /* A darker color for the active state */
 font-weight: bold; /* Optional: makes the active link bold */
}

.filter-item span {
  vertical-align: middle;
}
</style>
