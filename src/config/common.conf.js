export default {
  axios: {
    // baseURL: 'http://cas.dev.glsx.net/admin-operating-auth/',
    baseURL: 'http://192.168.3.171:7300/mock/5b91805391b67469b43e2921/subsystem/',
    whiteList: ['role/deleteRoleById', 'role/deleteUserRoleById', 'role/getRoleDetail', 'role/getRoleDetail', 'role/getRoleList', 'role/isRoleNameExit', 'role/saveRoleList', 'role/selectMenuTreeRoleId', 'role/selectUserRoleByRoleId', 'role/updateRole', 'user/batcheDel', 'user/findAll', 'user/get', 'user/getWithRoles', 'user/operatUser', 'user/updateUser', 'department/del', 'department/findTree', 'department/getPName', 'department/getTreeNode', 'department/updateDepartment', 'menu/add', 'menu/del', 'menu/edit', 'menu/findById', 'menu/findTree', 'menu/getByUserId', 'menu/getPName'],
    timeout: 15000,
    result: {
      data_key: 'data', // 返回值数据实体存放对象
      message_key: 'message', // 返回信息字段名
      code_key: 'returnCode', // 返回结果字段名
      code_success_value: '0', // 返回成功值 注意类型 (字符串与数字)
      code_message_map: { // 错误码 错误信息 映射表
      }
    }
  }
}
