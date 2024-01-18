<template>
  <base-layout>
    <template #header></template>

    <template #sidebar>
      <listing-filters></listing-filters>
    </template>

    <div class="listing">
      <h2>Destinos Turisticos</h2>
      <listing-items></listing-items>
    </div>

  </base-layout>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import BaseLayout from '@/components/BaseLayout.vue';
  import ListingItems from '@/components/ListingItems.vue'
  import ListingFilters from '@/components/ListingFilters.vue'

  export default defineComponent({
    name: 'ListingView',
    components: {
      BaseLayout,
      ListingItems,
      ListingFilters,
    }
  });
</script>
