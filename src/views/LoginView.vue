<template>
  <div class="login-page">
    <!-- Your login form component -->
    <email-password-login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EmailPasswordLogin from '@/components/EmailPasswordLogin.vue'; // Update the import path as necessary

export default defineComponent({
  name: 'LoginView',
  components: {
    EmailPasswordLogin
  }
});
</script>
