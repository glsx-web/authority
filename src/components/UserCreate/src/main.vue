<template>
    <gl-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="cancelForm" >
        <gl-form :model="userManageForm" :rules="rules" ref="userManageForm" label-width="100px">
          <el-col :span="12">
            <gl-form-item label="用户名" prop="username">
                <gl-input type="text" name="username" data-vv-as="用户名" v-validate="'required'" v-model="userManageForm.username" placeholder="请输入用户名" clearable></gl-input>
                <span v-show="errorBags.has('username')" class="error">{{ errorBags.first('username') }}</span>
            </gl-form-item>
          </el-col>
          <gl-col :span="12">
            <gl-form-item label="真实姓名" prop="realname">
                <gl-input type="text" name="realname" data-vv-as="真实姓名" v-validate="'required'" v-model="userManageForm.realname" placeholder="请输入用户真实名字" clearable></gl-input>
                <span v-show="errorBags.has('realname')" class="error">{{ errorBags.first('realname') }}</span>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="密码" prop="password" 
            :rules="[{ required: !userManageForm.id }]" >
                <gl-input type='password' name="password" data-vv-as="密码" v-validate="!userManageForm.id? 'required': ''" v-model="userManageForm.password" :placeholder='placeholder' clearable></gl-input>
                <span v-show="errorBags.has('password')" class="error">{{ errorBags.first('password') }}</span>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="手机号码" prop="mobile">
              <gl-masked type="text" name="mobile" data-vv-as="手机号码" v-validate="'required|length:11'" placeholder="请输入手机号码" v-model="userManageForm.mobile" :mask="[ 1, /[34578]/, /\d/, /\d/, /\d/,/\d/, /\d/, /\d/,/\d/, /\d/, /\d/]" clearable></gl-masked>
              <span v-show="errorBags.has('mobile')" class="error">{{ errorBags.first('mobile') }}</span>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
            <gl-form-item label="注册IP" prop="joinip">
              <gl-masked name="joinip" v-validate="'required'" data-vv-as="注册IP" v-model="userManageForm.joinip" ip clearable></gl-masked>
              <span v-show="errorBags.has('joinip')" class="error">{{ errorBags.first('joinip') }}</span>
            </gl-form-item>
          </gl-col>
          <gl-col :span="12">
              <gl-form-item prop="email" label="邮箱">
                <gl-input type="text" name="email" data-vv-as="邮箱" v-model='userManageForm.email' placeholder="请输入邮箱地址" v-validate="'required|email'" clearable></gl-input>
                <span v-show="errorBags.has('email')" class="error">{{ errorBags.first('email') }}</span>
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
            <gl-form-item label="所属部门" 
            prop="departName">
              <gl-input-tree name="departName" data-vv-as="所属部门" v-validate="'required'" :data='userManageForm.departList' :props="props" :treeStyle='{ maxHeight: "160px" }' @node-click='clickDepart' v-model="userManageForm.departName" />
              <span v-show="errorBags.has('departName')" class="error">{{ errorBags.first('departName') }}</span>
            </gl-form-item>
          </gl-col>
          <gl-col :span="24">
            <gl-form-item  label="角色选项" 
            prop="roles" :key="key">
                <gl-checkbox-group name="roles" data-vv-as="角色选项" v-validate="'required'"  class="height" v-model="userManageForm.roles" @change="handleCheckedChange">
                  <gl-checkbox v-for="item in userManageForm.roleList" :key="item.id"  :label='item.id'>{{item.roleName}}</gl-checkbox>
                </gl-checkbox-group>
                <span v-show="errorBags.has('roles')" class="error">{{ errorBags.first('roles') }}</span>
            </gl-form-item>
          </gl-col>
      </gl-form>
      <div slot="footer" class="dialog-footer">
          <gl-button type="primary" :loading="loading" @click="submitForm">提 交</gl-button>
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
    isEdit: Boolean,
    loading: Boolean
  },
  components: {
    userForm
  },
  watch: {
    dialogFormVisible(val) {
      this.key = Date.now()
      !val && this.$validator.errors.clear()
    },
    'userManageForm.id'(val) {
      this.placeholder = val ? '不填为不修改' : '请输入密码'
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
      placeholder: '请输入密码',
      defaultExpandAll: true,
      val: '',
      rules: {
        username: [
          { required: true }
        ],
        realname: [
          { required: true }
        ],
        mobile: [
          { required: true }
        ],
        joinip: [
          { required: true }
        ],
        email: [
          { required: true }
        ],
        departName: [
          { required: true }
        ],
        roles: [
          { required: true }
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
    submitForm() {
      this.$validator.validateAll().then((result) => {
      // this.$refs[formName].validate(valid => {
        this.userData = this.$deep_clone(this.userManageForm)
        // 如果密码为null 就不传密码的值
        !this.userData.password && delete userForm.password
        delete this.userData.createTime
        delete this.userData.updateTime
        delete this.userData.roleList
        delete this.userData.departList
        if (!this.userManageForm.roles) {
          this.userData.roles = this.val
        } else {
          this.userData.roles = this.userManageForm.roles.join(',')
        }
        if (result) {
          this.$emit('userFormData', this.isEdit, this.userData)
        } else {
          return false
        }
      })
    },
    cancelForm() {
      this.$emit('userFormData')
      // this.$validator.errors.clear()
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
