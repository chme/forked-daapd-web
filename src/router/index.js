import Vue from 'vue'
import VueRouter from 'vue-router'
import PageQueue from '@/pages/PageQueue'
import PageNowPlaying from '@/pages/PageNowPlaying'
import PageBrowse from '@/pages/PageBrowse'
import PageArtists from '@/pages/PageArtists'
import PageArtist from '@/pages/PageArtist'
import PageAlbums from '@/pages/PageAlbums'
import PageAlbum from '@/pages/PageAlbum'
import PageTracks from '@/pages/PageTracks'
import PagePlaylists from '@/pages/PagePlaylists'
import PagePlaylist from '@/pages/PagePlaylist'
import PageSearch from '@/pages/PageSearch'
import SpotifyPageBrowse from '@/pages/SpotifyPageBrowse'
import SpotifyPageArtist from '@/pages/SpotifyPageArtist'
import SpotifyPageAlbum from '@/pages/SpotifyPageAlbum'
import SpotifyPagePlaylist from '@/pages/SpotifyPagePlaylist'
import SpotifyPageSearch from '@/pages/SpotifyPageSearch'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'PageQueue',
      component: PageQueue
    },
    {
      path: '/now-playing',
      name: 'Now playing',
      component: PageNowPlaying
    },
    {
      path: '/music',
      redirect: '/music/browse'
    },
    {
      path: '/music/browse',
      name: 'Browse',
      component: PageBrowse
    },
    {
      path: '/music/artists',
      name: 'Artists',
      component: PageArtists,
      meta: { show_progress: true }
    },
    {
      path: '/music/artists/:artist_id',
      name: 'Artist',
      component: PageArtist,
      meta: { show_progress: true }
    },
    {
      path: '/music/albums',
      name: 'Albums',
      component: PageAlbums,
      meta: { show_progress: true }
    },
    {
      path: '/music/albums/:album_id',
      name: 'Album',
      component: PageAlbum,
      meta: { show_progress: true }
    },
    {
      path: '/music/tracks',
      name: 'Tracks',
      component: PageTracks
    },
    {
      path: '/playlists',
      name: 'Playlists',
      component: PagePlaylists
    },
    {
      path: '/playlists/:playlist_id',
      name: 'Playlist',
      component: PagePlaylist
    },
    {
      path: '/playlists/:playlist_id/tracks',
      name: 'Playlists Tracks',
      component: PageTracks
    },
    {
      path: '/search',
      redirect: '/search/library'
    },
    {
      path: '/search/library',
      name: 'Search Library',
      component: PageSearch
    },
    {
      path: '/music/spotify',
      name: 'Spotify',
      component: SpotifyPageBrowse
    },
    {
      path: '/music/spotify/:type',
      name: 'Spotify Browse',
      component: SpotifyPageBrowse
    },
    {
      path: '/music/spotify/artists/:artist_id',
      name: 'Spotify Artist',
      component: SpotifyPageArtist
    },
    {
      path: '/music/spotify/albums/:album_id',
      name: 'Spotify Album',
      component: SpotifyPageAlbum
    },
    {
      path: '/music/spotify/playlists/:user_id/:playlist_id',
      name: 'Spotify Playlist',
      component: SpotifyPagePlaylist
    },
    {
      path: '/search/spotify',
      name: 'Spotify Search',
      component: SpotifyPageSearch
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
