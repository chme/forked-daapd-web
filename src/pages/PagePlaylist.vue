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
                  <div class="title is-4">{{ playlist.name }}</div>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <p class="heading has-text-centered-mobile">tracks</p>
          <list-item-track v-for="(track, index) in tracks" :key="track.id" :track="track" :position="index" :context_uri="playlist.uri"></list-item-track>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ListItemTrack from '@/components/ListItemTrack'
import webapi from '@/webapi'

const playlistData = {
  load: function (to) {
    return Promise.all([
      webapi.library_playlist(to.params.playlist_id),
      webapi.library_playlist_tracks(to.params.playlist_id)
    ])
  },

  set: function (vm, response) {
    vm.playlist = response[0].data
    vm.tracks = response[1].data.items
  }
}

export default {
  name: 'PagePlaylist',
  components: { ListItemTrack },

  data () {
    return {
      playlist: {},
      tracks: []
    }
  },

  methods: {
    load: function (playlistId) {
      webapi.library_playlist(playlistId).then(({ data }) => {
        this.playlist = data
      })
      webapi.library_playlist_tracks(playlistId).then(({ data }) => {
        this.tracks = data.items
      })
    }
  },

  beforeRouteEnter (to, from, next) {
    playlistData.load(to).then((response) => {
      next(vm => playlistData.set(vm, response))
    })
  },
  beforeRouteUpdate (to, from, next) {
    const vm = this
    playlistData.load(to).then((response) => {
      playlistData.set(vm, response)
      next()
    })
  }
}
</script>

<style>
</style>
