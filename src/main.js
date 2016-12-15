// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import db from 'baqend'
import App from './App'
import Hello from './components/Hello'

db.connect('app-starter')

Vue.use(VueRouter)

function dbReady (to, from, next) {
  db.ready(() => next())
}

/**
 * Asynchronously load components (Webpack Lazy loading compatible)
 * @param  {string}   name     the filename (basename) of the component to load.
 */
function view (name) {
  return function (resolve) {
    require(['./components/' + name + '.vue'], resolve)
  }
}

const routes = [
  { path: '/', component: Hello },
  { path: '/chats', name: 'chats', component: view('Chats'), beforeEnter: dbReady },
  { path: '/chat/:id', name: 'chat', component: view('Chat'), beforeEnter: dbReady }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
