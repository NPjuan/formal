import Vue from 'vue'
export default new Vue({
  data() {
    return {
      user: {
        id: -1,
        name: '',
        score: 0
      }
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

