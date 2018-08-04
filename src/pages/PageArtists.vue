<template>
  <div>
    <tabs-music></tabs-music>

    <content-with-heading>
      <template slot="heading-left">
        <p class="title is-4">Artists</p>
        <p class="heading">{{ artists.total }} artists</p>
      </template>
      <template slot="heading-right">
        <a class="button is-small" :class="{ 'is-info': hide_singles }" @click="update_hide_singles">
          <span class="icon">
            <i class="mdi mdi-numeric-1-box-multiple-outline"></i>
          </span>
          <span>Hide singles</span>
        </a>
      </template>
      <template slot="content">
        <list-item-artist v-for="artist_el in artist_els" :key="artist_el.id" :artist="artist_el" v-if="!hide_singles || artist_el.track_count > (artist_el.album_count * 2)"></list-item-artist>
      <infinite-loading v-if="offset < total" @infinite="load_next"><span slot="no-more">.</span></infinite-loading>
      </template>
    </content-with-heading>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import ContentWithHeading from '@/templates/ContentWithHeading'
import TabsMusic from '@/components/TabsMusic'
import ListItemArtist from '@/components/ListItemArtist'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'
import InfiniteLoading from 'vue-infinite-loading'

const artistsData = {
  load: function (to) {
    return webapi.library_artists_pag(0, 50)
  },

  set: function (vm, response) {
    vm.artists = response.data
    vm.artist_els = []
    vm.total = 0
    vm.limit = 50
    vm.offset = 0
    vm.append_artists(response.data)

    vm.timer = setTimeout(vm.bg_load_next, 5000)
  }
}

export default {
  name: 'PageArtists',
  mixins: [ LoadDataBeforeEnterMixin(artistsData) ],
  components: { ContentWithHeading, TabsMusic, ListItemArtist, InfiniteLoading },

  data () {
    return {
      artists: {},
      artist_els: [],
      limit: 50,
      offset: 0,
      total: 0,
      timer: {}
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
    },

    load_next: function ($state) {
      webapi.library_artists_pag(this.offset, this.limit).then(response => {
        this.append_artists(response.data, $state)
      })
    },

    append_artists: function (data, $state) {
      this.artist_els = this.artist_els.concat(data.items)
      this.total = data.total
      this.offset += data.limit

      if ($state) {
        $state.loaded()
        if (this.offset >= this.total) {
          $state.complete()
        }
      }
    },

    bg_load_next: function () {
      clearTimeout(this.timer)
      if (this.offset < this.total) {
        this.load_next()
        this.timer = setTimeout(this.bg_load_next, 5000)
      }
    }
  }
}
</script>

<style>
</style>
