<template>
  <div id="app" @click.self="back">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { getVideosId } from './utils/handleVideo.js'
export default {
  name: 'App',
  data() {
    return {
      isTouch: false,
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    }
  },
  mounted() {
    // 在 1600px 宽度下 1 rem = 10 px
    // 在 1980px 宽带下 1 rem = 12 px
    // 先直接执行一次
    (window.onresize = function() {
      let html = document.querySelector('html');
      html.style.fontSize = document.documentElement.clientWidth / 160 + 'px';
    })()
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
.fade-enter-active, .fade-leave-active {
  position: absolute;
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
