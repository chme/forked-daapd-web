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
                  <p class="title is-4">{{ artist.name }}</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <p class="heading has-text-centered-mobile">{{ artist.album_count }} albums | {{ artist.track_count }} tracks</p>
          <list-item-album v-for="album in albums.items" :key="album.id" :album="album"></list-item-album>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import ListItemAlbum from '@/components/ListItemAlbum'
import webapi from '@/webapi'

const artistData = {
  load: function (to) {
    return Promise.all([
      webapi.library_artist(to.params.artist_id),
      webapi.library_albums(to.params.artist_id)
    ])
  },

  set: function (vm, response) {
    vm.artist = response[0].data
    vm.albums = response[1].data
  }
}

export default {
  name: 'PageArtist',
  mixins: [ LoadDataBeforeEnterMixin(artistData) ],
  components: { ListItemAlbum },

  data () {
    return {
      artist: {},
      albums: {}
    }
  },

  methods: {
  }
}
</script>

<style>
</style>
