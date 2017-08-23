import jsonp from 'common/js/jsonp'
import {HOST} from 'common/js/config'

export function list(params) {
  const url = HOST + `/v1/datings`
  return jsonp(url, params)
}

export function show(params, id) {
  const url = HOST + `/v1/datings/detail`
  return jsonp(url, params)
}

export function create(params) {
  const url = HOST + `/v1/datings/create`
  return jsonp(url, params)
}

export function remove(params, id) {
  const url = HOST + `/v1/datings/edit/${id}`
  return jsonp(url, params)
}

export function edit(params, id, field) {
  const url = HOST + `/v1/datings/edit/${field}/${id}`
  return jsonp(url, params)
}
