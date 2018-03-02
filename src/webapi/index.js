import axios from 'axios'
import store from '@/store'

export default {
  baseUrl () {
    return 'http://' + store.state.server.host + ':' + store.state.server.port
  },

  config () {
    return axios.get(this.baseUrl() + '/api/config')
  },

  library_stats () {
    return axios.get(this.baseUrl() + '/api/library')
  },

  library_update () {
    return axios.put(this.baseUrl() + '/api/update')
  },

  queue () {
    return axios.get(this.baseUrl() + '/api/queue')
  },

  queue_clear () {
    return axios.put(this.baseUrl() + '/api/queue/clear')
  },

  queue_remove (itemId) {
    return axios.delete(this.baseUrl() + '/api/queue/items/' + itemId)
  },

  queue_move (itemId, newPosition) {
    return axios.put(this.baseUrl() + '/api/queue/items/' + itemId + '?new_position=' + newPosition)
  },

  queue_add (uri) {
    return axios.post(this.baseUrl() + '/api/queue/items/add?uris=' + uri)
  },

  player_status () {
    return axios.get(this.baseUrl() + '/api/player')
  },

  player_play () {
    return axios.put(this.baseUrl() + '/api/player/play')
  },

  player_playpos (position) {
    return axios.put(this.baseUrl() + '/api/player/play?position=' + position)
  },

  player_playid (itemId) {
    return axios.put(this.baseUrl() + '/api/player/play?item_id=' + itemId)
  },

  player_pause () {
    return axios.put(this.baseUrl() + '/api/player/pause')
  },

  player_next () {
    return axios.put(this.baseUrl() + '/api/player/next')
  },

  player_previous () {
    return axios.put(this.baseUrl() + '/api/player/previous')
  },

  player_shuffle (newState) {
    var shuffle = newState ? 'true' : 'false'
    return axios.put(this.baseUrl() + '/api/player/shuffle?state=' + shuffle)
  },

  player_consume (newState) {
    var consume = newState ? 'true' : 'false'
    return axios.put(this.baseUrl() + '/api/player/consume?state=' + consume)
  },

  player_repeat (newRepeatMode) {
    return axios.put(this.baseUrl() + '/api/player/repeat?state=' + newRepeatMode)
  },

  player_volume (volume) {
    return axios.put(this.baseUrl() + '/api/player/volume?volume=' + volume)
  },

  player_output_volume (outputId, outputVolume) {
    return axios.put(this.baseUrl() + '/api/player/volume?volume=' + outputVolume + '&output_id=' + outputId)
  },

  outputs () {
    return axios.get(this.baseUrl() + '/api/outputs')
  },

  output_update (outputId, output) {
    return axios.put(this.baseUrl() + '/api/outputs/' + outputId, output)
  },

  library_artists () {
    return axios.get(this.baseUrl() + '/api/library/artists')
  },

  library_albums (artistId) {
    if (artistId) {
      return axios.get(this.baseUrl() + '/api/library/artists/' + artistId + '/albums')
    }
    return axios.get(this.baseUrl() + '/api/library/albums')
  },

  library_album_tracks (albumId) {
    return axios.get(this.baseUrl() + '/api/library/albums/' + albumId + '/tracks')
  },

  library_playlists () {
    return axios.get(this.baseUrl() + '/api/library/playlists')
  },

  library_playlist_tracks (playlistId) {
    return axios.get(this.baseUrl() + '/api/library/playlists/' + playlistId + '/tracks')
  },

  search (searchParams) {
    return axios.get(this.baseUrl() + '/api/search', {
      params: searchParams
    })
  }
}
