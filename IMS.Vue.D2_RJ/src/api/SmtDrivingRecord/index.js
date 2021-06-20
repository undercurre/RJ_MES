import request from '@/plugin/axios'

export function Index (params) {
  return request.get('SmtDriving/Index', {
    params
  })
}

export function LoadData (params) {
  return request.get('SmtDriving/LoadData', {
    params
  })
}

export function AddOrModifyAsync (params) {
  return request({
    url: 'SmtDriving/AddOrModifyAsync',
    method: 'post',
    data: params
  })
}
// eslint-disable-next-line
export function LoadData_Dtl (params) {
  return request.get('SmtDriving/LoadData_Dtl', {
    params
  })
}

// eslint-disable-next-line
export function AddOrModifyAsync_Dtl (params) {
  return request({
    url: 'SmtDriving/AddOrModifyAsync_Dtl',
    method: 'post',
    data: params
  })
}

export function DeleteOneById (id) {
  return request({
    url: 'SmtDriving/DeleteOneById?id=' + id,
    method: 'post'
  })
}
// eslint-disable-next-line
export function DeleteOneById_dtl (id) {
  return request({
    url: 'SmtDriving/DeleteOneById_Dtl?id=' + id,
    method: 'post'
  })
}
