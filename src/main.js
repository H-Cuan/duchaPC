import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api' //
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('Token')) { // 判断本地是否存在token
      next()
    } else {
      if (to.path === '/') {
        next()
      } else {
        alert('请先进行登录！')
        next({
          path: '/'
        })
      }
    }
  } else {
    next()
  }
  /* 如果本地 存在 token 则 不允许直接跳转到 登录页面 */
  if (to.fullPath === '/') {
    if (localStorage.getItem('Token')) {
      alert('您已经登录了，如果想要登录其他账号，请先退出当前账号！')
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
})
