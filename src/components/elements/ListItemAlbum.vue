<template>
  <div class="media">
    <div class="media-content fd-has-action is-clipped" v-on:click="open_album_tracks">
      <h1 class="title is-6">{{ album.name }}</h1>
      <h2 class="subtitle is-7">{{ album.artist }}<br>{{ album.track_count }} songs</h2>
    </div>
    <div class="media-right">
      <a v-on:click="queue_add">
        <span class="icon has-text-dark"><i class="mdi mdi-playlist-plus mdi-18px"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
import webapi from '@/webapi'

export default {
  name: 'ListItemAlbum',

  props: ['album'],

  methods: {
    open_album_tracks: function () {
      this.$router.push({ path: '/music/albums/' + this.album.id + '/tracks', query: { context_uri: this.album.uri } })
    },

    queue_add: function () {
      webapi.queue_add(this.album.uri).then(() =>
        this.$store.dispatch('add_notification', { text: 'Album tracks appended to queue', type: 'info', timeout: 2000 })
      )
    }
  }
}
</script>

<style>
</style>
