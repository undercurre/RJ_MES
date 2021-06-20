/*
 * @Author: your name
 * @Date: 2020-11-23 17:25:49
 * @LastEditTime: 2021-03-05 16:57:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /IMS.Vue.D2/src/views/RunCardReport/children/index.js
 */
// 作业记录
import OperationHistory from './lib/OperationHistory'
// 不良
import DefectHistory from './lib/DefectHistory'
// 测试
import TestHistory from './lib/TestHistory'
// 零件
import ComponentHistory from './lib/ComponentHistory'
// 替换零件
import CompreplaceHistory from './lib/CompreplaceHistory'
// 制程
import RouteHistory from './lib/RouteHistory'
// 返工前零件
import ReworkcompHistory from './lib/ReworkcompHistory'
// UID
import UidHistory from './lib/UidHistory'
// 流水号替换记录
import ReplaceruncardHistory from './lib/ReplaceruncardHistory'
// 资源
import ResourceHistory from './lib/ResourceHistory'
// RMA
import RmaHistory from './lib/RmaHistory'
// 工单记录
import WoHistory from './lib/WoHistory'
// 钢网
import StEemesh from './lib/StEemesh'
// 刮刀
import ScRaper from './lib/ScrAper'

// 辅料
import ReSource from './lib/ResOurce'

// 料卷信息
import SmTsnreel from './lib/SmTsnreel'

export default {
  OperationHistory,
  DefectHistory,
  TestHistory,
  ComponentHistory,
  CompreplaceHistory,
  RouteHistory,
  ReworkcompHistory,
  UidHistory,
  ReplaceruncardHistory,
  ResourceHistory,
  RmaHistory,
  WoHistory,
  StEemesh,
  ScRaper,
  ReSource,
  SmTsnreel
}
