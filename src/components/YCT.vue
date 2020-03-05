<template>
  <div :class="classes">
    <transition name="fade" mode="out-in">
      <div v-if="menuSize" style="position: relative;width: 100%;height: 100%" key="small">
        <clock
          @timeout="preTimeout"
          class="pre-time">
        </clock>
        <p  class="left-title">{{message}}</p>
        <!--底部确认按钮-->
        <div style="height: 18%;margin-top: 13%;text-align: center;display: flex;justify-content: space-around">
          <span class="btn btn-small" @click="finish">确认</span>
          <span class="btn btn-small" @click="cancel">取消</span>
        </div>
      </div>
      <div v-else style="position: relative; width: 85%;margin: auto;height: 100%" key="big">
        <div class="top">
          <p style="float: right">您的羊城通余额<span class="yct-num">{{balance}}</span></p>
          <p>您的羊城通卡号<span class="yct-num">{{account}}</span></p>
        </div>
        <div class="center"><span>您的充值账号余额为</span><span class="balance">50</span>元</div>
        <div class="bottom">
          <div class="options" style="left: 0;top:0;" @click="recharge(50)">50元</div>
          <div class="options" style="right: 0;top:0;" @click="recharge(100)">100元</div>
          <div class="options" style="left: 0;bottom:0;" @click="recharge(150)">150元</div>
          <div class="options" style="right: 0;bottom:0;"@click="recharge(200)">200元</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "YCT",
    data() {
      return {
        menuSize: true,       // 背景选择，true 为小框
        message: '请放入要充值的羊城通卡', // tips
        invest: false,        // 是否进入充值页面
        account: '123456789', // yct 账号
        balance: 278.90       // yct 余额
      }
    },
    methods: {
      preTimeout() {
        this.$router.go(-1)
      },
      finish() {
        // 共有逻辑，把背景放大
        this.menuSize = false
        if (this.invest) {
          // 如果是充值
          // code
        } else {
          // 判断是否放入 yct
        }
      },
      cancel() {
        if (this.invest) {
          // 如果是充值
          // code
          this.menuSize = false
        } else {
          // 判断是否放入 yct
          this.$router.go(-1)
        }
      },
      recharge(num) {
        [this.menuSize,this.invest, this.message] = [
          true,
          true,
          `当前充值${num}元`
        ]
      }
    },
    computed: {
      classes() {
        return {
          main: true,
          pre: this.menuSize,
          after: !this.menuSize
        }
      }
    }
  }
</script>

<style scoped>
.main{
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 2rem;
  color: rgb(0,245, 255);
  text-align: center;
  transition: .2s all ease-in-out;
  transform: translate(-50%, -50%);
  background-image: url("../assets/resource/yct_1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
  .pre{
    width: 34%;
    height: 32%;
  }
  .after{
    width: 48%;
    height: 52%;
  }
  .pre-time{
    position: absolute;
    top:20%;
    left: 10%;
  }
.left-title{
  box-sizing: border-box;
  letter-spacing: .5rem;
  font-size: 2.5rem;
  padding-top: 13.5%;
  padding-left: 10rem;
}
.btn{
  display: inline-flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30%;
  font-size: 1.9rem;
  letter-spacing: .2rem;
  color: rgb(0,245, 255);
  background-image: url("../assets/resource/button.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.btn-small{
  width: 35%;
}
.btn:active{
  background-image: url("../assets/resource/button-active.png");
}
.top{
  padding-top: 8%;
  font-size: 2rem;
  text-align: start;
  letter-spacing: .3rem;
}
.yct-num{
  padding-left: 2rem;
}
.center{
  padding-top: 6%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  letter-spacing: .2rem;
}
.bottom{
  margin: 8% auto 0 auto;
  position: relative;
  height: 18rem;
  width: 80%;
}
.options{
  position: absolute;
  line-height: 5rem;
  font-size: 3rem;
  letter-spacing: .3rem;
  width: 20rem;
  height: 6rem;
  background-repeat: no-repeat;
  background: url("../assets/resource/options-without.png");
  background-size: 100% 100%;
}
.balance{
  display: inline-block;
  width: 8rem;
  border-bottom: dashed 1px rgb(0,245, 255);;
  font-size: 4.5rem;
  color: red;
}
.fade-enter-active, .fade-leave-active {
  position: absolute;
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
