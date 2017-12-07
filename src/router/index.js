import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      hidden: true,
      redirect: {path: '/register'}
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/components/Register'], resolve)
    },
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Home'], resolve),
      children: [
        {
          path: '/user',
          name: 'User',
          component: resolve => require(['@/components/UserList'], resolve)
        },
        {
          path: '/upload',
          name: 'Upload',
          component: resolve => require(['@/components/Upload'], resolve)
        }
      ]
    }
    // {
    //   path: '/404',
    //   component: resolve => require(['@/views/404'], resolve),
    //   name: '',
    //   hidden: true
    // },
    // {
    //   path: '*',
    //   hidden: true,
    //   redirect: {path: '/404'}
    // }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
