import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListingView from '../views/ListingView.vue'
import PlaceDetail from '../components/PlaceDetail.vue';

const routes: Array<RouteRecordRaw> = [
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
    path: '/places/:id',
    name: 'PlaceDetail',
    component: PlaceDetail,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active', // Use 'active' as the class name for active links
  routes
})

export default router
