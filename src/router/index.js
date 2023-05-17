import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ImpressumView from '../views/ImpressumView.vue'
import NewTodoView from '../views/NewTodoView.vue'
import EditTodoView from '../views/EditTodoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditTodoView
  },
  {
    path: '/newtodo',
    name: 'new',
    component: NewTodoView
  },
  {
    path: '/impressum',
    name: 'impressum',
    component: ImpressumView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
