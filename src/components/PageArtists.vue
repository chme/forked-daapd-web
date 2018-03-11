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
                  <p class="title is-4">Artists</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
              <p class="level-item"><label class="checkbox"><input type="checkbox" :checked="hide_singles" @click="update_hide_singles"> Hide singles</label></p>
            </div>
          </nav>
          <list-item-artist v-for="artist in artists" :key="artist.id" :artist="artist" v-if="!hide_singles || artist.track_count > artist.album_count"></list-item-artist>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ListItemArtist from '@/components/elements/ListItemArtist'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'

export default {
  name: 'PageArtists',
  components: { ListItemArtist },

  data () {
    return {
      artists: []
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
    update_hide_singles: function (e) {
      this.$store.commit(types.HIDE_SINGLES, !this.hide_singles)
    },
    library_artists: function () {
      webapi.library_artists().then(({ data }) => {
        this.artists = data.artists
      })
    }
  },

  created: function () {
    this.library_artists()
  },

  watch: {
    '$route' (to, from) {
      this.library_artists()
    },
    'server_connection' () {
      this.library_artists()
    }
  }
}
</script>

<style>
</style>
