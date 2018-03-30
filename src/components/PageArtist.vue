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
import ListItemAlbum from '@/components/elements/ListItemAlbum'
import webapi from '@/webapi'

export default {
  name: 'PageArtist',
  components: { ListItemAlbum },

  data () {
    return {
      artist: {},
      albums: {}
    }
  },

  methods: {
    load: function (artistId) {
      webapi.library_artist(artistId).then(({ data }) => {
        this.artist = data
      })
      webapi.library_albums(artistId).then(({ data }) => {
        this.albums = data
      })
    }
  },

  created: function () {
    this.load(this.$route.params.artist_id)
  },

  watch: {
    '$route' (to, from) {
      this.load(to.params.artist_id)
    }
  }
}
</script>

<style>
</style>
