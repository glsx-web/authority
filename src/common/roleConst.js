const roleCreateStructure = {
  id: Number,
  roleName: '',
  description: '',
  departId: '',
  departName: '',
  departPath: '',
  rights: '',
  state: 1
}

const roleDataColumn = [{
  label: '序号',
  prop: 'id'
}, {
  label: '角色名字',
  prop: 'roleName'
}, {
  label: '所属部门',
  prop: 'departName'
}, {
  label: '状态',
  prop: 'state',
  formatter: (cellValue) => {
    return cellValue < 1 ? '禁止' : '启动'
  }
}, {
  label: '创建时间',
  prop: 'createTime',
  formatter: (cellValue) => {
    if (cellValue.createTime) {
      return new Date(cellValue.createTime).format('yyyy-MM-dd HH:mm:ss')
    }
  }
}]

const userRoleDetailColumn = [{
  label: '序号',
  prop: 'userId'
}, {
  label: '账号',
  prop: 'username'
}, {
  label: '用户名称',
  prop: 'realname'
}, {
  label: '状态',
  prop: 'state',
  formatter: (cellValue) => {
    return cellValue < 1 ? '禁止' : '启动'
  }
}]

export {
  roleCreateStructure,
  roleDataColumn,
  userRoleDetailColumn
}
