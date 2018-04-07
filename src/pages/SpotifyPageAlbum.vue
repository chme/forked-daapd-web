<template>
  <content-with-heading>
    <template slot="heading-left">
      <div class="title is-4">{{ album.name }}</div>
      <a class="title is-4 has-text-link has-text-weight-normal" @click="open_artist">{{ album.artists[0].name }}</a>
    </template>
    <template slot="content">
      <p class="heading has-text-centered-mobile">{{ album.tracks.total }} tracks</p>
      <spotify-list-item-track v-for="(track, index) in album.tracks.items" :key="track.id" :track="track" :position="index" :album="album" :context_uri="album.uri"></spotify-list-item-track>
    </template>
  </content-with-heading>
</template>

<script>
import ContentWithHeading from '@/templates/ContentWithHeading'
import SpotifyListItemTrack from '@/components/SpotifyListItemTrack'
import webapi from '@/webapi'
import SpotifyWebApi from 'spotify-web-api-js'

export default {
  name: 'PageAlbum',
  components: { ContentWithHeading, SpotifyListItemTrack },

  data () {
    return {
      album: {}
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
    }
  }
}
</script>

<style>
</style>
