<template>
  <a v-on:click="toggle_play_pause">
    <span class="icon"><i class="mdi mdi-36px" v-bind:class="{ 'mdi-play': !is_playing, 'mdi-pause': is_playing }"></i></span>
  </a>
</template>

<script>
import webapi from '../../webapi'

export default {
  name: 'PlayPauseButton',

  computed: {
    is_playing () {
      return this.$store.state.player.state === 'play'
    }
  },

  methods: {
    toggle_play_pause: function () {
      if (this.is_playing) {
        webapi.player_pause()
      } else {
        webapi.player_play()
      }
    }
  }
}
</script>

<style>
</style>
