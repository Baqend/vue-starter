import db from 'baqend'
import Hello from './components/Hello'
import VueRouter from 'vue-router'

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
  { path: '/chat/:id', name: 'chat', component: view('Chat'), beforeEnter: dbReady },
  { path: '/signup', name: 'signup', component: view('Signup'), beforeEnter: dbReady },
  { path: '/me', name: 'me', component: view('Me'), beforeEnter: dbReady }
]

const router = new VueRouter({
  routes
})

export default router
