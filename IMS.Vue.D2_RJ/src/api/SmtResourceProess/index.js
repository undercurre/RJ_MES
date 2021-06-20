import request from '@/plugin/axios'

// 获取最新批次号
export function GetBatchNo () {
  return request.get('SmtSolderpasteBatchmapping/GetBatchNo')
}

// 根据查询条件查询冰箱物理位置
export function GetLoction (para) {
  return request.get('SmtSolderpasteBatchmapping/GetLoction', {
    params: {
      para
    }
  })
}

// 通过批次号获取辅料详细信息
export function GetBatchDeatil (bathNo) {
  return request.get('SmtSolderpasteBatchmapping/GetBatchDeatil', {
    params: {
      bathNo
    }
  })
}

// 新增冷藏资料信息
export function AddResource (data) {
  return request.post('SmtSolderpasteBatchmapping/AddResource', data)
}

// 获取辅料当前的作业
export function GetResourceRuncardView (reelCode) {
  return request.get('SmtSolderpasteBatchmapping/GetResourceRuncardView', {
    params: {
      reelCode
    }
  })
}

// 获取辅料制程
export function GetResourceRouteOperationView (resourceId) {
  return request.get('SmtSolderpasteBatchmapping/GetResourceRouteOperationView', {
    params: {
      resourceId
    }
  })
}

// 获取辅料历史的作业记录
export function GetResourceRuncardLogView (reelCode) {
  return request.get('SmtSolderpasteBatchmapping/GetResourceRuncardLogView', {
    params: {
      reelCode
    }
  })
}

// 处理辅料逻辑
export function ProcessResourceRuncard (data) {
  return request.post('SmtSolderpasteBatchmapping/ProcessResourceRuncard', data)
}

// 提交辅料报废操作操作
export function ProcessResourceGiveOut (data) {
  return request.post('SmtSolderpasteBatchmapping/ProcessResourceGiveOut', data)
}

// 提交辅料用完操作
export function ProcessResourceFinish (data) {
  return request.post('SmtSolderpasteBatchmapping/ProcessResourceFinish', data)
}

// 解析条码
export function GetReelCode (reelStr) {
  return request.get('ImsReel/GetReelCode', {
    params: {
      reelStr
    }
  })
}

// 通过冰箱的位置获取存储批次信息
export function GetBatchByLoc (loc) {
  return request.get('SmtSolderpasteBatchmapping/GetBatchByLoc', {
    params: {
      loc
    }
  })
}

// 查询物料条码详细信息
export function GetReelInfoViewModel (reelCode) {
  return request.get('ImsReel/GetReelInfoViewModel', {
    params: {
      reelCode
    }
  })
}
