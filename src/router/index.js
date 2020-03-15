import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Module from '../views/Module.vue'
import Session from '../views/Session.vue'
import store from '../store/index'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter
  },
  {
    path: '/module/:id',
    name: 'Module',
    component: Module,
    beforeEnter
  },
  {
    path: '/session/:id',
    name: 'Session',
    component: Session,
    beforeEnter
  }
]

export default new VueRouter({ routes })
