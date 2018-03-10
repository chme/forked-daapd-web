<template>
  <div id="app">
    <navbar-top/>
    <transition name="fade">
      <router-view v-show="!show_burger_menu" />
    </transition>
    <modal-connection />
    <notifications v-show="!show_burger_menu" />
    <navbar-bottom v-show="!show_burger_menu" />
  </div>
</template>

<script>
import NavbarTop from '@/components/NavbarTop'
import NavbarBottom from '@/components/NavbarBottom'
import ModalConnection from '@/components/ModalConnection'
import Notifications from '@/components/Notifications'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import axios from 'axios'

export default {
  name: 'App',
  components: { NavbarTop, NavbarBottom, Notifications, ModalConnection },
  template: '<App/>',

  data () {
    return {}
  },

  computed: {
    show_connection_modal () {
      return this.$store.state.show_connection_modal
    },
    show_burger_menu () {
      return this.$store.state.show_burger_menu
    },
    server () {
      return this.$store.state.server
    }
  },

  created: function () {
    axios.get('/static/server-settings.json').then(({ data }) => {
      if (data.host !== this.server.host || data.port !== this.server.port) {
        this.$store.commit(types.UPDATE_SERVER, data)
      }
    }).catch(() => {
      this.$store.commit(types.UPDATE_SERVER, { host: window.location.hostname, port: window.location.port })
    })
  },

  methods: {
    connect: function () {
      this.$store.dispatch('add_notification', { text: 'Connecting to ' + this.server.host + ':' + this.server.port, type: 'info', topic: 'connection', timeout: 2000 })

      webapi.config().then(({ data }) => {
        this.$store.commit(types.SHOW_CONNECTION_MODAL, false)
        this.$store.commit(types.UPDATE_CONFIG, data)
        this.$store.commit(types.HIDE_SINGLES, data.hide_singles)
        document.title = data.library_name

        this.update_outputs()
        this.update_player_status()
        this.update_library_stats()
        this.update_queue()
        this.open_ws()
      }).catch(() => {
        this.$store.dispatch('add_notification', { text: 'Failed to connect to server ' + this.server.host + ':' + this.server.port, type: 'danger', topic: 'connection' })
        this.$store.commit(types.SHOW_CONNECTION_MODAL, true)
      })
    },

    open_ws: function () {
      if (this.$store.state.config.websocket_port <= 0) {
        this.$store.dispatch('add_notification', { text: 'Missing websocket port', type: 'danger' })
        return
      }

      const vm = this

      var socket = new ReconnectingWebSocket(
        'ws://' + vm.server.host + ':' + vm.$store.state.config.websocket_port,
        'notify',
        { reconnectInterval: 5000 }
      )

      socket.onopen = function () {
        vm.$store.commit(types.SHOW_CONNECTION_MODAL, false)
        vm.$store.dispatch('add_notification', { text: 'Connection to server established', type: 'primary', topic: 'connection', timeout: 2000 })
        socket.send(JSON.stringify({ notify: ['update', 'player', 'options', 'outputs', 'volume'] }))
      }
      socket.onclose = function () {
        // vm.$store.dispatch('add_notification', { text: 'Connection closed', type: 'danger', timeout: 2000 })
      }
      socket.onerror = function () {
        vm.$store.dispatch('add_notification', { text: 'Connection to websocket lost. Reconnecting ...', type: 'danger', topic: 'connection' })
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
    },
    'server' () {
      if (this.server.host && this.server.port) {
        this.connect()
      }
    }
  }
}
</script>

<style>
</style>
