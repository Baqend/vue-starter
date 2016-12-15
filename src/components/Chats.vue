<template type="text/html">
  <div class="chats container">
    <div class="row">
      <div class="col-xs-10 col-xs-offset-1">
        <router-link v-for="message in messages" :to="{ name: 'chat', params: { id: message.key } }" >
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">{{ message.name }}</h3>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-xs-1">
                  <img :src="getImageUrl(message)">
                </div>
                <div class="col-xs-11 text-left">
                  {{ message.text }}
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script type="text/babel">
import db from 'baqend'

export default {
  name: 'chats',
  data () {
    return {
      messages: []
    }
  },
  created () {
    this.loadChats()
  },
  methods: {
    loadChats () {
      db.Message.find().resultList((messages) => {
        this.messages = messages
      })
    },
    getImageUrl (message) {
      return new db.File(message.face).url
    }
  }
}
</script>

<style scoped>
img { width: 100% }
</style>
