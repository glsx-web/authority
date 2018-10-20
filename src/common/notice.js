import Vue from 'vue'

export default new Vue({
  methods: {
    okTips(message) {
      this.$notify({
        type: 'success',
        title: message
      })
    },
    errorTips(message) {
      this.$notify({
        type: 'error',
        title: message
      })
    }
  }
})
