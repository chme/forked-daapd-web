<template>
  <div>
    <tabs-music></tabs-music>

    <content-with-heading>
      <template slot="heading-left">
        <p class="title is-4">{{ name }}</p>
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
        <list-item-albums v-for="album in genreAlbums.items" :key="album.id" :album="album"></list-item-albums>
      </template>
    </content-with-heading>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import ContentWithHeading from '@/templates/ContentWithHeading'
import TabsMusic from '@/components/TabsMusic'
import ListItemAlbums from '@/components/ListItemAlbum'
import webapi from '@/webapi'

const PageGenre = {
  data () {
    return {
      name: ''
    }
  },

  load: function (to) {
    this.name = to.params.genre
    return webapi.library_genre(to.params.genre)
  },

  set: function (vm, response) {
    vm.name = this.name
    vm.genreAlbums = response.data.albums
  }
}

export default {
  name: 'PageGenrex',
  mixins: [ LoadDataBeforeEnterMixin(PageGenre) ],
  components: { ContentWithHeading, TabsMusic, ListItemAlbums },

  data () {
    return {
      name: '',
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
