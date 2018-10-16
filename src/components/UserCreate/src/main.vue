<template>
    <gl-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancelForm" >
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
            <gl-form-item label="密码" prop="password" :rules="[
                { required: !userManageForm.id, message: '请输入用户密码', trigger: 'blur' }
            ]">
                <gl-input type='password' v-model="userManageForm.password" :placeholder='placeholder' clearable></gl-input>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="手机号码" prop="mobile">
              <gl-masked v-model="userManageForm.mobile" :mask="[ 1, /[34578]/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/,/\d/, /\d/, /\d/]" placeholder='请输入手机号码' clearable></gl-masked>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="注册IP" prop="joinip">
              <gl-masked v-model="userManageForm.joinip" ip placeholder='请输入注册IP' clearable></gl-masked>
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
                <gl-option label="禁用" value='0'></gl-option>
                <gl-option label="启用" value='1'></gl-option>
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
              <gl-input-tree :data='userManageForm.departList' :props="props" :treeStyle='{ maxHeight: "160px" }' @node-click='clickDepart' v-model="userManageForm.departName" />
            </gl-form-item>
          </gl-col>
          <gl-col :span="24">
            <gl-form-item  label="角色选项" prop="roles" :key="key">
                    <gl-checkbox-group class="height" v-model="userManageForm.roles" @change="handleCheckedChange">
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
    userManageForm: Object,
    isEdit: Boolean
  },
  components: {
    userForm
  },
  watch: {
    dialogFormVisible(val) {
      this.key = Date.now()
      val && console.log(this.userManageForm)
      !val && this.$refs['userManageForm'].resetFields()
    },
    'userManageForm.id'(val) {
      this.placeholder = val ? '不填为不修改' : ''
      this.title = val ? '编辑用户' : '新建用户'
    }
  },
  data() {
    return {
      key: Date.now(),
      isDepart: true,
      props: {
        children: 'children',
        label: 'text'
      },
      title: '新建用户',
      placeholder: '',
      defaultExpandAll: true,
      val: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入用户真实名字', trigger: 'blur' }
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
        ],
        roles: [
          { required: true, message: '请输入所属部门', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 部门树
    clickDepart(data, treeData, vue, props) {
      if (data.parent !== '#' || !data.children) {
        this.userManageForm.departId = data.id
        this.userManageForm.departName = data.text
        this.getDepartName(treeData)
        this.departName = []
      }
    },
    getDepartName(params) {
      this.userManageForm.departName.split().push(params.data.text)
      if (params.data.parent !== '#') {
        this.getDepartName(params.parent)
      } else {
        return true
      }
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.userData = this.$deep_clone(this.userManageForm)
        // 如果密码为null 就不传密码的值
        !this.userData.password && delete userForm.password
        delete this.userData.createTime
        delete this.userData.updateTime
        if (!this.userManageForm.roles) {
          this.userData.roles = this.val
        } else {
          this.userData.roles = this.userManageForm.roles.join(',')
        }
        if (valid) {
          this.$emit('userFormData', this.isEdit, this.userData)
        } else {
          return false
        }
      })
    },
    cancelForm() {
      this.$emit('userFormData')
    },
    handleCheckedChange(value) {
      if (!value) return
      this.val = value.join(',')
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
