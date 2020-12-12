<template>
  <div>
    <list :list='callList' :showHeader="false" :disable='ignoreControls' v-on:select="onSelect"></list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from './../List.vue'
import Modal from '@/components/Modal/index.js'

export default {
  name: 'Favoris',
  components: { List },
  data () {
    return {
      ignoreControls: false
    }
  },
  computed: {
    ...mapGetters(['IntlString', 'config']),
    callList () {
      return this.config.serviceCall || []
    }
  },
  methods: {
    onSelect (itemSelect) {
      if (this.ignoreControls === true) return
      this.ignoreControls = true
      Modal.CreateModal(
        {
          choix: [
            ...itemSelect.subMenu,
            {
              action: 'cancel',
              title: this.IntlString('CANCEL'),
              icons: 'fa-undo'
            }
          ]
        }
      ).then(rep => {
        this.ignoreControls = false
        switch (rep.action) {
          case 'cancel':
            return
          case 'call':
            return this.$phoneAPI.callEvent(rep.eventName, rep.type)
          case 'sendMessage':
            this.$router.push({
              name: 'messages.view',
              params: {
                number: rep.type.number
              }
            })
        }
      })
    }
  },

  created () {
  },

  beforeDestroy () {
  }
}
</script>

<style scoped>

</style>
