import jsonp from 'common/js/jsonp'
import {HOST} from 'common/js/config'

export function getToken(params) {
  const url = HOST + `/v1/utils/qiniu_token`
  return jsonp(url, params)
}
