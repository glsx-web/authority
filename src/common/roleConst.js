const roleCreateStructure = {
  roleId: Number,
  roleName: '',
  description: '',
  departName: '',
  right: Array,
  state: Number,
  createTime: ''
}

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
  prop: 'state'
}]

const userRoleDetailConsole = {
  label: '操作',
  prop: 'option',
  button: [{
    label: '删除',
    type: 'text',
    callback: (index, rows) => {
      rows.splice(index, 1)
      // this.$alert(rows[index])
    }
  }]
}

export {
  roleCreateStructure,
  userRoleDetailColumn,
  userRoleDetailConsole
}
