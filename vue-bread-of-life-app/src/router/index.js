import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VueChartJS from '@/views/VueChartJS'

// possible import for getting data from the chart
//import VueChartJS from '@/views/VueChartJS'


// Define some routes
// Each route should map to a component.
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Create_Event',
    name: 'Create_Event',
    component: () => import('../components/CreateEvent')
  },
  {
    path: '/View_Event',
    name: 'View_Event',
    component: () => import('../components/EventList')
  },
  {
    path: '/Edit_Event/:id',
    name: 'Edit_Event',
    component: () => import('../components/EditEvent')
  },
  {
    path: '/Create_User',
    name: 'Create_User',
    component: () => import('../components/CreateUser')
  },
  {
    path: '/View_User',
    name: 'View_User',
    component: () => import('../components/UserList')
  },
  {
    path: '/Edit_User/:id',
    name: 'Edit_User',
    component: () => import('../components/EditUser')
  },
  {

    path: '/chartjs',

    name: 'VueChartJS',

    component: VueChartJS

    },
]

// Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // short for `routes: routes`
})

export default router
