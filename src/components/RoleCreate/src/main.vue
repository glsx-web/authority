<!-- createRoleComponent -->
<template>
  <gl-dialog :title="createOrEditTitle" :visible.sync="createVisible" :before-close="handleCreateCancel">
    <gl-form :model="createRuleForm" :rules="createRules" ref="createRuleForm" label-width="105px">
      <gl-form-item label="角色名称：" prop="roleName">
        <gl-input v-model="createRuleForm.roleName" clearable></gl-input>
      </gl-form-item>
      <gl-form-item label="角色描述：" prop="description">
        <gl-input v-model="createRuleForm.description" type="textarea" :rows="3" clearable></gl-input>
      </gl-form-item>
      <gl-form-item>
        <span style="position:absolute; right:35px; top:-20px;">{{createRuleForm.description.length}}</span>
        <span style="position:absolute; right:5px; top:-20px;">/200</span>
      </gl-form-item>
      <gl-form-item label="所属部门：" prop="departName">
        <gl-select v-model="createRuleForm.departName" placeholder="请选择">
          <gl-option label="运营平台" value="运营平台"></gl-option>
        </gl-select>
      </gl-form-item>
      <gl-form-item label="菜单选项："></gl-form-item>
    </gl-form>
    <div slot="footer" class="dialog-footer">
      <gl-button type="primary" @click="handleCreateSubmit('createRuleForm')">提交</gl-button>
      <gl-button @click="handleCreateCancel">取消</gl-button>
    </div>
  </gl-dialog>
</template>

<script>
import { roleCreateStructure } from '@/common/commonConst'
import { saveRoleList, updateRole } from '@/api/api'
export default {
  name: 'RoleCreate',
  props: {
    createOrEditTitle: String,
    createVisible: Boolean,
    roleParam: Object
  },
  watch: {
    createVisible(val) {
      !val && this.$refs['createRuleForm'].resetFields()
    },
    roleParam(val) {
      if (val !== this.createRuleForm) {
        this.createRuleForm = this.$deep_clone(val)
      }
    }
  },
  data() {
    return {
      createRuleForm: roleCreateStructure,
      createRules: {
        roleName: [
          { required: true, message: '请输入角色名称！', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述！', trigger: 'blur' },
          { max: 200, message: '字数限制在200以内！', trigger: 'blur' }
        ],
        departName: [
          { required: true, message: '请输入所属部门！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getParams() {
      return this.$deep_clone(this.createRuleForm)
    },
    // 接口
    addRole() {
      saveRoleList.req(this.getParams()).then((data) => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    updateRoleInfo() {
      updateRole.req(this.getParams()).then((data) => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 接口
    handleCreateSubmit(formName) {
      const editData = this.getParams()
      // eidt:true;create:false
      const flagEOrC = editData.id === Number
      console.log(flagEOrC)
      flagEOrC && this.addRole()
      !flagEOrC && this.updateRoleInfo()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('createClose', flagEOrC, editData)
        } else {
          return false
        }
      })
    },
    handleCreateCancel() {
      this.$emit('createClose')
    }
  }
}
</script>
<style scoped>
</style>
