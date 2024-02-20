<template>
  <base-layout>
    <template #header></template>

    <template #sidebar>
      sidebar
    </template>

    <div class="listing">
      <profile-page></profile-page>
    </div>

  </base-layout>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import BaseLayout from '@/components/BaseLayout.vue';
  import ProfilePage from '@/components/ProfilePage.vue'

  export default defineComponent({
    name: 'UserProfileView',
    components: {
      BaseLayout,
      ProfilePage,
    }
  });
</script>
