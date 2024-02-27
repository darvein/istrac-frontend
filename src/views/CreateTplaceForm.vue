<template>
  <base-layout>
    <template #header></template>

    <template #sidebar>
      sidebar
    </template>

    <div class="listing">
      <create-t-place-form></create-t-place-form>
    </div>

  </base-layout>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import BaseLayout from '@/components/BaseLayout.vue';
  import CreateTPlaceForm from '@/components/CreateTPlaceForm.vue'

  export default defineComponent({
    name: 'UserProfileView',
    components: {
      BaseLayout,
      CreateTPlaceForm
    }
  });
</script>
