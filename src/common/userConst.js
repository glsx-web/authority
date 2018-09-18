const userDetailColumn = [{
  label: '用户名',
  prop: 'username'
}, {
  label: '真实姓名',
  prop: 'realname'
}, {
  label: '管理员',
  prop: 'isadmin',
  formatter: (cellValue) => {
    return cellValue < 1 ? '否' : '是'
  }
}, {
  label: '手机号码',
  prop: 'mobile'
}, {
  label: '邮箱',
  prop: 'email'
}, {
  label: '角色选项',
  prop: 'roles'
}, {
  label: '状态',
  prop: 'state',
  formatter: (cellValue) => {
    return cellValue < 1 ? '禁止' : '启动'
  }
}]

export { userDetailColumn }
