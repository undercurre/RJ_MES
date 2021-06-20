import request from '@/plugin/axios'
// 呼叫与人员配置首页
export function getIndex () {
  return request({
    url: 'CallConfig/Index',
    method: 'get'
  })
}
// 查询所有呼叫配置
export function LoadData (query) {
  return request({
    url: 'CallConfig/LoadData',
    method: 'get',
    params: query
  })
}
// 是否激活
export function ChangeEnabled (obj) {
  return request({
    url: 'CallConfig/ChangeEnabled',
    method: 'POST',
    data: obj
  })
}

// 添加或修改视图
export function AddOrModify () {
  return request({
    url: 'CallConfig/AddOrModify',
    method: 'get'
  })
}

// 通过ID删除记录
export function DeleteOneById (query) {
  return request({
    url: 'CallConfig/DeleteOneById?id=' + query,
    method: 'post'
  })
}

// 在首页点击编辑时执行的方法（用于加载 呼叫配置 数据）
export function LoadEditPageData (query) {
  return request({
    url: 'CallConfig/LoadEditPageData?id=' + query,
    method: 'get'
  })
}

// 在首页点击编辑时执行的方法（用于加载[人员配置]数据）
export function LoadPersonListByIDAsync (query) {
  return request({
    url: 'CallConfig/LoadPersonListByIDAsync?id=' + query,
    method: 'get'
  })
}

// 查询所有人员信息
export function LoadPersonData (query) {
  return request({
    url: 'CallConfig/LoadPersonData',
    method: 'get',
    params: query
  })
}

// 添加或修改的相关操作
export function AddOrModifyServer (query) {
  return request({
    url: 'CallConfig/AddOrModifyServer',
    method: 'post',
    data: query
  })
}
