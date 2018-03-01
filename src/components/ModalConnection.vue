<template>
  <div class="modal" :class="{ 'is-active': show_connection_modal }">
    <div class="modal-background" @click="close_modal"></div>
    <div class="modal-content">
      <div class="message is-dark">
        <div class="message-body">
          <p class="subtitle is-6">Connect to <b>forked-daapd</b></p>
          <form v-on:submit.prevent="connect">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Server</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="Hostname or IP address" v-model="new_server.host">
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Port</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" placeholder="3689" v-model="new_server.port">
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <!-- Left empty for spacing -->
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <button class="button is-primary" type="submit">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close_modal"></button>
  </div>
</template>

<script>
import * as types from '@/store/mutation_types'

export default {
  name: 'ModalConnection',

  data () {
    return {
      new_server: {
        host: '',
        port: 0
      }
    }
  },

  computed: {
    server () {
      return this.$store.state.server
    },
    show_connection_modal () {
      return this.$store.state.show_connection_modal
    }
  },

  methods: {
    connect: function () {
      this.$store.commit(types.UPDATE_SERVER, { host: this.new_server.host, port: this.new_server.port })
    },
    close_modal: function () {
      this.$store.commit(types.SHOW_CONNECTION_MODAL, false)
    }
  },

  watch: {
    'server' () {
      this.new_server.host = this.server.host
      this.new_server.port = this.server.port
    }
  }
}
</script>

<style>
</style>
