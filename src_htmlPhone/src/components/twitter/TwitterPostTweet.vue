<template>
  <div class="phone_content">
    <div class='tweet_write'>
        <textarea
          v-bind:class="{ 'highlight' : selectedOption === 'textarea', 'textarea-input': true}"
          v-model.trim="message"
          ref="textareaRef"
          v-autofocus
          :placeholder="IntlString('APP_TWITTER_PLACEHOLDER_MESSAGE')"
        ></textarea>
        <span
          v-bind:class="{ 'highlight' : selectedOption === 'tweet_send', 'tweet_send': true}"
          @click="tweeter"
        >
          {{ messageSent ? IntlString('APP_TWITTER_BUTTON_ACTION_TWEETER_SENT') : IntlString('APP_TWITTER_BUTTON_ACTION_TWEETER') }}
        </span>
        <span
          v-bind:class="{ 'highlight' : selectedOption === 'tweet_photo', 'tweet_photo': true}"
          @click="postphoto">
            {{ IntlString('APP_TWITTER_BUTTON_PHOTO_TWEETER') }}
        </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  data () {
    return {
      message: '',
      messageSent: false,
      ignoreControls: false,
      selectedOption: 'textarea',
      options: ['textarea', 'tweet_send', 'tweet_photo']
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'useMouse', 'enableTakePhoto'])
  },
  watch: {
    selectedOption: function (val) {
      if (val === 'textarea') {
        this.$refs.textareaRef.focus()
        return
      }
      this.$refs.textareaRef.blur()
    }
  },
  methods: {
    ...mapActions(['twitterPostTweet']),
    async postphoto () {
      const { url } = await this.$phoneAPI.takePhoto()
      if (url !== null && url !== undefined) {
        await this.twitterPostTweet({ message: url })
      }
    },
    async onEnter () {
      try {
        if (this.selectedOption === 'textarea') {
          const rep = await this.$phoneAPI.getReponseText()
          const message = rep ? rep.text.trim() : ''
          this.message = message
          return
        }
        if (this.selectedOption === 'tweet_send') {
          this.tweeter()
          return
        }
        if (this.selectedOption === 'tweet_photo') {
          this.postphoto()
          return
        }
      } catch (e) {
        console.log(e)
      }
    },
    async tweeter () {
      if (this.message === '') return this.$phoneAPI.sendGenericError('Unable to Post! You cannot send a blank tweet')
      if (this.message.length > 140) return this.$phoneAPI.sendGenericError('Unable to Post! Your tweet is too long!')
      await this.twitterPostTweet({ message: this.message })
      this.message = ''
      this.messageSent = true
      setTimeout(() => {
        this.messageSent = false
      }, 4000)
    },
    getCurrentOptionIdx () {
      return this.options.findIndex(o => o === this.selectedOption)
    },
    nextOption () {
      const currentIdx = this.getCurrentOptionIdx()
      if ((currentIdx + 1) === this.options.length) {
        this.selectedOption = this.options[0]
        return
      }
      this.selectedOption = this.options[currentIdx + 1]
    },
    prevOption () {
      const currentIdx = this.getCurrentOptionIdx()
      if ((currentIdx - 1) < 0) {
        this.selectedOption = this.options[this.options.length - 1]
        return
      }
      this.selectedOption = this.options[currentIdx - 1]
    },
    onBack () {
      if (this.useMouse === true && document.activeElement.tagName !== 'BODY') return
      this.$bus.$emit('twitterHome')
    },
    onUp: function () {
      if (this.ignoreControls === true) return
      this.prevOption()
    },
    onDown: function () {
      if (this.ignoreControls === true) return
      this.nextOption()
    }
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpEnter', this.onEnter)
    }
    this.$bus.$on('keyUpBackspace', this.onBack)
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
    this.$bus.$off('keyUpBackspace', this.onBack)
  }
}
</script>

<style scoped>
.phone_content {
  background: #DBF0F4;
}

.tweet_write{
    widows: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
}
.tweet_write .textarea-input{
  align-self: center;
  width: 90%;
  margin-top: 20px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 13px 16px;
  height: 336px;
  background-color: #ffffff;
  color: white;
  border-radius: 16px;
  resize: none;
  color: #222;
  font-size: 18px;
}


.tweet_send {
  align-self: flex-end;
  width: 120px;
  height: 32px;
  float: right;
  border-radius: 16px;
  background-color: rgb(29, 161, 242);
  margin-right: 12px;
  margin-bottom: 2px;
  color: white;
  line-height: 32px;
  text-align: center;
  margin: 26px 20px;
  font-size: 16px;
}

.tweet_photo {
  align-self: flex-end;
  width: 120px;
  height: 32px;
  float: right;
  border-radius: 16px;
  background-color: rgb(29, 161, 242);
  margin-right: 12px;
  margin-bottom: 2px;
  color: white;
  line-height: 32px;
  text-align: center;
  margin: -58px 250px;
  font-size: 16px;
}

.tweet_send:hover {
  cursor: pointer;
  background-color: #0084b4;
}

.tweet_photo:hover {
  cursor: pointer;
  background-color: #0084b4;
}

.highlight {
  background-color: #0084b4;
  outline: 4px solid #0084b4;
}
.textarea-input.highlight {
  border: 4px solid #0084b4;
}

</style>
