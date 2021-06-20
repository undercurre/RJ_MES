/*
 * @Author: your name
 * @Date: 2020-11-23 17:25:47
 * @LastEditTime: 2021-02-24 10:06:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /IMS.Vue.D2/src/api/SmtFeeder/index.js
 */
import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request.get('SmtFeeder/Index')
}

// 查询所有 搜索按钮对应的处理也是这个方法
export function SmtFeederLoadData (query) {
  return request.get('SmtFeeder/LoadData', {
    params: query
  })
}

// 导出数据
export function ExportData (query) {
  return request.get('SmtFeeder/ExportData', {
    params: query
  })
}

// 通过ID删除记录
export function DeleteOneById (id) {
  return request.post('SmtFeeder/DeleteOneById', {
    id
  })
}
export function SaveData (data) {
  return request.post('SmtFeeder/SaveData', data)
}

// 获取飞达次数区间
export function LoadeFeederRegionData (query) {
  return request.get('SmtFeeder/LoadeFeederRegionData', {
    params: query
  })
  // return request.get('SmtFeeder/LoadeFeederRegionData')
}
// 保存飞达次数区间数据
export function SaveFeederRegionData (data) {
  return request.post('SmtFeeder/SaveFeederRegionData', data)
}
