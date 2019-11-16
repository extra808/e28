import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import HomePage from './components/pages/HomePage.vue'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { name: 'home', path: '/', component: HomePage },
  { name: 'post', path: '/:path/:slug', component: HomePage }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
