<template>
  <div id="clock" @click="reset">
    <p style="font-size: 1.8rem"><span style="font-size: 2.7rem;">{{ time }}</span> s</p>
    <p style="padding-top:5px;font-size: 1.2rem;letter-spacing: .3rem">后自动返回或点我返回</p>
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
        time: this.count, // 通过属性传值来获取 timeout,
        timer: null       // 定时器
      }
    },
    methods: {
      reset() {
        this.$emit('timeout')
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          // 触发父组件的回调函数
          clearInterval(this.timer)
          this.$emit('timeout')
        }
      }, 1000)
    },
    beforeDestroy() {
      // 销毁组件前清除定时器
      console.log('定时器已销毁')
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  #clock{
    color: rgb(0,245, 255);
    width: 8rem;
    text-align: center;
    z-index: 5;
  }
</style>
