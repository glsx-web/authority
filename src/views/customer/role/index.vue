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
        <gl-table :table="roleData"></gl-table>
        <gl-pagination 
        background
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="pagination.pageNum" 
        :page-sizes="[10,20,30,40]" 
        :page-size="pagination.pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total">
        </gl-pagination>
        <role-detail :detailVisible="detailVisible" :roleParam="roleParam" @detailClose="handleDetailClose"></role-detail>
        <user-detail :userDetailVisible="userDetailVisible" :userDetailTitle="userDetailTitle" @userDetailClose="handleUserDetailClose" :dataParam="[]" :columnParam="columnParam" :consoleParam="consoleParam"></user-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { RoleCreate, RoleDetail, UserDetail } from '@/components/index'
// easy mock接口
import { roleTest } from '@/api/api'
// 后台接口
// import { getRoleList } from '@/api/api'
import { roleCreateStructure, userRoleDetailColumn, userRoleDetailConsole } from '@/common/common'
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
      createVisible: false,
      detailVisible: false,
      userDetailVisible: false,
      roleParam: roleCreateStructure,
      columnParam: [],
      consoleParam: [],
      createOrEditTitle: '新增角色',
      userDetailTitle: '用户列表',
      // 分页所需参数-start
      total: 100,
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
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
              this.handleGetUserDetail()
            }
          }]
        }
      }
    }
  },
  mounted() {
    roleTest.req().then(res => {
      this.roleData.data = res.roleData
    })
    // 请求表格数据
    // getRoleList.req(this.pagination).then(res => {
    //   console.log(res)
    //   this.total = res.total
    //   this.roleData.data = res.condition
    // }).catch(err => {
    //   console.log(err)
    // })
  },
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
        this.roleData.data.splice(index, 1)
        rows.splice(index, 1)
        this.message('删除成功', 'success')
      }).catch(() => {
        this.message('取消删除')
      })
    },
    // 新增用户到页面
    aaaddRole(data) {
      // 后台获取----------------------
      data.id = '1038'
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
      this.pagination.pageSize = val
    },
    handleCurrentChange(val) {
      this.pagination.pageNum = val
    },
    handleSearchRoleName() {
      this.roleName = ''
    },
    handleGetRoleDetail(params) {
      this.roleParam = params
      this.deleteDialogVisible()
    },
    handleDetailClose() {
      this.deleteDialogVisible()
      this.roleParam = roleCreateStructure
    },
    handleGetUserDetail() {
      this.columnParam = userRoleDetailColumn
      this.consoleParam = userRoleDetailConsole
      this.userDetailDialogVisible()
    },
    handleUserDetailClose() {
      this.userDetailDialogVisible()
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
      data && !flagEOrC && this.aaaddRole(data)
      data && flagEOrC && this.message('已经成功修改数据！', 'success')
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
