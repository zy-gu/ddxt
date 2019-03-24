<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


  export default {
    name: 'App',
    mounted: function () {

    }
  }
</script>

<style>
  @import url(assets/css/reset.css);

  html, body {
    width: 100%;
    height: 100%;
    font-family: "\5FAE\8F6F\96C5\9ED1", Helvetica, sans-serif;
  }

  #app {
    width: 100%;
    height: 100%;
  }
</style>
