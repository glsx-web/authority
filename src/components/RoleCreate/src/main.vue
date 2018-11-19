<!-- createRoleComponent -->
<template>
  <gl-dialog :title="title" :visible.sync="createVisible" :before-close="handleCreateCancel">
    <gl-form :model="createRuleForm" :rules="createRules" ref="createRuleForm" label-width="100px">
      <gl-form-item label="角色名称：" prop="roleName">
        <gl-input name="roleName" 
                  data-vv-as="角色名称" 
                  v-validate="'required|uniqueName'" 
                  v-model="createRuleForm.roleName" clearable></gl-input>
        <span v-show="errorBags.has('roleName')" class="error">{{ errorBags.first('roleName') }}</span>
      </gl-form-item>
      <gl-form-item label="角色描述：" prop="description">
        <gl-input name="description" 
                  data-vv-as="角色描述" 
                  v-validate="'required|max:200'" 
                  v-model="createRuleForm.description" 
                  type="textarea" 
                  :rows="3" clearable></gl-input>
        <span v-show="errorBags.has('description')" class="error">{{ errorBags.first('description') }}</span>
      </gl-form-item>
      <gl-form-item>
        <span :class="numberErr? 'err': false" style="position:absolute; right:35px; top:-20px;">{{createRuleForm.description.length}}</span>
        <span style="position:absolute; right:5px; top:-20px;">/200</span>
      </gl-form-item>
      <gl-form-item label="所属部门：" 
      prop="departName">
        <gl-input-tree 
          :data='departList' 
          :props="props" 
          :treeStyle='{ maxHeight: "160px" }' 
          @node-click='clickDepart' 
          name="departName"
          v-validate="'required'"
          data-vv-as="所属部门"
          v-model="createRuleForm.departName" />
        <span v-show="errorBags.has('departName')" class="error">{{ errorBags.first('departName') }}</span>
      </gl-form-item>
      <gl-form-item label="菜单选项：" 
      prop="rights">
        <tree  
          ref='tree' 
          name="rights"
          v-validate="'required'"
          data-vv-as="菜单选项"
          v-model="createRuleForm.rights" 
          :show-checkbox="show_checkbox" 
          :defaultExpandAll="defaultExpandAll" 
          :defaultCheckedKeys="defaultCheckedKeys" 
          @input="getMenuOption" 
          style="height:160px;overflow-y: auto;" 
          :keyFresh="keyFresh">
        </tree>
        <span v-show="errorBags.has('rights')" class="error">{{ errorBags.first('rights') }}</span>
      </gl-form-item>
    </gl-form>
    <div slot="footer" class="dialog-footer">
      <gl-button type="primary" :loading="loading" @click="handleCreateSubmit('createRuleForm')">提交</gl-button>
      <gl-button @click="handleCreateCancel">取消</gl-button>
    </div>
  </gl-dialog>
</template>

<script>
import { isRoleNameExit } from '@/api/api'
export default {
  name: 'RoleCreate',
  props: {
    createVisible: Boolean,
    createRuleForm: Object,
    flagCOrE: [Boolean, Array, Function],
    defaultCheckedKeys: Array,
    departList: Array,
    loading: Boolean
  },
  watch: {
    createVisible(val) {
      this.$validator.errors.clear()
      this.keyFresh = val
    },
    flagCOrE(val) {
      this.title = val ? '新建角色' : '角色列表'
    },
    'createRuleForm.description.length'(val) {
      this.numberErr = val > 200 ? 1 : 0
    }
  },
  data() {
    return {
      roleName: '',
      isDepart: true,
      show_checkbox: true,
      defaultExpandAll: false,
      departName: [],
      numberErr: false,
      title: '',
      keyFresh: Boolean,
      props: {
        children: 'children',
        label: 'text'
      },
      createRules: {
        roleName: [
          { required: true }
        ],
        description: [
          { required: true }
        ],
        departName: [
          { required: true }
        ],
        rights: [
          { required: true }
        ]
      }
    }
  },
  mounted() {
    this.$valid.extend('uniqueName', {
      validate: value => {
        return new Promise((resolve, reject) => {
          if (value === this.createRuleForm.oldRoleName) {
            resolve(true)
          }
          isRoleNameExit.req({ roleName: this.createRuleForm.roleName }).then(data => {
            // 此处data返回一个布尔值，true为已存在，false为不存在
            resolve(data)
          }).catch(err => {
            console.log(err)
            resolve(false)
          })
        })
      }
    })
    this.$validator.localize('zh_CN', {
      custom: {
        roleName: {
          uniqueName: '该角色已存在'
        }
      }
    })
  },
  methods: {
    // tree-strat
    getMenuOption(params) {
      this.createRuleForm.rights = params.treeData.checkedKeys.concat(params.treeData.halfCheckedKeys)
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
    getDepartName(params) {
      this.departName.unshift(params.data.text)
      if (params.data.parent !== '#') {
        this.getDepartName(params.parent)
      } else {
        return true
      }
    },
    // tree-end
    getParams() {
      return this.$deep_clone(this.createRuleForm)
    },
    handleCreateSubmit(formName) {
      const editData = this.getParams()
      this.$validator.validateAll().then((result) => {
      // this.$refs[formName].validate((valid) => {
        if (result) {
          this.$emit('createClose', editData)
        } else {
          return false
        }
      })
    },
    handleCreateCancel() {
      this.$emit('createClose', false)
    }
  }
}
</script>
<style scoped>
.dialog-footer{
  margin-top: -40px;
}
.err {
    color: red;
}
</style>
