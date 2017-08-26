import jsonp from 'common/js/jsonp'
import {HOST} from 'common/js/config'

export function list(params) {
  const url = HOST + `/v1/users`
  return jsonp(url, params)
}

export function show(params, id) {
  const url = HOST + `/v1/users/show/${id}`
  return jsonp(url, params)
}

export function create(params) {
  const url = HOST + `/v1/users/create`
  return jsonp(url, params)
}

export function remove(params, id) {
  const url = HOST + `/v1/users/remove/${id}`
  return jsonp(url, params)
}

export function edit(params, id, field) {
  const url = HOST + `/v1/users/edit/${field}/${id}`
  return jsonp(url, params)
}

export function showUsers(params) {
  const url = HOST + `/v1/users/list`
  return jsonp(url, params)
}
