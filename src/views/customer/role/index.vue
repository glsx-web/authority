<!-- roleManagement -->
<template>
  <div>
    <div class="default m-b20">
      <gl-input class="search-w250" placeholder="请输入角色名称" v-model="roleName" clearable></gl-input>
      <gl-button type="primary" @click="handleSearchRoleName">搜索</gl-button>
    </div>
    <hr>
    <div class="default p-t15">
      <gl-button class="control-tabledata-button" size="small" @click="handleCreateOrEdit(flagCOrE = true)">创建</gl-button>
      <role-create :createVisible="createVisible" :createRuleForm="roleParam" :flagCOrE="flagCOrE" @createClose="handleCreateClose"></role-create>
      <div class="m-b8">
        <transition>
          <gl-table :table="roleData"></gl-table>
        </transition>
        <gl-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10,20,30,40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </gl-pagination>
        <role-detail :detailVisible="detailVisible" :roleMenuTree="roleMenuTree" :roleParam="roleParam" @detailClose="handleDetailClose"></role-detail>
        <user-detail :userDetailVisible="userDetailVisible" :userDetailTitle="userDetailTitle" @userDetailClose="handleUserDetailClose" :apiParam="apiParam" :columnParam="columnParam" :consoleParam="consoleParam" :flagRoleOrUser="flagRoleOrUser"></user-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { RoleCreate, RoleDetail, UserDetail } from '@/components/index'
// 接口
import { getRoleList, deleteRoleById, selectMenuTreeRoleId, saveRoleList, updateRole } from '@/api/api'
import { roleCreateStructure, roleDataColumn, userRoleDetailColumn, userRoleDetailConsole } from '@/common/commonConst'
export default {
  name: 'role',
  components: {
    RoleCreate,
    RoleDetail,
    UserDetail,
    saveRoleList,
    updateRole
  },
  data() {
    return {
      roleName: '',
      roleId: Number,
      createVisible: false,
      detailVisible: false,
      userDetailVisible: false,
      roleParam: this.$deep_clone(roleCreateStructure),
      columnParam: [],
      consoleParam: [],
      apiParam: Number,
      flagRoleOrUser: true,
      flagCOrE: Boolean,
      roleMenuTree: [],
      createOrEditTitle: '新增角色',
      userDetailTitle: '用户列表',
      // 分页所需参数-start
      total: 10,
      pageNum: 1,
      pageSize: 10,
      // 分页所需参数-end
      roleData: {
        border: true,
        height: 400,
        data: [],
        column: roleDataColumn,
        console: {
          label: '操作',
          prop: 'roleOptions',
          button: [{
            label: '编辑',
            type: 'text',
            callback: (index, rows) => {
              this.roleParam = this.$deep_clone(rows[index])
              this.handleCreateOrEdit(this.flagCOrE = false)
            }
          }, {
            label: '详细',
            type: 'text',
            callback: (index, rows) => {
              this.roleParam = this.$deep_clone(rows[index])
              this.handleGetRoleDetail()
            }
          }, {
            label: '删除',
            type: 'text',
            callback: (index, rows) => {
              this.confirmDeleteOrNot(index, rows)
            }
          }, {
            label: '用户',
            type: 'text',
            callback: (index, rows) => {
              this.handleGetUserDetail(index, rows)
            }
          }]
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  watch: {
    roleName(val) {
      !val && this.getList()
    }
  },
  methods: {
    message(message, type) {
      this.$notify({
        type: type,
        title: message
      })
    },
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除角色，根据返回的code值来判断是否删除成功(已有拦截器)
        this.deleteRole(rows[index].id)
      }).catch(() => {
        this.message('取消删除', 'info')
      })
    },
    // 获取页面参数
    getParams() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        keyWork: this.roleName
      }
    },
    // 接口请求-start---------------------------------------
    // 获取展示数据，请求表格数据
    getList() {
      const params = this.getParams()
      getRoleList.req(params).then(res => {
        // console.log(res)
        this.total = res.total
        this.roleData.data = res.list
        // this.$set(this.roleData, 'data', res.list)
        // console.log(this.roleData.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除角色
    deleteRole(params) {
      deleteRoleById.req({ roleId: params }).then(res => {
        this.message('删除成功', 'success')
        this.getList()
      }).catch(message => {
        this.message(message, 'error')
      })
    },
    // 获得角色的相关权限详细信息，并返回树形数据
    getMenuTree(params) {
      selectMenuTreeRoleId.req({ id: params }).then(res => {
        this.roleMenuTree = res
        this.deleteDialogVisible()
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加角色
    addRole(params) {
      console.log(params)
      this.createOrEditSuccess()
      // editData = { roleName: editData.roleName }
      // const aa = { role: editData }
      // const aa = JSON.stringify(editData)
      // console.log(aa)
      // console.log(editData)
      // const cc = { roleName: 'ggg' }
      // saveRoleList.req(params).then((data) => {
      //   console.log(data)
      //   this.createOrEditSuccess()
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 编辑角色
    updateRoleInfo(params) {
      console.log(params)
      this.createOrEditSuccess()
      // updateRole.req(params).then((data) => {
      //   console.log(data)
      //   this.createOrEditSuccess()
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 接口请求-end---------------------------------------
    createDialogVisible() {
      this.createVisible = !this.createVisible
    },
    deleteDialogVisible() {
      this.detailVisible = !this.detailVisible
    },
    userDetailDialogVisible() {
      this.userDetailVisible = !this.userDetailVisible
    },
    createOrEditSuccess() {
      this.createDialogVisible()
      this.message(this.flagCOrE ? '创建角色成功！' : '已经成功修改数据！', 'success')
      this.getList()
    },
    // 调取接口相关函数
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
    handleSearchRoleName() {
      this.getList()
    },
    handleGetRoleDetail() {
      this.getMenuTree(this.roleParam.id)
    },
    handleDetailClose() {
      this.deleteDialogVisible()
      this.roleParam = this.$deep_clone(roleCreateStructure)
      this.roleMenuTree = []
    },
    handleGetUserDetail(index, rows) {
      this.columnParam = userRoleDetailColumn
      this.consoleParam = userRoleDetailConsole
      this.flagRoleOrUser = true
      this.apiParam = rows[index]
      this.userDetailDialogVisible()
    },
    handleUserDetailClose() {
      this.userDetailDialogVisible()
      this.getList()
      this.apiParam = Number
    },
    handleCreateOrEdit() {
      this.roleParam = this.flagCOrE ? this.$deep_clone(roleCreateStructure) : this.roleParam
      this.createDialogVisible()
      // this.flagCOrE && this.createDialogVisible()
      // !this.flagCOrE && this.getMenuTree(this.roleParam.id, this.editOrDetail = true)
    },
    // 关闭新增用户组件
    handleCreateClose(data) {
      this.roleParam = this.$deep_clone(roleCreateStructure)
      if (!data) {
        this.createDialogVisible()
        this.message(this.flagCOrE ? '取消创建角色' : '取消编辑角色', 'info')
        return false
      }
      // 将数据提交给后台，根据返回结果做判断
      this.flagCOrE && this.addRole(data)
      !this.flagCOrE && this.updateRoleInfo(data)
    }
  }
}
</script>
<style scoped>
.search-w250 {
    width: 250px;
}
.m-b8 {
    margin-bottom: 8px;
}
</style>
