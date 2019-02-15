import { service } from '../axios'
import axios from 'axios'

export function getGoodsOffer(data) {
    return service({
        url: '/supplier/selectGoodsOffer.do',
        method: 'post',
        contentType: 'application/json',
        data
    })
}

export function addGoodsOffer(data) {
    return service({
        url: '/supplier/insertGoodsOffer.do',
        method: 'post',
        data
    })
}

//**********************删除 */
export function deleGoodsOffer(data) {
    return service({
        url: '/platform/delePlatGoodsOffer.do',
        method: 'post',
        contentType : 'application/x-www-form-urlencoded;charset=UTF-8',
        transformRequest : [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret;
        }],
        data
    })
}

export function updateGoodsOffer(data) {
    return service({
        url: '/supplier/updateGoodsOffer.do',
        method: 'post',
        data
    })
}



export function exportGoodsOffer(data) {
    let url = window.baseURL + "/supplier/excelExport.do?" + data
    window.open(url)
}


export function importGoodsOffer(data) {
    return service({
        url: '/supplier/excelImport.do',
        contentType: 'multipart/form-data;charset=UTF-8',
        method: 'post',
        data
    })
}





export const categoryData = (data) => {
    return service({
        url: '/supplier/selectCategroy.do',
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

//查询品牌
export const brandData = (data) => {
    return service({
        url: '/supplier/selectOfferBrand.do',
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

//上传图片
export const fileLoad = (data) => {
    return axios({
        url: window.ossAddress,
        method: 'post',
        data,
        processData: false,// 不要去处理发送的数据
        contentType: false, // 不要去设置Content-Type请求头
    })
  }
