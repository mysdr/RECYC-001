import * as types from './mutation-types'

const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_TIMESTAMP](state, timestamp) {
    state.timestamp = timestamp
  },
  [types.SET_UID](state, uid) {
    state.uid = uid
  },
  [types.SET_USER_LIST](state, users) {
    state.userList = users
  },
  [types.SET_USER](state, user) {
    state.user = user
  }
}

export default mutations
