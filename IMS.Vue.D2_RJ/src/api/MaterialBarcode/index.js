import request from '@/plugin/axios'
import axios from 'axios'

// 获取供应商信息列表
export const getVendorList = (data) => {
  return request.post('ImsReel/GetVendorList', data)
}
// 获取物料信息列表
export const getImsPartList = (data) => {
  return request.post('ImsReel/GetImsPartList', data
  )
}
// 保存物料条码信息并生成打印数据
export const saveReelPrintInfo = (data) => {
  return request.post('ImsReel/SaveReelPrintInfo', data)
}

export const getCurrentPrint = (data) => {
  return axios.get('http://localhost:42737/Printer/GetCurrentPrint')
}

export const setPrintName = (data) => {
  return axios.post('http://localhost:42737/Printer/SetPrintName', data)
}

export const getPrintList = () => {
  return axios.get('http://localhost:42737/Printer/GetPrintList')
}

export const print = (data) => {
  return axios.post('http://localhost:42737/Printer/BasePrinter', data)
}
