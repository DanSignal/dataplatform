import { service } from '@/utils/request'

//登录接口
export function login(username, password) {
  let param = new URLSearchParams();
  param.append("loginName", username);
  param.append("password", password);
  param.append("authCode", "aa");
  param.append("randomCode", "11");
  let timeStr = new Date();
  return service({
    url: '/cloud/dataplatform/v1/user/login',
    method: 'post',
    headers: {
      'token': timeStr.getTime()
    },
    data: param
  })
}

export function getPermissing() {
  return service({
    url: '/cloud/dataplatform/v1/user/verify/getPermissions',
    method: 'post'
  })
}

export function logout() {
  return service({
    url: '/cloud/dataplatform/v1/user/exit',
    method: 'post'
  })
}

