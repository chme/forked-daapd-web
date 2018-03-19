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
      name: 'Search',
      component: PageSearch
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})
