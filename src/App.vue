<template>
  <div id="app">
    <navbar-top/>
    <transition name="fade">
      <router-view v-show="!show_burger_menu" />
    </transition>
    <notifications v-show="!show_burger_menu" />
    <navbar-bottom v-show="!show_burger_menu" />
  </div>
</template>

<script>
import NavbarTop from '@/components/NavbarTop'
import NavbarBottom from '@/components/NavbarBottom'
import Notifications from '@/components/Notifications'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'
import ReconnectingWebSocket from 'reconnectingwebsocket'

export default {
  name: 'App',
  components: { NavbarTop, NavbarBottom, Notifications },
  template: '<App/>',

  data () {
    return {
    }
  },

  computed: {
    show_burger_menu () {
      return this.$store.state.show_burger_menu
    }
  },

  created: function () {
    webapi.config().then(({ data }) => {
      this.$store.commit(types.UPDATE_CONFIG, data)
      this.$store.commit(types.HIDE_SINGLES, data.hide_singles)
      document.title = data.library_name

      this.update_outputs()
      this.update_player_status()
      this.update_library_stats()
      this.update_queue()
      this.connect()
    })
  },

  methods: {
    connect: function () {
      if (this.$store.state.config.websocket_port <= 0) {
        return
      }

      const vm = this

      var socket = new ReconnectingWebSocket(
        'ws://' + document.domain + ':' + this.$store.state.config.websocket_port,
        'notify',
        { reconnectInterval: 3000 }
      )

      socket.onopen = function () {
        vm.$store.dispatch('add_notification', { text: 'Connection to server established', type: 'primary', timeout: 3000 })
        socket.send(JSON.stringify({ notify: ['update', 'player', 'options', 'outputs', 'volume'] }))
      }
      socket.onclose = function () {
        vm.$store.dispatch('add_notification', { text: 'Connection closed', type: 'danger', timeout: 3000 })
      }
      socket.onerror = function () {
        vm.$store.dispatch('add_notification', { text: 'Failed to connect to server', type: 'danger', timeout: 3000 })
      }
      socket.onmessage = function (response) {
        var data = JSON.parse(response.data)
        if (data.notify.includes('update')) {
          vm.update_library_stats()
        }
        if (data.notify.includes('player') || data.notify.includes('options') || data.notify.includes('volume')) {
          vm.update_player_status()
        }
        if (data.notify.includes('outputs') || data.notify.includes('volume')) {
          vm.update_outputs()
        }
        if (data.notify.includes('queue')) {
          vm.update_queue()
        }
      }
    },

    update_library_stats: function () {
      webapi.library_stats().then(({ data }) => {
        this.$store.commit(types.UPDATE_LIBRARY_STATS, data)
      })
    },

    update_outputs: function () {
      webapi.outputs().then(({ data }) => {
        this.$store.commit(types.UPDATE_OUTPUTS, data.outputs)
      })
    },

    update_player_status: function () {
      webapi.player_status().then(({ data }) => {
        this.$store.commit(types.UPDATE_PLAYER_STATUS, data)
      })
    },

    update_queue: function () {
      webapi.queue().then(({ data }) => {
        this.$store.commit(types.UPDATE_QUEUE, data)
      })
    }
  },

  watch: {
    '$route' (to, from) {
      this.$store.commit(types.SHOW_BURGER_MENU, false)
    }
  }
}
</script>

<style>
</style>
