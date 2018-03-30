<template>
  <section class="section fd-tabs-section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-four-fifths">
          <div class="tabs is-centered is-small is-toggle is-toggle-rounded">
            <ul>
              <router-link tag="li" to="/search/library" active-class="is-active">
                <a>
                  <span class="icon is-small"><i class="mdi mdi-library-books"></i></span>
                  <span class="">Library</span>
                </a>
              </router-link>
              <router-link tag="li" to="/search/spotify" active-class="is-active">
                <a>
                  <span class="icon is-small"><i class="mdi mdi-spotify"></i></span>
                  <span class="">Spotify</span>
                </a>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TabsSearch',

  methods: { }
}
</script>

<style>
</style>
