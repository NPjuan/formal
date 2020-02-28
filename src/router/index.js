import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import HomePage from '../components/HomePage'
import Bottle from '../components/Bottle'
import Instructions from '../components/Instructions'
import BrushFace from '../components/BrushFace'
import YCT from '../components/YCT'

export default new Router({
  routes: [
    {
      name: 'HomePage',
      path: '/',
      component: HomePage
    },
    {
      name: 'Bottle',
      path: '/bottle',
      component: Bottle
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
    },
    {
      name: 'YCT',
      path: '/yct',
      component: YCT
    }
  ]
})
