<template>
  <div>
    <content-with-heading>
      <template slot="heading-left">
        <p class="title is-4">Podcasts</p>
        <p class="heading">{{ albums.total }} podcasts</p>
      </template>
      <template slot="content">
        <list-item-podcast v-for="album in albums.items" :key="album.id" :album="album"></list-item-podcast>
      </template>
    </content-with-heading>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import ContentWithHeading from '@/templates/ContentWithHeading'
import TabsMusic from '@/components/TabsMusic'
import ListItemPodcast from '@/components/ListItemPodcast'
import webapi from '@/webapi'

const albumsData = {
  load: function (to) {
    return webapi.library_podcasts()
  },

  set: function (vm, response) {
    vm.albums = response.data
  }
}

export default {
  name: 'PagePodcasts',
  mixins: [ LoadDataBeforeEnterMixin(albumsData) ],
  components: { ContentWithHeading, TabsMusic, ListItemPodcast },

  data () {
    return {
      albums: {}
    }
  }
}
</script>

<style>
</style>
