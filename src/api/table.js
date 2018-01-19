import { service2 } from '@/utils/request'

export function getList(params) {
  return service2({
    url: '/cloud/dataplatform/v1/doctor/newQrcodeDoctors',
    method: 'get',
    params
  })
}
