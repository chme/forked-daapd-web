import Vue from 'vue'
import Router from 'vue-router'
import PageQueue from '@/components/PageQueue'
import PageNowPlaying from '@/components/PageNowPlaying'
import PageArtists from '@/components/PageArtists'
import PageAlbums from '@/components/PageAlbums'
import PageTracks from '@/components/PageTracks'
import PagePlaylists from '@/components/PagePlaylists'
import PageSearch from '@/components/PageSearch'

Vue.use(Router)

export default new Router({
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
      path: '/artists',
      name: 'Artists',
      component: PageArtists
    },
    {
      path: '/artists/:artist_id/albums',
      name: 'Artists Albums',
      component: PageAlbums
    },
    {
      path: '/albums',
      name: 'Albums',
      component: PageAlbums
    },
    {
      path: '/albums/:album_id/tracks',
      name: 'Albums Tracks',
      component: PageTracks
    },
    {
      path: '/tracks',
      name: 'Tracks',
      component: PageTracks
    },
    {
      path: '/playlists',
      name: 'Playlists',
      component: PagePlaylists
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
