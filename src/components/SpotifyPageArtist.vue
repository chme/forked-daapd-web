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
                  <p class="title is-4">{{ artist.name }}</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <p class="heading has-text-centered-mobile">{{ albums.total }} albums</p>
          <spotify-list-item-album v-for="album in albums.items" :key="album.id" :album="album"></spotify-list-item-album>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SpotifyListItemAlbum from '@/components/elements/SpotifyListItemAlbum'
import webapi from '@/webapi'
import SpotifyWebApi from 'spotify-web-api-js'

export default {
  name: 'SpotifyPageArtist',
  components: { SpotifyListItemAlbum },

  data () {
    return {
      artist: {},
      albums: {}
    }
  },

  computed: {
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    load: function (artistId) {
      webapi.spotify().then(({ data }) => {
        this.spotify = data

        var spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(this.spotify.webapi_token)
        spotifyApi.getArtist(artistId).then(data => {
          this.artist = data
        })
        spotifyApi.getArtistAlbums(artistId, { limit: 50 }).then(data => {
          this.albums = data
        })
      })
    }
  },

  created: function () {
    this.load(this.$route.params.artist_id)
  },

  watch: {
    '$route' (to, from) {
      this.load(to.params.artist_id)
    },
    'server_connection' () {
      this.load(this.$route.params.artist_id)
    }
  }
}
</script>

<style>
</style>
