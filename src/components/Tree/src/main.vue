<template>
  <div class="tree" :style="treeStyle">
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
      props: {
        label: 'text'
      }
    }
  },
  props: {
    showCheckbox: Boolean,
    value: null,
    defaultExpandAll: Boolean,
    treeStyle: null,
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    isDepart: Boolean
  },
  watch: {
    defaultCheckedKeys(val) {
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
      !this.isDepart
        ? findMenuTree.req().then(res => {
          this.data = fn(res, '#')
        }).catch(err => {
          console.log(err)
        })
        : findDepartTree.req().then(res => {
          this.data = fn(res, '#')
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
