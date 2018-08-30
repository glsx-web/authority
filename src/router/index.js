import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/views/menu'
import User from '@/views/user'
import Role from '@/views/role'
import Department from '@/views/department'

// const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const routers = [
  { path: '/', redirect: {name: 'menu'} },
  { name: 'menu', path: '/menu', component: Menu },
  { name: 'user', path: '/user', component: User },
  { name: 'role', path: '/role', component: Role },
  { name: 'department', path: '/department', component: Department }
]

const router = new Router({
  routes: routers
})

export default router
