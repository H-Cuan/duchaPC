import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    meta: { requireAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home/home.vue'),
    children: [
      // 个人门户
      {
        path: '/home/personalPortal',
        name: 'personalPortal',
        component: () => import('../components/personalPortal.vue'),
        meta: { requireAuth: true }
      },
      // 监督内容统计
      {
        path: '/home/supervisionContent',
        name: 'personalPortal',
        component: () => import('../components/supervisionContent.vue'),
        meta: { requireAuth: true }
      },
      // 监督内容搜索
      {
        path: '/home/supervisionContentSearch',
        name: 'personalPortal',
        component: () => import('../components/supervisionContentSearch.vue'),
        meta: { requireAuth: true }
      },
      // 账号设置管理
      {
        path: '/home/accountSettings',
        name: 'personalPortal',
        component: () => import('../components/accountSettings.vue'),
        meta: { requireAuth: true }
      },
      // 权限设置管理
      {
        path: '/home/permissions',
        name: 'personalPortal',
        component: () => import('../components/permissions.vue'),
        meta: { requireAuth: true }
      },
      // 人员信息管理
      {
        path: '/home/peopleInformation',
        name: 'personalPortal',
        component: () => import('../components/peopleInformation.vue'),
        meta: { requireAuth: true }
      },
      // 设备信息管理
      {
        path: '/home/equipment',
        name: 'personalPortal',
        component: () => import('../components/equipment.vue'),
        meta: { requireAuth: true }
      },
      // 人机关联记录
      {
        path: '/home/RelationalRecord',
        name: 'personalPortal',
        component: () => import('../components/RelationalRecord.vue'),
        meta: { requireAuth: true }
      },
      // 监督内容列表
      {
        path: '/home/superviseList',
        name: 'personalPortal',
        component: () => import('../components/superviseList.vue'),
        meta: { requireAuth: true }
      },
      // APP登录记录
      {
        path: '/home/appLogin',
        name: 'personalPortal',
        component: () => import('../components/appLogin.vue'),
        meta: { requireAuth: true }
      },
      // 个人中心
      {
        path: '/home/personalCenter',
        name: 'personalPortal',
        component: () => import('../components/personalCenter.vue'),
        meta: { requireAuth: true }
      },
      // 权限管理
      {
        path: '/home/userControl',
        name: 'personalPortal',
        component: () => import('../components/userControl.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/home/roleManagement',
        name: 'personalPortal',
        component: () => import('../components/roleManagement.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/home/divisionalManagement',
        name: 'personalPortal',
        component: () => import('../components/divisionalManagement.vue'),
        meta: { requireAuth: true }
      },
      {
        path: '/home/postManagement',
        name: 'personalPortal',
        component: () => import('../components/postManagement.vue'),
        meta: { requireAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
