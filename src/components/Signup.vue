<template>
    <div class="signup container">
      <div class="row">
        <div class="col-sm-offset-3 col-sm-6 col-1">
          <div class="panel panel-default">
            <div class="panel-heading">User registration example</div>
            <div class="panel-body">
              <form>
                <div class="row">
                  <div class="form-group col-lg-12">
                    <label>Username</label>
                    <input type="text" v-model.trim="username" class="form-control" name="username" required>
                  </div>
                  <div class="form-group col-lg-12">
                    <label>Password</label>
                    <input type="password" v-model="password" class="form-control" name="password" required>
                  </div>
                </div>
                <div class="pull-right">
                  <button class="btn btn-info" type="button" @click="register" :disabled.prop="!isValid">Register</button>
                  <button class="btn btn-info" type="button" @click="logIn" :disabled.prop="!isValid">Log In</button>
                </div>
              </form>
            </div>
          </div>
          <div class="alert alert-danger" role="alert" v-if="error">{{ error }}</div>
        </div>
      </div>
    </div>
</template>
<style>
</style>
<script type="text/babel">
import db from 'baqend'
import router from '../router'

export default {
  name: 'signup',
  data () {
    return {
      username: null,
      password: null,
      error: null
    }
  },
  methods: {
    logIn () {
      db.User.login(this.username, this.password).then(_ => {
        router.push('me')
      }).catch(e => {
        this.error = e.message
      })
    },
    register () {
      db.User.register(this.username, this.password).then(_ => {
        router.push('me')
      }).catch(e => {
        this.error = e.message
      })
    }
  },
  computed: {
    isValid () {
      return this.username && this.password
    }
  },
  beforeRouteEnter (to, from, next) {
    if (db.User.me) {
      next('me')
    } else {
      next()
    }
  }
}
</script>
