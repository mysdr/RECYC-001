import Vue from 'vue'
import Router from 'vue-router'

const Dashboard = (resolve) => {
  import('components/dashboard/dashboard').then((module) => {
    resolve(module)
  })
}

const DashUser = (resolve) => {
  import('components/dash-user/dash-user').then((module) => {
    resolve(module)
  })
}

const EditorUser = (resolve) => {
  import('components/editor-user/editor-user').then((module) => {
    resolve(module)
  })
}

const CreatorUser = (resolve) => {
  import('components/creator-user/creator-user').then((module) => {
    resolve(module)
  })
}

const DashCourse = (resolve) => {
  import('components/dash-course/dash-course').then((module) => {
    resolve(module)
  })
}

const EditorCourse = (resolve) => {
  import('components/editor-course/editor-course').then((module) => {
    resolve(module)
  })
}

const CreatorCourse = (resolve) => {
  import('components/creator-course/creator-course').then((module) => {
    resolve(module)
  })
}

const DashBike = (resolve) => {
  import('components/dash-bike/dash-bike').then((module) => {
    resolve(module)
  })
}

const EditorBike = (resolve) => {
  import('components/editor-bike/editor-bike').then((module) => {
    resolve(module)
  })
}

const CreatorBike = (resolve) => {
  import('components/creator-bike/creator-bike').then((module) => {
    resolve(module)
  })
}

const DashOrder = (resolve) => {
  import('components/dash-order/dash-order').then((module) => {
    resolve(module)
  })
}

const EditorOrder = (resolve) => {
  import('components/editor-order/editor-order').then((module) => {
    resolve(module)
  })
}

const CreatorOrder = (resolve) => {
  import('components/creator-order/creator-order').then((module) => {
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
      redirect: '/user'
    },
    {
      path: '/user',
      component: Dashboard,
      children: [
        {
          path: '/',
          component: DashUser
        },
        {
          path: 'creator',
          component: CreatorUser
        },
        {
          path: ':id',
          component: EditorUser
        }
      ]
    },
    {
      path: '/course',
      component: Dashboard,
      children: [
        {
          path: '/',
          component: DashCourse
        },
        {
          path: 'creator',
          component: CreatorCourse
        },
        {
          path: ':id',
          component: EditorCourse
        }
      ]
    },
    {
      path: '/order',
      component: Dashboard,
      children: [
        {
          path: '/',
          component: DashOrder
        },
        {
          path: 'creator',
          component: CreatorOrder
        },
        {
          path: ':id',
          component: EditorOrder
        }
      ]
    },
    {
      path: '/bike',
      component: Dashboard,
      children: [
        {
          path: '/',
          component: DashBike
        },
        {
          path: 'creator',
          component: CreatorBike
        },
        {
          path: ':id',
          component: EditorBike
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})
