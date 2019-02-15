import {service} from '../axios'

export function AccountLogin (data) {
  return service({
    url: '/login/supplierLogin.do',
    method: 'post',
    data,
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    transformRequest: [function(data) {
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret;
    }]
  })
}
