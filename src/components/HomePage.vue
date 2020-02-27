<template>
  <div class="main">
      <!--中间框-->
      <div id="center">
        <transition name="fade">
          <!--操作选框-->
          <div class="center-show">
            <img src="../assets/title.png" alt="title" class="center-title">
            <img src="../assets/recovery.png" alt="recovery" class="center-recovery">
            <button class="center-operation">我要回收</button>
          </div>
        </transition>
      </div>
    <!--侧边栏-->
    <div id="side">
      <img src="../assets/brushFaceLogin.png" alt="brushFace" @click="brushFace">
      <img src="../assets/yct.png" alt="yct">
      <img src="../assets/Instructions.png" alt="instructions" @click="instruction">
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomePage",
    data() {
      return {
        isBrushFace: false,
        mediaStreamTrack: {}
      }
    },
    methods: {
      brushFace() {
        this.$router.push('/brushFace')
      },
      instruction() {
        this.$router.push('/instructions')
      }
    }
  }
</script>

<style scoped>
  .main{
    position: relative;
    width: 100%;
    height: 100%;
  }
  #center{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*宽高自适应*/
    width: 28%;
    height: 48%;
    background-image: url("../assets/center.png");
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .center-show{
    position:absolute;
    top:50%;
    left:50%;
    width: 85%;
    height: 80%;
    transform: translate(-50%,-50%);
  }
  .center-title{
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
  }
  .center-recovery{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 28%;
    transform: translate(-50%, -50%);
  }
  .center-operation{
    box-sizing: border-box;
    position: absolute;
    bottom: 8%;
    left: 50%;
    transform: translateX(-50%);
    width: 76%;
    height: 16%;
    border: 3px solid rgb(0,245, 255);
    border-radius: 8px;
    font-weight: bold;
    font-size: 1.6rem;
    letter-spacing: .3rem;
    color: rgb(0,245, 255);
    background-color: rgba(0, 53, 76, .76);
    outline: 0;
  }
  #side{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    right: 0;
    top:50%;
    width: 22.5%;
    height: 56%;
    transform: translateY(-50%);
  }
  #side img{
    flex-grow: 0;
    width: 35%;
  }
  /*动画*/
  .fade-enter-active, .fade-leave-active {
    position: absolute;
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
