<template>
  <div class="wx-code">
    <header>当前积分：{{$bus.get('score')}}</header>
    <img src="../../assets/resource/littleProgram.jpg" alt="wx">
    <p>微信扫码兑换更多礼品</p>
  </div>
</template>

<script>
  export default {
    name: "QRCode"
  }
</script>

<style scoped>
 .wx-code{
   width: 15rem;
   height: 15rem;
   color: #00f5ff;
   font-size: 2rem;
 }
 header{
   padding: 1rem 0;
 }
  img{
    width: 100%;
  }
  p{
    text-align: center;
    font-size: 1.2rem;
  }
</style>
