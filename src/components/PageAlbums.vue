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
                  <p class="title is-4">Albums</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
              <p class="level-item"><label class="checkbox"><input type="checkbox" :checked="hide_singles" @click="update_hide_singles"> Hide singles</label></p>
            </div>
          </nav>
          <part-album v-for="album in albums" :key="album.id" :album="album" v-if="!hide_singles || album.track_count > 1"></part-album>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PartAlbum from '@/components/PartAlbum'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'

export default {
  name: 'PageAlbums',
  components: { PartAlbum },

  data () {
    return {
      albums: []
    }
  },

  computed: {
    hide_singles () {
      return this.$store.state.hide_singles
    },
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    library_albums: function (artistId) {
      webapi.library_albums(artistId).then(({ data }) => {
        this.albums = data.albums
      })
    },

    update_hide_singles: function (e) {
      this.$store.commit(types.HIDE_SINGLES, !this.hide_singles)
    }
  },

  created: function () {
    this.library_albums(this.$route.params.artist_id)
  },

  watch: {
    '$route' (to, from) {
      this.library_albums(to.params.artist_id)
    },
    'server_connection' () {
      this.library_albums(this.$route.params.artist_id)
    }
  }
}
</script>

<style>
</style>
