import jsonp from 'common/js/jsonp'
import {HOST} from 'common/js/config'

export function login(params) {
  const url = HOST + '/admin/login'
  return jsonp(url, params)
}
