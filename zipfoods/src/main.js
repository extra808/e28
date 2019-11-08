import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomePage from './components/pages/HomePage.vue';
import ProductsPage from './components/pages/ProductsPage.vue';
import CategoriesPage from './components/pages/CategoriesPage.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { name: 'home', path: '/', component: HomePage },
  { name: 'products', path: '/products', component: ProductsPage },
  { name: 'categories', path: '/categories', component: CategoriesPage }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
