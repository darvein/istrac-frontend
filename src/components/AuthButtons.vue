<template>
  <div class="auth-buttons">
    <router-link v-if="isAuthenticated" to="/create-location" class="btn btn-profile">
      <i class="fas fa-location-arrow"></i> Crear Localidad
    </router-link>
    <router-link v-if="isAuthenticated" to="/profile" class="btn btn-profile">
      <i class="fas fa-user"></i> Profile
    </router-link>
    <router-link v-if="isAuthenticated" to="/logout" class="btn btn-logout">
      <i class="fas fa-sign-out-alt"></i> Salir
    </router-link>
    <router-link v-else to="/login" class="btn btn-login">
      <i class="fas fa-sign-in-alt"></i> Ingresar
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default defineComponent({
  name: 'AuthButtons',

  setup() {
    const isAuthenticated = ref(false);
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      isAuthenticated.value = !!user;
    });

    return {
      isAuthenticated,
    };
  },
});
</script>

<style scoped>
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 15px;
}

.btn {
  display: inline-flex; /* Change to inline-flex to ensure buttons do not stretch */
  align-items: center;
  justify-content: center; /* Center the content */
  gap: 5px;
  padding: 8px 16px; /* Consistent padding */
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  font-weight: bold;
  text-decoration: none; /* Remove underline from links */
  font-size: 1em; /* Ensure the font size is consistent */
  white-space: nowrap; /* Prevent wrapping of text/content */
}

.btn:hover {
  background-color: #fff;
  color: #1a7eb9;
  border-color: #1a7eb9;
}

.fas {
  font-size: 1em;
}
</style>
