import {service} from '@/axios'

//表格数据
export const IndexTable  = (data) => {
  return service({
    url: '/orders/selectStoreOrder.do',
    method: 'post',
    data
  })
}

