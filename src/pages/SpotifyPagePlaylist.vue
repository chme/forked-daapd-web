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
import ContentWithHeading from '@/templates/ContentWithHeading'
import SpotifyListItemTrack from '@/components/SpotifyListItemTrack'
import webapi from '@/webapi'
import SpotifyWebApi from 'spotify-web-api-js'

export default {
  name: 'SpotifyPagePlaylist',
  components: { ContentWithHeading, SpotifyListItemTrack },

  data () {
    return {
      playlist: {},
      tracks: []
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
    }
  }
}
</script>

<style>
</style>
