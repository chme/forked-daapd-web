<template>
  <div>
    <tabs-music></tabs-music>

    <content-with-heading>
      <template slot="heading-left">
        <p class="title is-4">Albums</p>
        <p class="heading">{{ albums.total }} albums</p>
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
        <list-item-album v-for="album_el in album_els" :key="album_el.id" :album="album_el" v-if="!hide_singles || album_el.track_count > 2"></list-item-album>
      <infinite-loading v-if="offset < total" @infinite="load_next"><span slot="no-more">.</span></infinite-loading>
      </template>
    </content-with-heading>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import ContentWithHeading from '@/templates/ContentWithHeading'
import TabsMusic from '@/components/TabsMusic'
import ListItemAlbum from '@/components/ListItemAlbum'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'
import InfiniteLoading from 'vue-infinite-loading'

const albumsData = {
  load: function (to) {
    return webapi.library_albums_pag(0, 50)
  },

  set: function (vm, response) {
    vm.albums = response.data
    vm.albums_els = []
    vm.total = 0
    vm.limit = 50
    vm.offset = 0
    vm.append_albums(response.data)
  }
}

export default {
  name: 'PageAlbums',
  mixins: [ LoadDataBeforeEnterMixin(albumsData) ],
  components: { ContentWithHeading, TabsMusic, ListItemAlbum, InfiniteLoading },

  data () {
    return {
      albums: {},
      album_els: [],
      limit: 1,
      offset: 0,
      total: 0
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
      webapi.library_albums_pag(this.offset, this.limit).then(response => {
        this.append_albums(response.data, $state)
      })
    },

    append_albums: function (data, $state) {
      this.album_els = this.album_els.concat(data.items)
      this.total = data.total
      this.offset += data.limit

      if ($state) {
        $state.loaded()
        if (this.offset >= this.total) {
          $state.complete()
        }
      }
    }
  }
}
</script>

<style>
</style>
