import axios from 'axios'

export default {
  config () {
    return axios.get('/api/config')
  },

  library_stats () {
    return axios.get('/api/library')
  },

  library_update () {
    return axios.put('/api/update')
  },

  queue () {
    return axios.get('/api/queue')
  },

  queue_clear () {
    return axios.put('/api/queue/clear')
  },

  queue_remove (itemId) {
    return axios.delete('/api/queue/tracks/' + itemId)
  },

  queue_add (uri) {
    return axios.post('/api/queue/tracks/add?uris=' + uri)
  },

  player_status () {
    return axios.get('/api/player')
  },

  player_play () {
    return axios.put('/api/player/play')
  },

  player_playpos (position) {
    return axios.put('/api/player/play?position=' + position)
  },

  player_playid (itemId) {
    return axios.put('/api/player/play?item_id=' + itemId)
  },

  player_pause () {
    return axios.put('/api/player/pause')
  },

  player_next () {
    return axios.put('/api/player/next')
  },

  player_previous () {
    return axios.put('/api/player/previous')
  },

  player_shuffle (newState) {
    var shuffle = newState ? 'true' : 'false'
    return axios.put('/api/player/shuffle?state=' + shuffle)
  },

  player_consume (newState) {
    var consume = newState ? 'true' : 'false'
    return axios.put('/api/player/consume?state=' + consume)
  },

  player_repeat (newRepeatMode) {
    return axios.put('/api/player/repeat?state=' + newRepeatMode)
  },

  player_volume (volume) {
    return axios.put('/api/player/volume?volume=' + volume)
  },

  player_output_volume (outputId, outputVolume) {
    return axios.put('/api/player/volume?volume=' + outputVolume + '&output_id=' + outputId)
  },

  outputs () {
    return axios.get('/api/outputs')
  },

  output_update (outputId, output) {
    return axios.put('/api/outputs/' + outputId, output)
  },

  library_artists () {
    return axios.get('/api/library/artists')
  },

  library_albums (artistId) {
    if (artistId) {
      return axios.get('/api/library/artists/' + artistId + '/albums')
    }
    return axios.get('/api/library/albums')
  },

  library_album_tracks (albumId) {
    return axios.get('/api/library/albums/' + albumId + '/tracks')
  },

  library_playlists () {
    return axios.get('/api/library/playlists')
  },

  library_playlist_tracks (playlistId) {
    return axios.get('/api/library/playlists/' + playlistId + '/tracks')
  },

  search (searchParams) {
    return axios.get('/api/search', {
      params: searchParams
    })
  }
}