<template>
  <div :class="classes">
    <clock @timeout="timeout" class="clock" :count="180"></clock>
    <p class="title">请放入可回收塑料瓶</p>
    <p class="point">当前积分：{{point}}</p>
    <div class="option-container">
      <div class="option"><span class="option-des">塑料瓶:</span><span class="option-num">{{plasticBottles}}</span></div>
      <div class="option"><span class="option-des">易拉罐:</span><span class="option-num">{{cans}}</span></div>
      <div class="option"><span class="option-des">其他:&emsp;</span><span class="option-num">{{others}}</span></div>
    </div>
    <div class="btn" @click="finish"><p>完成回收</p></div>
  </div>
</template>

<script>
  export default {
    name: "Bottle",
    data() {
      return {
        menuSize: true,  // true 为大尺寸
        plasticBottles: 2,  //  塑料瓶
        cans: 0,            // 易拉罐
        others: 5           // 其他瓶子
      }
    },
    methods: {
      timeout() {
        this.$router.go(-1)
      },
      finish() {

      }
    },
    computed: {
      classes() {
        return {
          main: true,
          pre: this.menuSize,
          after: !this.menuSize
        }
      },
      point() {
        return (this.plasticBottles + this.cans)*3
      }
    }
  }
</script>

<style scoped>
  .main{
    position: absolute;
    left: 50%;
    top: 50%;
    transition: .25s all ease-in-out;
    transform: translate(-50%, -50%);
    background-image: url("../assets/exchange.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .pre{
    width: 48%;
    height: 52%;
  }
  .after{
    height: 32.5%;
    width: 33.3%;
  }
  .title{
    box-sizing: border-box;
    padding-top: 11.5%;
    text-align: center;
    font-size: 3rem;
    letter-spacing: .6rem;
    color: rgb(0,245, 255);
  }
  .point{
    box-sizing: border-box;
    padding-top: 3%;
    text-align: center;
    font-size: 1.5rem;
    letter-spacing: .3rem;
    color: rgb(0,245, 255);
  }
  .option-container{
    padding-top: 7%;
    display: flex;
    justify-content: space-around;
    margin: auto;
    height: 12%;
    width: 95%;
  }
  .option{
    height: 100%;
    width: 25%;
    font-size: 1.5rem;
    letter-spacing: .2rem;
    color: rgb(0,245, 255);
    background-image: url("../assets/options.png");
    background-size: contain;
    background-repeat: no-repeat;
  }
  .option-des{
    display: inline-block;
    padding-top: 7%;
    padding-left: 20%;
    font-size: 1.5rem;
  }
  .option-num{
    padding-left: 12%;
    font-size: 2rem;
  }
  .btn{
    margin: 6% auto;
    height: 12.5%;
    width: 30%;
    text-align: center;
    font-size: 1.9rem;
    letter-spacing: .2rem;
    color: rgb(0,245, 255);
    background-image: url("../assets/button.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .btn>p{
    padding-top: 8%;
  }
  .btn:active{
    background-image: url("../assets/button-active.png");
  }
  .clock{
    position: absolute;
    top: 16%;
    left: 7.5%;
  }
</style>
