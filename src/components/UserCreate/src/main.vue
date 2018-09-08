<template>
    <gl-dialog title="收货地址" :visible.sync="dialogFormVisible" :before-close="cancelForm">
        <gl-form :model="userManageForm" :rules="rules" ref="userManageForm" label-width="100px">
          <el-col :span="12">
            <gl-form-item label="用户名" prop="userName">
                <gl-input v-model="userManageForm.userName" value=""></gl-input>
            </gl-form-item>
          </el-col>
          <gl-col :span="12">
            <gl-form-item label="真实姓名" prop="actualName">
                <gl-input v-model="userManageForm.actualName"></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="密码" prop="password">
                <gl-input type='password' v-model="userManageForm.password"></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="手机号码" prop="phoneNumber">
                <gl-input v-model="userManageForm.phoneNumber" 
                          prefix-icon='el-icon-mobile-phone' 
                          placeholder='请输入手机号码'></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="注册IP" prop="registeredIP">
                <gl-input v-model="userManageForm.registeredIP"></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="邮箱" prop="email">
                <gl-input v-model='userManageForm.email' placeholder='请输入电子邮箱'>
                      </gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="状态" prop="status">
                <gl-select v-model="userManageForm.status" placeholder="启用">
                <gl-option label="启用" value="启用"></gl-option>
                <gl-option label="禁用" value="禁用"></gl-option>
                </gl-select>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="管理员">
                <gl-select v-model="userManageForm.isAdministrator" placeholder="否">
                <gl-option label="否" value="否"></gl-option>
                <gl-option label="是" value="是"></gl-option>
                </gl-select>
            </gl-form-item>
          </gl-col>
          <gl-col :span="24">
            <gl-form-item label="所属部门" prop="department">
                <gl-select v-model="userManageForm.department" placeholder="请选择">
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
            <gl-form-item label="角色选项" prop="roleOptions">
                <gl-checkbox-group v-model="userManageForm.roleOptions">
                    <gl-checkbox label="test2018-03"></gl-checkbox>
                    <gl-checkbox label="复选框 B"></gl-checkbox>
                    <gl-checkbox label="复选框 C"></gl-checkbox>
                    <gl-checkbox label="禁用"></gl-checkbox>
                    <gl-checkbox label="选中且禁用"></gl-checkbox>
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
  name: 'UserForm',
  props: {
    dialogFormVisible: Boolean
  },
  watch: {
    dialogFormVisible(val) {
      !val && this.$refs['userManageForm'].resetFields()
    }
  },
  data() {
    return {
      tel: '[ 1, /[34578]/, /\d/{9}]',
      userManageForm: {
        userName: '',
        actualName: '',
        password: '',
        phoneNumber: '',
        registeredIP: '',
        email: '',
        status: '',
        isAdministrator: '',
        department: '',
        roleOptions: [],
        options: [{
          value: '选项1',
          label: '总经办'
        }, {
          value: '选项2',
          label: '研发中心-网络软件部'
        }]
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        actualName: [
          { required: true, message: '请输入用户真实名字', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ]
        // password: [
        //   { required: true, message: '请输入用户密码', trigger: 'blur' },
        //   { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        // ],
        // phoneNumber: [
        //   { required: true, message: '请输入手机号码', trigger: 'blur' },
        //   { length: 11, message: '长度为11个字符', trigger: 'blur' }
        // ],
        // registeredIP: [
        //   { required: true, message: '请输入注册IP', trigger: 'blur' },
        //   { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
        // ]
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
        if (valid) {
          this.$emit('userFormData', this.$deep_clone(this.userManageForm))
          this.message('创建角色成功', 'success')
        } else {
          return false
        }
      })
    },
    cancelForm() {
      this.$emit('userFormData')
      this.message('取消创建角色')
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
