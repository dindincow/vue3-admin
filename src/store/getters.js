
import variables from '@/styles/variables.module.scss'
const getters = {
  token: state => state.user.token,
  hasUserInfo: state => { return JSON.stringify(state.user.userInfo) !== '{}' },
  userInfo: state => state.user.userInfo,
  cssVar: state => variables
}
export default getters
