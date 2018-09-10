import {
  GlAxios
} from 'glsx-vue-common'
const path = 'role'
const __sUserTest = `${path}/userList`
// const __sGetInfo = `auth/checkLogin`
// const __sLogout = `${path}/logout`
// const __sLt = `${path}/lt`
// const __sCheckLogin = `auth/checkLogin`

const getUserInfo = {
  p: [__sUserTest],
  req: params => GlAxios.post(__sUserTest, params)
}
export {
  getUserInfo
}
