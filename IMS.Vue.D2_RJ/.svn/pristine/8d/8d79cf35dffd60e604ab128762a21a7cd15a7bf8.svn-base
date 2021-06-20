<template>
  <div class="TransitCode">
    <div class="container-fluid"
         :class="{ huise: !StationID || dialogStation && !WoNoBer || dialogWoNo}">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="5"
                style="display: flex;justify-content: end;align-items: flex-end;height: 100%;font-size: 16px;line-height: 24px;">
          <div style="text-align: left;">
            <p style="font-size: 20px;margin-bottom: 10px;">{{ nowDate }}</p>
            <p>{{nowTime}}</p>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="kanban-title-panel">{{ StationName }}</div>
          <div class="kanban-title-right"></div>
        </el-col>
        <el-col :span="5"
                style="display: flex;justify-content: flex-end;height: 100%;font-size: 16px;line-height: 24px;">
          <div class="kanban-title-tab"
               style="padding-top: 10px;">
            <span @click="ESOPPreview">E-SOP</span>
            <span @click="WoNoClick">{{$t("CollectProducts._1")}}</span>
            <span @click="StationClick">{{$t("CollectProducts._2")}}</span>
            <span @click="$options.fs.fullScreen.handleFullScreen(this)">{{ $t("smt.fs") }}</span>
          </div>
        </el-col>
      </el-row>
      <!-- 主体 start -->
      <div style="height: calc(100vh - 70px - 67px);">
        <el-row>
          <el-col :span="6">
            <!-- 数据录入 -->
            <div class="block-center">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="block-center-content">
                  <div style="font-size: 20px;">{{$t("CollectProducts._3")}}</div>
                  <el-form ref="form"
                           label-width="80px"
                           :show-message="false"
                           class="collstat-form">
                    <el-form-item class="collstat-form-item"
                                  :label="$t('CollectProducts._4')">
                      <div style="display: flex;">
                        <el-input v-model="InputData"
                                  clearable
                                  @keyup.enter.native="enterChange"
                                  :placeholder="$t('CollectProducts._5')" />
                        <el-button type="primary"
                                   @click="EmptyClick">{{$t('SfcsProductPallet.clean')}}</el-button>
                      </div>
                    </el-form-item>
                    <el-form-item :label="$t('CollectProducts._6')"
                                  class="collstat-form-item">
                      <el-input v-model="OldValue"
                                disabled
                                placeholder=" " />
                    </el-form-item>
                    <el-form-item :label="$t('CollectProducts._54')+ '：'"
                                  class="collstat-form-item">
                      <el-input v-model="COLLECT_QTY"
                                type="Number"
                                placfeholder=" " />
                    </el-form-item>
                    <el-form-item :label="$t('CollectProducts._55')+ '：'"
                                  class="collstat-form-item">
                      <el-input v-model="COLLECTION_QTY"
                                disabled
                                placeholder=" " />
                    </el-form-item>
                    <el-form-item :label="$t('CollectProducts._56')+ '：'"
                                  class="collstat-form-item">
                      <el-checkbox v-model="PRINTCODE"></el-checkbox>
                    </el-form-item>
                  </el-form>
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 结果信息 -->
            <div class="block">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <div class="block-center-content outcome">
                  <div style="margin-bottom: 10px;font-size: 20px;">{{$t('CollectProducts._41')}}</div>
                  <div class="result"
                       v-if="ResultRun === 0">{{InfRoute}}</div>
                  <div class="result"
                       v-if="ResultRun === 1"
                       style="background: #f9b72d;">{{InfRoute}}</div>
                  <div v-if="ResultRun === 2"
                       class="result"
                       style="background: #EF5757;">{{InfRoute}}</div>
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="12"
                  style="padding-left: 15px;box-sizing: border-box">
            <!-- 产品数据 -->
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <!-- 产品数据 -->
                <div class="block-center-content">
                  <div class="center-content-product">
                    <span>{{$t('CollectProducts._8')}}</span>
                  </div>
                  <el-row :gutter="24"
                          style="height: 85%;">
                    <el-col :span="12"
                            style="padding-top: 22px;">
                      {{$t('CollectProducts._9')}}：{{ProductData.Part_No}}
                    </el-col>
                    <el-col :span="12"
                            style="padding-top: 12px;">
                      {{$t('CollectProducts._10')}}：{{ProductData.Wo_No}}
                    </el-col>
                    <el-col :span="24"
                            style="padding-top: 12px;">
                      {{$t('CollectProducts._11')}}：{{ProductData.Name}}
                    </el-col>
                    <el-col :span="24"
                            style="padding-top: 12px;">
                      {{$t('CollectProducts._12')}}：{{ProductData.Description}}
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center">
                        <span>{{ProductData.Target_Qty}}</span>
                        {{$t('CollectProducts._13')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center product-col-red">
                        <span>{{ProductData.Pending_Qty}}</span>
                        {{$t('CollectProducts._14')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center">
                        <span>{{ProductData.Completed_Qty}}</span>
                        {{$t('CollectProducts._15')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center product-col-green">
                        <span>{{ProductData.Pass_Qty}}</span>
                        {{$t('CollectProducts._16')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center product-col-red">
                        <span>{{ProductData.Fail_Qty}}</span>
                        {{$t('CollectProducts._17')}}
                      </div>
                    </el-col>
                    <el-col :span="8"
                            class="product-col product-row-col">
                      <div class="product-col-center">
                        <span>{{ProductData.AchievementRate}}
                          <span v-if="ProductData.AchievementRate">%</span>
                        </span>
                        {{$t('CollectProducts._18')}}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <!-- <div id="RestPcbCountBar"
                     style="height:100%;" /> -->
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!--收集记录 -->
            <div class="block">
              <div class="kanban-hour-yield-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <div id="swiper1"
                     class="swiper-container"
                     style="height:100%;padding:0px;">
                  <div class="block-center-content">
                    <div class="center-content-product">
                      <span>{{$t('CollectProducts._19')}}</span>
                    </div>
                    <div id="TodayWorkOrderSummary"
                         style="width: 100%;height: 82%;overflow: auto;">
                      <table class="ListTable table table-striped"
                             style="font-size:14px">
                        <thead>
                          <tr>
                            <td style="width:46%">{{$t("CollectProducts._20")}}</td>
                            <td style="width:27%">{{$t("CollectProducts._21")}}</td>
                            <td style="width:27%">{{$t("CollectProducts._22")}}</td>
                            <td style="width:46%">{{$t("CollectProducts._23")}}</td>
                            <td style="width:27%">{{$t("CollectProducts._24")}}</td>
                            <td style="width:27%">{{$t("CollectProducts._25")}}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in tableData"
                              :key="index">
                            <th>{{item.OBJECT_NAME}}</th>
                            <th>{{item.NEED_ASSEMBLY_QTY}}</th>
                            <th>{{item.COLLECTED_QTY}}</th>
                            <th>{{item.DATA_FORMAT}}</th>
                            <th>{{item.ODM_OBJECT_PN}}</th>
                            <th>{{item.FIXED_VALUE}}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="6"
                  style="padding-left: 15px;box-sizing: border-box">
            <!-- 信息汇总 -->
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <div class="block-center-content">
                  <span style="font-size: 20px;">{{$t("CollectProducts._26")}}</span>
                  <div class="content-history">
                    <div class="content-history-list"
                         v-for="(item,index) in HistoricalData"
                         :key="index">
                      <div>SN：{{item.SN_No}}</div>
                      <div>{{$t("CollectProducts._27")}}：
                        <span v-if="item.Operation_Status == 'PASS'"
                              style="color:#179415">{{item.Operation_Status}}</span>
                        <span v-else-if="item.Operation_Status == 'FAIL'"
                              style="color:#EF5757">{{item.Operation_Status}}</span>
                        <span v-else>{{item.Operation_Status}}</span>
                      </div>
                      <div>{{$t("CollectProducts._28")}}：

                        {{item.Operation_Time}}
                      </div>
                      <div>{{$t("CollectProducts._29")}}：{{item.Operator}}</div>
                    </div>
                  </div>

                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <div class="block-information"><i class="el-icon-warning"></i>&nbsp;预警信息</div>
                <el-card v-show="WarningList.length !==0"
                         class="box-card no-shadow"
                         ref="yujingxinxi"
                         style="height: 80%;padding-top: 0px">
                  <div class="list"
                       style="height: 100%;overflow: auto">
                    <div class="item-x"
                         v-for="item in WarningList"
                         :key="item.ID"
                         @click="toWarning(item)">
                      <div style="display: flex;align-items: center;width: 50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        <el-tag effect="dark"
                                type="danger"
                                size="mini"
                                style="margin-right: 5px;"
                                v-if="item.STATUS === 0">{{ $t('homePage._9') }}</el-tag>
                        <el-tag effect="dark"
                                type="warning"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 1">{{ $t('homePage._10') }}</el-tag>
                        <el-tag effect="dark"
                                type="success"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 2">{{ $t('homePage._11') }}</el-tag>
                        <el-tag effect="dark"
                                type="info"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 3">{{ $t('homePage._12') }}</el-tag>
                        <el-popover placement="right"
                                    width="400"
                                    trigger="hover"
                                    disabled>
                          <div>
                            <el-form>
                              <el-row>
                                <el-col :span="12">
                                  <el-form-item :label="$t('homePage._13') + ':'">{{ item.CALL_CODE }}</el-form-item>
                                  <el-form-item :label="$t('homePage._14') + ':'">{{ item.LINE_TYPE }}</el-form-item>
                                  <el-form-item :label="$t('homePage._15') + ':'">{{ item.OPERATION_NAME }}</el-form-item>
                                  <el-form-item :label="$t('homePage._16') + ':'">{{ item.OPERATOR }}</el-form-item>
                                  <el-form-item :label="$t('homePage._17') + ':'">
                                    <span v-if="item.STATUS === 0">{{ $t('homePage._9') }}</span>
                                    <span v-if="item.STATUS === 1">{{ $t('homePage._10') }}</span>
                                    <span v-if="item.STATUS === 2">{{ $t('homePage._11') }}</span>
                                    <span v-if="item.STATUS === 3">{{ $t('homePage._12') }}</span>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                  <el-form-item :label="$t('homePage._18') + ':'">{{ item.CALL_CONTENT }}</el-form-item>
                                  <el-form-item :label="$t('homePage._19') + ':'">{{ item.OPERATION_LINE_NAME }}</el-form-item>
                                  <el-form-item :label="$t('homePage._20') + ':'">{{ item.OPERATION_SITE_NAME }}</el-form-item>
                                  <el-form-item :label="$t('homePage._21') + ':'">{{ item.CREATE_TIME }}</el-form-item>
                                </el-col>
                              </el-row>
                            </el-form>
                          </div>
                          <span class="title"
                                slot="reference">{{item.CALL_CONTENT}}</span>
                        </el-popover>
                      </div>
                      <span class="time"
                            style="font-size: 14px">{{item.CREATE_TIME}}</span>
                    </div>

                  </div>
                </el-card>
                <div class="empty-page"
                     style="width: 100%;height: 100%;"
                     v-show="WarningList.length<=0">
                </div>
                <!-- <div id="FirstPassRatePie"
                     style="height: 100%;padding-top: 10px;" /> -->
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 主体 end -->
    </div>
    <!-- 预览作业 -->
    <el-dialog v-dialogDrag
               :title="$t('SOPRoutes._98')"
               :visible.sync="PrimaryOperation"
               :close-on-click-modal="false"
               width="100%"
               top="0"
               class="primary-operation">
      <iframe id="child"
              v-if="iframeUrl"
              width="100%"
              height="100%"
              :src="iframeUrl"></iframe>
    </el-dialog>
    <!-- 选择工单 -->
    <el-dialog class="my-dialog"
               :title="$t('CollectProducts._30')"
               :visible.sync="dialogWoNo"
               width="30%"
               ref="WONODialog"
               :close-on-click-modal="false">
      <!--   :before-close="WONOleClose" -->
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('CollectProducts._31')">
          <el-select v-model="WoNoBer"
                     filterable
                     :placeholder="$t('CollectProducts._32')"
                     style="width: 100%"
                     @change="WoNoChange">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="WoNoFrom.WO_NO"
                        @input="getOrder"
                        @keyup.enter.native="getOrder"
                        :placeholder="$t('CollectProducts._33')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getOrder">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option v-for="(item,index) in WoNoList"
                       :key="index"
                       :label="item.WO_NO"
                       :value="item.WO_NO"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="WoNoFrom.Page"
                             :page-size="WoNoFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="WoNototalPage"
                             @size-change="WoNoSizeChange"
                             @current-change="WoNoCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogWoNo = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="dialogWoNo = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
    <!-- 选择工位 -->
    <el-dialog class="my-dialog"
               :title="$t('CollectProducts._34')"
               :visible.sync="dialogStation"
               width="30%"
               ref="myDialog"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('SfcsOperationSites._8')"
                      prop="OPERATION_LINE_ID">
          <el-select v-model="StationFrom.OPERATION_LINE_ID"
                     style="width:100%"
                     @change="operationCjange"
                     :placeholder="$t('SfcsOperationSites._9')">
            <el-option v-for="item in LineList"
                       :key="item.Id"
                       :label="item.OPERATION_LINE_NAME"
                       :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('CollectProducts._35')">
          <el-select v-model="StationID"
                     filterable
                     :placeholder="$t('CollectProducts._36')"
                     style="width: 100%"
                     @change="StationChange">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="StationFrom.OPERATION_SITE_NAME"
                        @input="getStatusList"
                        @keyup.enter.native="getStatusList"
                        :placeholder="$t('CollectProducts._37')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getStatusList">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option v-for="item in StationtoList"
                       :key="item.ID"
                       :disabled="!item.ID"
                       :label="item.OPERATION_SITE_NAME"
                       :value="item.ID"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="StationFrom.Page"
                             :page-size="StationFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="StationtotalPage"
                             @size-change="StationSizeChange"
                             @current-change="StationCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogStation = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStation = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
    <!-- 选择打印机 -->
    <el-dialog class="my-dialog"
               :title="$t('MesBatchManager._56')"
               :visible.sync="PrintoShow"
               width="30%"
               ref="PrintDialog"
               :close-on-click-modal="false">
      <el-form ref="Printform"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('MesBatchManager._57')">
          <el-select v-model="PrintName"
                     style="width:100%"
                     @change="SetPrinName"
                     placeholder=" ">
            <el-option v-for="(item, index) in PrintList"
                       :key="index"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="PrintoShow = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="PrintoShow = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  Station,
  GetWONO,
  CollectProducts,
  SaveSiteByMiddleCode,
  CollectMiddleCodeData
} from '@/api/CollectProducts'
import { LoadEarlyWarningData } from '@/api/AndonCallRecord'
import {
  AddOrModify
} from '@/api/SfcsOperationSites'
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import request from '@/plugin/axios'
import Voice from '@/libs/voice'
const voice = Voice()
// import qs from 'qs'
const fs = {
  // 全屏 类
  fullScreen: (function () {
    var isFullScreen = false
    var requestFullScreen = function () { // 全屏
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        this.$message({
          showClose: true,
          message: this.$t('smt.ns'),
          type: 'warning'
        })
      }
    }
    // 退出全屏 判断浏览器种类
    var exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      var exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        // eslint-disable-next-line
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
    return {
      handleFullScreen: function ($this) {
        if (isFullScreen) {
          exitFull()
          isFullScreen = false
        } else {
          requestFullScreen()
          isFullScreen = true
        }
      }
    }
  }())
}
export default {
  components: {
  },
  fs,
  name: 'TransitCode',
  data () {
    return {
      LineList: [],
      WarningList: [],
      nowDate: '', // 当前日期
      nowTime: '',
      // 预览作业
      PrimaryOperation: false,
      iframeUrl: '',
      // 工单
      WoNoBer: '',
      dialogWoNo: false,
      WoNoList: [],
      WoNoFrom: {
        WO_NO: '',
        Page: 1,
        Limit: 15
      },
      WoNototalPage: 0,
      // 工位
      dialogStation: false,
      StationID: '',
      StationtoList: [],
      StationFrom: {
        OPERATION_LINE_ID: undefined,
        OPERATION_SITE_NAME: '',
        ENABLED: 'Y',
        Page: 1,
        Limit: 15
      },
      StationtotalPage: 0,
      StationName: '---',
      // 输入数据
      InputData: '',
      OldValue: '', // 旧值
      COLLECT_QTY: '',
      COLLECTION_QTY: '',
      PRINTCODE: false, // 打印
      // 保存站点
      SiteFrom: {
        SiteId: '',
        UserName: ''
      },
      SiteObj: '', // 实体
      ResultRun: '', // 状态
      InfRoute: '', // 结果
      //
      ProductData: {},
      HistoricalData: [],
      tableData: [],

      PrintoShow: false,
      PrintList: [],
      PrintName: '',
      printId: '',
      OPERATION_ID: '', // sop工位ID
      OPERATION_LINE_NAME: '' // 线体名称
    }
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'userId'
    ])
  },
  beforeDestroy () {
    if (this.formatDate) {
      clearInterval(this.formatDate) // 在Vue实例销毁前，清除时间定时器
    }
  },
  deactivated () {
  },
  destroyed () {
  },
  mounted () {
    this.currentTime()
  },
  created () {
    this.getOrder()
    this.getAddOrModify()
    this.SiteFrom.UserName = this.userinfo.USER_NAME
    if (!this.StationID) {
      this.dialogStation = true
    }
    if (!this.WoNoBer) {
      this.dialogWoNo = true
    }
    this.$nextTick(() => { })
  },
  methods: {
    // 获取首页预警信息数据
    async getLoadEarlyWarningData () {
      const res = await LoadEarlyWarningData({ User_ID: this.userinfo.ID, SITE_ID: this.StationID })
      this.WarningList = res.Result ? res.Result : []
    },
    toWarningList () {
      window.open(window.location.origin + '#/WarningInformationList/index')
    },
    toWarning (item) {
      window.open(
        window.location.origin + '#/WarningInformation/index?ID=' + item.ID
      )
    },
    // 日期时间
    currentTime () {
      setInterval(this.formatDate, 500)
    },
    formatDate () {
      let date = new Date()
      let year = date.getFullYear() // 年
      let month = date.getMonth() + 1 // 月
      let day = date.getDate() // 日
      let hour = date.getHours() // 时
      hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
      let minute = date.getMinutes() // 分
      minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
      let second = date.getSeconds() // 秒
      second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
      month = month < 10 ? '0' + month : month // 如果只有一位，则前面补零
      this.nowDate = `${year}` + this.$t('CollectProducts._38') + `${month}` + this.$t('CollectProducts._39') + `${day}` + this.$t('CollectProducts._40')
      this.nowTime = `${hour}:${minute}:${second}`
    },
    // E-SOP预览
    ESOPPreview () {
      if (this.ProductData.Part_No === '') {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._36'),
          type: 'warning'
        })
        return
      }
      let routeData = this.$router.resolve({
        path: '/SOPsimple/SOP/index',
        query: {
          // partNo: this.ProductData.Part_No, // 料号
          // operationId: this.OPERATION_ID // 工位ID
          siteId: this.StationID, // 站点ID
          partNo: this.ProductData.Part_No, // 料号
          operationId: this.OPERATION_ID, // 工位ID
          wono: this.ProductData.Wo_No, // 工单
          description: this.ProductData.Description, // 机型
          operationlionname: this.OPERATION_LINE_NAME, // 线体名称
          operationlionid: this.StationFrom.OPERATION_LINE_ID, // 线体id
          stationname: this.StationName // 工位名称
        }
      })
      window.open(routeData.href, '_blank')
    },
    // 工单
    WoNoClick () {
      this.dialogWoNo = true
    },
    WoNoChange () {
      this.getCollectProducts()
      this.dialogWoNo = false
    },

    async getAddOrModify () {
      const res = await AddOrModify()
      if (res.Result) {
        this.LineList = res.Result.LineList
      }
    },
    operationCjange (e) {
      this.LineList.map(v => {
        if (e === v.Id) {
          this.OPERATION_LINE_NAME = v.OPERATION_LINE_NAME
          console.log(v, '====')
        }
      })
      this.StationID = ''
      this.getStatusList()
    },
    async getOrder () {
      const res = await GetWONO(this.WoNoFrom)
      this.WoNototalPage = res.TotalCount
      this.WoNoList = res.Result || []
      if (this.WoNoList.length === 0) {
        this.WoNoList.push({
          LOOKUP_TYPE: '',
          NAME: '',
          ROWNO: ''
        })
      }
    },
    WoNoSizeChange (Limit) {
      this.WoNoFrom.Page = 1
      this.WoNoFrom.Limit = Limit
      this.getOrder()
    },
    WoNoCurrentChange (Page) {
      this.WoNoFrom.Page = Page
      this.getOrder()
    },
    // 工位
    StationClick () {
      this.dialogStation = true
    },
    StationChange (e) {
      if (this.SiteFrom.OPERATION_LINE_ID !== undefined) {
        this.$message.error(this.$t('SfcsOperationSites._9'))
        return
      }
      this.SiteFrom.SiteId = e
      this.getSaveSite()
      console.log(e, 'eeee')
      this.StationtoList.map(v => {
        if (e === v.ID) {
          this.StationName = v.OPERATION_SITE_NAME
          this.OPERATION_ID = v.OPERATION_ID
        }
      })
      this.getCollectProducts()
      this.getLoadEarlyWarningData()
      this.dialogStation = false
    },
    async getStatusList () {
      const res = await Station(this.StationFrom)
      this.StationtotalPage = res.TotalCount || 0
      const data = JSON.parse(res.Result)
      this.StationtoList = data || []
      if (this.StationtoList.length === 0) {
        this.StationtoList.push({
          OPERATION_SITE_NAME: '',
          ID: ''
        })
        this.StationtotalPage = 0
      }
    },
    StationSizeChange (Limit) {
      this.StationFrom.Page = 1
      this.StationFrom.Limit = Limit
      this.getStatusList()
    },
    StationCurrentChange (Page) {
      this.StationFrom.Page = Page
      this.getStatusList()
    },

    getDateStr (dateStr) {
      var date = new Date(Date.parse(dateStr))
      var day = (date.getDate()).toString()
      var hour = (date.getHours()).toString()
      return day + this.$t('smt.day') + hour + this.$t('smt.time')
    },
    WONOleClose (done) {
      if (!this.WoNoBer) {
        this.$message.error(this.$t('CollectProducts._32'))
      } else {
        done()
      }
    },
    handleClose (done) {
      if (!this.StationID) {
        this.$message.error(this.$t('CollectProducts._36'))
      } else {
        done()
      }
    },
    // 清空
    async EmptyClick () {
      this.InputData = ''
      this.SiteObj.data = ''
      this.InfRoute = ''
      this.OldValue = ''
      this.ResultRun = ''
      this.COLLECT_QTY = ''
      this.COLLECTION_QTY = ''
      this.getSaveSite()
    },
    // 保存站点
    async getSaveSite () {
      const res = await SaveSiteByMiddleCode(this.SiteFrom)
      if (res.Result) {
        this.SiteObj = res.Result
        this.tableData = res.Result.PARTLIST ? res.Result.PARTLIST : []
      }
      console.log(res, 'resres')
    },
    // 回车
    async enterChange (row) {
      if (!this.InputData) {
        return
      }
      if (this.StationID === '') {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._36'),
          type: 'warning'
        })
        return
      }
      if (!this.COLLECT_QTY) {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._57'),
          type: 'warning'
        })
        return
      }
      if (this.COLLECT_QTY > 3) {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._58'),
          type: 'warning'
        })
        return
      }
      this.OldValue = this.InputData
      this.SiteObj.DATA = this.InputData
      // 部件数
      this.SiteObj.COLLECT_QTY = Number(this.COLLECT_QTY)
      // 工单
      if (this.ProductData.Wo_No) {
        this.SiteObj.WO_NO = this.ProductData.Wo_No
      } else {
        this.SiteObj.WO_NO = ''
      }
      // 是否自动打印
      this.SiteObj.PRINTCODE = this.PRINTCODE
      this.InputData = ''
      const res = await CollectMiddleCodeData(this.SiteObj)
      const data = res.Result
      // 成功处理
      if (data) {
        this.SiteObj = data
        this.ResultRun = data.RESULT
        // 声音设置
        if (this.ResultRun === 0) {
          voice.success()
        }
        if (this.ResultRun === 1) {
          voice.warning()
        }
        if (this.ResultRun === 2) {
          voice.error()
        }
        this.InfRoute = data.MESSAGE ? data.MESSAGE : ''
        this.tableData = data.PARTLIST ? data.PARTLIST : []
        this.COLLECTION_QTY = data.COLLECTION_QTY
        this.WoNoBer = data.WO_NO // 工单
        this.getCollectProducts()
        if (data.PRINTCODE) {
          this.printId = data.PRINTTASKID
          this.downSomething({ PrintTaskId: data.PRINTTASKID, Printer: this.userinfo.USER_NAME })
        }
      }
      // 报错处理
      if (res.warnResult) {
        this.ResultRun = res.warnResult.RESULT
        // 声音设置
        if (this.ResultRun === 0) {
          voice.success()
        }
        if (this.ResultRun === 1) {
          voice.warning()
        }
        if (this.ResultRun === 2) {
          voice.error()
        }
        this.InfRoute = res.warnResult.MESSAGE ? res.warnResult.MESSAGE : ''
        this.tableData = res.warnResult.PARTLIST ? res.warnResult.PARTLIST : []
      }
    },
    // 打印
    async downSomething (query) {
      var that = this
      request({
        url: 'http://localhost:42737/Printer/GetCurrentPrint',
        method: 'get'
      }).then(res => {
        // loading.close()
        console.log(res, 'res.Resultres.Resultres.Result')
        if (res.Code === 1) {
          this.print(query)
        } else {
          this.GetPrintList()
        }
      }).catch(function () {
        that.$message({
          type: 'error',
          message: that.$t('MesBatchManager._55')
        })
      })
    },
    // 开始打印
    print (query) {
      var that = this
      const loading = this.$loading({
        lock: true, // 同v-loading的修饰符
        text: this.$t('MesBatchManager._54'), // 加载文案
        backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
        spinner: 'el-icon-loading' // 加载图标
      })
      request({
        url: 'http://localhost:42737/Printer/BasePrinter',
        method: 'post',
        data: query
      }).then(res => {
        loading.close()
        console.log(res, 'res.Resultres.Resultres.Result')
        if (res.Code === 1) {
          if (res.Data) {
            this.$notify({
              title: this.$t('publics.tips.success'),
              message: this.$t('MesBatchManager._52'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.GetPrintList()
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.Msg,
              type: 'error',
              duration: 2000
            })
          }
        } else {
          this.$notify({
            title: this.$t('publics.tips.handleFail'),
            message: res.Msg,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(function () {
        loading.close()
        that.$message({
          type: 'error',
          message: that.$t('MesBatchManager._55')
        })
      })
    },
    // 获取打印机列表
    async GetPrintList () {
      this.PrintoShow = true
      const res = await request({
        url: 'http://localhost:42737/Printer/GetPrintList',
        method: 'get'
      })
      if (res.Code === 1) {
        this.PrintList = res.Data
      }
    },
    // 选择名称
    async SetPrinName () {
      const res = await request({
        url: 'http://localhost:42737/Printer/SetPrintName',
        method: 'post',
        data: {
          PrintName: this.PrintName
        }
      })
      if (res.Code === 1) {
        // 重新打印
        this.print({ PrintTaskId: this.printId, Printer: this.userinfo.USER_NAME })
      } else {
        this.$notify({
          title: this.$t('publics.tips.handleFail'),
          message: res.Msg,
          type: 'error',
          duration: 2000
        })
      }
    },

    // 获取产品数据、历史数据、不良
    async getCollectProducts () {
      if (!this.StationID || !this.WoNoBer) {
        return
      }
      var Productsform = {
        SiteID: this.StationID, // StationID 工位
        WO_NO: this.WoNoBer// WoNoBer 工单
      }
      const res = await CollectProducts(Productsform)
      if (res.Result) {
        this.ProductData = res.Result
        this.HistoricalData = res.Result.HistoricalData || []
        const FailData = res.Result.FailData || []
        console.log(FailData, 'FailDataFailData')
      }
    },
    async getWoYidldPie () {
      /* =====================首不良Top5 =========================== */
      this.FirstPassRatePie = echarts.init(
        document.getElementById('FirstPassRatePie')
      )
      var optionFirstPassRate = null
      optionFirstPassRate = {
        title: {
          id: 3,
          text: this.$t('smt._3'),
          padding: [10, 0, 0, 10],
          textStyle: {
            color: '#FFF',
            fontSize: 20
          }
        },
        color: ['#F4AA61', '#4EC7B8', '#90C9F6', '#FE8463', '#B5C334'],
        tooltip: {
          trigger: 'item',
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
          formatter: '{b} :' + this.$t('pdl._15') + '{d}%'
        },
        legend: {
          left: 'center',
          bottom: '10',
          type: 'scroll',
          textStyle: {
            // fontSize: 18,//字体大小
            color: '#ffffff' // 字体颜色
          },
          data: []
        },
        series: [
          {
            name: this.$t('pdl._16'),
            // type: 'pie',
            // radius: '60%',
            // center: ['40%', '50%'],
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['20%', '40%'],
            avoidLabelOverlap: false,
            data: [],
            label: {
              // normal: { formatter: '{b}[{d}%]' }
              normal: {
                formatter: (data) => {
                  return data.name.split('(')[0] + ': ' + data.percent + '%'
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.FirstPassRatePie.setOption(optionFirstPassRate, true)
      window.onresize = () => {
        this.FirstPassRatePie.resize()
      }
    }
  },
  watch: {
    PrimaryOperation (val) {
      if (!val) {
        this.iframeUrl = ''
      }
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../CollectProducts/index.css';
.TransitCode {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;

  .huise {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale' x='0' y='0' width='100%' height='100%'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    filter: gray;
  }

  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .kanban-title-tab {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    font-size: 16px;
  }
  .kanban-title-tab span {
    width: 60px;
    height: 32px;
    line-height: 32px;
    margin-left: 10px;
    background: #23548c;
    border-radius: 4px;
    border: 1px solid #009fef;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .kanban-title-tab span:hover {
    background: #009fef;
  }
  /* 12 */
  .outcome .result {
    width: 100%;
    font-size: 16px;
    /* height: 100px; */
    height: calc((100vh - 295px - 0px) / 2 - 14px);
    overflow: auto;
    background: #179415;
  }
  .block-information {
    background: #f9b72d;
    height: 20%;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
  }
  .center-content-product {
    font-size: 20px;
    border-bottom: 1px solid #bbbbbb;
    width: 100%;
    /*position: relative;
  left: -12px;*/
    padding: 0 0px 12px;
  }
  .center-content-product span {
    margin-left: 12px;
  }
  /* 产品数据 */
  .product-row-col {
    height: 28.5%;
  }
  .product-col {
    padding-top: 22px;
    display: flex;
    justify-content: center;
  }
  .product-col-center {
    background: #eaf1f8;
    font-size: 18px;
    color: #000;
    height: 100%;
    /* height: calc((100vh - 630px - 0px) / 2 - 14px); */
    width: 70%;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .product-col-center span {
    width: 100%;
    font-size: 18px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .product-col-red {
    color: #ef5757;
  }
  .product-col-green {
    color: #179415;
  }
  tr th,
  tr td {
    padding: 6px;
  }
  #TodayWorkOrderSummary::-webkit-scrollbar {
    display: none;
  }
  /* 历史数据 */
  .content-history {
    width: 100%;
    height: 84%;
    overflow-x: hidden;
    margin-top: 10px;
  }
  .content-history::-webkit-scrollbar {
    display: none;
  }
  .content-history-list {
    border-radius: 21px;
    background: #37587d;
    padding: 12px;
    margin-top: 10px;
  }
  /* 预警 */
  .item-x {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #666;
    line-height: 2.5;
    justify-content: space-between;
    border-bottom: 1px dashed #e5e5e5;
    cursor: pointer;
  }
  .item-x:hover {
    color: #000;
  }
  .item-x .title {
    width: 100px;
    color: #ffffff;
    vertical-align: bottom;
    border-bottom: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
  .item-x .time {
    color: #fff;
    vertical-align: bottom;
    border-bottom: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* .item-x:hover .time {
  color: #666;
} */
  .load-more {
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.TransitCode {
  .collstat-form .el-form-item__label {
    color: #ffffff;
    font-size: 16px;
    padding: 0 0 0px;
  }
  .collstat-form .collstat-form-item {
    color: #fff;
    font-size: 16px;
    margin-top: 20px;
    // margin-bottom: -4px !important;
  }
  .el-card__body {
    height: 100%;
    background: #37587d;
  }
  // .el-form-item--small .el-form-item {
  //   margin-bottom: -4px !important;
  // }
}
</style>
