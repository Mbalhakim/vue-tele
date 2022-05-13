import { createRouter, createWebHistory } from 'vue-router'

import Home from "@/views/Home";
import Login from "@/views/Login";
import Project from "@/views/Project";
import ChatApp from "@/views/ChatApp";
import SoTest from "@/views/SoTest";
import Remote from "@/views/Remote";



const routes = [

  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/chat',
    name: 'ChatApp',
    component: ChatApp
  },
  {
    path: '/socket',
    name: 'SoTest',
    component: SoTest
  },
  {
    path: '/remote',
    name: 'Remote',
    component: Remote
  },

  {
    path: '/project/:id',
    name: 'project',
    component: Project
  },


  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const isLoggedIn = () =>{
  return localStorage.getItem('jwtToken')

}
const protectedRoutes = [
  "Home",
  "Project"
]
router.beforeEach((to, from, next)=>{
  const isProtected = protectedRoutes.includes(to.name)
  if(isProtected && !isLoggedIn()) {
    next({
      path: '/login'
    })
  }else next()
})

export default router
