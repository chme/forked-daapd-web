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
            </div>
          </nav>
          <part-artist v-for="artist in artists" :key="artist.id" :artist="artist"></part-artist>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PartArtist from '@/components/PartArtist'
import webapi from '@/webapi'

export default {
  name: 'PageArtists',
  components: { PartArtist },

  data () {
    return {
      artists: []
    }
  },

  created: function () {
    webapi.library_artists().then(({ data }) => {
      this.artists = data.artists
    })
  }
}
</script>

<style>
</style>
