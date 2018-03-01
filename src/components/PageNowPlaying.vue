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
          <play-previous-button class="button is-medium"></play-previous-button>
          <play-pause-button class="button is-medium" icon_style="mdi-36px"></play-pause-button>
          <play-next-button class="button is-medium"></play-next-button>
          <repeat-button class="button is-medium is-light"></repeat-button>
          <shuffle-button class="button is-medium is-light"></shuffle-button>
          <consume-button class="button is-medium is-light"></consume-button>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import PlayPauseButton from './elements/PlayPauseButton'
import PlayNextButton from './elements/PlayNextButton'
import PlayPreviousButton from './elements/PlayPreviousButton'
import ShuffleButton from './elements/ShuffleButton'
import ConsumeButton from './elements/ConsumeButton'
import RepeatButton from './elements/RepeatButton'

export default {
  name: 'PageNowPlaying',
  components: { PlayPauseButton, PlayNextButton, PlayPreviousButton, ShuffleButton, ConsumeButton, RepeatButton },

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
