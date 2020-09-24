<template>
  <div style="position: relative;width: 100%;height: 100%" @click.self="timeout">
    <camera
            ref="camera"
            :key="timeStamp"
            :facing-mode="{ exact: 'environment' }"
            class="camera"
            @handleVideo="handleVideo"
            v-if="showVideo"
            :complete="videoComplete"></camera>
    <div :class="classes">
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
          <div v-if="!finish" style="height: 12.5%;margin: 6% auto;text-align: center">
            <span class="btn" @click="complete">完成回收</span>
          </div>
          <div v-else class="bottom-container">
            <exchangeGifts></exchangeGifts>
<!--            &lt;!&ndash;礼物选择&ndash;&gt;-->
<!--            <div class="gifts-container">-->
<!--              <div class="gift-border" v-for="(item, index) in gifts" @click="pick(index)">-->
<!--                <div class="gift">-->
<!--                  <img :src="item.picturePath" alt="gift">-->
<!--                </div>-->
<!--                <p class="gift-des">{{item.name}}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--            &lt;!&ndash;扫描二维码获取更多礼品&ndash;&gt;-->
<!--            <div class="wx-code">-->
<!--              <img src="../assets/resource/littleProgram.jpg" alt="wx">-->
<!--              <p>微信扫码兑换更多礼品</p>-->
<!--            </div>-->
<!--            &lt;!&ndash;提示礼物选择框可以滑动&ndash;&gt;-->
<!--            <p class="gifts-shining">-->
<!--              向右滑动可查看更多-->
<!--            </p>-->
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
      <!--  隐藏的 video 以扫描得出瓶子图片传输给后台    -->
    </div>
  </div>
</template>

<script>
  import camera from "./camera"
  import exchangeGifts from "./exchangeGifts/exchangeGifts"
  import { getVideosId } from '../utils/handleVideo'
  export default {
    name: "Bottle",
    components: {
      camera,
      exchangeGifts
    },
    data() {
      return {
        showVideo: true,
        menuSize: true,     // true 为大尺寸
        finish: false,      // 是否完成投递
        plasticBottles: 0,  // 塑料瓶
        cans: 0,            // 易拉罐
        others: 0,          // 其他瓶子
        gifts: [            //  礼物信息
          {
            des: '环保袋',
            picturePath: require('../assets/resource/pack.png'),
          },
          {
            des: '超市购物券',
            picturePath: require('../assets/resource/qian3.svg'),
          },
        ],
        company: '',  // 判断投递的种类
        videoResults: [],
        videoComplete: false,
        timeStamp: 0
      }
    },
    methods: {
      handleVideo(results) {
        console.log('处理video')
        // this.showVideo = false
        this.videoComplete = true
        this.menuSize = false // 小屏幕
        // 这里延迟 250 是等待动画结束才能获取 dom e元素
        setTimeout(()=>{
          this.$refs.Des.innerHTML = `当前回收的是${results[0].name}`
          this.company = '瓶'
        },500)
        // setTimeout(()=>{
        //   this.$refs.Des.innerHTML = `未能识别瓶子`
        // },250)
      },
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
          this.$refs.Des.innerHTML = `选择的礼物是${this.gifts[index]['name']}`
        }, 250)
      },
      confirm() {
        // 确认
        if (this.company !== '') {
          // 如果存在种类，代表是投递瓶子状态
          // 累计积分
          switch (this.company) {
            case '瓶':
              this.plasticBottles++
              this.$bus.get('id') !== -1 && this.$axios.post('/face/loginByFace.do', {
                id: this.$bus.get('id'),
                score: 3
              })
              break
            case '罐':
              this.cans++
              this.$bus.get('id') !== -1 && this.$axios.post('/face/loginByFace.do', {
                id: this.$bus.get('id'),
                score: 3
              })
              break
            default: this.others++
          }
          this.timeStamp = new Date().getTime()
          this.company = ''
        }
        // 累计积分
        this.menuSize = true
      },
      cancel() {
        // 取消
        this.menuSize = true
        this.company = ''
      },
      complete() {
        // 完成
        // this.finish = true
        this.$router.push('/exchangeGifts')
      },
      barCode () {
      },
      onFocus() {
      // 无论点击那里，最后都聚焦到 input
        this.$refs.ipt.focus()
      },
      queryGifts() {
        this.$axios.post('/gift/getGiftList.do')
          .then(res => {
            console.log(res)
            this.gifts =res.data.data
          })
          .catch(err => {
            console.log(err)
          })
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
        return (this.plasticBottles + this.cans)*5
      }
    },
    mounted() {
      this.queryGifts()
    },
    beforeDestroy() {
      this.$refs.carema.$destroy()
    }
  }
</script>

<style scoped>
  .camera{
    position: fixed;
    left: 0;
    top: 0;
  }
  .main{
    position: absolute;
    left: 50%;
    top: 50%;
    transition: .25s all ease-in-out;
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
    letter-spacing: .25rem;
    font-size: 2.2rem;
    text-align: left;
    padding-top: 8%;
    padding-left: 14rem;
    padding-right: 4rem;
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
    margin-top: 2rem;
    height: 45%;
  }
  .gifts-container{
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: 100%;
    width: 50%;
    margin-left: 10%;
    overflow: auto;
  }
  .gift-border{
    display: inline-flex;
    flex-direction: column;
    flex: 0 0 15rem;
    position: relative;
    box-sizing: border-box;
    border-radius: 50%;
    border: .3rem solid rgba(0, 119, 137, 0.431);
    width: 15rem;
    height: 15rem;
  }
  .gift-border + .gift-border{
    margin-left: 9rem;
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
    height: 2rem;
    margin-top: 16rem;
    text-align: left;
    font-size: 1.2rem;
    letter-spacing: .3rem;
    color: rgb(0,245, 255);
  }
  .gifts-shining{
    position: absolute;
    left: 10%;
    bottom: 10%;
    font-size: 1rem;
    color: rgb(0,245, 255);
  }
  @media screen and (max-width: 1601px) {
    .gift-border{
      flex: 0 0 12rem;
      width: 12rem;
      height: 12rem;
    }
    .gift-des{
      margin-top: 12rem;
    }
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
    margin-top: 2.3rem;
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
