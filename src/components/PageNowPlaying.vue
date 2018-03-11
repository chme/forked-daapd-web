<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="heading">NOW PLAYING</p>
        <h1 class="title is-3">
          {{ now_playing.title }}
        </h1>
        <h2 class="title is-5">
          {{ now_playing.artist }}
        </h2>
        <h3 class="subtitle is-5">
          {{ now_playing.album }}
        </h3>
        <p class="control has-text-centered">
          <player-button-previous class="button is-medium"></player-button-previous>
          <player-button-play-pause class="button is-medium" icon_style="mdi-36px"></player-button-play-pause>
          <player-button-next class="button is-medium"></player-button-next>
          <player-button-repeat class="button is-medium is-light"></player-button-repeat>
          <player-button-shuffle class="button is-medium is-light"></player-button-shuffle>
          <player-button-consume class="button is-medium is-light"></player-button-consume>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import PlayerButtonPlayPause from './elements/PlayerButtonPlayPause'
import PlayerButtonNext from './elements/PlayerButtonNext'
import PlayerButtonPrevious from './elements/PlayerButtonPrevious'
import PlayerButtonShuffle from './elements/PlayerButtonShuffle'
import PlayerButtonConsume from './elements/PlayerButtonConsume'
import PlayerButtonRepeat from './elements/PlayerButtonRepeat'

export default {
  name: 'PageNowPlaying',
  components: { PlayerButtonPlayPause, PlayerButtonNext, PlayerButtonPrevious, PlayerButtonShuffle, PlayerButtonConsume, PlayerButtonRepeat },

  data () {
    return { }
  },

  computed: {
    state () {
      return this.$store.state.player
    },
    now_playing () {
      return this.$store.getters.now_playing
    }
  }
}
</script>

<style>
</style>
