import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Orders from '../views/Orders.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: SignIn,
    },
    {
      path: "/orders",
      component: Orders,
    },
  ]
})

export default router;