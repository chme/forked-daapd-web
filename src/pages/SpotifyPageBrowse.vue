<template>
  <div>
    <tabs-music></tabs-music>

    <section class="section" v-if="show_new_releases">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
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
            <nav v-if="show_more_button" class="level" style="margin-top: 16px;">
              <p class="level-item">
                <a class="button is-light is-small is-rounded" v-on:click="open_browse('newreleases')">Show more</a>
              </p>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <section class="section" v-if="show_featured_playlists">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item has-text-centered-mobile">
                  <div>
                    <p class="title is-4">Featured Playlists</p>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
              </div>
            </nav>
            <spotify-list-item-playlist v-for="playlist in featured_playlists" :key="playlist.id" :playlist="playlist"></spotify-list-item-playlist>
            <nav v-if="show_more_button" class="level" style="margin-top: 16px;">
              <p class="level-item">
                <a class="button is-light is-small is-rounded" v-on:click="open_browse('featuredplaylists')">Show more</a>
              </p>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TabsMusic from '@/components/TabsMusic'
import SpotifyListItemAlbum from '@/components/SpotifyListItemAlbum'
import SpotifyListItemPlaylist from '@/components/SpotifyListItemPlaylist'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'
import SpotifyWebApi from 'spotify-web-api-js'

export default {
  name: 'SpotifyPageBrowse',
  components: { TabsMusic, SpotifyListItemAlbum, SpotifyListItemPlaylist },

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

    featured_playlists () {
      if (this.$route.params.type === 'featuredplaylists') {
        return this.$store.state.spotify_featured_playlists.playlists.items
      }
      return this.$store.state.spotify_featured_playlists.playlists.items.slice(0, 3)
    },

    show_new_releases () {
      return !this.$route.params.type || this.$route.params.type === 'newreleases'
    },

    show_featured_playlists () {
      return !this.$route.params.type || this.$route.params.type === 'featuredplaylists'
    },

    show_more_button () {
      return !this.$route.params.type
    }
  },

  methods: {
    load: function () {
      if (!this.$store.state.spotify_new_releases.albums.href) {
        webapi.spotify().then(({ data }) => {
          this.spotify = data

          var spotifyApi = new SpotifyWebApi()
          spotifyApi.setAccessToken(this.spotify.webapi_token)
          spotifyApi.getNewReleases({ country: this.spotify.webapi_country, limit: 50 }).then(data => {
            this.$store.commit(types.SPOTIFY_NEW_RELEASES, data)

            spotifyApi.getFeaturedPlaylists({ country: this.spotify.webapi_country, limit: 50 }).then(data => {
              this.$store.commit(types.SPOTIFY_FEATURED_PLAYLISTS, data)
            })
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
    '$route' (to, from) {
      this.load()
    }
  }
}
</script>

<style>
</style>
