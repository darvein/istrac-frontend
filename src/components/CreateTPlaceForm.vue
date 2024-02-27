<template>
  <div class="tplace-create-form">
    <h1>Create Touristic Place</h1>
    <form @submit.prevent="submitForm">
      <!-- Place Name Textbox -->
      <div class="form-group">
        <label for="placeName">Place Name</label>
        <input type="text" id="placeName" v-model="tplace.name" required placeholder="Enter place name" />
      </div>

      <!-- Description Textarea -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="tplace.description" required placeholder="Enter description"></textarea>
      </div>

      <!-- Location Dropdown -->
      <div class="form-group">
        <label for="location">Location</label>
        <select id="location" v-model="tplace.locationId" required>
          <option value="">Select a location</option>
          <option v-for="location in locations" :key="location.id" :value="location.id">
            {{ location.city }}, {{ location.country }}
          </option>
        </select>
      </div>

      <!-- Category Dropdown -->
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="tplace.categoryId" required>
          <option value="">Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Submit Button -->
      <div class="form-group">
        <button type="submit">Create Place</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import axios from 'axios';

// Define an interface for location objects
interface Location {
  id: number;
  country: string;
  city: string;
  slug: string;
  latitude: string;
  longitude: string;
}

interface category {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'TPlaceCreateForm',
  setup() {
    const tplace = reactive({
      name: '',
      description: '',
      location: '', // Make sure this matches the field name expected by your API
      category: '', // Make sure this matches the field name expected by your API
      // ... other TPlace fields ...
    });

    // Specify that locations is an array of Location objects
    const locations = reactive<Location[]>([]);
    const categories = reactive<Location[]>([]);

    const submitForm = async () => {
      // ... submit logic ...
    };

    const fetchLocations = async () => {
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      try {
        const response = await axios.get(`${baseUrl}/api/locations/`); 
        locations.push(...response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCategories = async () => {
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      try {
        const response = await axios.get(`${baseUrl}/api/categories/`); 
        categories.push(...response.data);
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchLocations();
      fetchCategories();
    });

    return {
      tplace,
      locations,
      categories,
      submitForm,
    };
  },
});
</script>

<style scoped>
.tplace-create-form {
  max-width: 500px;
  margin: auto;
  padding: 1em;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5em;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  background-color: #1a7eb9;
  color: white;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #106ba3;
}
</style>
