import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router =   new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/home',
      component: () => import('./views/Home.vue'),
      children:[
        {
          path: 'page1',
          name: 'page1',
          meta:1,
          component: () => import('./views/Page1.vue')
        }, {
          path: 'page2',
          name: 'page2',
          meta:2,
          component: () => import('./views/Page2.vue')
        }, {
          path: 'page3',
          name: 'page3',
          meta:3,
          component: () => import('./views/Page3.vue')
        }, {
          path: 'page4',
          name: 'page4',
          meta:4,
          component: () => import('./views/Page4.vue')
        },{
          path: 'page5',
          name: 'page5',
          meta:5,
          component: () => import('./views/Page5.vue')
        },{
          path: 'page7',
          name: 'page7',
          meta:7,
          component: () => import('./views/Page7.vue')
        },{
          path: 'page6',
          name: 'page6',
          meta:6,
          component: () => import('./views/Page6.vue')
        },{
          path: 'page8',
          name: 'page8',
          meta:8,
          component: () => import('./views/Page8.vue')
        },{
          path: 'page9',
          name: 'page9',
          meta:8,
          component: () => import('./views/Page9.vue')
        },{
          path:'',
          redirect:'page1'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})

router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.getItem('loginUser')
  if(to.path == '/login'){
    next()
  }else{
    isLogin?next():next('/login')
  }
})

export default router
