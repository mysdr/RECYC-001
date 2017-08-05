import jsonp from 'common/js/jsonp'
import {HOST} from 'common/js/config'

export function list(params) {
  const url = HOST + `/v1/users`
  return jsonp(url, params)
}

export function show(params, id) {
  const url = HOST + `/v1/users/${id}`
  return jsonp(url, params)
}
