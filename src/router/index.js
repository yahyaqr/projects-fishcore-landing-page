import { createRouter, createWebHistory } from 'vue-router';

// Import your pages
import Home from '../pages/Home.vue';
import Login from '../pages/LoginRegister.vue';
import Loading from '../pages/Loading.vue';
import Onboarding from '../pages/Onboarding.vue';
import Dashboard from '../pages/Dashboard.vue';
import MainMenu from '../pages/MainMenu.vue';
import Achievements from '../pages/Achievements.vue';
// import Simulation from '../pages/Simulation.vue';
import Simulation from '../pages/simulation/MainLayout.vue';
import Simulation1 from '../bk/v1/Simulation.vue';
import Simulation2 from '../bk/v2/Simulation.vue';
import Simulation3 from '../bk/v3/Simulation.vue';
import Simulation4 from '../bk/v4/Simulation.vue';
import Simulation5 from '../bk/v5/Simulation.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/onboarding', name: 'Onboarding', component: Onboarding },
  { path: '/loading', name: 'Loading', component: Loading },
  { path: '/simulation', name: 'Simulation', component: Simulation },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/main-menu', name: 'MainMenu', component: MainMenu },
  { path: '/achievements', name: 'Achievements', component: Achievements },
  { path: '/bk', name: 'Simulation1', component: Simulation1 },
  { path: '/bk2', name: 'Simulation2', component: Simulation2 },
  { path: '/bk3', name: 'Simulation3', component: Simulation3 },
  { path: '/bk4', name: 'Simulation4', component: Simulation4 },
  { path: '/bk5', name: 'Simulation5', component: Simulation5 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
