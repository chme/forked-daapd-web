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
                  <a class="title is-4 has-text-link has-text-weight-normal" @click="open_artist">{{ album.artist }}</a>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <p class="heading has-text-centered-mobile">{{ album.track_count }} tracks</p>
          <list-item-track v-for="(track, index) in tracks" :key="track.id" :track="track" :position="index" :context_uri="album.uri"></list-item-track>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ListItemTrack from '@/components/ListItemTrack'
import webapi from '@/webapi'

export default {
  name: 'PageAlbum',
  components: { ListItemTrack },

  data () {
    return {
      album: {},
      tracks: []
    }
  },

  methods: {
    load: function (albumId) {
      webapi.library_album(albumId).then(({ data }) => {
        this.album = data
      })
      webapi.library_album_tracks(albumId).then(({ data }) => {
        this.tracks = data.items
      })
    },

    open_artist: function () {
      this.show_details_modal = false
      this.$router.push({ path: '/music/artists/' + this.album.artist_id })
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
