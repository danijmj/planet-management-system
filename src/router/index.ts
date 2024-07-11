import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


export const RouteNames = {
  HOME: 'home',
  PLANET: 'planet',
  EDITPLANET: 'edit-planet',
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
      path: '/planet/:id?',
      name: RouteNames.PLANET,
      meta: {
        title: 'View Planet',
      },
      component: () => import('@/views/ViewPlanet.vue'),
      props: true,
      children: [
        {
          path: 'edit',
          name: RouteNames.EDITPLANET,
          meta: {
            title: 'Edit Planet',
          },
          component: import('@/views/ViewPlanet.vue'),
          props: true,
        },
      ]
    }
  ]
})


export default router
