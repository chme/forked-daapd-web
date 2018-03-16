import Vue from 'vue'
import VueRouter from 'vue-router'
import PageQueue from '@/components/PageQueue'
import PageNowPlaying from '@/components/PageNowPlaying'
import PageArtists from '@/components/PageArtists'
import PageAlbums from '@/components/PageAlbums'
import PageTracks from '@/components/PageTracks'
import PagePlaylists from '@/components/PagePlaylists'
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
      name: 'Artists',
      component: PageArtists
    },
    {
      path: '/music/artists/:artist_id/albums',
      name: 'Artists Albums',
      component: PageAlbums
    },
    {
      path: '/music/albums',
      name: 'Albums',
      component: PageAlbums
    },
    {
      path: '/music/albums/:album_id/tracks',
      name: 'Albums Tracks',
      component: PageTracks
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
