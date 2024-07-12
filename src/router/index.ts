import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewPlanet from '@/views/NewPlanet.vue'


export const RouteNames = {
  HOME: 'home',
  PLANET: 'planet',
  EDITPLANET: 'edit-planet',
  PLANETNEW: 'planet-new',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.HOME,
      component: HomeView
    },
    {
      path: '/planet/:id',
      name: RouteNames.PLANET,
      meta: {
        title: 'View Planet',
      },
      component: () => import('@/views/ViewPlanet.vue'),
      props: true,
    },
    
    {
      path: '/planet/edit/:id?',
      name: RouteNames.EDITPLANET,
      meta: {
        title: 'Edit Planet',
      },
      component: () => import('@/views/NewPlanet.vue'),
      props: true,
    },
    {
      path: '/planet/new',
      name: RouteNames.PLANETNEW,
      meta: {
        title: 'New Planet',
      },
      component: () => import('@/views/NewPlanet.vue')
    }
  ]
})


export default router
