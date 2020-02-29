<template>
  <div id="app">
    <!--获取条形码-->
    <input type="text" ref="ipt" @input="barCode" maxlength="13" style="float:left;position: relative;opacity: 0;z-index: -5">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 180,  // 默认倒计时 180s
      isTouch: false
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
    this.count = 180
    let timer = setInterval(() => {
      if(this.count > 0){
        this.count--
      }else{
        // 如果当前不为首页则跳转路由
        if(this.$route.path !== '/HomePage'){
          this.$router.go(-1)
        }
        // 否则直接显示广告页面
        this.isTouch = false
        clearTimeout(timer)
      }
    }, 1000)
    // 开始时 focus
    this.$refs.ipt.focus()
  },
  methods: {
    barCode () {
      if (this.$refs.ipt.value.length === 13) {
        console.log('hello')
      }
    }
  }
}
</script>

<style>
#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: url("./assets/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
