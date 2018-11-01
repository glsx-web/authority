<template>
  <div class="details box" v-show="value.showDetails">
    <div class="title">详情</div>
    <gl-form :model='value.form' class="content" label-width="120px" size="mini">
      <gl-form-item v-for="(i, index) in form" :key="index" :label='i.label'>
        <gl-select 
          v-if="i.type === 'select'"  
          v-model="value.form[i.value]"
          style="width:100%"
          :placeholder="i.placeholder"
          :disabled="i.disabled">
          <gl-option
            v-for="item in i.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </gl-option>
        </gl-select>
        <gl-switch 
          v-else-if="i.type === 'switch'" 
          v-model="value.form[i.value]" 
          :disabled="i.disabled">
        </gl-switch>
        <div class="el-input el-input--mini" v-else-if="i.value === 'iorder'">
          <input type="text" @input="input(i.value)" v-model="value.form[i.value]" class="el-input__inner" placeholder="请输入数字" />
        </div>
        <gl-input
          v-else 
          v-model="value.form[i.value]" 
          :disabled="i.disabled">
        </gl-input>
        <span v-show="err && index === 0" class="err">{{textName}}</span>
        <span v-show="errExist && index === 0" class="err">{{textExist}}</span>
        <span v-show="errOpenstyle && !isDepart && index === 2" class="err">请选择打开模式</span>
      </gl-form-item>
      <gl-form-item>
        <gl-button type="primary" @click="submit" :loading="subLoading">{{value.btnTxt}}</gl-button>
        <gl-button type="danger" v-show='value.del' @click="dialog = true " :loading="delLoading">删除</gl-button>
        <gl-button @click='value.showDetails = false' style="float:right">取消</gl-button>
      </gl-form-item>
    </gl-form>
    <gl-dialog
        title="提示"
        :visible.sync="dialog"
        width="30%"
        center>
        <div style="text-align:center">确定是否要删除</div>
        <span slot="footer">
            <gl-button @click="delTip(false)">取 消</gl-button>
            <gl-button type="primary" @click="delData">确 定</gl-button>
        </span>
    </gl-dialog>
  </div>
</template>
<script type='text/ecmascript-6'>
import { delDepartment, delMenu, editMenu, addMenu, updateDepartment } from '@/api/api'
import notice from '@/common/notice'
const reg = new RegExp(/^[0-9]*$/)
export default {
  name: 'rightForm',
  data() {
    return {
      dialog: false,
      err: false,
      textName: this.isDepart ? '请填写部门名称' : '请填写列表名称',
      errExist: false,
      textExist: '',
      errOpenstyle: false,
      errIorder: false,
      textType: '请填写数字',
      menu: '',
      subLoading: false,
      delLoading: false
    }
  },
  mounted() {
    this.eventBus.$on('update', val => {
      this.menu = val
    })
  },
  props: {
    value: null,
    form: {
      type: Array,
      default: () => []
    },
    isDepart: Boolean,
    eventBus: Object
  },
  watch: {
    'value.showDetails'(val) {
      this.err = false
      this.errOpenstyle = false
    },
    'value.form.urlName'(val) {
      if (val !== '') this.nameTip()
    },
    'value.form.openStyle'(val) {
      if (val !== null) this.openStyleTip()
    },
    'value.form.name'(val) {
      if (val !== '') this.nameTip()
    }
  },
  methods: {
    input(val) {
      if (!reg.test(this.value.form[val])) {
        this.value.form[val] = ''
      }
    },
    nameTip() {
      this.err = false
      this.errExist = false
      this.textExist = ''
    },
    openStyleTip() {
      this.errOpenstyle = false
      this.openText = ''
    },
    nameExitTip(err) {
      this.errExist = true
      this.textExist = err
    },
    getMenuObj(obj = {}) {
      for (const key in this.value.form) {
        obj[key] = this.value.form[key]
      }
      if (!this.isDepart) delete obj.name
      delete obj.createTime
      delete obj.updateTime
      return obj
    },
    // 接口调用-start
    addOrEditDepart(params) {
      updateDepartment.req(params).then(res => {
        this.subLoading = false
        this.Tip(true)
      }).catch(err => {
        this.subLoading = false
        notice.errorTips(err)
      })
    },
    // 接口调用-end
    // 删除
    delData() {
      this.delLoading = true
      const obj = this.getMenuObj()
      obj.isHidden = this.value.form.isHidden === true ? 0 : 1
      this.dialog = false
      this.isDepart
        ? delDepartment.req(obj).then(res => {
          this.delLoading = false
          this.delTip(true)
        }).catch(err => {
          this.delLoading = false
          console.log(err)
          this.delErrTip()
        })
        : delMenu.req({ menuId: obj.id }).then(res => {
          this.delLoading = false
          this.delTip(true)
        }).catch(err => {
          this.delLoading = false
          console.log(err)
          this.delErrTip()
        })
    },
    delTip(val) {
      if (val) {
        const parent = this.value.node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === this.value.data.id)
        children.splice(index, 1)
        this.$notify({
          title: '删除成功',
          type: 'success'
        })
        this.value.showDetails = false
        this.value.updateTree = !this.value.updateTree
      }
    },
    delErrTip() {
      this.$notify({
        title: '删除失败',
        type: 'error'
      })
      this.dialog = false
    },
    // 保存修改
    submit() {
      const treeData = this.value.allNode
      if (this.value.form[this.form[0].value] !== '' && this.value.form[this.form[0].value] !== null && (this.value.form[this.form[2].value] !== null || this.isDepart)) {
        const obj = this.getMenuObj()
        this.subLoading = true
        obj.isHidden = this.value.form.isHidden === true ? 0 : 1
        // 添加同级
        if (this.value.sublings) {
          if (treeData.parent === '#') {
            obj.parentId = 0
          } else {
            obj.parentId = treeData.parent
          }
          this.addData(obj)
        // 添加子级
        } else if (this.value.children) {
          obj.grade = this.menu.grade + 1
          obj.parentId = treeData.id
          this.addData(obj)
        // 修改
        } else {
          if (!this.isDepart) {
            editMenu.req(obj).then(res => {
              this.subLoading = false
              this.Tip(true)
            }).catch(err => {
              console.log(err)
              this.subLoading = false
              this.Tip(false)
            })
          } else {
            this.subLoading = true
            this.addOrEditDepart(obj)
          }
        }
      }
      if (this.value.form[this.form[0].value] === '' || this.value.form[this.form[0].value] === null) {
        this.err = true
      }
      if (this.value.form[this.form[2].value] === null && !this.isDepart) {
        this.errOpenstyle = true
      }
    },
    unix(time) {
      time = time.substring(0, 19)
      time = time.replace(/-/g, '/')
      return new Date(time).getTime()
    },
    addData(obj) {
      if (!this.isDepart) {
        addMenu.req(obj).then(res => {
          this.subLoading = false
          this.Tip(true)
        }).catch(err => {
          this.subLoading = false
          console.log(err)
          if (err === '菜单名已存在') {
            this.nameExitTip(err)
          } else {
            notice.errorTips(err)
          }
        })
      } else {
        this.errIorder = true
        this.addOrEditDepart(obj)
      }
    },
    Tip(val) {
      if (val) {
        this.$notify({
          title: '操作成功',
          type: 'success'
        })
        this.value.showDetails = false
        this.value.updateTree = !this.value.updateTree
      } else {
        this.$notify({
          title: '操作失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
  .content{
    padding: 15px;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
  .err{
    color: red;
  }
</style>