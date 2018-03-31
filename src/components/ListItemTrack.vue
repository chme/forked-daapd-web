<template>
  <div class="media">
    <div class="media-content fd-has-action is-clipped" v-on:click="play">
      <h1 class="title is-6">{{ track.title }}</h1>
      <h2 class="subtitle is-7">{{ track.artist }}<br>{{ track.album }}</h2>
    </div>
    <div class="media-right">
      <a @click="show_details">
        <span class="icon has-text-dark"><i class="mdi mdi-dots-vertical mdi-18px"></i></span>
      </a>
      <transition name="fade">
        <div class="modal is-active" v-if="show_details_modal">
          <div class="modal-background" @click="hide_details"></div>
          <div class="modal-content">
            <div class="card">
              <div class="card-content">
                <p class="title is-4">
                  {{ track.title }}
                </p>
                <p class="subtitle">
                  {{ track.artist }}
                </p>
                <div class="content is-small">
                  <p>
                    <span class="heading">Album</span>
                    <a class="title is-6 has-text-link" @click="open_album">{{ track.album }}</a>
                  </p>
                  <p>
                    <span class="heading">Album artist</span>
                    <a class="title is-6 has-text-link" @click="open_artist">{{ track.album_artist }}</a>
                  </p>
                  <p v-if="track.year > 0">
                    <span class="heading">Year</span>
                    <span class="title is-6">{{ track.year }}</span>
                  </p>
                  <p>
                    <span class="heading">Genre</span>
                    <span class="title is-6">{{ track.genre }}</span>
                  </p>
                  <p>
                    <span class="heading">Track / Disc</span>
                    <span class="title is-6">{{ track.track_number }} / {{ track.disc_number }}</span>
                  </p>
                  <p>
                    <span class="heading">Path</span>
                    <span class="title is-6">{{ track.path }}</span>
                  </p>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item has-text-dark" @click="queue_add">
                  <span class="icon"><i class="mdi mdi-playlist-plus mdi-18px"></i></span> <span>Add</span>
                </a>
                <a class="card-footer-item has-text-dark" @click="play">
                  <span class="icon"><i class="mdi mdi-play mdi-18px"></i></span> <span>Play</span>
                </a>
              </footer>
            </div>
          </div>
          <button class="modal-close is-large" aria-label="close" @click="hide_details"></button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import webapi from '@/webapi'

export default {
  name: 'PartTrack',

  props: ['track', 'position', 'context_uri'],

  data () {
    return {
      show_details_modal: false
    }
  },

  methods: {
    play: function () {
      webapi.queue_clear().then(() =>
        webapi.queue_add(this.context_uri).then(() =>
          webapi.player_playpos(this.position)
        )
      )
      this.show_details_modal = false
    },

    queue_add: function () {
      webapi.queue_add(this.track.uri).then(() =>
        this.$store.dispatch('add_notification', { text: 'Track appended to queue', type: 'info', timeout: 2000 })
      )
      this.show_details_modal = false
    },

    show_details: function () {
      this.show_details_modal = true
    },

    hide_details: function () {
      this.show_details_modal = false
    },

    open_album: function () {
      this.show_details_modal = false
      this.$router.push({ path: '/music/albums/' + this.track.album_id })
    },

    open_artist: function () {
      this.show_details_modal = false
      this.$router.push({ path: '/music/artists/' + this.track.album_artist_id })
    }
  }
}
</script>

<style>
</style>