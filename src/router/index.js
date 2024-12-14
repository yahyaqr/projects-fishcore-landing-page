import { createRouter, createWebHistory } from 'vue-router';

// Import your pages
import Home from '../pages/Home.vue';
import Onboarding from '../pages/onboarding/Onboarding.vue';
import Dashboard from '../pages/Dashboard.vue';
import MainMenu from '../pages/MainMenu.vue';
import Achievements from '../pages/Achievements.vue';
import Simulation from '../pages/v1/Simulation.vue';
import Simulation2 from '../pages/v2/Simulation.vue';
import Simulation3 from '../pages/v3/Simulation.vue';
import Simulation4 from '../pages/v4/Simulation.vue';
import Simulation5 from '../pages/v5/Simulation.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/onboarding', name: 'Onboarding', component: Onboarding },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/main-menu', name: 'MainMenu', component: MainMenu },
  { path: '/achievements', name: 'Achievements', component: Achievements },
  { path: '/simulation', name: 'Simulation', component: Simulation },
  { path: '/simulation2', name: 'Simulation2', component: Simulation2 },
  { path: '/simulation3', name: 'Simulation3', component: Simulation3 },
  { path: '/simulation4', name: 'Simulation4', component: Simulation4 },
  { path: '/simulation5', name: 'Simulation5', component: Simulation5 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
