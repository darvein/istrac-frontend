<template>
  <base-layout>
    <template #header></template>

    <template #sidebar>
      sidebar
    </template>

    <div class="login-page">
      <email-password-login />
    </div>

  </base-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from '@/components/BaseLayout.vue';
import EmailPasswordLogin from '@/components/EmailPasswordLogin.vue'; 

export default defineComponent({
  name: 'LoginView',
  components: {
    BaseLayout,
    EmailPasswordLogin
  }
});
</script>
