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
                  <div class="title is-4">{{ album.name }}</div>
                  <a class="title is-4 has-text-link has-text-weight-normal" @click="open_artist">{{ album.artists[0].name }}</a>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <p class="heading has-text-centered-mobile">{{ album.tracks.total }} tracks</p>
          <spotify-list-item-track v-for="(track, index) in album.tracks.items" :key="track.id" :track="track" :position="index" :album="album" :context_uri="album.uri"></spotify-list-item-track>
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
  name: 'PageAlbum',
  components: { SpotifyListItemTrack },

  data () {
    return {
      album: {}
    }
  },

  computed: {
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    load: function (albumId) {
      webapi.spotify().then(({ data }) => {
        this.spotify = data

        var spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(this.spotify.webapi_token)
        spotifyApi.getAlbum(albumId).then(data => {
          this.album = data
        })
      })
    },

    open_artist: function () {
      this.$router.push({ path: '/music/spotify/artists/' + this.album.artists[0].id })
    }
  },

  created: function () {
    this.load(this.$route.params.album_id)
  },

  watch: {
    '$route' (to, from) {
      this.load(to.params.album_id)
    },
    'server_connection' () {
      this.load(this.$route.params.album_id)
    }
  }
}
</script>

<style>
</style>
