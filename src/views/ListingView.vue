<template>
  <div class="listing">
    <h1>Yo broki</h1>
    <h2>aki la lista de lugares turisticos</h2>

    <listing-items></listing-items>
  </div>
</template>


<script lang="ts">
  import {defineComponent} from 'vue';
  import ListingItems from '../components/ListingItems.vue'

  export default defineComponent({
    name: 'ListingView',
    components: {
      ListingItems
    }
  });
</script>
