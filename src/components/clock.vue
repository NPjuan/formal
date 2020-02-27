<template>
  <div id="clock">
    <p style="font-size: 1.7rem"><span style="font-size: 2.5rem;">{{ time }}</span> s</p>
    <p style="font-size: 1.2rem;letter-spacing: .2rem">后自动返回</p>
  </div>
</template>

<script>
  export default {
    name: "clock",
    props: {
      count: {
        type: Number,
        default: 60
      }
    },
    data() {
      return {
        time: this.count // 通过属性传值来获取 timeout
      }
    },
    mounted() {
      let timer = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          // 触发父组件的回调函数
          clearInterval(timer)
          this.$emit('timeout')
        }
      }, 1000)
    }
  }
</script>

<style scoped>
  #clock{
    color: rgb(0,245, 255);
    width: 7rem;
    text-align: center;
    z-index: 5;
  }
</style>
