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
                    <p class="title is-4">Artists</p>
                    <p class="heading">{{ artists.total }} artists</p>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
                <p class="level-item"><label class="checkbox"><input type="checkbox" :checked="hide_singles" @click="update_hide_singles"> Hide singles</label></p>
              </div>
            </nav>
            <list-item-artist v-for="artist in artists.items" :key="artist.id" :artist="artist" v-if="!hide_singles || artist.track_count > (artist.album_count * 2)"></list-item-artist>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TabsMusic from '@/components/TabsMusic'
import ListItemArtist from '@/components/ListItemArtist'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'

const artistsData = {
  load: function (to) {
    return webapi.library_artists()
  },

  set: function (vm, response) {
    vm.artists = response.data
  }
}

export default {
  name: 'PageArtists',
  components: { TabsMusic, ListItemArtist },

  data () {
    return {
      artists: {}
    }
  },

  computed: {
    hide_singles () {
      return this.$store.state.hide_singles
    }
  },

  methods: {
    update_hide_singles: function (e) {
      this.$store.commit(types.HIDE_SINGLES, !this.hide_singles)
    }
  },

  beforeRouteEnter (to, from, next) {
    artistsData.load(to).then((response) => {
      next(vm => artistsData.set(vm, response))
    })
  },
  beforeRouteUpdate (to, from, next) {
    const vm = this
    artistsData.load(to).then((response) => {
      artistsData.set(vm, response)
      next()
    })
  }
}
</script>

<style>
</style>
