import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/planet/:id?',
      name: 'planet',
      meta: {
        title: 'View Planet',
      },
      component: () => import('@/views/ViewPlanet.vue'),
      props: true,
      children: [
        {
          path: '/edit',
          name: 'edit-planet',
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
