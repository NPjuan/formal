<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isTouch: false,
    }
  },
  methods: {

  },
  mounted() {
    // 在 1600px 宽度下 1 rem = 10 px
    // 在 1980px 宽带下 1 rem = 12 px
    window.onresize = function() {
      let html = document.querySelector('html');
      html.style.fontSize = document.documentElement.clientWidth / 160 + 'px';
    }
    let html = document.querySelector('html');
    html.style.fontSize = document.documentElement.clientWidth / 160 + 'px';
  }
}
</script>

<style>
#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/resource/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
  #advertisement{
    width: 100%;
    height: 100%;
    z-index: 100;
  }
</style>
