import {
  deleteRoleById,
  deleteUserRoleById,
  getRoleDetail,
  getRoleList,
  isRoleNameExit,
  saveRoleList,
  selectMenuTreeRoleId,
  selectUserRoleByRoleId,
  updateRole
} from './roleApi'

import {
  batcheDelUser,
  findAll,
  getUser,
  getWithRoles,
  operatUser,
  updateUser,
  existsByName
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
  deleteRoleById,
  deleteUserRoleById,
  getRoleDetail,
  getRoleList,
  isRoleNameExit,
  saveRoleList,
  selectMenuTreeRoleId,
  selectUserRoleByRoleId,
  updateRole,
  // user接口
  batcheDelUser,
  findAll,
  getUser,
  getWithRoles,
  operatUser,
  updateUser,
  existsByName,
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
