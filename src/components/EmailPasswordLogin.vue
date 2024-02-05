<template>
  <div class="login-form">
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="loginWithEmail">Login</button>
    <!-- Error message -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default defineComponent({
  name: 'EmailPasswordLogin',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const loginWithEmail = async () => {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        // On successful login, redirect to the profile page
        router.push({ name: 'Profile' });
        } catch (error) {
          if (error instanceof Error) {
            errorMessage.value = error.message;
          } else {
            errorMessage.value = 'An unexpected error occurred';
          }
        }
    };

    return {
      email,
      password,
      errorMessage,
      loginWithEmail,
    };
  },
});
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
