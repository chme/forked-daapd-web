<template>
  <div>
    <tabs-music></tabs-music>

    <!-- Recently added -->
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item has-text-centered-mobile">
                  <div>
                    <p class="title is-4">Recently added</p>
                    <p class="heading">albums</p>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
              </div>
            </nav>
            <list-item-album v-for="album in recently_added.items" :key="album.id" :album="album"></list-item-album>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { LoadDataBeforeEnterMixin } from './mixin'
import TabsMusic from '@/components/TabsMusic'
import ListItemAlbum from '@/components/ListItemAlbum'
import webapi from '@/webapi'

const browseData = {
  load: function (to) {
    return webapi.search({
      type: 'album',
      expression: 'time_added after 8 weeks ago having track_count > 3 order by time_added desc',
      limit: 50
    })
  },

  set: function (vm, response) {
    vm.recently_added = response.data.albums
  }
}

export default {
  name: 'PageBrowseType',
  mixins: [ LoadDataBeforeEnterMixin(browseData) ],
  components: { TabsMusic, ListItemAlbum },

  data () {
    return {
      recently_added: {}
    }
  }
}
</script>

<style>
</style>
