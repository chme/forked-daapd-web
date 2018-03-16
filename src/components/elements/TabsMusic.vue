<template>
  <div class="tabs is-centered is-small">
    <ul>
      <router-link tag="li" to="/music" active-class="is-active" exact>
        <a>
          <span class="icon is-small"><i class="mdi mdi-web"></i></span>
          <span class="">Discover</span>
        </a>
      </router-link>
      <router-link tag="li" to="/music/artists" active-class="is-active">
        <a>
          <span class="icon is-small"><i class="mdi mdi-artist"></i></span>
          <span class="">Artists</span>
        </a>
      </router-link>
      <router-link tag="li" to="/music/albums" active-class="is-active">
        <a>
          <span class="icon is-small"><i class="mdi mdi-album"></i></span>
          <span class="">Albums</span>
        </a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabsMusic',

  methods: { }
}
</script>

<style>
</style>
