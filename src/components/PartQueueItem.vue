<template>
  <div class="media" v-if="is_next || !show_only_next_items">
    <!---->
    <div class="media-left">
      <span class="icon has-text-grey fd-is-movable handle"><i class="mdi mdi-drag-horizontal mdi-18px"></i></span>
    </div>

    <div class="media-content fd-has-action is-clipped" v-on:click="play">
      <h1 class="title is-6" :class="{ 'has-text-primary': item.id === state.item_id, 'has-text-grey-light': !is_next }">{{ item.title }}</h1>
      <h2 class="subtitle is-7" :class="{ 'has-text-primary': item.id === state.item_id, 'has-text-grey-light': !is_next }">{{ item.artist }}<br>{{ item.album }}</h2>
    </div>
    <div class="media-right" v-if="item.id !== state.item_id">
      <a v-on:click="remove">
        <span class="icon has-text-grey"><i class="mdi mdi-delete mdi-18px"></i></span>
      </a>
    </div>
  </div>
</template>

<script>
import webapi from '@/webapi'

export default {
  name: 'PartQueueItem',

  props: ['item', 'position', 'current_position', 'show_only_next_items'],

  data () {
    return { }
  },

  computed: {
    state () {
      return this.$store.state.player
    },

    is_next () {
      return this.current_position < 0 || this.position >= this.current_position
    }
  },

  methods: {
    remove: function () {
      webapi.queue_remove(this.item.id)
    },

    play: function () {
      webapi.player_playid(this.item.id)
    }
  }
}
</script>

<style>
</style>
