<template>
  <div class="tabs is-centered is-small">
    <ul>
      <router-link tag="li" to="/artists" active-class="is-active">
        <a>
          <span class="icon is-small"><i class="mdi mdi-artist"></i></span>
          <span class="">Artists</span>
        </a>
      </router-link>
      <router-link tag="li" to="/albums" active-class="is-active">
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
