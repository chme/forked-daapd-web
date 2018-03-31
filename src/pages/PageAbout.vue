<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-four-fifths">
          <p class="heading"><b>forked-daapd</b> - version {{ config.version }}</p>
          <h1 class="title is-4">{{ config.library_name }}</h1>
          <div class="content">
            <p class="is-size-7">Compiled with support for {{ config.buildoptions | join }}.</p>
            <p class="is-size-7">Web interface built with <a href="http://bulma.io">Bulma</a>, <a href="https://materialdesignicons.com/">Material Design Icons</a>, <a href="https://vuejs.org/">Vue.js</a>, <a href="https://github.com/mzabriskie/axios">axios</a>.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageAbout',

  computed: {
    config () {
      return this.$store.state.config
    }
  },

  filters: {
    join: function (array) {
      return array.join(', ')
    }
  }
}
</script>

<style>
</style>
