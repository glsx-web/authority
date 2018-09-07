import UserCreate from './src/main'

/* istanbul ignore next */
UserCreate.install = function(Vue) {
  Vue.component(UserCreate.name, UserCreate)
}
export default UserCreate
