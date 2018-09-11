const roleCreateStructure = {
  id: '',
  roleName: '',
  description: '',
  departName: '',
  menuOption: '',
  state: '启动',
  createTime: ''
}

const userRoleDetailColumn = [{
  label: '序号',
  prop: 'id'
}, {
  label: '账号',
  prop: 'username'
}, {
  label: '用户名称',
  prop: 'realname'
}, {
  label: '状态',
  prop: 'state'
}]

const userRoleDetailConsole = {
  label: '操作',
  prop: 'option',
  button: [{
    label: '删除',
    type: 'text',
    callback: (index, rows) => {
      this.$alert(rows[index])
    }
  }]
}

export {
  roleCreateStructure,
  userRoleDetailColumn,
  userRoleDetailConsole
}
