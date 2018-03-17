<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <tabs-music></tabs-music>
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
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item has-text-centered-mobile">
                  <div>
                    <p class="title is-4">Recently played</p>
                    <p class="heading">tracks</p>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
              </div>
            </nav>
            <list-item-track v-for="track in recently_played.items" :key="track.id" :track="track" :position="0" :context_uri="track.uri"></list-item-track>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TabsMusic from '@/components/elements/TabsMusic'
import ListItemAlbum from '@/components/elements/ListItemAlbum'
import ListItemTrack from '@/components/elements/ListItemTrack'
import webapi from '@/webapi'

export default {
  name: 'PageDiscover',
  components: { TabsMusic, ListItemAlbum, ListItemTrack },

  data () {
    return {
      recently_added: {},
      recently_played: {}
    }
  },

  computed: {
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    load_recently_added: function () {
      webapi.search({ type: 'album', expression: 'time_added after 4 weeks ago having track_count > 3 order by time_added desc', limit: 5 }).then(({ data }) => {
        this.recently_added = data.albums
      })
    },
    load_recently_played: function () {
      webapi.search({ type: 'track', expression: 'time_played after 4 weeks ago order by time_played desc', limit: 5 }).then(({ data }) => {
        this.recently_played = data.tracks
      })
    }
  },

  created: function () {
    this.load_recently_added()
    this.load_recently_played()
  },

  watch: {
    '$route' (to, from) {
      this.load_recently_added()
      this.load_recently_played()
    },
    'server_connection' () {
      this.load_recently_added()
      this.load_recently_played()
    }
  }
}
</script>

<style>
</style>
