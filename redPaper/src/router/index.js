import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Record from '@/components/record'
import Rule from '@/components/rule'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Record',
      name: 'Record',
      component: Record
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    },
  ]
})
// router.beforeEach((to, from, next) => {
//   if(to=='/'){

//   }
// })
export default router;