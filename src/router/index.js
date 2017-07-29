import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = (resolve) => {
  import('components/dashboard/dashboard').then((module) => {
    resolve(module)
  })
}

const Login = (resolve) => {
  import('components/login/login').then((module) => {
    resolve(module)
  })
}

const Error404 = (resolve) => {
  import('components/error/404').then((module) => {
    resolve(module)
  })
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/404',
      component: Error404
    },
    {
      path: '/',
      component: Dashboard
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
