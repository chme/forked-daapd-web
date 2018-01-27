<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-four-fifths">
          <nav class="level">
            <!-- Left side -->
            <div class="level-left">
              <div class="level-item has-text-centered-mobile">
                <div>
                  <p class="heading">{{ queue.count }} songs</p>
                  <p class="title is-4">Queue</p>
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="level-right">
              <p class="level-item"><label class="checkbox"><input type="checkbox" :checked="show_only_next_items" @click="update_show_next_items"> Show only next items</label></p>
              <p class="level-item"><a class="button is-light is-rounded" v-on:click="queue_clear">Clear</a></p>
            </div>
          </nav>
          <part-queue-item v-for="(item, index) in queue.items"
            :key="item.id" :item="item" :position="index"
            :current_position="current_position"
            :show_only_next_items="show_only_next_items"></part-queue-item>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PartQueueItem from '@/components/PartQueueItem'
import webapi from '@/webapi'
import * as types from '@/store/mutation_types'

export default {
  name: 'PageQueue',
  components: { PartQueueItem },

  data () {
    return { }
  },

  computed: {
    state () {
      return this.$store.state.player
    },
    queue () {
      return this.$store.state.queue
    },
    current_position () {
      return this.$store.getters.now_playing === undefined ? -1 : this.$store.getters.now_playing.position
    },
    show_only_next_items () {
      return this.$store.state.show_only_next_items
    }
  },

  methods: {
    queue_clear: function () {
      webapi.queue_clear()
    },

    update_show_next_items: function (e) {
      this.$store.commit(types.SHOW_ONLY_NEXT_ITEMS, !this.show_only_next_items)
    }
  }
}
</script>

<style>
</style>
