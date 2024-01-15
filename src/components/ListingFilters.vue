<template>
  <aside class="listing-filters">
    <ul class="filter-list">
      <li class="filter-item">
        <i class="fas fa-search"></i>
        <span>Search</span>
      </li>
      <li class="filter-item">
        <i class="fas fa-tags"></i>
        <span>Categories</span>
      </li>
      <li class="filter-item">
        <i class="fas fa-map-marker-alt"></i>
        <span>Location</span>
      </li>
      <li class="filter-item">
        <i class="fas fa-sliders-h"></i>
        <span>More Filters</span>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'ListingFilters',
  // You can add props, data, methods, etc. here as needed
};
</script>

<style scoped>
.listing-filters {
  /* Add styles for the sidebar here */
}

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.filter-item i {
  margin-right: 8px;
}

.filter-item:hover {
  background-color: #f0f2f5;
}
</style>
