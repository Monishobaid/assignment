import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Product from './pages/Product.vue'
import Cart from './pages/Cart.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

const routes = [
  { path: '/', component: Home, },
  { path: '/product/:productId', component: Product,},
  { path: '/cart', component: Cart,},
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user);
//       },
//       reject
//     );
//   });
// };

// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = await getCurrentUser();
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (isAuthenticated) {
//       next();
//     } else {
//       alert('You do not have access');
//       next('/login');
//     }
//   } else {
//     if (isAuthenticated && (to.name === 'Login' || to.name === 'Signup')) {
//       next('/');
//     } else {
//       next();
//     }
//   }
// });

export default router;
