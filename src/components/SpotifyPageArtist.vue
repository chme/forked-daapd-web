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
          <p class="heading has-text-centered-mobile">{{ total }} albums</p>
          <spotify-list-item-album v-for="album in albums" :key="album.id" :album="album"></spotify-list-item-album>
          <infinite-loading @infinite="load_next"><span slot="no-more">.</span></infinite-loading>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SpotifyListItemAlbum from '@/components/elements/SpotifyListItemAlbum'
import webapi from '@/webapi'
import SpotifyWebApi from 'spotify-web-api-js'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'SpotifyPageArtist',
  components: { SpotifyListItemAlbum, InfiniteLoading },

  data () {
    return {
      artist_id: undefined,
      artist: {},
      albums: [],
      total: 0,
      paging: { limit: 50, offset: 0, include_groups: 'album,single' }
    }
  },

  computed: {
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    reset_paging: function () {
      this.total = 0
      this.paging = { limit: 50, offset: 0, include_groups: 'album,single' }
      this.albums = []
    },

    load: function (artistId) {
      webapi.spotify().then(({ data }) => {
        this.spotify = data

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(this.spotify.webapi_token)
        spotifyApi.getArtist(artistId).then(data => {
          this.artist = data
        })
      })
    },

    load_next: function ($state) {
      webapi.spotify().then(({ data }) => {
        this.spotify = data

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(this.spotify.webapi_token)
        spotifyApi.getArtistAlbums(this.artist_id, this.paging).then(data => {
          this.albums = this.albums.concat(data.items)
          this.total = data.total
          this.paging.offset += data.limit
          $state.loaded()
          if (this.paging.offset >= this.total) {
            $state.complete()
          }
        })
      })
    }
  },

  created: function () {
    this.artist_id = this.$route.params.artist_id
    this.reset_paging()
    this.load(this.$route.params.artist_id)
  },

  watch: {
    '$route' (to, from) {
      this.artist_id = to.params.artist_id
      this.reset_paging()
      this.load(to.params.artist_id)
    },
    'server_connection' () {
      this.artist_id = this.$route.params.artist_id
      this.reset_paging()
      this.load(this.$route.params.artist_id)
    }
  }
}
</script>

<style>
</style>
