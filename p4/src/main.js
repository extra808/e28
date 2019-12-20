import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import store from './store'
import HomePage from './components/pages/HomePage.vue'
import PostPage from './components/pages/PostPage.vue'
import QuestionPage from './components/pages/QuestionPage.vue'
import PostsList from './components/PostsList.vue'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuelidate);

const routes = [
  { name: 'home', path: '/', component: HomePage },
  { name: 'post', path: '/:path/:id/:slug', component: PostPage, props: true },
  { name: 'tag', path: '/:path/:tag', component: PostsList, props: true },
  { name: 'question', path: '/question', component: QuestionPage }
]

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
