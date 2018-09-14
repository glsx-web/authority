import {
  GlAxios
} from 'glsx-vue-common'
const path = 'role'
const __sTest = `${path}/roleList`
const __sDeleteRole = `${path}/deleteRoleById`
const __sDeleteUserRole = `${path}/deleteUserRoleById`
const __sGetRoleDetail = `${path}/getRoleDetail`
const __sGetRoleList = `${path}/getRoleList`
// const __sIsRoleNameExit = `${path}/isRoleNameExit`
const __sSaveRoleList = `${path}/saveRoleList`
const __sSelectMenuTreeRoleId = `${path}/selectMenuTreeRoleId`
const __sSelectUserRole = `${path}/selectUserRoleByRoleId`
const __sUpdateRole = `${path}/updateRole`

const roleTest = {
  p: [__sTest],
  req: params => GlAxios.post(__sTest, params)
}

const deleteRoleById = {
  p: [__sDeleteRole],
  req: params => GlAxios.post(__sDeleteRole, params)
}

const deleteUserRoleById = {
  p: [__sDeleteUserRole],
  req: params => GlAxios.post(__sDeleteUserRole, params)
}

const getRoleDetail = {
  p: [__sGetRoleDetail],
  req: params => GlAxios.get(__sGetRoleDetail, { params })
}

const getRoleList = {
  p: [__sGetRoleList],
  req: params => GlAxios.get(__sGetRoleList, { params })
}

// const isRoleNameExit = {
//   p: [__sIsRoleNameExit],
//   req: params => GlAxios.get(__sIsRoleNameExit, { params })
// }

const saveRoleList = {
  p: [__sSaveRoleList],
  req: params => GlAxios.post(__sSaveRoleList, params)
}

const selectMenuTreeRoleId = {
  p: [__sSelectMenuTreeRoleId],
  req: params => GlAxios.get(__sSelectMenuTreeRoleId, { params })
}

const selectUserRoleByRoleId = {
  P: [__sSelectUserRole],
  req: params => GlAxios.get(__sSelectUserRole, { params })
}

const updateRole = {
  p: [__sUpdateRole],
  req: params => GlAxios.post(__sUpdateRole, params)
}

export {
  roleTest,
  deleteRoleById,
  deleteUserRoleById,
  getRoleDetail,
  getRoleList,
  // isRoleNameExit,
  saveRoleList,
  selectMenuTreeRoleId,
  selectUserRoleByRoleId,
  updateRole
}
