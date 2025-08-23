import { createWebHashHistory, createRouter } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "home" */ '@/view/Index.vue' )
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import( /* webpackChunkName: "overview" */ '@/view/overview.vue' )
  },
  {
    path: '/species',
    name: 'Species',
    component: () => import( /* webpackChunkName: "species" */ '@/view/Species.vue' )
  },
  {
    path: '/monthly',
    name: 'Monthly',
    component: () => import( /* webpackChunkName: "monthly" */ '@/view/Monthly.vue' )
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import( /* webpackChunkName: "statistics" */ '@/view/Statistics.vue' )
  }
]

const router = createRouter( {
  history: createWebHashHistory(),
  routes,
} )

export default router