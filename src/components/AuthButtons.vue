<template>
  <div class="auth-buttons">
    <button class="btn-login">Login</button>
    <button class="btn-signup">Signup</button>
  </div>
</template>

<script>
export default {
  name: 'AuthButtons',
  // You can add props, data, methods, etc. here as needed
};
</script>

<style scoped>
.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between buttons */
}

.btn-login,
.btn-signup {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login {
  background-color: #fff;
  color: #333;
}

.btn-login:hover {
  background-color: #f0f2f5;
}

.btn-signup {
  background-color: #007bff;
  color: #fff;
}

.btn-signup:hover {
  background-color: #0056b3;
}
</style>
