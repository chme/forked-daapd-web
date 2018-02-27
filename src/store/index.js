import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation_types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: {
      host: 'localhost',
      port: 3689
    },

    config: {
      'websocket_port': 0,
      'version': '',
      'buildoptions': [ ]
    },
    library: {
      'artists': 0,
      'albums': 0,
      'songs': 0,
      'db_playtime': 0,
      'updating': false
    },
    outputs: [ ],
    player: {
      'state': 'stop',
      'repeat': 'off',
      'consume': false,
      'shuffle': false,
      'volume': 0,
      'item_id': 0,
      'item_length_ms': 0,
      'item_progress_ms': 0
    },
    queue: {
      'version': 0,
      'count': 0,
      'items': [ ]
    },
    notifications: {
      'next_id': 1,
      'list': [ ]
    },

    hide_singles: false,
    show_only_next_items: false,
    show_burger_menu: false
  },

  getters: {
    now_playing: state => {
      var item = state.queue.items.find(function (item) {
        return item.id === state.player.item_id
      })
      return (item === undefined) ? {} : item
    }
  },

  mutations: {
    [types.UPDATE_SERVER] (state, server) {
      state.server = server
    },
    [types.UPDATE_CONFIG] (state, config) {
      state.config = config
    },
    [types.UPDATE_LIBRARY_STATS] (state, libraryStats) {
      state.library = libraryStats
    },
    [types.UPDATE_OUTPUTS] (state, outputs) {
      state.outputs = outputs
    },
    [types.UPDATE_PLAYER_STATUS] (state, playerStatus) {
      state.player = playerStatus
    },
    [types.UPDATE_QUEUE] (state, queue) {
      state.queue = queue
    },
    [types.ADD_NOTIFICATION] (state, notification) {
      state.notifications.list.push(notification)
    },
    [types.DELETE_NOTIFICATION] (state, notification) {
      const index = state.notifications.list.indexOf(notification)

      if (index !== -1) {
        state.notifications.list.splice(index, 1)
      }
    },
    [types.HIDE_SINGLES] (state, hideSingles) {
      state.hide_singles = hideSingles
    },
    [types.SHOW_ONLY_NEXT_ITEMS] (state, showOnlyNextItems) {
      state.show_only_next_items = showOnlyNextItems
    },
    [types.SHOW_BURGER_MENU] (state, showBurgerMenu) {
      state.show_burger_menu = showBurgerMenu
    }
  },

  actions: {
    add_notification ({ commit, state }, notification) {
      const newNotification = {
        'id': state.notifications.next_id++,
        'type': notification.type,
        'text': notification.text,
        'timeout': notification.timeout
      }

      commit(types.ADD_NOTIFICATION, newNotification)

      if (notification.timeout > 0) {
        setTimeout(() => {
          commit(types.DELETE_NOTIFICATION, newNotification)
        }, notification.timeout)
      }
    }
  }
})
