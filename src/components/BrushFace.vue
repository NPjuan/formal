<template>
  <!--人脸识别-->
  <div id="center" >
    <div class="center-show">
      <video ref="video" style="width: 100%;height: 100%;"></video>
    </div>
    <canvas ref="canvas"></canvas>
    <clock
      @timeout="timeout"
      :count="60"
      class="time"></clock>
  </div>
</template>

<script>
  export default {
    name: "BrushFace",
    data() {
      return {
        mediaStreamTrack: null,
        timer: 0,
        formData: new FormData(),
        showVideo: true
      }
    },
    methods: {
      handleVedio() {
        this.showVideo = false
      },
      timeout() {
        // 关闭摄像头
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        this.$router.go(-1)
        console.log('关闭')
      },
      drawPic() {
        let canvas = this.$refs.canvas
        let video = this.$refs.video
        this.timer = setInterval(()=>{
          console.log('启动')
          canvas.getContext("2d").drawImage(video, 0, 0, 500, 500);
          canvas.toBlob((blob) => {
            let formData = new FormData()
            let file = new File(
              [blob],
              'face.jpg', // 这里后缀名一定要 jpg 格式
              { type: 'image/jpeg' }
            );
            formData.append('file', file)
            this.sendPic(formData)
          })
        }, 1000)
      },
      sendPic(formData) {
        this.$axios.post('/face/uploadFacePicture.do',formData)
          .then((res)=>{
            if (res.data.code === '0') {
              const user = res.data.data
              console.log('user', user)
              this.$bus.set(user)
              this.$router.go(-1)
            }
          })
          .catch((err)=>{
            console.log(err)
          })
      }
    },
    mounted() {
      // 打开摄像头
      let video = this.$refs.video;
      // facingMode: "user" 优先选择
      let constraints = {
        video: {
          facingMode: 'user'
        },
        audio: false
      };
      let promise = navigator.mediaDevices.getUserMedia(constraints);
      promise.then( MediaStream => {
        console.log(MediaStream.getTracks()[0])
        this.mediaStreamTrack = typeof MediaStream.stop === 'function' ? MediaStream : MediaStream.getTracks()[0];
        video.srcObject = MediaStream;
        video.play();
        console.log('开始')
        this.drawPic()
      }).catch( PermissionDeniedError => {
        console.log(PermissionDeniedError);
      })
    },
    beforeDestroy() {
      this.mediaStreamTrack && this.mediaStreamTrack.stop();
      this.timer && clearInterval(this.timer)
      console.log('摄像头已销毁')
    }
  }
</script>

<style scoped>
  #center{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /*宽高自适应*/
    width: 28%;
    height: 48%;
    background-image: url("../assets/resource/center.png");
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
  .time{
    position: absolute;
    top: 0;
    right: -10rem;
  }
  canvas{
    position: absolute;
    left: 0;
    top:0;
    width: 500px;
    height: 500px;
    z-index: -100;
    opacity: 0;
  }
</style>
