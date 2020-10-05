<template>
  <div id="camera">
    <video v-show="recording" ref="video" width="400px" height="400px" />
    <canvas v-show="!recording" ref="canvas" width="400px" height="400px"></canvas>
  </div>
</template>

<script>
  import { base640 } from '../assets/index'
  export default {
    name: "camera",
    props: {
      facingMode: {
        type: [String, Object],
        default: "user"
      }
    },
    data() {
      return {
        recording: true,
        mediaStreamTrack: null,
        timer: null
      }
    },
    methods: {
      // 绘制图片
      drawPic() {
        let canvas = this.$refs.canvas
        let video = this.$refs.video
        this.timer = setInterval(()=>{
          console.log('发送照片')
          canvas.getContext("2d").drawImage(video, 0, 0, 400, 400);
          let ext = video.src.substring(video.src.lastIndexOf(".")+1).toLowerCase();
          let image = canvas.toDataURL("image/"+ext)
          let imgEl = new Image()
          imgEl.src = image
          // this.downloadImage(imgEl, 'img')
          let base64 = image.replace('data:image/png;base64,', '')
          this.sendPic(base640)
        }, 16000)
      },
      // 发送数据
      sendPic(base64) {
        this.$axios.post(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/detection/bottletransione0730?access_token="${this.$bus.access_token}"`, {
          image: base64
        })
          .then(res => {
            console.log('res', res)
            if (res.data.results.length > 0) {
              console.log('请求成功')
              this.recording = false
              this.$emit('handleVideo', res.data.results)
              this.endVideo()
            }
          })
          .then(value => {
            console.log('value', value)
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
      endVideo() {
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        clearInterval(this.timer)
        console.log('摄像头已关闭')
      },
      dispatchVideo() {
        // 打开摄像头
        let video = this.$refs.video;
        let constraints = {
          video: this.facingMode,
          audio: false
        };

        navigator.mediaDevices.getUserMedia(constraints)
          .then( MediaStream => {
            console.dir(MediaStream)
            this.mediaStreamTrack = typeof MediaStream.stop === 'function' ? MediaStream : MediaStream.getTracks()[0];
            video.srcObject = MediaStream;
            video.play();
            this.drawPic()
          })
          .catch( PermissionDeniedError => {
            console.log(PermissionDeniedError);
          })
      },
      downloadImage(el, name) {
        // 通过选择器获取img元素
        var img = el
        // 将图片的src属性作为URL地址
        var url = img.src
        var a = document.createElement('a')
        var event = new MouseEvent('click')

        a.download = name || '下载图片名称'
        a.href = url

        a.dispatchEvent(event) //根据A标签的属性来搞事情
      }
  },
    async mounted() {
      this.recoding = true
      this.dispatchVideo()
    },
    beforeDestroy() {
      this.endVideo()
    }
  }
</script>

<style scoped>

</style>
