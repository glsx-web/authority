// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/index.js'
import GlsxVueComponents from 'glsx-vue-components'
import 'glsx-vue-components/dist/glsx-vue-components.css'
import { GlsxVueCommon, GlConst } from 'glsx-vue-common'
const { AppConst } = GlConst
// import _ from 'lodash'

Vue.use(GlsxVueComponents)
Vue.use(GlsxVueCommon)

var mixin = {
  mounted () {
    const theme = new this.$Theme()
    const menus = new this.$get_config_by_key(AppConst.Auth.Resources.Key)
    const connection = this.$Penpal.connectToParent({
      methods: {
        setTheme (color) {
          theme.change(color)
        },
        setResources (resources) {
          menus.change(resources)
        },
        height () {
          return document.height || document.body.offsetHeight // document.documentElement.clientHeight || document.body.clientHeight //
        }
      }
    })
    connection.promise.then(parent => {
      parent.onload()
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
