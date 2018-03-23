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
                  <div class="title is-4">{{ playlist.name }}</div>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <p class="heading has-text-centered-mobile">{{ playlist.tracks.total }} tracks</p>
          <spotify-list-item-track v-for="(item, index) in tracks" :key="item.track.id" :track="item.track" :album="item.track.album" :position="index" :context_uri="playlist.uri"></spotify-list-item-track>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SpotifyListItemTrack from '@/components/elements/SpotifyListItemTrack'
import webapi from '@/webapi'
import SpotifyWebApi from 'spotify-web-api-js'

export default {
  name: 'SpotifyPagePlaylist',
  components: { SpotifyListItemTrack },

  data () {
    return {
      playlist: {},
      tracks: []
    }
  },

  computed: {
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    load: function (userId, playlistId) {
      webapi.spotify().then(({ data }) => {
        this.spotify = data

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(this.spotify.webapi_token)
        spotifyApi.getPlaylist(userId, playlistId).then(data => {
          this.playlist = data

          this.load_tracks(userId, playlistId)
        })
      })
    },

    load_tracks: function (userId, playlistId) {
      const spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(this.spotify.webapi_token)
      spotifyApi.getPlaylistTracks(userId, playlistId).then(data => {
        // Array.prototype.push.apply(this.tracks, data.items)
        this.tracks = data.items
      })
    }
  },

  created: function () {
    this.load(this.$route.params.user_id, this.$route.params.playlist_id)
  },

  watch: {
    '$route' (to, from) {
      this.load(to.params.user_id, to.params.playlist_id)
    },
    'server_connection' () {
      this.load(this.$route.params.user_id, this.$route.params.playlist_id)
    }
  }
}
</script>

<style>
</style>
