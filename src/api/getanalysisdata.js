import { service } from '@/utils/request'
import { service2 } from '@/utils/request'

export function getAnalysisData(startTime, endTime) {
    return service({
        url: '/cloud/dataplatform/v1/miniapp/dashboard',
        method: 'get',
        params: {
            startTime,
            endTime
        }
    })
}

/**
 * [getRecommemndDocNum 推荐孕妈医生数]
 * @param  {data} params [需要传递的参数]
 * @return {object}        [promise对象]
 */
export function getRecommemndDocNum(params) {
  return service2({
    url: '/cloud/dataplatform/v1/doctor/recommendPregnantMothers',
    method: 'get',
    params
  })
}
/**
 * [getNewQrcodeNum 新生成二维码数]
 * @param  {data} params [需要传递的参数]
 * @return {object}        [promise对象]
 */
export function getNewQrcodeNum(params) {
  return service2({
    url: '/cloud/dataplatform/v1/doctor/newQrcodeDoctors',
    method: 'get',
    params
  })
}
/**
 * [setCardMomNum 推荐并建卡医生数]
 * @param {data} params [需要传递的参数]
 * @return {object}        [promise对象]
 */
export function setCardDoctorNum(params) {
  return service2({
    url: '/cloud/dataplatform/v1/doctor/buildCardDoctors',
    method: 'get',
    params
  })
}
/**
 * [exportData 导出数据]
 * @param  {url} type   [url地址]
 */
export function exportData(type) {
	window.location.href = process.env.BASE_API2
	+'/cloud/dataplatform/v1/doctor/'+type;
}