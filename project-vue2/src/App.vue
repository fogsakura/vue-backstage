<template>
  <div id="app">
    <router-view></router-view>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Vue-Home msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // Vue-Home
  }
}
</script>

<style>
html, body{
  height: 100%;
  width:100%;
}
#app {
  height: 100%;
  width:100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
