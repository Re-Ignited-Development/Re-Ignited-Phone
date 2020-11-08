<template>
  <div class='phone_infoBare barre-header'>
    <div class="bar">
      <div style="float:left;">
        <span>{{config.reseau}}</span>
      </div>
      <div style="float:right;">
        <font-awesome-icon 
          :icon="['fas','signal']">
        </font-awesome-icon>
        <font-awesome-icon 
          :icon="['fas','battery-full']"
          class="fa-rotate-270">
        </font-awesome-icon>
        <span>{{timestamp}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

export default {
  computed: mapGetters(['config']),
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      timeinternval: '',
      timestamp: moment(Date.now()).format('HH:mm')
    }
  },
  created () {
    this.timeinternval = setInterval(this.getTime, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeinternval)
  },
  methods: {
    getTime () {
      this.timestamp = moment(Date.now()).format('HH:mm')
    }
  }
}
</script>
<style scoped>
.barre-header {
    height: 24px;
    line-height: 24px;
    padding: 0px 20px 0px 20px;
    width: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    position: relative;
}
.bar{
    font-size:0.9rem;
}
</style>
