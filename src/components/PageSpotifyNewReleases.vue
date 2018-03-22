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
          <spotify-list-item-album v-for="album in new_releases" :key="album.id" :album="album"></spotify-list-item-album>
          <nav v-if="show_more_new_releases_button" class="level" style="margin-top: 16px;">
            <p class="level-item">
              <a class="button is-light is-small is-rounded" v-on:click="open_browse('newreleases')">Show more</a>
            </p>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TabsMusic from '@/components/elements/TabsMusic'
import SpotifyListItemAlbum from '@/components/elements/SpotifyListItemAlbum'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'
import SpotifyWebApi from 'spotify-web-api-js'

export default {
  name: 'PageSpotifyNewReleases',
  components: { TabsMusic, SpotifyListItemAlbum },

  data () {
    return {
      spotify: {}
    }
  },

  computed: {
    new_releases () {
      if (this.$route.params.type === 'newreleases') {
        return this.$store.state.spotify_new_releases.albums.items
      }
      return this.$store.state.spotify_new_releases.albums.items.slice(0, 3)
    },

    show_more_new_releases_button () {
      return !this.$route.params.type
    }
  },

  methods: {
    load: function () {
      if (!this.new_releases) {
        webapi.spotify().then(({ data }) => {
          this.spotify = data

          var spotifyApi = new SpotifyWebApi()
          spotifyApi.setAccessToken(this.spotify.webapi_token)
          spotifyApi.getNewReleases({ country: this.spotify.webapi_country, limit: 50 }).then(data => {
            this.$store.commit(types.SPOTIFY_NEW_RELEASES, data)
          })
        })
      }
    },

    open_browse: function (type) {
      this.$router.push({ path: '/music/spotify/' + type })
    }
  },

  created: function () {
    this.load()
  },

  watch: {
  }
}
</script>

<style>
</style>
