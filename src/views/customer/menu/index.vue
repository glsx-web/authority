<template>
  <gl-row :gutter="100">
    <gl-col :span='8'>
      <left-manager :title='"菜单列表"' v-model="menuMG" :node-click='nodeClick'></left-manager>
    </gl-col>
    <gl-col :span='16'>
      <right-form :form='form' v-model="menuMG"></right-form>
    </gl-col>
  </gl-row>
</template>

<script>
import { LeftManager, RightForm } from '@/components/index'
export default {
  name: 'menuMG',
  data() {
    return {
      menuMG: {
        sublings: false,
        children: false,
        del: false,
        push: true,
        showDetails: false,
        btnTxt: '修改',
        node: null,
        props: null,
        allNode: null,
        data: [],
        form: {
          name: '',
          newName: '',
          open: '新系统',
          type: '',
          upMenu: '',
          url: '',
          router: '',
          defaultUrl: '',
          index: '',
          Show: true,
          createTime: null,
          changeTime: null
        }
      },
      form: [
        { label: '名称', value: 'name' },
        { label: '主机自定义名称', value: 'newName' },
        {
          label: '打开模式',
          value: 'open',
          type: 'select',
          options: [
            {
              value: '选项1',
              label: '本系统'
            },
            {
              value: '选项2',
              label: '新系统'
            }
          ]
        },
        {
          label: '功能类型',
          value: 'type',
          type: 'select',
          options: [
            {
              value: '选项1',
              label: '菜单路由'
            },
            {
              value: '选项2',
              label: '菜单'
            },
            {
              value: '选项3',
              label: '按钮'
            }
          ]
        },
        { label: '上级菜单', value: 'upMenu', disabled: true },
        { label: '菜单路径', value: 'url', disabled: true },
        { label: '路由', value: 'router' },
        { label: '基础路径', value: 'defaultUrl' },
        { label: '排序', value: 'index' },
        { label: '是否隐藏', value: 'Show', type: 'switch' },
        { label: '创建时间', value: 'createTime', disabled: true },
        { label: '修改时间', value: 'changeTime', disabled: true }
      ]
    }
  },
  components: {
    LeftManager,
    RightForm
  },
  methods: {
    nodeClick(data, node, that, props) {
      this.menuMG.showDetails = true
      if (node.level === 1) this.menuMG.data = node.parent.data
      this.menuMG.btnTxt = '修改'
      this.menuMG.node = node
      this.menuMG.allNode = data
      this.menuMG.props = props
      this.menuMG.sublings = false
      this.menuMG.children = false
      this.menuMG.del = true
      this.menuMG.push = false
      this.menuMG.form.name = data[props.label]
      this.menuMG.form.upMenu = node.level === 1 ? '顶级菜单' : node.parent.data[props.label]
      this.menuMG.form.defaultUrl = data.path
      this.menuMG.form.index = node.data.id
      this.menuMG.form.createTime = data.createTime
      this.menuMG.form.changeTime = data.changeTime
    }
  }
}
</script>