import { roleCreateStructure, roleDataColumn, userRoleDetailColumn } from './roleConst'
import { userForm, userDetailColumn } from './userConst'

function fn(data, pid) {
  var result = []
  var temp = null
  for (var i in data) {
    if (data[i].parent == pid) {
      result.push(data[i])
      temp = fn(data, data[i].id)
      if (temp.length > 0) {
        data[i].children = temp
      }
    }
  }
  return result
}

export {
  roleCreateStructure,
  roleDataColumn,
  userRoleDetailColumn,
  userDetailColumn,
  userForm,
  fn
}
