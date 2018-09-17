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
                <gl-input v-model="userManageForm.mobile" 
                          prefix-icon='el-icon-mobile-phone' 
                          placeholder='请输入手机号码' clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="注册IP" prop="registeredIP">
                <gl-input v-model="userManageForm.registeredIP" clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="邮箱" prop="email">
                <gl-input v-model='userManageForm.email' placeholder='请输入电子邮箱' clearable>
                      </gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="状态" prop="state">
                <gl-select v-model="userManageForm.state" placeholder="启用">
                <gl-option label="启用" value="启用"></gl-option>
                <gl-option label="禁用" value="禁用"></gl-option>
                </gl-select>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="管理员">
                <gl-select v-model="userManageForm.isadmin" placeholder="否">
                <gl-option label="否" value="否"></gl-option>
                <gl-option label="是" value="是"></gl-option>
                </gl-select>
            </gl-form-item>
          </gl-col>
          <gl-col :span="24">
            <gl-form-item label="所属部门" prop="departName">
                <gl-select v-model="userManageForm.departName" placeholder="请选择">
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
            <gl-form-item label="角色选项" prop="roles">
                <gl-checkbox-group v-model="userManageForm.roles">
                    <gl-checkbox label="诺威达-艺展-系统日志上报"></gl-checkbox>
                    <gl-checkbox label="盗抢险"></gl-checkbox>
                    <gl-checkbox label="研发工具-增量"></gl-checkbox>
                    <gl-checkbox label="精品分期0329角色"></gl-checkbox>
                    <gl-checkbox label="好车主"></gl-checkbox>
                    <gl-checkbox label="云商分润"></gl-checkbox>
                    <gl-checkbox label="营销系统"></gl-checkbox>
                    <gl-checkbox label="GPS后台角色控制"></gl-checkbox>
                    <gl-checkbox label="外场测试"></gl-checkbox>
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
export default {
  name: 'UserCreate',
  props: {
    dialogFormVisible: Boolean,
    editUser: Object
  },
  watch: {
    dialogFormVisible(val) {
      !val && this.$refs['userManageForm'].resetFields()
    },
    editUser(val) {
      if (val) {
        this.userManageForm = val
      }
      console.log(this.userManageForm)
    }
  },
  data() {
    return {
      tel: '[ 1, /[34578]/, /\d/{9}]',
      userManageForm: {
        username: '',
        realname: '',
        password: '',
        mobile: '',
        registeredIP: '',
        email: '',
        state: '',
        isadmin: '',
        departName: '',
        roles: [],
        options: [{
          value: '选项1',
          label: '总经办'
        }, {
          value: '选项2',
          label: '研发中心-网络软件部'
        }]
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入用户真实名字', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { length: 11, message: '长度为11个字符', trigger: 'blur' }
        ]
        // registeredIP: [
        //   { required: true, message: '请输入注册IP', trigger: 'blur' },
        //   { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        // ],
        // email: [
        //   { required: true, message: '请输入邮箱', trigger: 'blur' },
        //   { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        // ]
      }
    }
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        const userData = this.$deep_clone(this.userManageForm)
        const isflagId = userData.id
        if (valid) {
          this.$emit('userFormData', isflagId, userData)
        } else {
          return false
        }
      })
    },
    cancelForm() {
      this.$emit('userFormData')
    }
  }
}
</script>
<style scoped>
.el-checkbox+.el-checkbox {
  margin-left: 0!important;
}
</style>

<style>

</style>
