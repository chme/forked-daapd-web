<template>
  <div class="media">
    <div class="media-content fd-has-action is-clipped" v-on:click="open_artist">
      <h1 class="title is-6">{{ artist.name }}</h1>
      <h2 class="subtitle is-7">{{ artist.album_count }} albums | {{ artist.track_count }} songs</h2>
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
                  <a class="has-text-link" @click="open_artist">{{ artist.name }}</a>
                </p>
                <div class="content is-small">
                  <p>
                    <span class="heading">Albums</span>
                    <span class="title is-6">{{ artist.album_count }}</span>
                  </p>
                  <p>
                    <span class="heading">Tracks</span>
                    <span class="title is-6">{{ artist.track_count }}</span>
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
  name: 'PartArtist',

  props: ['artist'],

  data () {
    return {
      show_details_modal: false
    }
  },

  methods: {
    play: function () {
      webapi.queue_clear().then(() =>
        webapi.queue_add(this.artist.uri).then(() =>
          webapi.player_play()
        )
      )
      this.show_details_modal = false
    },

    queue_add: function () {
      webapi.queue_add(this.artist.uri).then(() =>
        this.$store.dispatch('add_notification', { text: 'Artist tracks appended to queue', type: 'info', timeout: 2000 })
      )
      this.show_details_modal = false
    },

    show_details: function () {
      this.show_details_modal = true
    },

    hide_details: function () {
      this.show_details_modal = false
    },

    open_artist: function () {
      this.show_details_modal = false
      this.$router.push({ path: '/music/artists/' + this.artist.id })
    }
  }
}
</script>

<style>
</style>
