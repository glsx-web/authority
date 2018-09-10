import {
  GlAxios
} from 'glsx-vue-common'
const path = 'role'
const __sTest = `${path}/roleList`
const __getRoleInfo = `${path}/getRoleDetail`
const __addRole = `${path}/saveRoleList`
const __sDeleteRole = `${path}/deleteRoleById`
const __sDeleteUserRole = `${path}/deleteUserRoleById`

const roleTest = {
  p: [__sTest],
  req: params => GlAxios.post(__sTest, params)
}

const getRoleInfo = {
  p: [__getRoleInfo],
  req: params => GlAxios.get(__getRoleInfo, { params })
}

const addRole = {
  p: [__addRole],
  req: params => GlAxios.post(__addRole, params)
}

const deleteRoleById = {
  p: [__sDeleteRole],
  req: params => GlAxios.post(__sDeleteRole, params)
}

const deleteUserRoleById = {
  p: [__sDeleteUserRole],
  req: params => GlAxios.post(__sDeleteUserRole, params)
}

export {
  roleTest,
  getRoleInfo,
  addRole,
  deleteRoleById,
  deleteUserRoleById
}
