<template>
  <div class="media">
    <div class="media-content fd-has-action is-clipped" v-on:click="play">
      <h1 class="title is-6">{{ track.title }}</h1>
      <h2 class="subtitle is-7">{{ track.artist }}<br>{{ track.album }}</h2>
    </div>
    <div class="media-right">
      <a v-on:click="queue_add">
        <span class="icon has-text-dark"><i class="mdi mdi-playlist-plus mdi-18px"></i></span>
      </a>
      <!--
      <a>
        <span class="icon has-text-dark"><i class="mdi mdi-dots-vertical mdi-18px"></i></span>
      </a>
      -->
    </div>
  </div>
</template>

<script>
import webapi from '@/webapi'

export default {
  name: 'PartTrack',

  props: ['track', 'position', 'context_uri'],

  methods: {
    play: function () {
      webapi.queue_clear().then(() =>
        webapi.queue_add(this.context_uri).then(() =>
          webapi.player_playpos(this.position)
        )
      )
    },

    queue_add: function () {
      webapi.queue_add(this.track.uri).then(() =>
        this.$store.dispatch('add_notification', { text: 'Track appended to queue', type: 'info', timeout: 2000 })
      )
    }
  }
}
</script>

<style>
</style>
