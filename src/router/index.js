import Vue from 'vue'
import Router from 'vue-router'
import VueMonthlyPicker from '@/components/VueMonthlyPicker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueMonthlyPicker',
      component: VueMonthlyPicker
    }
  ]
})
