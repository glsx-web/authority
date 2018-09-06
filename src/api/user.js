import {
  GlAxios
} from 'glsx-vue-common'
const path = 'vue'
const __sLogin = `${path}`
// const __sGetInfo = `auth/checkLogin`
// const __sLogout = `${path}/logout`
// const __sLt = `${path}/lt`
// const __sCheckLogin = `auth/checkLogin`

const getInfo = {
  p: [__sLogin],
  req: (subaddress, params) => GlAxios.post(__sLogin + subaddress, params)
}

export {
  getInfo
}
