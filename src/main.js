import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import VueSweetAlert from 'vue-sweetalert'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { loadToken } from 'common/js/cache'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
Vue.use(iView)
Vue.use(VueSweetAlert)

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (loadToken() !== 'null') { // 判断是否有token
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
