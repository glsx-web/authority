// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/index.js'
import GlsxVueComponents from 'glsx-vue-components'
import 'glsx-vue-components/dist/glsx-vue-components.css'
import GlsxVueCommon from 'glsx-vue-common'
import config from './config'
import './styles/role-user-common.scss'
import './styles/index.scss'
// import _ from 'lodash'

Vue.use(GlsxVueComponents)
Vue.use(GlsxVueCommon, config)

var mixin = {
  mounted () {
    const _this = this
    const theme = new this.$Theme()
    const connection = this.$Penpal.connectToParent({
      methods: {
        setTheme (color) {
          theme.change(color)
        },
        height () {
          return document.height || document.body.offsetHeight // document.documentElement.clientHeight || document.body.clientHeight //
        }
      }
    })
    connection.promise.then(parent => {
      const cfg = _this.$get_session_config()
      if (cfg) return
      parent.getResources().then(config => {
        _this.$set_session_config(config)
      })
    })
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  mixins: [mixin],
  router,
  render: h => h(App)
})
