<template>
  <div class="container">
    <clock class="clock" :count="180" @timeout="handleTimeOut"></clock>
    <transition name="fade">
      <main v-if="!selected">
        <gift-item
                v-for="item in gifts"
                :message="item"
                @giftClick="handleGiftsClick(item)"
        ></gift-item>
      </main>
      <div v-else class="message">
        <p v-if="can">当前选择的礼品是：{{selectedValue.name}}</p>
        <p v-else>积分不足</p>
        <div class="btn-container">
          <span class="btn" @click="confirm" v-if="can">确认</span>
          <span class="btn" @click="cancel">取消</span>
        </div>
      </div>
    </transition>
    <footer>
      <QRCode></QRCode>
    </footer>
  </div>
</template>

<script>
  import clock from "../clock"
  import giftItem from './gift-item'
  import QRCode from "./QRCode"
  export default {
    name: "exchangeGifts",
    components: {
      giftItem,
      QRCode,
      clock
    },
    data() {
      return {
        can: false,
        gifts: null,
        selected: false,
        selectedValue: null
      }
    },
    methods: {
      handleTimeOut() {
        this.$router.push('/homepage')
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
      },
      handleGiftsClick(item) {
        this.selectedValue = item
        let userScore = this.$bus.get('score')
        console.log('user', userScore)
        this.can = userScore >= item.score
        this.toggleMessage()
      },
      confirm() {
        console.log('兑换成功')
        this.$bus.user.score = this.$bus.user.score - this.selectedValue.score
        this.toggleMessage()
      },
      cancel() {
        console.log('取消兑换')
        this.toggleMessage()
      },
      toggleMessage() {
        this.selected = !this.selected
      }
    },
    created() {
      this.queryGifts()
    }
  }
</script>

<style scoped>
  .container{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .clock{
    position: absolute;
    left: 15rem;
    top: 15rem;
  }
 main{
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-start;
   width: 60rem;
   padding: 6rem;
   border-radius: 1rem;
   background-image: url("../../assets/resource/exchange.png");
   background-repeat: no-repeat;
   background-size: 100% 100%;
 }
  footer{
    position: fixed;
    right: 15rem;
    bottom: 18rem;
  }
  .btn-container{
    display: flex;
    justify-content: space-around;
    height: 6rem;
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
    background-image: url("../../assets/resource/button.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .message{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 35vw;
    height: 12vw;
    border: 2px solid rgb(0,245, 255);
    border-radius: 16px;
    font-size: 2.5rem;
    color: rgb(0,245, 255);
  }
  .btn:active{
    background-image: url("../../assets/resource/button-active.png");
  }
  .message p {
    padding: 2rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
