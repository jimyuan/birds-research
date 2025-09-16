import { createWebHashHistory, createRouter } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import( /* webpackChunkName: "home" */ '@/view/Index.vue' ),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import( /* webpackChunkName: "overview" */ '@/view/Home/Index.vue' )
      },
      {
        path: 'overview',
        name: 'Overview',
        component: () => import( /* webpackChunkName: "overview" */ '@/view/Overview/Index.vue' )
      },
      {
        path: 'species',
        name: 'Species',
        component: () => import( /* webpackChunkName: "species" */ '@/view/Species/Index.vue' )
      },
      {
        path: 'monthly',
        name: 'Monthly',
        component: () => import( /* webpackChunkName: "monthly" */ '@/view/Monthly/Index.vue' )
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import( /* webpackChunkName: "statistics" */ '@/view/Statistics/Index.vue' )
      }
    ]
  }
]

const router = createRouter( {
  history: createWebHashHistory(),
  routes,
} )

export default router