<template>
  <div>
    <tabs-music></tabs-music>

    <!-- Recently added -->
    <section class="section" v-if="recently_added.items">
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
            <nav v-if="show_more_recently_added_button" class="level" style="margin-top: 16px;">
              <p class="level-item">
                <a class="button is-light is-small is-rounded" v-on:click="open_browse('recently_added')">Show more</a>
              </p>
            </nav>
          </div>
        </div>
      </div>
    </section>

    <!-- Recently played -->
    <section class="section" v-if="recently_played.items">
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
            <nav v-if="show_more_recently_played_button" class="level" style="margin-top: 16px;">
              <p class="level-item">
                <a class="button is-light is-small is-rounded" v-on:click="open_browse('recently_played')">Show more</a>
              </p>
            </nav>
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
  name: 'PageBrowse',
  components: { TabsMusic, ListItemAlbum, ListItemTrack },

  data () {
    return {
      recently_added: {},
      recently_played: {},

      show_more_recently_added_button: false,
      show_more_recently_played_button: false
    }
  },

  computed: {
    server_connection () {
      return this.$store.state.server
    }
  },

  methods: {
    load: function (type) {
      this.recently_added = {}
      this.recently_played = {}

      if (type === 'recently_added') {
        this.load_recently_added(50)
        this.show_more_recently_added_button = false
      } else if (type === 'recently_played') {
        this.load_recently_played(50)
        this.show_more_recently_played_button = false
      } else {
        this.load_recently_added(3)
        this.show_more_recently_added_button = true
        this.load_recently_played(3)
        this.show_more_recently_played_button = true
      }
    },

    load_recently_added: function (maxResults) {
      webapi.search({ type: 'album', expression: 'time_added after 4 weeks ago having track_count > 3 order by time_added desc', limit: maxResults }).then(({ data }) => {
        this.recently_added = data.albums
      })
    },

    load_recently_played: function (maxResults) {
      webapi.search({ type: 'track', expression: 'time_played after 4 weeks ago order by time_played desc', limit: maxResults }).then(({ data }) => {
        this.recently_played = data.tracks
      })
    },

    open_browse: function (type) {
      this.$router.push({ path: '/music?type=' + type })
    }
  },

  created: function () {
    this.load(this.$route.query.type)
  },

  watch: {
    '$route' (to, from) {
      this.load(to.query.type)
    },
    'server_connection' () {
      this.load(this.$route.query.type)
    }
  }
}
</script>

<style>
</style>
