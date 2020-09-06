<template>
  <div class="pop" :style="{
    'top': top + 'px'
  }">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "pop",
    data() {
      return {
        timer: null,
        top: -100
      }
    },
    methods: {
      popUp() {
        this.top = 100
        this.setTimer()
      },
      setTimer() {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.top = -100
        }, 2000)
      }
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped>
  .pop{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 2rem;
    color: white;
    background-image: url("../assets/resource/center.png");
    background-size: 100% 100%;
    transition: top .4s ease-in-out;
  }
</style>
