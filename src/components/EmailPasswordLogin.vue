<template>
  <div class="login-form-wrapper">
    <div class="login-form">
      <input type="email" v-model="email" placeholder="Email" class="login-input"/>
      <input type="password" v-model="password" placeholder="Password" class="login-input"/>
      <button @click="loginWithEmail" class="login-button">Login</button>
      <!-- Error message -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
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
.login-form-wrapper {
  align-items: center;
  padding-top: 20px; /* Add some padding at the top */
  height: 100vh;
}

.login-form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  background: white;
}

.login-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #d32f2f;
  font-size: 14px;
  margin-top: 10px;
}
</style>
