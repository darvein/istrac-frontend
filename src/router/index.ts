import { getAuth, signOut } from "firebase/auth";
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import ListingView from '@/views/ListingView.vue'
import LoginView from '@/views/LoginView.vue'; // Update the import path as necessary
import PlaceDetail from '@/components/PlaceDetail.vue';
import UserProfileView from '@/views/UserProfileView.vue'; 
import CreateTPlaceForm from '@/views/CreateTplaceForm.vue';

import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
const LogoutComponent = {
  template: '<div></div>', // Dummy component, no real template needed
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    const auth = getAuth();
    signOut(auth).then(() => next('/login')).catch(() => next('/login'));
  }
};

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'listing',
    component: ListingView,
    props: true,
  },
  {
    path: '/places/:city',
    name: 'PlacesFilter',
    component: ListingView,
    props: true,
  },
  {
    path: '/listing',
    name: 'CategoryFilter',
    component: ListingView,
  },
  {
    path: '/places/:id',
    name: 'PlaceDetail',
    component: PlaceDetail,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfileView,
    meta: { requiresAuth: true }
  },
  {
    path: '/create-location',
    name: 'CreateLocation',
    component: CreateTPlaceForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutComponent
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'router-link-active', // This should match your CSS class
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();
  const isAuthenticated = auth.currentUser;
  const goingToLoginPage = to.path === '/login';

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if(goingToLoginPage && isAuthenticated) {
    next('/profile')
  } else {
    next();
  }
});

export default router
