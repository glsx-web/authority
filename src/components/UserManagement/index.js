import UserManagement from './src/main'

/* istanbul ignore next */
UserManagement.install = function(Vue) {
  Vue.component(UserManagement.name, UserManagement)
}
export default UserManagement
