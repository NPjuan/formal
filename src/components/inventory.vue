<template>
  <div style="position: relative;width: 100%;height: 100%" @click.self="timeout">
    <clock @timeout="timeout" class="clock" :count="180"></clock>
    <div class="center">
      <h2 class="title">请放入要圈存的羊城通</h2>
      <h3 class="wait">{{message}}</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Instructions",
    data() {
      return {
        timer: null,
        isHttp: false,
        message: '检测中，请勿拿走卡片'
      }
    },
    methods: {
      timeout() {
        this.$router.go(-1)
      },
      inventory() {
        if (this.isHttp) {
          return
        }
        this.isHttp = true
        this.$axios.get('http://192.168.1.109:8080/BottleProject/user/inventory')
        .then(res => {
          let { data: money } = res.data
          money = this.hex2bin(money)
          console.log('res', res)
          this.success(money)
        })
        .catch(err => {
          console.log('err', err)
          this.fail()
        })
        .finally(this.clear)
      },
      success(money) {
        this.message = `圈存成功，余额为 ${money} 元`
      },
      fail() {
        this.message = '圈存失败'
      },
      clear() {
        this.isHttp = false
        clearInterval(this.timer)
      },
      hex2bin(str) {
        return parseInt(str, 16)
      }
  },
    mounted() {
      this.inventory()
      this.timer = setInterval(this.inventory, 5000)
    },
    beforeDestroy() {
      this.clear()
    }
  }
</script>

<style scoped>
  .clock{
    position: absolute;
    left: 10%;
    top: 15%;
  }
  .center{
    width: 34%;
    height: 32%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-image: url("../assets/resource/yct_1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: rgb(0,245, 255);
    text-align: center;
  }
  .title{
    padding-top: 5rem;
    font-size: 3rem;
    letter-spacing: .5rem;
  }
  .wait{
    padding-top: 5rem;
    font-size: 2.4rem;
  }
</style>
