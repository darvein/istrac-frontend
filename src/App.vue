<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #172431;
  background-color: #f9f9fa; /* Facebook-like background color */
}

/* You might also want to set some base font sizes, weights, and line heights */
body {
  font-size: 16px; /* Base font size */
  font-weight: 400; /* Regular weight */
  line-height: 1.6; /* Spacing for readability */
  margin: 0px;
  padding: 0px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700; /* Bold weight for headings */
}
</style>
