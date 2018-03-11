<template>
  <div>
    <!-- Heading
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-four-fifths">
            <h1 class="title is-4">Search results for: <span class="has-text-grey">{{ $route.query.query }}</span></h1>
          </div>
        </div>
      </div>
    </section>
    -->

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

export default {
  name: 'PageTracks',
  components: { ListItemTrack, ListItemArtist, ListItemAlbum, ListItemPlaylist },

  data () {
    return {
      tracks: [],
      artists: [],
      albums: [],
      playlists: []
    }
  },

  computed: {
    show_tracks () {
      return this.$route.query.type.includes('track')
    },

    show_artists () {
      return this.$route.query.type.includes('artist')
    },

    show_albums () {
      return this.$route.query.type.includes('album')
    },

    show_playlists () {
      return this.$route.query.type.includes('playlist')
    }
  },

  methods: {
    search: function (route) {
      var searchParams = {
        'type': route.query.type,
        'query': route.query.query
      }

      if (route.query.limit) {
        searchParams.limit = route.query.limit
        searchParams.offset = route.query.offset
      }

      webapi.search(searchParams).then(({ data }) => {
        this.tracks = data.tracks
        this.artists = data.artists
        this.albums = data.albums
        this.playlists = data.playlists
      })
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
    }
  },

  created: function () {
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
