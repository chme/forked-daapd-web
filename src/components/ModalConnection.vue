<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="message is-dark">
        <div class="message-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
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
  </div>
</template>

<script>
import * as types from '@/store/mutation_types'

export default {
  name: 'ModalConnection',

  props: ['visible'],

  data () {
    return {
      new_server: {
        host: '',
        port: 3689
      }
    }
  },

  computed: {
    server () {
      return this.$store.state.server
    }
  },

  created: function () {
    this.new_server.host = this.server.host
    this.new_server.port = this.server.port
  },

  methods: {
    connect: function () {
      this.$store.commit(types.UPDATE_SERVER, this.new_server)
    }
  }
}
</script>

<style>
</style>
