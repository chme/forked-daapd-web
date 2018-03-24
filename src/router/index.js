import Vue from 'vue'
import VueRouter from 'vue-router'
import PageQueue from '@/components/PageQueue'
import PageNowPlaying from '@/components/PageNowPlaying'
import PageBrowse from '@/components/PageBrowse'
import PageArtists from '@/components/PageArtists'
import PageArtist from '@/components/PageArtist'
import PageAlbums from '@/components/PageAlbums'
import PageAlbum from '@/components/PageAlbum'
import PageTracks from '@/components/PageTracks'
import PagePlaylists from '@/components/PagePlaylists'
import PagePlaylist from '@/components/PagePlaylist'
import PageSearch from '@/components/PageSearch'
import SpotifyPageBrowse from '@/components/SpotifyPageBrowse'
import SpotifyPageArtist from '@/components/SpotifyPageArtist'
import SpotifyPageAlbum from '@/components/SpotifyPageAlbum'
import SpotifyPagePlaylist from '@/components/SpotifyPagePlaylist'
import SpotifyPageSearch from '@/components/SpotifyPageSearch'

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
      name: 'Browse',
      component: PageBrowse
    },
    {
      path: '/music/artists',
      name: 'Artists',
      component: PageArtists
    },
    {
      path: '/music/artists/:artist_id',
      name: 'Artist',
      component: PageArtist
    },
    {
      path: '/music/albums',
      name: 'Albums',
      component: PageAlbums
    },
    {
      path: '/music/albums/:album_id',
      name: 'Album',
      component: PageAlbum
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
