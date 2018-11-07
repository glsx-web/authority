import {
  GlAxios
} from 'glsx-vue-common'

const path = '/admin-operating-auth/menu'
const __sAdd = `${path}/add`
const __sDel = `${path}/del`
const __sEdit = `${path}/edit`
const __sFindById = `${path}/findById`
const __sFindTree = `${path}/findTree`
const __sGetByUserId = `${path}/getByUserId`
const __sGetPName = `${path}/getPName`

const addMenu = {
  p: [__sAdd],
  req: params => GlAxios.post(__sAdd, params)
}

const delMenu = {
  p: [__sDel],
  req: params => GlAxios.post(__sDel, params)
}

const editMenu = {
  p: [__sEdit],
  req: params => GlAxios.post(__sEdit, params)
}

const findMenuById = {
  p: [__sFindById],
  req: params => GlAxios.get(__sFindById, { params })
}

const findMenuTree = {
  p: [__sFindTree],
  req: params => GlAxios.get(__sFindTree, { params })
}

const getMenuByUserId = {
  p: [__sGetByUserId],
  req: params => GlAxios.get(__sGetByUserId, { params })
}

const getMenuByPName = {
  p: [__sGetPName],
  req: params => GlAxios.get(__sGetPName, { params })
}

export {
  addMenu,
  delMenu,
  editMenu,
  findMenuById,
  findMenuTree,
  getMenuByUserId,
  getMenuByPName
}
