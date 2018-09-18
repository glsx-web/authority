<template>
  <div class="tree" :style="treeStyle">
    <gl-tree ref='tree' highlight-current :data='data' :show-checkbox='showCheckbox' node-key='id' :props='props' :default-expand-all='defaultExpandAll' @check='check' @node-click='nodeClick'></gl-tree>
  </div>
</template>

<script>
import { findMenuTree } from '@/api/api'
function fn(data, pid) {
  var result = []
  let temp = null
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
export default {
  name: 'Tree',
  data() {
    return {
      // data: this.$get_session_config().resources || this.$get_session_config(),
      data: [Array, Function],
      props: {
        // label: 'title'
        label: 'text'
      }
    }
  },
  props: {
    showCheckbox: Boolean,
    value: null,
    defaultExpandAll: Boolean,
    treeStyle: null
  },
  mounted() {
    findMenuTree.req().then(res => {
      // this.data = res
      // this.data = this.$get_menus(res, '#', 'parent')
      this.data = fn(res, '#')
      // console.log(this.data)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    nodeClick(data, treeData, vue) {
      this.$emit('node-click', data, treeData, vue, this.props)
    },
    check(data, treeData) {
      this.$emit('input', { data, treeData })
    }
  }
}
</script>
<style scoped>
.tree {
    height: 550px;
    overflow-y: scroll;
}
</style>
