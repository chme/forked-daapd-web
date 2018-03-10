<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-four-fifths">
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item has-text-centered-mobile">
                <div>
                  <p class="title is-4">Tracks</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <part-track v-for="(track, index) in tracks" :key="track.id" :track="track" :position="index" :context_uri="$route.query.context_uri"></part-track>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PartTrack from '@/components/PartTrack'
import webapi from '@/webapi'

export default {
  name: 'PageTracks',
  components: { PartTrack },

  data () {
    return {
      tracks: []
    }
  },

  computed: {
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    load_tracks: function (route) {
      if (route.params.album_id !== undefined) {
        webapi.library_album_tracks(route.params.album_id).then(({ data }) => {
          this.tracks = data.tracks
        })
      } else {
        webapi.library_playlist_tracks(route.params.playlist_id).then(({ data }) => {
          this.tracks = data.tracks
        })
      }
    }
  },

  created: function () {
    this.load_tracks(this.$route)
  },

  watch: {
    '$route' (to, from) {
      this.load_tracks(to)
    },
    'server_connection' () {
      this.load_tracks(this.$route)
    }
  }
}
</script>

<style>
</style>
