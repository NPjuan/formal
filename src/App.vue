<template>
  <div id="app">
    <!--获取条形码-->
    <input type="text" ref="ipt" @input="barCode" maxlength="13" style="position: absolute;left:0;top:0;opacity: 0;z-index: -5">
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
    barCode () {
      if (this.$refs.ipt.value.length === 13) {
        console.log('hello')
      }
    }
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
    // 判断用户是否操作的计时器
    // 开始时 focus
    this.$refs.ipt.focus()
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
