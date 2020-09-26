import Vue from 'vue'
export default new Vue({
  data() {
    return {
      user: {
        id: -1,
        name: '',
        score: 1200
      },
      access_token: "24.187cd210ebb5abca5bea830679b82b1b.2592000.1603517805.282335-21696965"
    }
  },
  methods: {
    set(user) {
      this.user = user
    },
    get(key) {
      if (key in this.user) {
        return this.user[key]
      } else {
        return undefined
      }
    },
    reset() {
      this.user = {
        id: -1,
        name: '',
        score: 0
      }
    }
  }
})

