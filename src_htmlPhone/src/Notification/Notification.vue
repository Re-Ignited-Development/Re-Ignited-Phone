<template>
  <div class="notifications">
    <div
      v-for='notif in list'
      :key="notif.id"
      class="notification"
      :style="style(notif)"
    >
      <div class="title">
        <i v-if="notif.icon" class="fab fa-twitter" /> {{notif.title}}
      </div>
      <div v-if="isImage(notif.message) === true" class="message">
        <img :src="notif.message" class='img-msg' />
      </div>
      <div v-else class="message">{{notif.message}}</div>
    </div>
  </div>
</template>

<script>
import events from './events'
import {Howl} from 'howler'

export default {
  data () {
    return {
      currentId: 0,
      list: []
    }
  },
  mounted () {
    events.$on('add', this.addItem)
  },
  methods: {
    // Check if the link is an image URL
    isImage (url) {
      return /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/g.test(url)
    },
    async addItem (event = {}) {
      const dataNotif = {
        ...event,
        id: this.currentId ++,
        duration: parseInt(event.duration) || 3000
      }
      this.list.push(dataNotif)
      window.setTimeout(() => {
        this.destroy(dataNotif.id)
      }, dataNotif.duration)
      if (event.sound !== null && event.sound !== undefined) {
        var path = '/html/static/sound/' + event.sound
        const audio = new Howl({
          src: path,
          onend: function () {
            audio.src = null
          }
        })
        audio.play()
      }
    },
    style (notif) {
      return {
        backgroundColor: notif.backgroundColor
      }
    },
    destroy (id) {
      this.list = this.list.filter(n => n.id !== id)
    }
  }
}
</script>

<style scoped>
.notifications {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.notification {
  width: auto;
  background-color: rgba(29, 161, 242, 0.6); /* Twitter Notification Background */
  color: white;
  padding: 8px 16px;
  margin: 10px;
  border-radius: 6px;
}
.title {
  font-size: 18px;
}
.message {
  font-size: 16px;
}
  
.img-msg {
  height: 150px;
}
</style>
