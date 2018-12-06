// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import GlsxVueComponents from 'glsx-vue-components'
import 'glsx-vue-components/dist/glsx-vue-components.css'
// import { common } from '@/config'
import './styles/role-user-common.scss'
import './styles/index.scss'
import './date.js'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
// import VeeValidate from 'vee-validate'
import { Tree } from '@/components'
Vue.use(GlsxVueComponents)
Vue.component('tree', Tree)
// import Theme from '@/common/theme'

const config = {
  errorBagName: 'errorBags',
  fieldsBagName: 'fieldBags'
}
Vue.use(VeeValidate, config)
Validator.localize('zh_CN', zh_CN)
Vue.prototype.$valid = Validator
var mixin = {
  data() {
    return {
      connection: null,
      eventBus: null
    }
  },
  beforeMount() {
    this.eventBus = new Vue()
  },
  mounted() {
    const _this = this
    const theme = new this.$Theme()
    this.connection = this.$Penpal.connectToParent({
      methods: {
        setTheme(color) {
          theme.change(color)
        },
        height() {
          return document.height || document.body.offsetHeight // document.documentElement.clientHeight || document.body.clientHeight //
        },
        $$on(e) {
          _this.eventBus.$emit('event', e)
        }
      }
    })
    this.connection.promise.then(parent => {
      const cfg = _this.$get_session_config()
      if (cfg) return
      parent.getResources().then(config => {
        _this.$set_session_config(config)
      })
    })
  },
  methods: {
    C2P(_event) {
      this.connection.promise.then(parent => {
        parent.$$emit(_event)
      })
    }
  }
}
const URL = ' http://192.168.3.171:7300/mock/5be17454f31545347559d499/config'
const getConfig = (url = URL + '/authority_common') => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve({ 'vue': Vue, 'config': JSON.parse(xhr.responseText) })
      }
    }
    xhr.open('GET', url)
    xhr.send()
  })
}
/* eslint-disable no-new */
const render = App => {
  new Vue({
    el: '#app',
    mixins: [mixin],
    render: h => h(App)
  })
}

export default { render, getConfig }
