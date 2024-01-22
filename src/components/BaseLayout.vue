<template>
  <div class="grid-container">
    <header class="header">

      <button v-show="isMobile" @click="toggleSidebar" class="hamburger-btn">
        <i class="fas fa-bars"></i>
      </button>
      <router-link :to="{ name: 'listing' }"> <h1>Rutazz</h1> <auth-buttons></auth-buttons> </router-link>
    </header>
    <aside class="sidebar" v-show="isMobile ? showSidebar : true">
      <slot name="sidebar"></slot>
    </aside>
    <main class="content" v-show="!showSidebar">
      <slot></slot>
    </main>
    <footer class="footer" v-show="!showSidebar">
      <a href=#>Inicio</a> | <a href=#>Nosotros</a> | <a href=#>Contacto</a>
      <p>© 2023 Rutazz. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

 <style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 0.7fr 4.3fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  min-height: 100vh;
}

.sidebar {
  grid-area: sidebar;
  padding: 10px;
  border-right: 1px solid #ddd;
  margin: 10px 0 0 0;
}

/* Styles for mobile */
@media (max-width: 768px) {
   .grid-container {
     grid-template-columns: 1fr;
     grid-template-areas:
       "header"
       "content"
       "footer";
   }

  .sidebar {
    position: absolute; /* Position the sidebar over the content */
    top: 0; /* Align the top of the sidebar with the top of the viewport */
    left: 0; /* Align the left of the sidebar with the left of the viewport */
    width: 100%; /* Make the sidebar full width */
    height: 100%; /* Make the sidebar full height */
    z-index: 100; /* Ensure the sidebar is above other content */
    padding: 10px;
    margin: 0;
    border-right: none; /* You might not need the border on mobile */
    background: white; /* Assuming you want a white background */
  }

  .header {
    position: relative; /* Make sure the header has a stacking context */
    z-index: 101; /* Ensure the header is above the sidebar */
  }
}

.header {
  grid-area: header;
  background-color: #1a7eb9; /* Solid dark blue background */
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
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

.header a {
  text-decoration: none;
}

.content {
 grid-area: content;
 padding: 20px;
 /* Add your content styling here */
}

.footer {
 grid-area: footer;
 text-align: center;
}

.logo {
 width: 70px;
}

.hamburger-btn {
  color: #fff;
  font-size: 1.2em;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 30px;
  width: 45px;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #333;
  transition: all 0.3s ease;
}

.hamburger-btn:hover .hamburger-line {
  background-color: #666;
}
 </style>

<script lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import AuthButtons from '@/components/AuthButtons.vue';
import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'BaseComponent',
  components: {
    AuthButtons
  },
  setup() {
    const route = useRoute();

    const isMobile = ref(window.innerWidth < 768);
    const showSidebar = ref(false);

    const updateWindowWidth = () => {
      isMobile.value = window.innerWidth < 768;
    };

    const toggleSidebar = () => {
      if (isMobile.value) {
        showSidebar.value = !showSidebar.value;
      }
    };

    const closeSidebar = () => {
     if (isMobile.value) {
       showSidebar.value = false;
     }
    };

    onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateWindowWidth);
    });

    watch(route, () => {
      if (showSidebar.value) {
        closeSidebar();
      }
    });

    return {
      isMobile,
      showSidebar,
      toggleSidebar,
      closeSidebar,
    };
  },
});
</script>
