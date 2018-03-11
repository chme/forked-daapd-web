<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-four-fifths">
          <tabs-music></tabs-music>
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item has-text-centered-mobile">
                <div>
                  <p class="title is-4">New Releases</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <spotify-list-item-album v-for="album in releases.albums.items" :key="album.id" :album="album"></spotify-list-item-album>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TabsMusic from '@/components/elements/TabsMusic'
import SpotifyListItemAlbum from '@/components/elements/SpotifyListItemAlbum'
import webapi from '@/webapi'
import SpotifyWebApi from 'spotify-web-api-js'

export default {
  name: 'PageSpotifyNewReleases',
  components: { TabsMusic, SpotifyListItemAlbum },

  data () {
    return {
      spotify: {},
      releases: {}
    }
  },

  computed: {
  },

  methods: {
  },

  created: function () {
    webapi.spotify().then(({ data }) => {
      this.spotify = data

      var spotifyApi = new SpotifyWebApi()
      spotifyApi.setAccessToken(this.spotify.webapi_token)
      spotifyApi.getNewReleases({ country: 'DE', limit: 50 }).then(data => { this.releases = data })
    })
  },

  watch: {
  }
}
</script>

<style>
</style>
