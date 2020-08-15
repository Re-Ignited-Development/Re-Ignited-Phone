<template>
  <div class="home" v-bind:style="{background: 'url(' + backgroundURL +')'}">
    <InfoBare />
    <span class="warningMess" v-if="messages.length >= warningMessageCount">
      <div class="warningMess_icon"><i class="fa fa-warning"></i></div>
      <span class="warningMess_content">
        <span class="warningMess_title">{{ IntlString('PHONE_WARNING_MESSAGE') }}</span><br>
        <span class="warningMess_mess">{{messages.length}} / {{warningMessageCount}} {{IntlString('PHONE_WARNING_MESSAGE_MESS')}}</span>
      </span>
    </span>
    <div class='home_buttons'>
        <button class="app_btn"
            v-for="(but, key) of AppsHome" 
            v-bind:key="but.name" 
            v-bind:class="{ select: key === currentSelect}"
            @click="openApp(but)"
            v-bind:style="{background: but.color}"
           >
            <div class='app_btn_img'
            v-bind:style="{backgroundImage: 'url(' + but.icons +')'}"
            ></div>
            <span class="puce" v-if="but.puce !== undefined && but.puce !== 0">{{but.puce}}</span>
        </button>
      <div class="btn_menu_ctn">
        <button 
          class="btn_menu"
          :class="{ select: AppsHome.length === currentSelect}"
          v-bind:style="{backgroundImage: 'url(' + '/html/static/img/icons_app/menu.png' +')'}"
          @click="openApp({routeName: 'menu'})"
          >
        </button>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfoBare from './InfoBare'

export default {
  components: {
    InfoBare
  },
  data () {
    return {
      currentSelect: 0
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'useMouse', 'nbMessagesUnread', 'backgroundURL', 'messages', 'AppsHome', 'warningMessageCount'])
  },
  methods: {
    ...mapActions(['closePhone', 'setMessages']),
    onLeft () {
      this.currentSelect = (this.currentSelect + this.AppsHome.length) % (this.AppsHome.length + 1)
    },
    onRight () {
      this.currentSelect = (this.currentSelect + 1) % (this.AppsHome.length + 1)
    },
    onUp () {
      this.currentSelect = Math.max(this.currentSelect - 4, 0)
    },
    onDown () {
      this.currentSelect = Math.min(this.currentSelect + 4, this.AppsHome.length)
    },
    openApp (app) {
      this.$router.push({ name: app.routeName })
    },
    onEnter () {
      this.openApp(this.AppsHome[this.currentSelect] || {routeName: 'menu'})
    },
    onBack () {
      this.closePhone()
    }
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

<style scoped="true">


.home{
  background-size: cover !important;
  background-position: center !important;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  color: gray;
}
.warningMess{
  background-color: white;
  position: absolute;
  left: 12px;
  right: 12px;
  top: 34px;
  min-height: 64px;
  display: flex;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}
.warningMess .warningMess_icon{
  display: flex;
  width: 16%;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  height: 42px;
  width: 42px;
  border-radius: 50%;
}
.warningMess .warningMess_icon .fa {
  text-align: center;
  color: #F94B42;
}
.warningMess .warningMess_content{
  padding-left: 12px;
}
.warningMess_title {
  font-size: 20px;
}
.warningMess_mess {
  font-size: 16px;
}

.home_buttons{
  display: flex;
  padding: 0 16px; 
  width: 100%;
  bottom: 10px;
  position: absolute;
  align-items: flex-end;
  flex-flow: row;
  flex-wrap: wrap;
  margin-bottom: 0px;
  justify-content: space-between;
  transition: all 0.5s ease-in-out;
}


.app_btn{
  outline: none;
  position: relative;
  margin: 10px;
  border: none;
  width: 60px;
  height: 10px;
  border-radius: 10px;
  color: white;
  background-size: 30px 30px;
  background-image: linear-gradient(to bottom, #e67e22, #e74c3c, #c0392b);
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 14px;
  padding-top: 60px;
  font-weight: 700;
  text-align: center;
}


.app_btn_img {
  padding-top: 60px;
  background-position: 9px 16px;
  position: relative;
  background-repeat: no-repeat;
  background-size: 30px 30px;
  margin-top: -60px;
  transition: .1s;
}

button:hover, button.select {
  transform: scale(1.15);
  transition: .1s;
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
  bottom: -5px;
  right: -10px;
}

.btn_menu_ctn{
  width: 100%;
  display: flex;
  height: 80px;
  background-color: transparent;
  justify-content: center;
  align-content: center;
}
.btn_menu {
  outline: none;
  height: 50px;
    position: relative;
  margin: 10px;
  border: none;
  width: 60px;
  height: 10px;
  border-radius: 10px;
  color: white;
  background-size: 40px 40px;
  background-color: transparent;
  background-position: center 12px;
  background-repeat: no-repeat;
  font-size: 14px;
  padding-top: 60px;
  font-weight: 700;
  text-shadow: -1px 0 0 rgba(0,0,0, 0.8), 
             1px 0 0 rgba(0,0,0, 0.8),
             0 -1px 0 rgba(0,0,0, 0.8),
             0 1px 0 rgba(0,0,0, 0.8);
  text-align: center;
}

</style>
