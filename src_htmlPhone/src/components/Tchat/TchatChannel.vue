<template>
  <div class="phone_app">
    <PhoneTitle :title="IntlString('APP_DARKTCHAT_TITLE')" backgroundColor="#2b2a2a" @back="onBack" /> <!-- HEADER -->
    <div class="elements" @contextmenu.prevent="onEnter">
        <div class="element" v-for='(elem, key) in tchatChannels' 
          v-bind:key="elem.channel"
          v-bind:class="{ select: key === currentSelect}"
          @click.stop="showChannel(elem.channel)"
          >
            <div class="elem-title" @click.stop="showChannel(elem.channel)"><span class="diese">#</span> {{elem.channel}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Modal from '@/components/Modal/index.js'
import PhoneTitle from './../PhoneTitle'

export default {
  components: { PhoneTitle },
  data: function () {
    return {
      currentSelect: 0,
      ignoreControls: false
    }
  },
  watch: {
    list: function () {
      this.currentSelect = 0
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'useMouse', 'tchatChannels', 'Apps'])
  },
  methods: {
    ...mapActions(['tchatAddChannel', 'tchatRemoveChannel']),
    scrollIntoViewIfNeeded () {
      this.$nextTick(() => {
        const $select = this.$el.querySelector('.select')
        if ($select !== null) {
          $select.scrollIntoViewIfNeeded()
        }
      })
    },
    onUp () {
      if (this.ignoreControls === true) return
      this.currentSelect = this.currentSelect === 0 ? 0 : this.currentSelect - 1
      this.scrollIntoViewIfNeeded()
    },
    onDown () {
      if (this.ignoreControls === true) return
      this.currentSelect = this.currentSelect === this.tchatChannels.length - 1 ? this.currentSelect : this.currentSelect + 1
      this.scrollIntoViewIfNeeded()
    },
    async onRight () {
      if (this.ignoreControls === true) return
      this.ignoreControls = true
      let choix = [
        {id: 1, title: this.IntlString('APP_DARKTCHAT_NEW_CHANNEL'), icons: 'fa-plus', color: 'green'}, /** New Channel Option Color */
        {id: 2, title: this.IntlString('APP_DARKTCHAT_DELETE_CHANNEL'), icons: 'fa-minus', color: 'red'}, /** DeleteChannel Option Color */
        {id: 3, title: this.IntlString('APP_DARKTCHAT_CANCEL'), icons: 'fa-undo'}
      ]
      if (this.tchatChannels.length === 0) {
        choix.splice(1, 1)
      }
      const rep = await Modal.CreateModal({ choix })
      this.ignoreControls = false
      switch (rep.id) {
        case 1:
          this.addChannelOption()
          break
        case 2:
          this.removeChannelOption()
          break
        case 3 :
      }
    },
    async onEnter () {
      if (this.ignoreControls === true) return
      this.ignoreControls = true
      let choix = [
        {id: 1, title: this.IntlString('APP_DARKTCHAT_NEW_CHANNEL'), icons: 'fa-plus', color: 'green'}, /** New Channel Option Color */
        {id: 2, title: this.IntlString('APP_DARKTCHAT_DELETE_CHANNEL'), icons: 'fa-minus', color: 'red'}, /** DeleteChannel Option Color */
        {id: 3, title: this.IntlString('APP_DARKTCHAT_CANCEL'), icons: 'fa-undo'}
      ]
      if (this.tchatChannels.length === 0) {
        choix.splice(1, 1)
      }
      const rep = await Modal.CreateModal({ choix })
      this.ignoreControls = false
      switch (rep.id) {
        case 1:
          this.addChannelOption()
          break
        case 2:
          this.removeChannelOption()
          break
        case 3 :
      }
    },
    showChannel (channel) {
      this.$router.push({ name: 'tchat.channel.show', params: { channel } })
    },
    onBack () {
      if (this.ignoreControls === true) return
      this.$router.push({ name: 'home' })
    },
    async addChannelOption () {
      try {
        const rep = await Modal.CreateTextModal({limit: 20, title: this.IntlString('APP_DARKTCHAT_NEW_CHANNEL')})
        let channel = (rep || {}).text || ''
        channel = channel.toLowerCase().replace(/[^a-z]/g, '')
        if (channel.length > 0) {
          this.currentSelect = 0
          this.tchatAddChannel({ channel })
        }
      } catch (e) {}
    },
    async removeChannelOption () {
      const channel = this.tchatChannels[this.currentSelect].channel
      this.currentSelect = 0
      this.tchatRemoveChannel({ channel })
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpArrowRight', this.onRight)
      this.$bus.$on('keyUpEnter', this.onEnter)
      this.$bus.$on('keyUpBackspace', this.onBack)
    } else {
      this.currentSelect = -1
    }
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpArrowRight', this.onRight)
    this.$bus.$off('keyUpEnter', this.onEnter)
    this.$bus.$off('keyUpBackspace', this.onBack)
  }
}
</script>

<style scoped>
.list{
  height: 100%;
}
.title{
  padding-top: 22px;
  padding-left: 16px;
  height: 54px;
  line-height: 34px;
  font-weight: 700;
  color: green; /** Unknown */
}

.elements{
  height: calc(100% - 54px);
  overflow-y: auto;
  background-color: #000000;/** Homepage Background */
  color: #ffffff /** Chat Text Color HomePage */
}
.element{
  height: 42px;
  line-height: 42px;
  display: flex;
  align-items: center;
  position: relative;
}

.elem-title{
  margin-left: 6px;
  font-size: 20px;
  text-transform: capitalize;
  transition: .15s;
}
.elem-title .diese {
  color: #5ecc8d; /** Hashtag Color */
  font-size: 22px;
  font-weight: 700;
  line-height: 40px;
}

.element.select, .element:hover{
   background-color: #787272; /** Hover Box Color */
   color: #FFFFFF; /** Hover Text Color */

}
.element.select .elem-title, .element:hover .elem-title {
   margin-left: 12px;
}
.element.select .elem-title .diese, .element:hover .elem-title .diese {
   color:#5ecc8d; /** Hashtag Hover Color */
}
 .elements::-webkit-scrollbar-track
    {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #356e4d; /** Scrollbar Edge */
    }
  .elements::-webkit-scrollbar
    {
        width: 3px;
        background-color: transparent;
    }
  .elements::-webkit-scrollbar-thumb
    {
        background-color: #5ecc8d; /** Scrollbar Thumb */
    }
</style>
