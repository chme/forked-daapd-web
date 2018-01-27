<template>
  <a v-on:click="play_previous">
    <span class="icon"><i class="mdi mdi-skip-backward"></i></span>
  </a>
</template>

<script>
import webapi from '../../webapi'

export default {
  name: 'PlayPreviousButton',

  methods: {
    play_previous: function () {
      webapi.player_previous()
    }
  }
}
</script>

<style>
</style>
