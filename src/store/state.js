import { loadToken, loadTimestamp, loadUid } from 'common/js/cache'

const state = {
  token: loadToken(),
  timestamp: loadTimestamp(),
  uid: loadUid(),
  userList: [],
  user: {}
}

export default state
