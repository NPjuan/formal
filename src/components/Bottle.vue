<template>
  <div style="position: relative;width: 100%;height: 100%" @click="onFocus">
    <div :class="classes">
      <!--获取条形码-->
      <input type="text" ref="ipt" @input="barCode" maxlength="13" style="position: absolute;left:0;top:0;opacity: 0;z-index: -5">
      <transition name="fade" mode="out-in">
        <!--使用大框-->
        <div v-if="menuSize" style="position: relative;width: 100%;height: 100%" key="big">
          <clock @timeout="timeout" class="clock" :count="180"></clock>
          <p class="title">{{message.title}}</p>
          <p class="point">{{message.subHead}}</p>
          <!--积分榜-->
          <div v-if="!finish" class="option-container">
            <div class="option"><span class="option-des">塑料瓶:</span><span class="option-num">{{plasticBottles}}</span></div>
            <div class="option"><span class="option-des">易拉罐:</span><span class="option-num">{{cans}}</span></div>
            <div class="option"><span class="option-des">其他:&emsp;</span><span class="option-num">{{others}}</span></div>
          </div>
          <!--底部确认按钮-->
          <div v-if="!finish" style="height: 12.5%;margin: 6% auto;text-align: center"><span class="btn" @click="complete">完成回收</span></div>
          <div v-else class="bottom-container">
            <div class="gifts-container">
              <div class="gift-border" v-for="(item, index) in gifts" @click="pick(index)">
                <div class="gift">
                  <img :src="item.src" alt="gift">
                </div>
                <p class="gift-des">{{item.des}}</p>
              </div>
            </div>
            <div class="wx-code">
              <img src="../assets/resource/wx.png" alt="wx">
              <p>微信扫码兑换更多礼品</p>
            </div>
          </div>
        </div>
        <!--使用小框-->
        <div v-else style="position: relative;width: 100%;height: 100%" key="small">
          <clock @timeout="timeout_a" class="clock" :count="60"></clock>
          <p class="left-title" ref="Des">请等待</p>
          <!--<p v-show="isPick" class="left-title" ref="giftDes">当前兑换礼品是{{giftDes}}</p>-->
          <!--底部确认按钮-->
          <div style="height: 18%;margin-top: 13%;text-align: center;display: flex;justify-content: space-around">
            <span class="btn btn-small" @click="confirm">确认</span>
            <span class="btn btn-small" @click="cancel">取消</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Bottle",
    data() {
      return {
        menuSize: true,  // true 为大尺寸
        plasticBottles: 2,  // 塑料瓶
        cans: 0,            // 易拉罐
        others: 5,          // 其他瓶子
        finish: false,      // 是否完成投递
        gifts: [            //  礼物信息
          {
            des: '环保袋',
            src: require('../assets/resource/pack.png')
          },
          {
            des: '超市购物券',
            src: require('../assets/resource/qian3.svg')
          },
        ],
        company: ''
      }
    },
    methods: {
      timeout() {
        this.$router.go(-1)
      },
      timeout_a() {
        // 自动回收
        this.menuSize = true
      },
      pick(index) {
        // 选中礼物
        this.menuSize = false
        setTimeout(()=>{
          this.$refs.Des.innerHTML = `选择的礼物是${this.gifts[index]['des']}`
        }, 250)
      },
      confirm() {
        // 确认
       this.menuSize = true
        if (this.company !== '') {
          // 如果存在种类，代表是投递瓶子状态
          console.log(this.company)
          switch (this.company) {
            case '瓶': this.plasticBottles++;break
            case '罐': this.cans++;break
            default: this.others++
          }
          this.company = ''
        }
      },
      cancel() {
        // 取消
        this.menuSize = true
        this.company = ''
      },
      complete() {
        // 完成
        this.finish = true
      },
      barCode () {
        let ipt = this.$refs.ipt
        if (ipt.value.length === 13) {
          let code = ipt.value
          // 赋值为空 便于重新赋值
          ipt.value = ''
          this.$axios.post('/bottle/queryByNumber.do', {
            number: code
          })
            .then((res)=>{
              console.log(res)
             // 如果接收不到数据
              if (res.data.code === '1') {
                throw error('无法识别瓶子')
              }
              this.menuSize = false // 小屏幕
              return res.data.data
            })
            .then((mes)=>{
              // 这里延迟 250 是等待动画结束才能获取 dom 元素
              setTimeout(()=>{
                this.$refs.Des.innerHTML = `当前回收的是${mes[0]['name']}`
                this.company = mes[0]['company']
              },250)
            })
            .catch((err)=>{
              console.log(err); // 这里需要加分号，否则语法分析报错
              [this.menuSize, this.botDes] = [
                false,
                `当前回收物品未能识别`
              ]
            })
        }
      },
      onFocus() {
      console.log('aaaa')
      // 无论点击那里，最后都聚焦到 input
      this.$refs.ipt.focus()
    }
    },
    computed: {
      message() {
        if (!this.finish) {
          return {
            title: '请放入可回收塑料瓶',
            subHead: `当前积分：${this.point}`
          }
        } else {
          return {
            title: '感谢你对环保事业做出的贡献',
            subHead: '当前可兑换礼品如下'
          }
        }
      },
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
    },
    mounted() {
      this.onFocus()
    }
  }
</script>

<style scoped>
  .main{
    position: absolute;
    left: 50%;
    top: 50%;
    transition: .3s all ease-in-out;
    transform: translate(-50%, -50%);
    background-image: url("../assets/resource/exchange.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
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
    letter-spacing: .3rem;
    color: rgb(0,245, 255);
  }
  .left-title{
    box-sizing: border-box;
    letter-spacing: .5rem;
    font-size: 2.5rem;
    text-align: center;
    padding-top: 12.5%;
    padding-left: 10rem;
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
    background-image: url("../assets/resource/options.png");
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
  .bottom-container{
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    height: 45%;
  }
  .gifts-container{
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 50%;
    margin-left: 10%;
  }
  .gift-border{
    position: relative;
    box-sizing: border-box;
    border-radius: 50%;
    border: .3rem solid rgba(0, 119, 137, 0.431);
    width: 15rem;
    height: 15rem;
  }
  .gift{
    position: absolute;
    left: 50%;
    top: 50%;
    height: 80%;
    width: 80%;
    border-radius: 50%;
    border: .3rem solid rgb(0, 245, 255);
    background-color: rgba(0, 245, 255, 0.161);
    transform: translate(-50%, -50%);
  }
  .gift-des{
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4.5rem;
    text-align: center;
    font-size: 2rem;
    letter-spacing: .3rem;
    color: rgb(0,245, 255);
  }
  .wx-code{
    position: relative;
    width: 40%;
    height: 100%;
    text-align: center;
  }
  .wx-code img{
    display: inline-block;
    padding-top: 1rem;
    height: 13rem;
    width: 13rem;
  }
  .wx-code p{
    margin-top: 2.4rem;
    font-size: 2rem;
    letter-spacing: .3rem;
    color: rgb(0,245, 255);
    content: '微信扫码兑换更多礼品';
  }
  .gift>img{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 50%;
    transform: translate(-50%, -50%);
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
  .clock{
    position: absolute;
    top: 16%;
    left: 7.5%;
  }
  .fade-enter-active, .fade-leave-active {
    position: absolute;
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
