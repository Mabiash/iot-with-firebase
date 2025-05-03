import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue' // create a Login.vue view
import sample from '../views/sample.vue'
const routes = [
  { path: '/', redirect: '/dashboard' },
  { 
    path: '/dashboard', 
    name: 'Home', 
    component: Home,
    // meta: { requiresAuth: true } // ✅ this route requires authentication
  },
  {
    path: '/sample',
    name: 'sample',
    component: sample
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Global Navigation Guard
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

//   if (requiresAuth && !token) {
//     next('/login') // redirect to login if not authenticated
//   } else {
//     next() // proceed as normal
//   }
// })

export default router
