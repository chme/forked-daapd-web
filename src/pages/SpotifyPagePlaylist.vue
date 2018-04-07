<template>
  <content-with-heading>
    <template slot="heading-left">
      <div class="title is-4">{{ playlist.name }}</div>
    </template>
    <template slot="content">
      <p class="heading has-text-centered-mobile">{{ playlist.tracks.total }} tracks</p>
      <spotify-list-item-track v-for="(item, index) in tracks" :key="item.track.id" :track="item.track" :album="item.track.album" :position="index" :context_uri="playlist.uri"></spotify-list-item-track>
    </template>
  </content-with-heading>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import ContentWithHeading from '@/templates/ContentWithHeading'
import SpotifyListItemTrack from '@/components/SpotifyListItemTrack'
import store from '@/store'
import SpotifyWebApi from 'spotify-web-api-js'

const playlistData = {
  load: function (to) {
    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(store.state.spotify.webapi_token)
    return Promise.all([
      spotifyApi.getPlaylist(to.params.user_id, to.params.playlist_id),
      spotifyApi.getPlaylistTracks(to.params.user_id, to.params.playlist_id)
    ])
  },

  set: function (vm, response) {
    vm.playlist = response[0]
    vm.tracks = response[1].items
  }
}

export default {
  name: 'SpotifyPagePlaylist',
  mixins: [ LoadDataBeforeEnterMixin(playlistData) ],
  components: { ContentWithHeading, SpotifyListItemTrack },

  data () {
    return {
      playlist: {},
      tracks: []
    }
  },

  methods: {
  }
}
</script>

<style>
</style>
