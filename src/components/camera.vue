<template>
  <div>
    <video v-show="recording" ref="video" width="400px" height="400px" />
    <canvas v-show="!recording" ref="canvas" width="400px" height="400px"></canvas>
  </div>
</template>

<script>
  import { base640 } from '../assets/index'
  export default {
    name: "camera",
    props: {
      videoComplete: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        recording: true,
        mediaStreamTrack: null,
        timer: null,
      }
    },
    methods: {
      // 绘制图片
      drawPic() {
        let canvas = this.$refs.canvas
        let video = this.$refs.video
        this.timer = setInterval(()=>{
          console.log('启动')
          canvas.getContext("2d").drawImage(video, 0, 0, 400, 400);
          let ext = video.src.substring(video.src.lastIndexOf(".")+1).toLowerCase();
          let base64 = canvas.toDataURL("image/"+ext).replace('data:image/png;base64,', '')
          this.sendPic(base64)
        }, 3000)
      },
      // 发送数据
      sendPic(base64) {
        this.$axios.post('https://aip.baidubce.com/rpc/2.0/ai_custom/v1/detection/bottletransione0730?access_token="24.ff2c6103b187bc3104ab94f2ffcc6b8a.2592000.1598759499.282335-21696965"', {
          image: base640
        })
          .then(res => {
            console.log('res', res)
            if (res.data.results.length > 0) {
              console.log('请求成功')
              this.recording = false
              this.$emit('handleVideo', res.data.results)
              this.endVedio()
            }
          })
          .catch(err => {
            console.log('err', err)
          })
      },
      async _getToken() {
        const GRANT_TYPE = 'client_credentials'
        const CLIENT_ID = 'CssdKlUA5tFSALHuNifU9fYi'
        const CLIENT_SECRET = 'ovX0eovuDsIM3ayE4pdzRWc4GLR53HDK'
        this.$axios.post(`/api/oauth/2.0/token`, {
          config: {
            params: {
              grant_type: GRANT_TYPE,
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET
            }
          }
        })
        .then(res => {
          console.log('res', res)
        })
        .catch(err => {
          console.log('err', err)
        })
      },
      endVedio() {
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        clearInterval(this.timer)
        console.log('摄像头已关闭')
      },
      dispatchVideo() {
        // 打开摄像头
        let video = this.$refs.video;
        let constraints = {
          video: {width: 500, height: 500},
          audio: false
        };

        let promise = navigator.mediaDevices.getUserMedia(constraints)
          .then( MediaStream => {
            console.dir(MediaStream)
            console.dir(MediaStream.getTracks()[1])
            this.mediaStreamTrack = typeof MediaStream.stop === 'function' ? MediaStream : MediaStream.getTracks()[0];
            video.srcObject = MediaStream;
            video.play();
            console.log('开始')
            this.drawPic()
          })
          .catch( PermissionDeniedError => {
            console.log(PermissionDeniedError);
          })
      }
    },
    async mounted() {
      this.recoding = true
      this.dispatchVideo()
      // await this._getToken()

    },
    watch: {
      videoComplete(val, newVal){
        console.log('val', val)
      }
    },
    beforeDestroy() {
      this.endVedio()
    }
  }
</script>

<style scoped>

</style>
