<template>
  <div class="me container">
    <div class="row">
      <div class="col-sm-offset-3 col-sm-6 col-1">
        <div class="panel panel-default">
          <div class="panel-heading">You are logged in as {{ username }}</div>
          <div class="panel-body">
            <button class="btn btn-info pull-right" type="button" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
import db from 'baqend'
import router from '../router'

export default {
  data () {
    return {
      username: null
    }
  },
  methods: {
    logout () {
      db.User.logout().then(() => {
        router.push('signup')
      })
    }
  },
  created () {
    this.username = db.User.me.username
  },
  beforeRouteEnter (to, from, next) {
    if (!db.User.me) {
      next('signup')
    } else {
      next()
    }
  }
}
</script>
