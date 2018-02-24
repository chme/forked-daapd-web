<template>
  <div class="media">
    <div class="media-content fd-has-action is-clipped" v-on:click="open_playlist_tracks">
      <h1 class="title is-6">{{ playlist.name }}</h1>
      <h2 class="subtitle is-7">{{ playlist.path }}</h2>
    </div>
    <div class="media-right">
      <a class="" v-on:click="queue_add">
        <span class="icon has-text-dark"><i class="mdi mdi-playlist-plus mdi-18px"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
import webapi from '@/webapi'

export default {
  name: 'PartPlaylist',

  props: ['playlist'],

  methods: {
    open_playlist_tracks: function () {
      this.$router.push({ path: '/playlists/' + this.playlist.id + '/tracks', query: { context_uri: this.playlist.uri } })
    },

    queue_add: function () {
      webapi.queue_add(this.playlist.uri).then(
        // this.$store.commit(types.ADD_NOTIFICATION, { text: 'Album tracks appended to queue', timeout: 0 })
        this.$store.dispatch('add_notification', { text: 'Playlist appended to queue', type: 'info', timeout: 3000 })
      )
    }
  }
}
</script>

<style>
</style>
