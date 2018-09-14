import {
  GlAxios
} from 'glsx-vue-common'
const path = 'user'
const __sBatcheDel = `${path}/batcheDel`
const __sFindAll = `${path}/findAll`
const __sGet = `${path}/get`
const __sGetWithRoles = `${path}/getWithRoles`
const __sOperatUser = `${path}/operatUser`
const __sUpdateUser = `${path}/updateUser`

const batcheDelUser = {
  p: [__sBatcheDel],
  req: params => GlAxios.post(__sBatcheDel, params)
}

const findAll = {
  p: [__sFindAll],
  req: params => GlAxios.get(__sFindAll, { params })
}

const getUser = {
  p: [__sGet],
  req: params => GlAxios.get(__sGet, { params })
}

const getWithRoles = {
  p: [__sGetWithRoles],
  req: params => GlAxios.get(__sGetWithRoles, { params })
}

const operatUser = {
  p: [__sOperatUser],
  req: params => GlAxios.post(__sOperatUser, params)
}

const updateUser = {
  p: [__sUpdateUser],
  req: params => GlAxios.post(__sUpdateUser, params)
}

export {
  batcheDelUser,
  findAll,
  getUser,
  getWithRoles,
  operatUser,
  updateUser
}
