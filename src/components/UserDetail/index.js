import UserDetail from './src/main.vue'

UserDetail.install = Vue => {
  Vue.component(UserDetail.name, UserDetail)
}

export default UserDetail
