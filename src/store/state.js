import { loadToken, loadTimestamp, loadUid } from 'common/js/cache'

const state = {
  token: loadToken(),
  timestamp: loadTimestamp(),
  uid: loadUid(),
  userList: [],
  user: {},
  courseList: [],
  course: {},
  bikeList: [],
  bike: {},
  datingList: [],
  dating: {},
  coachList: [],
  coach: {}
}

export default state
