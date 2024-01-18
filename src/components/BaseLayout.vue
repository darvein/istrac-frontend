<template>
  <div class="grid-container">
    <header class="header">
      <img width="3%" src="/logo.png" alt="Logo" class="logo">
      <h1>Rutazz</h1>
      <auth-buttons></auth-buttons>
    </header>
    <aside class="sidebar"><slot name="sidebar"></slot></aside>
    <main class="content">
      <slot></slot>
    </main>
    <footer class="footer">
      <a href=#>Inicio</a> | 
      <a href=#>Nosotros</a> | 
      <a href=#>Contacto</a>
      <p>© 2023 Rutazz. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

 <style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 0.7fr 4.3fr; /* Sidebar takes 1 fraction, content takes 4 fractions */
  grid-template-rows: auto 1fr auto; /* Header and footer size to content, middle row takes remaining space */
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  min-height: 100vh; /* Full viewport height */
}

.header {
  grid-area: header;
  background-color: #38bfc8; /* Solid dark blue background */
  background: linear-gradient(to bottom, #4aa0dc, #1a7eb9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0; /* Ensure it fits edge to edge */
  padding: 0; /* Comfortable padding inside the header */
  width: 100%; /* Full width */
  display: flex; /* Flexbox for layout */
  align-items: center; /* Vertically center content */
}

.header h1 {
  margin: 0 0 0 15px;
  font-weight: 800;
  color: #fff;
  font-size: 2.5em;
}

.sidebar {
 grid-area: sidebar;
 padding: 10px; /* Add padding inside the sidebar */
 background-color: #fff; /* Example background color */
 border-right: 1px solid #ddd; /* Example border */
 margin: 10px 0 0 0;
}

 .content {
   grid-area: content;
   padding: 20px;
   /* Add your content styling here */
 }

 .footer {
   grid-area: footer;
   text-align: center;
   /* Add your footer styling here */
 }

 .logo {
   /* Style your logo here */
 }
 </style>

<script>
import AuthButtons from '@/components/AuthButtons.vue';

export default {
  components: {
    AuthButtons
  },
  // rest of your component's script
};
</script>
