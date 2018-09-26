<template>
    <gl-dialog title="收货地址" :visible.sync="dialogFormVisible" :before-close="cancelForm">
        <gl-form :model="userManageForm" :rules="rules" ref="userManageForm" label-width="100px">
          <el-col :span="12">
            <gl-form-item label="用户名" prop="username">
                <gl-input v-model="userManageForm.username" clearable></gl-input>
            </gl-form-item>
          </el-col>
          <gl-col :span="12">
            <gl-form-item label="真实姓名" prop="realname">
                <gl-input v-model="userManageForm.realname" clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="密码" prop="password">
                <gl-input type='password' v-model="userManageForm.password" clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="手机号码" prop="mobile">
                <gl-input v-model="userManageForm.mobile" placeholder='请输入手机号码' :prop="/1[358]\d{9}/" clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="注册IP" prop="joinip">
                <gl-input v-model="userManageForm.joinip" clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
              <gl-form-item prop="email" label="邮箱">
                <gl-input v-model='userManageForm.email' placeholder='请输入电子邮箱' clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="状态" prop="state">
                <gl-select v-model="userManageForm.state" placeholder="启用">
                <gl-option label="启用" value='0'></gl-option>
                <gl-option label="禁用" value='1'></gl-option>
                </gl-select>               
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="管理员">
                <gl-select v-model="userManageForm.isadmin" placeholder="否">
                <gl-option label="否" value='0'></gl-option>
                <gl-option label="是" value='1'></gl-option>
                </gl-select>
            </gl-form-item>
          </gl-col>
          <gl-col :span="24">
            <gl-form-item label="所属部门" prop="departName">
              <!-- <gl-select v-model="userManageForm.departId" placeholder="请选择">
                <gl-option style="height:160px">
                  <tree ref='tree' :isDepart="isDepart" :defaultExpandAll="defaultExpandAll" @node-click='clickDepart' style="height:160px"></tree>
                </gl-option>
              </gl-select> -->
            <gl-select v-model="userManageForm.departId" placeholder="请选择">
              <gl-option
                        v-for="item in userManageForm.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </gl-option>
            </gl-select>
            </gl-form-item>
          </gl-col>
          <gl-col :span="24">
            <gl-form-item  label="角色选项" prop="roles">
                    <gl-checkbox-group class="height" v-model="list" @change="handleCheckedChange">
                      <gl-checkbox v-for="item in userManageForm.roleList" :key="item.id"  :label='item.id'>{{item.roleName}}</gl-checkbox>
                    </gl-checkbox-group>
            </gl-form-item>
          </gl-col>
      </gl-form>
      <div slot="footer" class="dialog-footer">
          <gl-button type="primary" @click="submitForm('userManageForm')">提 交</gl-button>
          <gl-button @click="cancelForm">取 消</gl-button>
      </div>
    </gl-dialog>
</template>

<script>
import { userForm } from '@/common/userConst'
export default {
  name: 'UserCreate',
  props: {
    dialogFormVisible: Boolean,
    userManageForm: Object
  },
  components: {
    userForm
  },
  watch: {
    dialogFormVisible(val) {
      val && console.log(this.userManageForm)
      !val && this.$refs['userManageForm'].resetFields()
    }
  },
  mounted() {
    // this.list = this.userManageForm.roleList.map(item => item.roleName)
  },
  data() {
    return {
      isDepart: true,
      defaultExpandAll: true,
      list: [],
      tel: '[ 1, /[34578]/, /d/{9}]',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入用户真实名字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        joinip: [
          { required: true, message: '请输入注册IP', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        departName: [
          { required: true, message: '请输入所属部门', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    message(message, type) {
      type &&
        this.$message({
          showClose: true,
          type: type,
          message: message
        })
      !type &&
        this.$message({
          showClose: true,
          message: message
        })
    },
    clickDepart(data, treeData, vue, props) {
      if (data.parent !== '#' || !data.children) {
        this.createRuleForm.departId = data.id
        this.createRuleForm.departPath = data.type
        this.getDepartName(treeData)
        this.createRuleForm.departName = this.departName.join(' - ')
        this.departName = []
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const userData = this.$deep_clone(this.userManageForm)
        console.log(userData.roleList)
        // userData.roleList = userData.roleList.map(item => item.id).join(',')
        userData.roles = userData.roles.join(',')
        // userData.roles = this.handleCheckedChange()
        // userData.departId = userData.options.map(item => item.value).join(',')
        console.log(userData.roles)
        const isflagId = userData.id
        if (valid) {
          this.$emit('userFormData', isflagId, userData)
        } else {
          return false
        }
        console.log(userData)
      })
    },
    cancelForm() {
      this.$emit('userFormData')
    },
    handleCheckedChange(value) {
      console.log(value.join(','))
      return value.join(',')
    }
  }
}
</script>
<style scoped>
.el-checkbox + .el-checkbox {
  margin-left: 0 !important;
  width: 100%;
}
.height {
  height: 100px;
  overflow-y: auto;
}

</style>

<style>
.el-form-item__content{
  line-height: 22px !important;
}
</style>
