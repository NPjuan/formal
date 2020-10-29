<template>
  <div id="camera">
    <video v-show="recording" ref="video" width="400px" height="400px" />
    <canvas v-show="!recording" ref="canvas" width="400px" height="400px"></canvas>
  </div>
</template>

<script>
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
        timer: null,
        count: 1,
      }
    },
    methods: {
      img2blob(ndata){
        //ndata为base64格式地址
        let arr = ndata.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime})
      },
      // 绘制图片
      _filterPic() {
        console.log('发送照片')
        let canvas = this.$refs.canvas
        let video = this.$refs.video
        canvas.getContext("2d").drawImage(video, 0, 0, 400, 400);
        let ext = video.src.substring(video.src.lastIndexOf(".")+1).toLowerCase();
        let image = canvas.toDataURL("image/"+ext)
        // let imgEl = new Image()
        // imgEl.src = image
        // this.downloadImage(imgEl, 'img')
        // let base64 = image.replace('data:image/png;base64,', '')
        console.log('image', image)
        canvas.toBlob((blob) => {
          let formData = new FormData()
          let file = new File(
            [blob],
            'bottle.jpg', // 这里后缀名一定要 jpg 格式
            { type: 'image/jpeg' }
          );
          formData.append('file', file)
          this.sendPic(formData)
        })
      },
      drawPic() {
        setTimeout(this._filterPic, 2000)
      },
      // 发送数据
      sendPic(formData) {
        // 'http://192.168.1.107:8080/BottleProject/bottle/checkBottlePicture'
        this.$axios.post('http://127.0.0.1:8080/BottleProject/bottle/checkBottlePicture', formData)
          .then(({ data }) => {
            let res = '识别不到瓶子'
            console.log('data', data)
            if (data.code === '500000') {
              res = data.data
              console.log('请求成功')
              this.$emit('handleVideo', res, true)
              this.recording = false
              return
            }
            this.timer = setTimeout(this._filterPic, 4000)
            // this.$emit('handleVideo', res, false)
          })
          .catch(err => {
            console.log('err', err)
            this.endVideo()
          })
      },
      endVideo() {
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        this.timer && clearInterval(this.timer)
        console.log('摄像头已关闭')
      },
      dispatchMediaDevices(labelReg) {
        // 是否支持媒体 API
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.log("不支持 enumerateDevices() .");
          return;
        }
        // 打开摄像头
        const video = this.$refs.video;
        // 列出相机和麦克风。
        navigator.mediaDevices.enumerateDevices()
          .then((devices) => {
            let faceDeviceId = undefined
            devices.forEach(({label, deviceId}) => {
              console.log('deviceId', deviceId)
              console.log('label', label)
              if (label.match(labelReg)) {
                faceDeviceId = deviceId
              }
            });
            const constraints = faceDeviceId ? {
              video: {
                deviceId: faceDeviceId
              }
            } : { video: { facingMode: "user" } }
            return navigator.mediaDevices.getUserMedia(constraints)
          })
          .then( MediaStream => {
            console.log('video', MediaStream)
            console.log(MediaStream.getTracks()[0])
            this.mediaStreamTrack = typeof MediaStream.stop === 'function' ? MediaStream : MediaStream.getTracks()[0];
            video.srcObject = MediaStream;
            video.play();
            console.log('开始')
            this.drawPic()
          })
          .catch(err => {
            console.log(err.name + ": " + err.message);
          });
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
    mounted() {
      this.dispatchMediaDevices(/RMONCAM/)
    },
    beforeDestroy() {
      this.endVideo()
    }
  }
</script>

<style scoped>

</style>
