import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import main from '../components/main'
import login from '../components/main/login'
import regedit from '../components/main/regedit'
import page from '../components/page'
import purchase from '../components/page/purchase'
import store from '../components/page/store'

import purchaseTable from '../components/page/purchase/purchaseTable'
import storeTable from '../components/page/store/storeTable'
import storeOut from '../components/page/store/storeOut'
import storeIn from '../components/page/store/storeIn'
import outList from '../components/page/store/outList'

import tableQuery from '../components/page/purchase/tableQuery'
import purchaseQuery from '../components/page/purchase/purchaseQuery'
import PW from '../components/page/purchase/PW'
import cgListQuery from '../components/page/purchase/cgListQuery'
import cgListDetails from '../components/page/purchase/cgListDetails'

import supplier from '../components/page/supplier'
import goods from '../components/page/goods'
import depot from '../components/page/depot'
import department from '../components/page/department'

import executive from '../components/page/executive'

import table1 from '../components/page/purchase/table1'
import table2 from '../components/page/purchase/table2'


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
              path:'cgListDetails',
              name:'cgListDetails',
              component:cgListDetails
            },
            {
              path:'purchaseQuery',
              name:'purchaseQuery',
              component:purchaseQuery,
              children:[
                {
                  path:'table1',
                  name:'table1',
                  component:table1
                }
              ]
            },
            {
              path:'tableQuery',
              name:'tableQuery',
              component:tableQuery
            },
            {
              path:'cgListQuery',
              name:'cgListQuery',
              component:cgListQuery,
              children:[
                {
                  path:'table2',
                  name:'table2',
                  component:table2
                }
              ]
            },
            {
              path:'PW',
              name:'PW',
              component:PW
            },
            {
              path:'/',
              name:'purchaseTable',
              component:purchaseTable
            }
          ]
        },
        {
          path:'store',
          name:'store',
          component:store,
          children:[
            {
              path:'storeTable',
              name:'storeTable',
              component:storeTable
            },
            {
              path:'storeOut',
              name:'storeOut',
              component:storeOut
            },
            {
              path:'storeIn',
              name:'storeIn',
              component:storeIn
            },
            {
              path:'outList',
              name:'outList',
              component:outList
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
        },
        {
          path:'depot',
          name:'depot',
          component:depot
        },
        {
          path:'executive',
          name:'executive',
          component:executive
        },
        {
          path:'department',
          name:'department',
          component:department
        },
      ]
    },
    {
      path:'/',
      redirect:'/main'
    }
  ],
  mode:'history'
})
