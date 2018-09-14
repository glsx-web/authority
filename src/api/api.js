import {
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
} from './roleApi'

import {
  getUser,
  batcheDelUser,
  findUserList,
  getUserInfo,
  getWithRoles,
  operatUser,
  updateUser
} from './userApi'

import {
  delDepartment,
  findDepartTree,
  getDepartPName,
  getDepartTreeNode,
  updateDepartment
} from './departApi'

import {
  addMenu,
  delMenu,
  editMenu,
  findMenuById,
  findMenuTree,
  getMenuByUserId,
  getMenuByPName
} from './menuApi'

export {
  // role接口
  roleTest,
  deleteRoleById,
  deleteUserRoleById,
  getRoleDetail,
  getRoleList,
  // isRoleNameExit,
  saveRoleList,
  selectMenuTreeRoleId,
  selectUserRoleByRoleId,
  updateRole,
  // user接口
  getUser,
  batcheDelUser,
  findUserList,
  getUserInfo,
  getWithRoles,
  operatUser,
  updateUser,
  // depart接口
  delDepartment,
  findDepartTree,
  getDepartPName,
  getDepartTreeNode,
  updateDepartment,
  // menu接口
  addMenu,
  delMenu,
  editMenu,
  findMenuById,
  findMenuTree,
  getMenuByUserId,
  getMenuByPName
}
