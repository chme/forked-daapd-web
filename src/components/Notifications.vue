<template>
  <div class="fd-notifications">
    <div class="notification fd-notification" v-for="notification in notifications" :key="notification.id" :class="['notification', notification.type ? `is-${notification.type}` : '']">
      <button class="delete" v-on:click="remove(notification)"></button>
      {{ notification.text }}
    </div>
  </div>
</template>

<script>
import * as types from '@/store/mutation_types'

export default {
  name: 'Notifications',
  components: { },

  data () {
    return { showNav: false }
  },

  computed: {
    notifications () {
      return this.$store.state.notifications.list
    }
  },

  methods: {
    remove: function (notification) {
      this.$store.commit(types.DELETE_NOTIFICATION, notification)
    }
  }
}
</script>

<style>
.fd-notifications {
  position: fixed;
  bottom: 60px;
  z-index: 20000;
  padding: 20px;
  max-width: 320px;
}
.fd-notification {
  position: relative;
  min-width: 240px;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  pointer-events: all;
}
</style>
