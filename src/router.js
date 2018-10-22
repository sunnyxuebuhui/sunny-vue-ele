import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/index/index'
import City from './views/city/city'
import CityDetail from './views/city/cityDetail'
import Profile from './views/profile/profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cityDetail',
      name: 'cityDetail',
      component: CityDetail
    },
    {
      path: '/city',
      name: 'city',
      component: City
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
