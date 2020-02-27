import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import HomePage from '../components/HomePage'
import Instructions from '../components/Instructions'
import BrushFace from '../components/BrushFace'

export default new Router({
  routes: [
    {
      name: 'HomePage',
      path: '/',
      component: HomePage
    },
    {
      name: 'Instructions',
      path: '/instructions',
      component: Instructions
    },
    {
      name: 'BrushFace',
      path: '/brushFace',
      component: BrushFace
    }
  ]
})
