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
        <gl-input
          v-else 
          v-model="value.form[i.value]" 
          :disabled="i.disabled">
        </gl-input>
        <div v-show="err && index === 0" class="err">{{errText}}</div>
      </gl-form-item>
      <gl-form-item>
        <gl-button type="primary" @click="submit">{{value.btnTxt}}</gl-button>
        <gl-button type="danger" v-show='value.del' @click="dialog = true ">删除</gl-button>
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
import { delDepartment, delMenu, editMenu, addMenu } from '@/api/api'
export default {
  name: 'rightForm',
  data() {
    return {
      dialog: false,
      err: false,
      errText: this.isDepart ? '请填写部门名称' : '请填写列表名称'
    }
  },
  props: {
    value: null,
    form: {
      type: Array,
      default: () => []
    },
    isDepart: Boolean
  },
  watch: {
    'value.form.urlName'(val) {
      if (val !== '') this.err = false
    },
    'value.form.name'(val) {
      if (val !== '') this.err = false
    }
  },
  methods: {
    getMenuObj(obj = {}) {
      for (const key in this.value.form) {
        obj[key] = this.value.form[key]
      }
      if (!this.isDepart) delete obj.name
      return obj
    },
    // 删除
    delData() {
      const obj = this.getMenuObj()
      obj.isHidden = this.value.form.isHidden === true ? 0 : 1
      this.isDepart
        ? delDepartment.req(obj).then(res => {
          this.delTip(true)
        }).catch(err => {
          console.log(err)
          this.delErrTip()
        })
        : delMenu.req(obj).then(res => {
          this.delTip(true)
        }).catch(err => {
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
      } else {
        this.$notify({
          title: '已取消',
          type: 'info'
        })
      }
      this.dialog = false
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
      if (this.value.form[this.form[0].value] !== '' && this.value.form[this.form[0].value] !== null) {
        const obj = this.getMenuObj()
        // obj.updateTime = new Date().getTime()
        obj.isHidden = this.value.form.isHidden === true ? 0 : 1
        console.log(obj)
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
          obj.parentId = treeData.id
          this.addData(obj)
        // 修改
        } else {
          // obj.createTime = this.unix(this.value.form.createTime)
          editMenu.req(obj).then(res => {
            console.log(res)
            this.Tip(true)
          }).catch(err => {
            console.log(err)
            this.Tip(false)
          })
        }
      } else {
        this.err = true
      }
    },
    unix(time) {
      time = time.substring(0, 19)
      time = time.replace(/-/g, '/')
      return new Date(time).getTime()
    },
    addData(obj) {
      // obj.createTime = new Date().getTime()
      // const objPackge = { menu: obj }
      // console.log(objPackge)
      // delete obj.createTime
      // delete obj.updateTime
      if (!this.isDepart) {
        addMenu.req(obj).then(res => {
          console.log(res)
          this.Tip(true)
        }).catch(err => {
          console.log(err)
          this.Tip(false)
        })
      }
    },
    Tip(val) {
      if (val) {
        this.$notify({
          title: '操作成功',
          type: 'success'
        })
        this.value.showDetails = false
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