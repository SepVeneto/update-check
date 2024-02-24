import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import AboutView from './components/AboutView.vue'

const router = createRouter({
  routes: [{ path: '/', component: HomeView }, { path: '/about', component: AboutView }],
  history: createWebHistory(),
})
createApp(App).use(router).mount('#app')
