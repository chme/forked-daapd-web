<template>
  <nav class="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/playlists" class="navbar-item" active-class="is-active">
        <span class="icon"><i class="mdi mdi-library-music"></i></span>
      </router-link>
      <router-link to="/artists" class="navbar-item" active-class="is-active">
        <span class="icon"><i class="mdi mdi-artist"></i></span>
      </router-link>
      <router-link to="/albums" class="navbar-item" active-class="is-active">
        <span class="icon"><i class="mdi mdi-album"></i></span>
      </router-link>

      <div class="navbar-burger" @click="update_show_burger_menu" :class="{ 'is-active': show_burger_menu }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': show_burger_menu }">
      <div class="navbar-start">
        <div class="navbar-item">
          <form v-on:submit.prevent="open_search">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Search" v-model="search_query" ref="search_field">
              </p>
              <p class="control">
                <button class="button is-dark" type="submit">Search</button>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"><span class="icon is-hidden-mobile is-hidden-tablet-only"><i class="mdi mdi-volume-high"></i></span> <span class="is-hidden-desktop">Volume</span></a>

          <div class="navbar-dropdown is-right">
            <div class="navbar-item">
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <span class="icon"><i class="mdi mdi-18px mdi-volume-high"></i></span>
                  </div>
                  <div class="level-item">
                    <div>
                      <p class="heading">Volume</p>
                      <range-slider
                        class="slider"
                        min="0"
                        max="100"
                        step="1"
                        :value="player.volume"
                        @change="set_volume">
                      </range-slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="navbar-divider">
            <nav-bar-item-output v-for="output in outputs" :key="output.id" :output="output"></nav-bar-item-output>

            <hr class="navbar-divider">
            <div class="navbar-item">
              <div class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <div class="buttons has-addons">
                      <player-button-previous class="button"></player-button-previous>
                      <player-button-play-pause class="button"></player-button-play-pause>
                      <player-button-next class="button"></player-button-next>
                    </div>
                  </div>
                  <div class="level-item">
                    <div class="buttons has-addons">
                      <player-button-repeat class="button is-light"></player-button-repeat>
                      <player-button-shuffle class="button is-light"></player-button-shuffle>
                      <player-button-consume class="button is-light"></player-button-consume>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"><span class="icon is-hidden-mobile is-hidden-tablet-only"><i class="mdi mdi-settings"></i></span> <span class="is-hidden-desktop">Settings</span></a>

          <div class="navbar-dropdown is-right">
            <a class="navbar-item" v-on:click="update">Update library</a>
            <a class="navbar-item" href="/admin.html">Admin</a>
            <hr class="navbar-divider">
            <a class="navbar-item" v-on:click="show_connection_modal">
              <div>
                <p class="title is-7">forked-daapd</p>
                <p class="subtitle is-7">{{ config.version }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import webapi from '@/webapi'
import NavBarItemOutput from './elements/NavBarItemOutput'
import PlayerButtonPlayPause from './elements/PlayerButtonPlayPause'
import PlayerButtonNext from './elements/PlayerButtonNext'
import PlayerButtonPrevious from './elements/PlayerButtonPrevious'
import PlayerButtonShuffle from './elements/PlayerButtonShuffle'
import PlayerButtonConsume from './elements/PlayerButtonConsume'
import PlayerButtonRepeat from './elements/PlayerButtonRepeat'
import RangeSlider from 'vue-range-slider'
import * as types from '@/store/mutation_types'

export default {
  name: 'NavbarTop',
  components: { NavBarItemOutput, PlayerButtonPlayPause, PlayerButtonNext, PlayerButtonPrevious, PlayerButtonShuffle, PlayerButtonConsume, PlayerButtonRepeat, RangeSlider },

  data () {
    return {
      search_query: ''
    }
  },

  computed: {
    outputs () {
      return this.$store.state.outputs
    },

    player () {
      return this.$store.state.player
    },

    config () {
      return this.$store.state.config
    },

    show_burger_menu () {
      return this.$store.state.show_burger_menu
    }
  },

  methods: {
    update_show_burger_menu: function () {
      this.$store.commit(types.SHOW_BURGER_MENU, !this.show_burger_menu)
    },
    show_connection_modal: function () {
      this.$store.commit(types.SHOW_CONNECTION_MODAL, true)
    },

    update: function () {
      webapi.library_update()
    },

    set_volume: function (newVolume) {
      webapi.player_volume(newVolume)
    },

    open_search: function () {
      if (!this.search_query) {
        return
      }

      this.$router.push({ path: '/search',
        query: {
          type: 'track,artist,album,playlist',
          query: this.search_query,
          limit: 3,
          offset: 0
        }
      })
      this.search_query = ''
      this.$refs.search_field.blur()
    }
  }
}
</script>

<style>
</style>
