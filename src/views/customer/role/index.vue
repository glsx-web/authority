<!-- roleManagement -->
<template>
  <div>
    <div class="default m-b20">
      <gl-input class="search-w250" placeholder="请输入角色名称" @keyup.enter.native="handleSearchRoleName" v-model="roleName" clearable></gl-input>
      <gl-button type="primary" @keyup.enter="handleSearchRoleName" @click="handleSearchRoleName">搜索</gl-button>
    </div>
    <div class="default p-t15">
      <gl-button class="control-tabledata-button" size="small" @click="handleCreateOrEdit(flagCOrE = true)">创建</gl-button>
      <role-create 
          :createVisible="createVisible" 
          :createRuleForm="roleParam" 
          :defaultCheckedKeys="roleMenu" 
          :departList="departList" 
          :flagCOrE="flagCOrE"
          :loading="loading"
          @createClose="handleCreateClose">
      </role-create>
      <div class="m-b8">
        <transition>
          <gl-table :table="roleData" v-loading="loadingTable" gl-loading-text="拼命加载中"></gl-table>
        </transition>
        <gl-pagination background 
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="pageNum" 
          :page-sizes="[10,20,30,40]" 
          :page-size="pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total">
        </gl-pagination>
        <role-detail 
          :detailVisible="detailVisible" 
          :roleMenuTree="roleMenuTree" 
          :roleParam="roleParam" 
          @detailClose="handleDetailClose">
        </role-detail>
        <user-detail 
            :userDetailVisible="userDetailVisible" 
            :userDetailTitle="userDetailTitle" 
            @userDetailClose="handleUserDetailClose" 
            :apiParam="apiParam" 
            :columnParam="columnParam" 
            :flagRoleOrUser="flagRoleOrUser"></user-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { RoleCreate, RoleDetail, UserDetail } from '@/components/index'
// 接口
import { getRoleList, deleteRoleById, selectMenuTreeRoleId, saveRoleList, updateRole, findDepartTree } from '@/api/api'
import { roleCreateStructure, roleDataColumn, userRoleDetailColumn, fn } from '@/common/commonConst'
import notice from '@/common/notice'
export default {
  name: 'role',
  components: {
    RoleCreate,
    RoleDetail,
    UserDetail
  },
  data() {
    return {
      loadingTable: false,
      loading: false,
      roleName: '',
      createVisible: false,
      detailVisible: false,
      userDetailVisible: false,
      roleParam: this.$deep_clone(roleCreateStructure),
      roleMenu: [],
      columnParam: [],
      apiParam: Object,
      flagRoleOrUser: true,
      flagCOrE: Boolean,
      editOrDetail: Boolean,
      roleMenuTree: [],
      createOrEditTitle: '新增角色',
      userDetailTitle: '用户列表',
      departList: [],
      tipParams: '',
      // 分页所需参数-start
      total: 10,
      pageNum: 1,
      pageSize: 10,
      // 分页所需参数-end
      roleData: {
        border: true,
        height: parseInt(this.$client_height() - 140),
        align: 'center',
        data: [],
        column: roleDataColumn,
        console: {
          show: true,
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
  created() {
    document.onkeydown = e => {
      if (e.keyCode === 13) {
        this.handleSearchRoleName()
      }
    }
  },
  mounted() {
    this.getList()
    this.getdepartData()
  },
  watch: {
    roleName(val) {
      // !val && this.getList()
      if (!val) {
        this.loadingTable = true
        this.getList()
      }
    }
  },
  methods: {
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除角色，根据返回的code值来判断是否删除成功(已有拦截器)
        this.loadingTable = true
        this.deleteRole(rows[index].id)
      }).catch(() => {
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
        this.total = res.total
        this.roleData.data = res.list
        this.loadingTable = false
        this.tipParams = ''
      }).catch(err => {
        this.tipParams = ''
        this.loadingTable = false
        notice.errorTips(err)
      })
    },
    // 删除角色
    deleteRole(params) {
      deleteRoleById.req({ roleId: params }).then(res => {
        notice.okTips('删除成功')
        this.getList()
      }).catch(message => {
        this.loadingTable = false
        notice.errorTips(message)
      })
    },
    roleMenuOption(data, pid) {
      data.forEach(item => {
        if (item.parent == pid) {
          this.roleMenu.push(item.id)
          this.roleMenuOption(data, item.id)
        }
      })
    },
    // 获得角色的相关权限详细信息，并返回树形数据
    getMenuTree(params) {
      selectMenuTreeRoleId.req({ id: params }).then(res => {
        if (this.editOrDetail) {
          this.roleMenuOption(res, '#')
          this.createDialogVisible()
        } else {
          this.roleMenuTree = res
          this.deleteDialogVisible()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加角色
    addRole(params) {
      saveRoleList.req(params).then((data) => {
        this.createOrEditSuccess()
      }).catch(err => {
        this.loading = false
        notice.errorTips(err)
      })
    },
    // 编辑角色
    updateRoleInfo(params) {
      delete params.createTime
      delete params.updateTime
      updateRole.req(params).then((data) => {
        this.createOrEditSuccess()
      }).catch(err => {
        this.loading = false
        notice.errorTips(err)
      })
    },
    // 获取部门树
    getdepartData() {
      findDepartTree.req().then(res => {
        this.departList = fn(res, '#')
      }).catch(err => {
        notice.errorTips(err)
      })
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
    emptyParam() {
      this.createDialogVisible()
      this.roleMenu = []
      clearTimeout(timer)
      var timer = setTimeout(() => {
        this.roleParam = this.$deep_clone(roleCreateStructure)
      }, 200)
    },
    createOrEditSuccess() {
      this.emptyParam()
      this.loading = false
      notice.okTips(this.flagCOrE ? '创建角色成功！' : '已经成功修改数据！')
      this.loadingTable = true
      this.getList()
    },
    // 调取接口相关函数
    handleSizeChange(val) {
      this.pageSize = val
      this.loadingTable = true
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.loadingTable = true
      this.getList()
    },
    handleSearchRoleName() {
      this.loadingTable = true
      this.getList()
    },
    handleGetRoleDetail() {
      this.getMenuTree(this.roleParam.id, this.editOrDetail = false)
    },
    handleDetailClose() {
      this.deleteDialogVisible()
      this.roleParam = this.$deep_clone(roleCreateStructure)
      this.roleMenuTree = []
    },
    handleGetUserDetail(index, rows) {
      this.columnParam = userRoleDetailColumn
      this.flagRoleOrUser = true
      this.apiParam = rows[index]
      this.userDetailDialogVisible()
    },
    handleUserDetailClose() {
      this.userDetailDialogVisible()
      // this.loadingTable = true
      // this.getList()
      this.apiParam = Object
    },
    handleCreateOrEdit() {
      this.roleParam = this.flagCOrE ? this.$deep_clone(roleCreateStructure) : this.roleParam
      this.roleParam.oldRoleName = this.roleParam.roleName
      this.flagCOrE ? this.createDialogVisible() : this.getMenuTree(this.roleParam.id, this.editOrDetail = true)
    },
    // 关闭新增用户组件
    handleCreateClose(data) {
      if (!data) {
        this.emptyParam()
        return false
      }
      this.loading = true
      // 将数据提交给后台，根据返回结果做判断
      this.flagCOrE ? this.addRole(data) : this.updateRoleInfo(data)
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
