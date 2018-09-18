import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import main from '../components/main'
import login from '../components/main/login'
import regedit from '../components/main/regedit'
import page from '../components/page'
import purchase from '../components/page/purchase'
import purchaseTable from '../components/page/purchase/purchaseTable'
import tableQuery from '../components/page/purchase/tableQuery'
import supplier from '../components/page/supplier'
import goods from '../components/page/goods'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: main,
      children:[
        {
          path:'login',
          name:'login',
          component:login
        },
        {
          path:'regedit',
          name:'regedit',
          component:regedit
        },
        
        {
          path:'',
          component:login
        }
      ]
    },
    {
      path:'/page',
      name:'page',
      component:page,
      children:[
        {
          path:'purchase',
          name:'purchase',
          component:purchase,
          children:[
            {
              path:'purchaseTable',
              name:'purchaseTable',
              component:purchaseTable
            },
            {
              path:'tableQuery',
              name:'tableQuery',
              component:tableQuery
            },
            {
              path:'/',
              name:'purchaseTable',
              component:purchaseTable
            }
          ]
        },
        {
          path:'supplier',
          name:'supplier',
          component:supplier
        },
        {
          path:'goods',
          name:'goods',
          component:goods
        }
      ]
    },
    {
      path:'/',
      redirect:'/main'
    }
  ],
  mode:'history'
})
