<template>
  <div class="main" @click.self="back">
    <!--中间框-->
    <div id="center">
        <transition name="fade">
          <!--操作选框-->
          <div class="center-show">
            <img src="../assets/resource/title.png" alt="title" class="center-title">
            <img src="../assets/resource/recovery.png" alt="recovery" class="center-recovery">
            <button class="center-operation" @click="bottle">我要回收</button>
          </div>
        </transition>
      </div>
    <!--侧边栏-->
    <div id="side">
      <img v-if="$bus.get('id') === -1" src="../assets/resource/brushFaceLogin.png" alt="brushFace" @click="brushFace">
      <img src="../assets/resource/yct.png" alt="yct" @click="yct">
      <img src="../assets/resource/Instructions.png" alt="instructions" @click="instruction">
      <img src="../assets/resource/yct.png" alt="Inventory" @click="inventory">
    </div>
    <pop-up ref="popUp">
      请先登录哦
    </pop-up>
  </div>
</template>

<script>
  export default {
    name: "HomePage",
    data() {
      return {
        timer: null,
        isBrushFace: false,
        mediaStreamTrack: {}
      }
    },
    methods: {
      bottle() {
        // if (this.$bus.get('id') <= 0) {
        //   // 提示先登录
        //   this.$refs.popUp.popUp()
        // } else {
        //   this.$router.push('/bottle')
        // }
        // 不经过刷脸登录也可以回收瓶子
        this.$router.push('/bottle')
      },
      brushFace() {
        this.$router.push('/brushFace')
      },
      yct() {
        this.$router.push('/yct')
      },
      instruction() {
        this.$router.push('/instructions')
      },
      inventory() {
        this.$router.push('/inventory')
      },
      back() {
        this.$router.go(-1)
      }
    },
    mounted() {
      let time = 180
      this.timer = setInterval(() => {
        if (time) {
          time--
        } else {
          // 重置用户幸喜
          this.$bus.reset()

          // 回到广告位
          this.$router.push('/')
        }
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
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
    background-image: url("../assets/resource/center.png");
    background-size: 100% 100%;
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
    justify-content: space-around;
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
