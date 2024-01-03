<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'App',
    data() {
      return {
        stringList: ['beatles', 'rollingstones', 'eminem', 'michaeljackson']
      }
    },
  })
</script>

<template>
  <div id="app">
    <h1>Demo Site!</h1>
    <ul>
      <li v-for="item in stringList" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
