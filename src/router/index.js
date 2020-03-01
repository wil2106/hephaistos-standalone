import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Exercise from '../views/Exercise.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    component: PageNotFound
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
    /*
    get component () {
      if (Vue.prototype.$session.connected) {
        return Home
      } else {
        return Login
      }
    }
    */
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: Exercise
  }
]

const router = new VueRouter({
  routes
})

export default router
