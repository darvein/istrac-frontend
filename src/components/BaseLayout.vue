<template>
  <div class="grid-container">
    <header class="header">
      <button v-show="isMobile" @click="toggleSidebar" class="hamburger-btn">
        <i class="fas fa-bars"></i>
      </button>
      <router-link :to="{ name: 'listing' }"><h1>Rutazz</h1></router-link>
      <auth-buttons></auth-buttons>
    </header>
    <aside class="sidebar" v-show="isMobile ? showSidebar : true">
      <slot name="sidebar"></slot>
    </aside>
    <main class="content" v-show="!showSidebar">
      <slot></slot>
    </main>
    <footer class="footer" v-show="!showSidebar">
      <a href=#>Inicio</a> | <a href=#>Nosotros</a> | <a href=#>Contacto</a>
      <p>© 2024 Rutazz. Todos los derechos reservados.</p>
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


@media (max-width: 768px) {
   .grid-container {
     grid-template-columns: 1fr;
     grid-template-areas:
       "header"
       "content"
       "footer";
   }

  .sidebar {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    z-index: 100; 
    padding: 10px;
    margin: 0;
    border-right: none; 
    background: white; 
  }

  .header {
    position: relative; 
    z-index: 101; 
  }
}

.header {
  grid-area: header;
  background-color: #1a7eb9;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.5);
  margin: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjust this */
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
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

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
