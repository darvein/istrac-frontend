<!-- src/components/ProfilePage.vue -->
<template>
  <div class="profile-page">
    <h1>Profile</h1>
    <div v-if="user">
      <p>Welcome, {{ user.displayName || user.email }}!</p>
      <p>Email: {{ user.email }}</p>
      <img v-if="user.photoURL" :src="user.photoURL" alt="Profile photo" class="profile-photo">
    </div>
    <div v-else>
      <p>User is not logged in.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getAuth, User } from 'firebase/auth'; // Import the User type

export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const user = ref<User | null>(null);

    onMounted(() => {
      const auth = getAuth();
      user.value = auth.currentUser;
    });

    return {
      user,
    };
  },
});
</script>

<style scoped>
.profile-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
}
</style>
