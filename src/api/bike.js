import jsonp from 'common/js/jsonp'
import {HOST} from 'common/js/config'

export function list(params) {
  const url = HOST + `/v1/bike`
  return jsonp(url, params)
}

export function show(params, id) {
  const url = HOST + `/v1/bike/${id}`
  return jsonp(url, params)
}

export function create(params) {
  const url = HOST + `/v1/bike/create`
  return jsonp(url, params)
}

export function remove(params, id) {
  const url = HOST + `/v1/bike/edit/${id}`
  return jsonp(url, params)
}

export function edit(params, id, field) {
  const url = HOST + `/v1/bike/edit/${field}/${id}`
  return jsonp(url, params)
}
