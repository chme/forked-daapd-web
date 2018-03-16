<template>
  <div class="media">
    <div class="media-content fd-has-action is-clipped" v-on:click="open_artist_albums">
      <h1 class="title is-6">{{ artist.name }}</h1>
      <h2 class="subtitle is-7">{{ artist.album_count }} albums | {{ artist.track_count }} songs</h2>
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
  name: 'PartArtist',

  props: ['artist'],

  methods: {
    open_artist_albums: function () {
      this.$router.push({ path: '/music/artists/' + this.artist.id + '/albums' })
    },

    queue_add: function () {
      webapi.queue_add(this.artist.uri).then(() =>
        this.$store.dispatch('add_notification', { text: 'Artist tracks appended to queue', type: 'info', timeout: 2000 })
      )
    }
  }
}
</script>

<style>
</style>
