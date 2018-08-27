<template>
  <div>
    <tabs-music></tabs-music>

    <content-with-heading>
      <template slot="heading-left">
        <p class="heading">{{ genreAlbums.total }} albums</p>
      </template>
      <template slot="heading-right">
        <a class="button is-small is-dark is-rounded" @click="play">
          <span class="icon">
            <i class="mdi mdi-play"></i>
          </span>
          <span>Play</span>
        </a>
      </template>
      <template slot="content">
        <list-item-genre-albums v-for="galbum in genreAlbums.items" :key="galbum.id" :galbum="galbum"></list-item-genre-albums>
      </template>
    </content-with-heading>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import ContentWithHeading from '@/templates/ContentWithHeading'
import TabsMusic from '@/components/TabsMusic'
import ListItemGenreAlbums from '@/components/ListItemGenreAlbums'
import webapi from '@/webapi'

const PageGenre = {
  load: function (to) {
    return webapi.library_genre(to.query.genre)
  },

  set: function (vm, response) {
    vm.genreAlbums = response.data.albums
  }
}

export default {
  name: 'PageGenrex',
  mixins: [ LoadDataBeforeEnterMixin(PageGenre) ],
  components: { ContentWithHeading, TabsMusic, ListItemGenreAlbums },

  data () {
    return {
      genreAlbums: {}
    }
  },

  methods: {
    queueem: function () {
      var i
      for (i = 0; i < this.genreAlbums.items.length; i++) {
        webapi.queue_add(this.genreAlbums.items[i].uri)
      }
      webapi.player_play()
    },
    play: function () {
      webapi.queue_clear().then(() =>
        this.queueem()
      )
    }
  }
}
</script>

<style>
</style>
