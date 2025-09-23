import { createWebHashHistory, createRouter } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import( /* webpackChunkName: "Index" */ '@/view/Index.vue' ),
    children: [
      // 首页
      {
        path: '',
        name: 'Home',
        component: () => import( /* webpackChunkName: "Home" */ '@/view/Home/Index.vue' )
      },
      // 全年概况
      {
        path: 'overview',
        name: 'Overview',
        component: () => import( /* webpackChunkName: "Overview" */ '@/view/Overview/Index.vue' )
      },
      // 鸟种列表
      {
        path: 'species',
        name: 'Species',
        component: () => import( /* webpackChunkName: "Species" */ '@/view/Species/Index.vue' ),
        children: [
          {
            path: '',
            name: 'SpeciesList',
            component: () => import( /* webpackChunkName: "SpeciesList" */ '@/view/Species/List.vue' )
          },
          {
            path: ':id',
            name: 'SpeciesDetail',
            component: () => import( /* webpackChunkName: "SpeciesDetail" */ '@/view/Species/Detail.vue' )
          }
        ]
      },
      // 每月数据
      {
        path: 'monthly',
        name: 'Monthly',
        component: () => import( /* webpackChunkName: "Monthly" */ '@/view/Monthly/Index.vue' )
      },
      // 综合统计
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import( /* webpackChunkName: "Statistics" */ '@/view/Statistics/Index.vue' ),
        children: [
          {
            path: '',
            redirect: { name: 'AllYear' }
          },
          {
            path: 'all-year',
            name: 'AllYear',
            component: () => import( /* webpackChunkName: "AllYear" */ '@/view/Statistics/AllYear.vue' )
          },
          {
            path: 'common-spec',
            name: 'CommonSpec',
            component: () => import( /* webpackChunkName: "CommonSpec" */ '@/view/Statistics/CommonSpec.vue' )
          }
        ]
      }
    ]
  }
]

const router = createRouter( {
  history: createWebHashHistory(),
  routes,
} )

export default router