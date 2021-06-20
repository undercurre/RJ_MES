import request from '@/plugin/axios'
// 获取下拉菜单
export function getselect () {
  return request({
    url: 'IpqaMst/Index',
    method: 'get'
  })
}
// 获取巡检列表
export function getlist (query) {
  return request({
    url: 'IpqaMst/LoadData',
    method: 'get',
    params: query
  })
}
// 获取添加和编辑的下拉菜单和值
export function AddOrModifList (query) {
  return request({
    url: 'IpqaMst/AddOrModify',
    method: 'get',
    params: query
  })
}
// 获取配置列表
export async function getIpqaConfig (query) {
  // eslint-disable-next-line no-return-await
  return await request({
    url: 'IpqaMst/GetIpqaConfig',
    method: 'get',
    params: query
  })
}

// 获取工单信息列表
export function GetWoList (query) {
  return request({
    url: 'IpqaMst/GetWoList',
    method: 'get',
    params: query
  })
}
// 获取查询明细数据
export function LoadDtlData (query) {
  return request({
    url: 'IpqaMst/LoadDtlData?mst_id=' + query,
    method: 'get'
  })
}
// 保存数据
export function savedata (query) {
  return request({
    url: 'IpqaMst/SaveData',
    method: 'post',
    data: query
  })
}
// 提交审核
export function PostToCheck (query) {
  return request({
    url: 'IpqaMst/PostToCheck',
    method: 'post',
    data: query
  })
}
// 删除
export function removes (query) {
  return request({
    url: 'IpqaMst/Delete?id=' + query,
    method: 'post'
  })
}
// 审核
export function CheckBill (query) {
  return request({
    url: 'IpqaMst/CheckBill',
    method: 'post',
    data: query
  })
}
// 拒绝
export function RejectBill (query) {
  return request({
    url: 'IpqaMst/RejectBill',
    method: 'post',
    data: query
  })
}
