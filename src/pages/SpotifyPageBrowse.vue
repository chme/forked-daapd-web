<template>
  <div>
    <tabs-music></tabs-music>

    <section class="section">
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
            <nav class="level" style="margin-top: 16px;">
              <p class="level-item">
                <router-link to="/music/spotify/new-releases" class="button is-light is-small is-rounded">
                  Show more
                </router-link>
              </p>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
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
            <nav class="level" style="margin-top: 16px;">
              <p class="level-item">
                <router-link to="/music/spotify/featured-playlists" class="button is-light is-small is-rounded">
                  Show more
                </router-link>
              </p>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import TabsMusic from '@/components/TabsMusic'
import SpotifyListItemAlbum from '@/components/SpotifyListItemAlbum'
import SpotifyListItemPlaylist from '@/components/SpotifyListItemPlaylist'
import store from '@/store'
import * as types from '@/store/mutation_types'
import SpotifyWebApi from 'spotify-web-api-js'

const browseData = {
  load: function (to) {
    if (store.state.spotify_new_releases.length > 0 && store.state.spotify_featured_playlists.length > 0) {
      return Promise.resolve()
    }

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(store.state.spotify.webapi_token)
    return Promise.all([
      spotifyApi.getNewReleases({ country: store.state.spotify.webapi_country, limit: 50 }),
      spotifyApi.getFeaturedPlaylists({ country: store.state.spotify.webapi_country, limit: 50 })
    ])
  },

  set: function (vm, response) {
    if (response) {
      store.commit(types.SPOTIFY_NEW_RELEASES, response[0].albums.items)
      store.commit(types.SPOTIFY_FEATURED_PLAYLISTS, response[1].playlists.items)
    }
  }
}

export default {
  name: 'SpotifyPageBrowse',
  mixins: [ LoadDataBeforeEnterMixin(browseData) ],
  components: { TabsMusic, SpotifyListItemAlbum, SpotifyListItemPlaylist },

  computed: {
    new_releases () {
      return this.$store.state.spotify_new_releases.slice(0, 3)
    },

    featured_playlists () {
      return this.$store.state.spotify_featured_playlists.slice(0, 3)
    }
  }
}
</script>

<style>
</style>
