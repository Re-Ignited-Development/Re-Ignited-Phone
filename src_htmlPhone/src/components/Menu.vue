<template>
  <div class="phone_app">
    <div class="backblur" v-bind:style="{background: 'url(' + backgroundURL +')'}"></div>
    <InfoBare class="infobare"/>
    <div class="menu" @click="onBack">  
      <div class="menu_content">
  
          <div class='menu_buttons'>
            
            <button class='app_btn'
                v-for="(but, key) of Apps" 
                v-bind:key="but.name" 
                v-bind:class="{ select: key === currentSelect}"
                @click.stop="openApp(but)"
                v-bind:style="{background: but.color}"
              >
              <div class='app_btn_img'
              v-bind:style="{backgroundImage: 'url(' + but.icons +')'}"
              >
              </div>
              <span class='app_btn_name' 
                  v-bind:style="{visibility: but.menuTitle}"
                >
                {{but.intlName}}
              </span>
              
                <span class="puce" v-if="but.puce !== undefined && but.puce !== 0">{{but.puce}}</span>
            </button>
          </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InfoBare from './InfoBare'

export default {
  components: {
    InfoBare
  },
  data: function () {
    return {
      currentSelect: 0
    }
  },
  computed: {
    ...mapGetters(['nbMessagesUnread', 'backgroundURL', 'Apps', 'useMouse'])
  },
  methods: {
    ...mapGetters(['closePhone']),
    onLeft: function () {
      const l = Math.floor(this.currentSelect / 4)
      const newS = (this.currentSelect + 4 - 1) % 4 + l * 4
      this.currentSelect = Math.min(newS, this.Apps.length - 1)
    },
    onRight: function () {
      const l = Math.floor(this.currentSelect / 4)
      let newS = (this.currentSelect + 1) % 4 + l * 4
      if (newS >= this.Apps.length) {
        newS = l * 4
      }
      this.currentSelect = newS
    },
    onUp: function () {
      let newS = this.currentSelect - 4
      if (newS < 0) {
        const r = this.currentSelect % 4
        newS = Math.floor((this.Apps.length - 1) / 4) * 4
        this.currentSelect = Math.min(newS + r, this.Apps.length - 1)
      } else {
        this.currentSelect = newS
      }
    },
    onDown: function () {
      const r = this.currentSelect % 4
      let newS = this.currentSelect + 4
      if (newS >= this.Apps.length) {
        newS = r
      }
      this.currentSelect = newS
    },
    openApp (app) {
      this.$router.push({ name: app.routeName })
    },
    onEnter () {
      this.openApp(this.Apps[this.currentSelect])
    },
    onBack: function () {
      this.$router.push({ name: 'home' })
    }
  },
  mounted () {
  },
  created () {
    if (!this.useMouse) {
      this.$bus.$on('keyUpArrowLeft', this.onLeft)
      this.$bus.$on('keyUpArrowRight', this.onRight)
      this.$bus.$on('keyUpArrowDown', this.onDown)
      this.$bus.$on('keyUpArrowUp', this.onUp)
      this.$bus.$on('keyUpEnter', this.onEnter)
    } else {
      this.currentSelect = -1
    }
    this.$bus.$on('keyUpBackspace', this.onBack)
  },
  beforeDestroy () {
    this.$bus.$off('keyUpArrowLeft', this.onLeft)
    this.$bus.$off('keyUpArrowRight', this.onRight)
    this.$bus.$off('keyUpArrowDown', this.onDown)
    this.$bus.$off('keyUpArrowUp', this.onUp)
    this.$bus.$off('keyUpEnter', this.onEnter)
    this.$bus.$off('keyUpBackspace', this.onBack)
  }
}
</script>

<style scoped>
.menu{
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 6px 8px;
}
.backblur{
  top: -6px;
  left: -6px;
  right:-6px;
  bottom: -6px;
  position: absolute;
  background-size: cover !important;
  background-position: center !important;
  filter: blur(6px);
}
.menu_content {
  display: flex;
  flex-direction: column;
}

.menu_buttons{
  margin-top: 24px;
  display: flex;
  width: 100%;
  align-items: flex-start;
  align-content: flex-start;
  /* justify-content: space-around; */
  flex-flow: row;
  flex-wrap: wrap;
  margin-bottom: 0px;

  transition: all 0.5s ease-in-out;
}

.menu_buttons {
  animation-name: up;
  animation-duration: 0.6s;
  animation-fill-mode: forwards;
}
@keyframes up {
  from {transform: translateY(100vh);}
  to {transform: translateY(0);}
}


.app_btn_name {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app_btn {
  outline: none;
  position: relative;
  border: none;
  width: 60px;
  height: 10px;
  margin: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: linear-gradient(to bottom, #e67e22, #e74c3c, #c0392b);
  border-radius: 10px;
  color: white;
  font-size: 14px;
  padding-top: 60px;
  font-weight: 500;
  text-align: center;
  transition: .1s;
}

button:hover, button.select {
  transform: scale(1.15);
  transition: .1s;
}

.app_btn_img {
  padding-top: 60px;
  background-position: 9px 16px;
  position: relative;
  background-repeat: no-repeat;
  background-size: 30px 30px;
  margin-top: -60px
}


button .puce{
  position: absolute;
  display: block;
  background-color: #2c3e50;
  font-size: 14px;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid white;
  bottom: 45px;
  right: -10px;
}


</style>
