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
                  <p class="title is-4">Playlists</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
            </div>
          </nav>
          <part-playlist v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"></part-playlist>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PartPlaylist from '@/components/PartPlaylist'
import webapi from '@/webapi'

export default {
  name: 'PagePlaylists',
  components: { PartPlaylist },

  data () {
    return {
      playlists: []
    }
  },

  created: function () {
    webapi.library_playlists().then(({ data }) => {
      this.playlists = data.playlists
    })
  }
}
</script>

<style>
</style>
