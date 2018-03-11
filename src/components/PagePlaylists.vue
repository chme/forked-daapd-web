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
          <list-item-playlist v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"></list-item-playlist>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ListItemPlaylist from '@/components/elements/ListItemPlaylist'
import webapi from '@/webapi'

export default {
  name: 'PagePlaylists',
  components: { ListItemPlaylist },

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
