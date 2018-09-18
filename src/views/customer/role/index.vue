<!-- roleManagement -->
<template>
  <div>
    <div class="default m-b20">
      <gl-input class="search-w250" placeholder="请输入角色名称" v-model="roleName" clearable></gl-input>
      <gl-button type="primary" @click="handleSearchRoleName">搜索</gl-button>
    </div>
    <hr>
    <div class="default p-t15">
      <gl-button class="control-tabledata-button" size="small" @click="handleCreateOrEdit(roleParam, '新增角色')">创建</gl-button>
      <role-create :createVisible="createVisible" :roleParam="roleParam" :createOrEditTitle="createOrEditTitle" @createClose="handleCreateClose"></role-create>
      <div class="m-b8">
        <transition>
          <gl-table :table="roleData"></gl-table>
        </transition>
        <gl-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10,20,30,40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </gl-pagination>
        <role-detail :detailVisible="detailVisible" :roleParam="roleParam" @detailClose="handleDetailClose"></role-detail>
        <user-detail :userDetailVisible="userDetailVisible" :userDetailTitle="userDetailTitle" @userDetailClose="handleUserDetailClose" :apiParam="apiParam" :columnParam="columnParam" :consoleParam="consoleParam" :flagRoleOrUser="flagRoleOrUser"></user-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { RoleCreate, RoleDetail, UserDetail } from '@/components/index'
// 接口
import { getRoleList, deleteRoleById } from '@/api/api'
import { roleCreateStructure, userRoleDetailColumn, userRoleDetailConsole } from '@/common/commonConst'
export default {
  name: 'role',
  components: {
    RoleCreate,
    RoleDetail,
    UserDetail
  },
  data() {
    return {
      roleName: '',
      roleId: Number,
      createVisible: false,
      detailVisible: false,
      userDetailVisible: false,
      roleParam: roleCreateStructure,
      columnParam: [],
      consoleParam: [],
      apiParam: Number,
      flagRoleOrUser: Boolean,
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
        column: [{
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
          prop: 'state'
        }, {
          label: '创建时间',
          prop: 'createTime'
        }],
        console: {
          label: '操作',
          prop: 'roleOptions',
          button: [{
            label: '编辑',
            type: 'text',
            callback: (index, rows) => {
              this.handleCreateOrEdit(rows[index], '角色列表')
            }
          }, {
            label: '详细',
            type: 'text',
            callback: (index, rows) => {
              this.handleGetRoleDetail(rows[index])
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
  // search--------------------
  // watch: {
  //   roleName(val) {
  //     !val
  //   }
  // },
  methods: {
    message(message, type) {
      type && this.$message({
        showClose: true,
        type: type,
        message: message
      })
      !type && this.$message({
        showClose: true,
        message: message
      })
    },
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除角色，根据返回的code值来判断是否删除成功
        this.deleteRole(rows[index].id)
        rows.splice(index, 1)
        this.message('删除成功', 'success')
      }).catch(() => {
        this.message('取消删除')
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
    reqList() {
      // const params = this.getParams()
    },
    // 接口请求-start---------------------------------------
    // 获取展示数据，请求表格数据
    getList() {
      const params = this.getParams()
      getRoleList.req(params).then(res => {
        // console.log(res)
        this.total = res.total
        this.roleData.data = res.list
        // console.log(this.roleData.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除角色
    deleteRole(params) {
      deleteRoleById.req(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 接口请求-end---------------------------------------
    // 新增用户到页面
    aaaddRole(data) {
      // 后台获取----------------------
      // data.id = '1038'
      data.createTime = new Date().toLocaleString().split('/').join('-')
      // 后台获取----------------------
      const newData = data
      this.roleData.data.push(newData)
      this.message('创建角色成功！', 'success')
    },
    createDialogVisible() {
      this.createVisible = !this.createVisible
    },
    deleteDialogVisible() {
      this.detailVisible = !this.detailVisible
    },
    userDetailDialogVisible() {
      this.userDetailVisible = !this.userDetailVisible
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
      // this.roleName = ''
    },
    handleGetRoleDetail(params) {
      this.roleParam = params
      this.deleteDialogVisible()
    },
    handleDetailClose() {
      this.deleteDialogVisible()
      this.roleParam = roleCreateStructure
    },
    handleGetUserDetail(index, rows) {
      this.columnParam = userRoleDetailColumn
      this.consoleParam = userRoleDetailConsole
      this.flagRoleOrUser = true
      this.apiParam = rows[index].id
      this.userDetailDialogVisible()
    },
    handleUserDetailClose() {
      this.userDetailDialogVisible()
      this.apiParam = Number
    },
    handleCreateOrEdit(params, title) {
      this.createDialogVisible()
      this.createOrEditTitle = title
      this.roleParam = params
    },
    // 关闭新增用户组件
    handleCreateClose(flagEOrC, data) {
      this.createDialogVisible()
      this.roleParam = roleCreateStructure
      !data && this.message('取消创建角色')
      // 将数据提交给后台，根据返回结果做判断
      // data && !flagEOrC && this.aaaddRole(data)
      // data && flagEOrC && this.message('已经成功修改数据！', 'success')
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
