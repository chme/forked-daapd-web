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
                  <p class="title is-4">Albums</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <part-album v-for="album in albums" :key="album.id" :album="album"></part-album>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PartAlbum from '@/components/PartAlbum'
import webapi from '@/webapi'

export default {
  name: 'PageAlbums',
  components: { PartAlbum },

  data () {
    return {
      albums: []
    }
  },

  methods: {
    library_albums: function (artistId) {
      webapi.library_albums(artistId).then(({ data }) => {
        this.albums = data.albums
      })
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
