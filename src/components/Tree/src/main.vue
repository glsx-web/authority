<template>
  <div class="tree" :style="treeStyle" >
     <gl-tree
      ref='tree'
      highlight-current
      :data='data'
      :show-checkbox='showCheckbox'
      node-key='id'
      :props='props'
      :default-expand-all='defaultExpandAll'
      :default-checked-keys="defaultCheckedKeys"
      @check='check'
      @node-click='nodeClick'
      v-loading="loading" 
      gl-loading-text="拼命加载中"
      gl-loading-icon="el-icon-loading"
    ></gl-tree>
  </div>
</template>

<script>
import { findMenuTree, findDepartTree } from '@/api/api'
export default {
  name: 'Tree',
  data() {
    return {
      data: null,
      loading: true,
      props: {
        label: 'text'
      }
    }
  },
  props: {
    keyFresh: [Boolean, Array, Function],
    showCheckbox: Boolean,
    value: null,
    defaultExpandAll: Boolean,
    treeStyle: null,
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    isDepart: Boolean,
    propsData: null
  },
  watch: {
    keyFresh(val) {
      // console.log(`keyFresh----------------------${this.keyFresh}`)
      // console.log(this.defaultCheckedKeys)
      val && this.loadingTree()
    },
    propsData(val) {
      this.loadingTree()
    }
  },
  methods: {
    nodeClick(data, treeData, vue) {
      this.$emit('node-click', data, treeData, vue, this.props)
    },
    check(data, treeData) {
      this.$emit('input', { data, treeData })
    },
    loadingTree() {
      !this.propsData && this.getData()
      this.propsData && (this.data = fn(this.propsData, '#'))
      // console.log(this.propsData)
      // console.log(this.data)
    },
    getData() {
      // console.log(this.defaultCheckedKeys)
      !this.isDepart
        ? findMenuTree.req().then(res => {
          // console.log(res)
          this.data = fn(res, '#')
          this.loading = false
        }).catch(err => {
          console.log(err)
        })
        : findDepartTree.req().then(res => {
          this.data = fn(res, '#')
          this.loading = false
        }).catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.loadingTree()
  }
}
function fn(data, pid) {
  var result = []
  var temp = null
  for (var i in data) {
    if (data[i].parent == pid) {
      result.push(data[i])
      temp = fn(data, data[i].id)
      // if (data[i].id === 1013 || data[i].id === 1014) {
      //   console.log(`i = ${i}`)
      //   console.log(`pid = ${pid}`)
      // }
      if (temp.length > 0) {
        data[i].children = temp
      }
    }
  }
  return result
}
</script>
<style scoped>
.tree {
    height: 550px;
    overflow-y: scroll;
}
</style>
