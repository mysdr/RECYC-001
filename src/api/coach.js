import jsonp from 'common/js/jsonp'
import {HOST} from 'common/js/config'

export function list(params) {
  const url = HOST + `/v2/coachs`
  return jsonp(url, params)
}

export function detail(params) {
  const url = HOST + `/v2/coachs/detail`
  return jsonp(url, params)
}
