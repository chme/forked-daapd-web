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
                    <p class="title is-4">Albums</p>
                    <p class="heading">{{ albums.total }} albums</p>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
                <p class="level-item"><label class="checkbox"><input type="checkbox" :checked="hide_singles" @click="update_hide_singles"> Hide singles</label></p>
              </div>
            </nav>
            <list-item-album v-for="album in albums.items" :key="album.id" :album="album" v-if="!hide_singles || album.track_count > 2"></list-item-album>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TabsMusic from '@/components/elements/TabsMusic'
import ListItemAlbum from '@/components/elements/ListItemAlbum'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'

export default {
  name: 'PageAlbums',
  components: { TabsMusic, ListItemAlbum },

  data () {
    return {
      albums: {}
    }
  },

  computed: {
    hide_singles () {
      return this.$store.state.hide_singles
    }
  },

  methods: {
    library_albums: function (artistId) {
      webapi.library_albums(artistId).then(({ data }) => {
        this.albums = data
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
    }
  }
}
</script>

<style>
</style>
