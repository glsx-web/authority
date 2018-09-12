import {
  GlAxios
} from 'glsx-vue-common'

const path = 'department'
const __sDel = `${path}/del`
const __sFindTree = `${path}/findTree`
const __sGetPName = `${path}/getPName`
const __sGetTreeNode = `${path}/getTreeNode`
const __sUpdateDepartment = `${path}/updateDepartment`

const delDepartment = {
  p: [__sDel],
  req: params => GlAxios.post(__sDel, params)
}

const findDepartTree = {
  p: [__sFindTree],
  req: () => GlAxios.get(__sFindTree)
}

const getDepartPName = {
  p: [__sGetPName],
  req: params => GlAxios.get(__sGetPName, { params })
}

const getDepartTreeNode = {
  p: [__sGetTreeNode],
  req: params => GlAxios.get(__sGetTreeNode, { params })
}

const updateDepartment = {
  p: [__sUpdateDepartment],
  req: params => GlAxios.post(__sUpdateDepartment, params)
}

export {
  delDepartment,
  findDepartTree,
  getDepartPName,
  getDepartTreeNode,
  updateDepartment
}
