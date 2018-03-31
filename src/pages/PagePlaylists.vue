<template>
  <div>
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
                    <p class="heading">{{ playlists.total }} playlists</p>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
              </div>
            </nav>
            <list-item-playlist v-for="playlist in playlists.items" :key="playlist.id" :playlist="playlist"></list-item-playlist>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import TabsMusic from '@/components/TabsMusic'
import ListItemPlaylist from '@/components/ListItemPlaylist'
import webapi from '@/webapi'

const playlistsData = {
  load: function (to) {
    return webapi.library_playlists()
  },

  set: function (vm, response) {
    vm.playlists = response.data
  }
}

export default {
  name: 'PagePlaylists',
  mixins: [ LoadDataBeforeEnterMixin(playlistsData) ],
  components: { TabsMusic, ListItemPlaylist },

  data () {
    return {
      playlists: {}
    }
  }
}
</script>

<style>
</style>
