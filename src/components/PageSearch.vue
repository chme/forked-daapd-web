<template>
  <div>
    <!-- Heading -->
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <form v-on:submit.prevent="new_search">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input is-rounded is-shadowless" type="text" placeholder="Search" v-model="search_query" ref="search_field">
                  <span class="icon is-left">
                    <i class="mdi mdi-magnify"></i>
                  </span>
                </p>
              </div>
            </form>
            <div class="tags" style="margin-top: 16px;">
              <a class="tag" v-for="recent_search in recent_searches" :key="recent_search" @click="open_recent_search(recent_search)">{{ recent_search }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tracks -->
    <section class="section" v-if="show_tracks">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item has-text-centered-mobile">
                  <div>
                    <p class="title is-4">Tracks</p>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div class="level-right">
                <p class="level-item" v-if="tracks.length"><a class="button is-light is-rounded" v-on:click="open_search_tracks">Show all</a></p>
              </div>
            </nav>
            <list-item-track v-for="track in tracks" :key="track.id" :track="track" :position="0" :context_uri="track.uri"></list-item-track>
            <p v-if="!tracks.length">No results</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Artists -->
    <section class="section" v-if="show_artists">
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
                <p class="level-item" v-if="artists.length"><a class="button is-light is-rounded" v-on:click="open_search_artists">Show all</a></p>
              </div>
            </nav>
            <list-item-artist v-for="artist in artists" :key="artist.id" :artist="artist"></list-item-artist>
            <p v-if="!artists.length">No results</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Albums -->
    <section class="section" v-if="show_albums">
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
                <p class="level-item" v-if="albums.length"><a class="button is-light is-rounded" v-on:click="open_search_albums">Show all</a></p>
              </div>
            </nav>
            <list-item-album v-for="album in albums" :key="album.id" :album="album"></list-item-album>
            <p v-if="!albums.length">No results</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Playlists -->
    <section class="section" v-if="show_playlists">
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
                <p class="level-item" v-if="playlists.length"><a class="button is-light is-rounded" v-on:click="open_search_playlists">Show all</a></p>
              </div>
            </nav>
            <list-item-playlist v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"></list-item-playlist>
            <p v-if="!playlists.length">No results</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ListItemTrack from '@/components/elements/ListItemTrack'
import ListItemArtist from '@/components/elements/ListItemArtist'
import ListItemAlbum from '@/components/elements/ListItemAlbum'
import ListItemPlaylist from '@/components/elements/ListItemPlaylist'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'

export default {
  name: 'PageTracks',
  components: { ListItemTrack, ListItemArtist, ListItemAlbum, ListItemPlaylist },

  data () {
    return {
      search_query: '',
      tracks: [],
      artists: [],
      albums: [],
      playlists: []
    }
  },

  computed: {
    recent_searches () {
      return this.$store.state.recent_searches
    },

    show_tracks () {
      return this.$route.query.type && this.$route.query.type.includes('track')
    },

    show_artists () {
      return this.$route.query.type && this.$route.query.type.includes('artist')
    },

    show_albums () {
      return this.$route.query.type && this.$route.query.type.includes('album')
    },

    show_playlists () {
      return this.$route.query.type && this.$route.query.type.includes('playlist')
    }
  },

  methods: {
    search: function (route) {
      if (!route.query.query || route.query.query === '') {
        this.search_query = ''
        this.$refs.search_field.focus()
        return
      }

      var searchParams = {
        'type': route.query.type,
        'query': route.query.query
      }

      if (route.query.limit) {
        searchParams.limit = route.query.limit
        searchParams.offset = route.query.offset
      }

      webapi.search(searchParams).then(({ data }) => {
        this.tracks = data.tracks ? data.tracks : []
        this.artists = data.artists ? data.artists : []
        this.albums = data.albums ? data.albums : []
        this.playlists = data.playlists ? data.playlists : []

        this.$store.commit(types.ADD_RECENT_SEARCH, this.search_query)
      })
    },

    new_search: function () {
      if (!this.search_query) {
        return
      }

      this.$router.push({ path: '/search',
        query: {
          type: 'track,artist,album,playlist',
          query: this.search_query,
          limit: 3,
          offset: 0
        }
      })
      this.$refs.search_field.blur()
    },

    open_search_tracks: function () {
      this.$router.push({ path: '/search',
        query: {
          type: 'track',
          query: this.$route.query.query
        }
      })
    },

    open_search_artists: function () {
      this.$router.push({ path: '/search',
        query: {
          type: 'artist',
          query: this.$route.query.query
        }
      })
    },

    open_search_albums: function () {
      this.$router.push({ path: '/search',
        query: {
          type: 'album',
          query: this.$route.query.query
        }
      })
    },

    open_search_playlists: function () {
      this.$router.push({ path: '/search',
        query: {
          type: 'playlist',
          query: this.$route.query.query
        }
      })
    },

    open_recent_search: function (query) {
      this.search_query = query
      this.new_search()
    }
  },

  mounted: function () {
    this.search(this.$route)
  },

  watch: {
    '$route' (to, from) {
      this.search(to)
    }
  }
}
</script>

<style>
</style>
