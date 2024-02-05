<template>
  <base-layout>
    <template #header></template>

    <template #sidebar>
      hello
    </template>

    <div class="listing">
      <profile-page></profile-page>
    </div>

  </base-layout>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import ProfilePage from '@/components/ProfilePage.vue'

  export default defineComponent({
    name: 'UserProfileView',
    components: {
      ProfilePage,
    }
  });
</script>
