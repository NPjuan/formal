<template>
  <div class="item" @click="handleClick">
    <div class="gifts-img-container">
      <div class="gift-border">
        <div class="gift">
          <img :src="message.picturePath" alt="0">
        </div>
      </div>
    </div>
    <p class="tips">{{subHead}}</p>
    <p>{{message.name}}</p>
  </div>
</template>

<script>
  export default {
    name: "gift-item",
    props: {
      message: {
        type: Object,
        default: {
          detail: null,
          id: 0,
          name: '暂无',
          picturePath: '',
          score: ''
        },
      },
      isSoldOut: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick() {
        this.$emit('giftClick', this.message)
      }
    },
    computed: {
      subHead(val, newVal) {
        console.log('isSoldOut', this.isSoldOut)
        return this.isSoldOut ? '礼物售罄' : `积分：${this.message.score}`
      }
    }
  }
</script>

<style scoped>
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 0 12rem;
    text-align: center;
    color: rgb(0,245, 255);
    font-size: 1rem;
    border-radius: 12px;
    margin: 1rem;
  }
  .gift-border{
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    border-radius: 50%;
    border: .3rem solid rgba(0, 119, 137, 0.431);
    width: 10rem;
    height: 10rem;
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
  .gift>img{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 70%;
    transform: translate(-50%, -50%);
  }
  .tips{
    padding: .5rem 0;
  }
  footer{

  }
</style>
