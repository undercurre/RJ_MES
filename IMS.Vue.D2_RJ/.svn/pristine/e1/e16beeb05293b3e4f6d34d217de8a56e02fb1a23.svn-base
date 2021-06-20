<template>
  <div class="sop"
       style="background: #040f3c">
    <div class="container-fluid">
      <!--头部-->
      <el-row class="row header-title sop-header">
        <!-- <el-col :span="4"
                class="col-md-1">&nbsp;</el-col> -->
        <el-col :span="16"
                :offset="4"
                class="col-md-10">
          <div class="kanban-title-panel">
            <span v-if="userData.OPERATION_SITE_NAME">{{
              userData.OPERATION_SITE_NAME
            }}</span>
            <span v-else>---</span>
          </div>
        </el-col>
        <el-col :span="4"
                style="height: 55%;">
          <div class="kanban-title-tab"
               v-show="butoShow">
            <span @click="WoNoClick">{{ $t("CollectProducts._1") }}</span>
            <span @click="StationClick">{{ $t("CollectProducts._2") }}</span>
            <span @click="$options.fs.fullScreen.handleFullScreen(this)">{{
              $t("smt.fs")
            }}</span>
          </div>
        </el-col>
      </el-row>
      <!--工单信息栏-->
      <el-row class="row wo-info sop-info">
        <div class="border-container"
             style="height: 100%">
          <input id="siteId"
                 type="hidden"
                 name="siteId"
                 value />
          <el-col :span="24"
                  class="col-md-12 col-row">
            <el-row class="row col-row">
              <el-col :span="24"
                      class="col-md-12 col-row">
                <el-col :span="6"
                        class="col-md-3 div-title">
                  {{ $t("SOPRoutes._122") }}:
                  <span v-if="userData.OPERATION_LINE_NAME">{{
                    userData.OPERATION_LINE_NAME
                  }}</span>
                  <span v-else>---</span>
                </el-col>
                <el-col :span="6"
                        class="col-md-3 div-title">
                  {{ $t("SOPRoutes._123") }}:
                  <span v-if="userData.WO_NO">{{ userData.WO_NO }}</span>
                  <span v-else>---</span>
                </el-col>
                <el-col :span="6"
                        class="col-md-3 div-title">
                  {{ $t("SOPRoutes._124") }}:
                  <span v-if="userData.PCB_PN">{{ userData.PCB_PN }}</span>
                  <span v-else>---</span>
                </el-col>
                <el-col :span="6"
                        class="col-md-3 div-title">
                  {{ $t("SOPRoutes._125") }}:
                  <span v-if="userData.MODEL">{{ userData.MODEL }}</span>
                  <span v-else>---</span>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
          <span class="top-left border-span-m" />
          <span class="top-right border-span-m" />
          <span class="bottom-left border-span-m" />
          <span class="bottom-right border-span-m" />
        </div>
      </el-row>
      <!-- style="height:85%;" -->
      <el-row class="row sop-center">
        <!--左侧-->
        <el-col :span="18"
                class="col-md-9 col-row"
                style="padding-right: 20px">
          <el-row class="row"
                  style="height: 100%">
            <div style="padding: 0px 0; height: 100%; display: grid">
              <div class="pic-pn-div border-container"
                   style="padding: 5px; height: 100%">
                <el-col id="mapswp"
                        :span="24"
                        class="col-md-12 col-row img-pn">
                  <el-carousel :interval="5000">
                    <el-carousel-item v-for="item in resourceData"
                                      :key="item.ID"
                                      @mouseenter.native="onMouaweOer"
                                      @mouseleave.native="onMouseout">
                      <div style="width: 100%; height: 100%"
                           v-if="matchType(item.RESOURCE_URL) === 'image'">
                        <img :src="img_url + item.RESOURCE_URL"
                             :alt="$t('SOPRoutes._60')" />
                        <div v-if="oShowText"
                             class="carousel-text">
                          <p class="last"
                             v-html="item.RESOURCE_MSG" />
                        </div>
                      </div>
                      <video v-if="matchType(item.RESOURCE_URL) === 'video'"
                             v-bind:src="img_url + item.RESOURCE_URL"
                             style="width: 100%; height: 100%"
                             controls="controls"></video>
                      <iframe v-if="matchType(item.RESOURCE_URL) === 'pdf'|| matchType(item.RESOURCE_URL) == 'word'|| matchType(item.RESOURCE_URL) == 'excel' || matchType(item.RESOURCE_URL) == 'other'"
                              scrolling="auto"
                              :src="img_url +item.RESOUTCE_PDF_URL"
                              class="scrollStyle table_120_list"
                              frameborder="0"
                              width="100%"
                              height="100%">
                      </iframe>
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
                <span class="top-left border-span" />
                <span class="top-right border-span" />
                <span class="bottom-left border-span" />
                <span class="bottom-right border-span" />
              </div>
            </div>
          </el-row>
        </el-col>
        <!--右侧-->
        <el-col :span="6"
                class="col-md-3"
                style="padding: 0; height: 100%">
          <el-row class="row"
                  style="height: 50%; padding: 0">
            <div class="border-container"
                 style="height: 100%">
              <el-col :span="24"
                      class="col-md-12 name-title-m"
                      style="padding: 15px 0px 0 15px">
                {{ $t("SOPRoutes._174") }}
              </el-col>
              <el-col :span="24"
                      class="col-md-12"
                      v-if="ROLEstsut">
                <el-row class="row">
                  <el-col :span="10"
                          :offset="1"
                          class="col-md-6"
                          v-if="$btnList.indexOf('SfcsShortage') !== -1">
                    <button id="queliao"
                            data-type="0"
                            class="btn-style btn-6"
                            @click="innerVisible_but(0)">
                      {{ $t("SOPRoutes._175") }}
                    </button>
                  </el-col>
                  <el-col :span="10"
                          :offset="2"
                          class="col-md-6"
                          v-if="$btnList.indexOf('SfcsQuality') !== -1">
                    <button id="pinzhi"
                            data-type="1"
                            class="btn-style btn-2"
                            @click="innerVisible_but(1)">
                      {{ $t("SOPRoutes._176") }}
                    </button>
                  </el-col>
                  <!-- <el-row class="row"> -->
                  <el-col :span="10"
                          class="col-md-6"
                          :offset="1"
                          v-if="$btnList.indexOf('SfcsDevice') !== -1">
                    <button id="shebei"
                            data-type="2"
                            class="btn-style btn-3"
                            @click="innerVisible_but(2)">
                      {{ $t("SOPRoutes._177") }}
                    </button>
                  </el-col>
                  <el-col :span="10"
                          class="col-md-6"
                          :offset="2"
                          v-if="$btnList.indexOf('SfcsHelp') !== -1">
                    <button id="bangzhu"
                            data-type="3"
                            class="btn-style btn-1"
                            @click="innerVisible_but(3)">
                      {{ $t("SOPRoutes._178") }}
                    </button>
                  </el-col>
                  <!-- </el-row> -->
                </el-row>
              </el-col>
              <el-col :span="24"
                      class="col-md-12"
                      v-else>
                <el-row class="row">
                  <el-col :span="12"
                          class="col-md-6">
                    <button id="queliao"
                            data-type="0"
                            class="btn-style btn-6"
                            @click="innerVisible_but(0)">
                      {{ $t("SOPRoutes._175") }}
                    </button>
                  </el-col>
                  <el-col :span="12"
                          class="col-md-6">
                    <button id="pinzhi"
                            data-type="1"
                            class="btn-style btn-2"
                            @click="innerVisible_but(1)">
                      {{ $t("SOPRoutes._176") }}
                    </button>
                  </el-col>
                  <el-row class="row">
                    <el-col :span="12"
                            class="col-md-6">
                      <button id="shebei"
                              data-type="2"
                              class="btn-style btn-3"
                              @click="innerVisible_but(2)">
                        {{ $t("SOPRoutes._177") }}
                      </button>
                    </el-col>
                    <el-col :span="12"
                            class="col-md-6">
                      <button id="bangzhu"
                              data-type="3"
                              class="btn-style btn-1"
                              @click="innerVisible_but(3)">
                        {{ $t("SOPRoutes._178") }}
                      </button>
                    </el-col>
                  </el-row>
                </el-row>
              </el-col>
              <span class="top-left border-span" />
              <span class="top-right border-span" />
              <span class="bottom-left border-span" />
              <span class="bottom-right border-span" />
            </div>
          </el-row>
          <el-row class="row"
                  style="height: 50%; padding: 15px 0 0 0">
            <div class="border-container"
                 style="height: 100%; padding: 15px 0px">
              <el-col :span="24"
                      class="col-md-12 name-title-m"
                      style="margin-left: 15px">
                {{ $t("SOPRoutes._182") }}
              </el-col>
              <div id="edubalance"
                   style="color: floralwhite">
                <div id="msgArea"
                     v-html="msgArea"
                     style="margin-top: 3px; padding: 0px 15px 0px"></div>
              </div>
              <span class="top-left border-span"></span>
              <span class="top-right border-span"></span>
              <span class="bottom-left border-span"></span>
              <span class="bottom-right border-span"></span>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- </el-dialog> -->
    <el-dialog v-dialogDrag
               width="60%"
               :title="$t('SOPRoutes._140')"
               :visible.sync="innerVisible"
               :close-on-click-modal="false"
               append-to-body
               class="sop-dialog"
               top="0">
      <div class="sop-dialog-title">{{ $t("SOPRoutes._141") }}</div>
      <div class="sop-dialog-area">
        <el-form label-width="80px">
          <el-form-item :label="$t('SOPRoutes._142')">
            <el-select v-model="callVal.CALL_TYPE_CODE"
                       style="width: 100%; margin-right: 0px"
                       disabled
                       :placeholder="$t('SOPRoutes._142')">
              <el-option v-for="item in fmtCallTypeCode"
                         :key="item.code"
                         :label="item.name"
                         :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('SOPRoutes._144')">
            <el-select v-model="callVal.CALL_CODE"
                       style="width: 100%; margin-right: 0px"
                       :placeholder="$t('SOPRoutes._145')"
                       @change="handleChangeCallTypeCode">
              <el-option v-for="item in sort"
                         :key="item.CALL_CODE"
                         :label="item.CALL_CODE"
                         :value="item.CALL_CODE" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('SOPRoutes._146')">
            <el-input v-model="callVal.CALL_CONTENT"
                      type="textarea"
                      :placeholder="$t('SOPRoutes._147')" />
          </el-form-item>
        </el-form>
      </div>
      <div class="sop-dialog-button">
        <el-button type="success"
                   @click="shout_but">&nbsp;{{ $t("SOPRoutes._148") }}&nbsp;</el-button>
      </div>
      <div class="sop-dialog-title">{{ $t("SOPRoutes._149") }}</div>
      <div class="sop-dialog-table">
        <el-table :data="callTable"
                  stripe
                  border
                  style="width: 100%"
                  height="100%"
                  highlight-current-row
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                  @selection-change="handleRowClick">
          <el-table-column type="selection"
                           width="55"></el-table-column>
          <el-table-column prop="CALL_NO"
                           :label="$t('SOPRoutes._150')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="OPERATION_LINE_NAME"
                           :label="$t('SOPRoutes._151')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="OPERATION_SITE_NAME"
                           :label="$t('SOPRoutes._152')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="OPERATOR"
                           :label="$t('SOPRoutes._153')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="CREATE_TIME"
                           :label="$t('SOPRoutes._154')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="CALL_CODE"
                           :label="$t('SOPRoutes._155')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="CALL_CONTENT"
                           :label="$t('SOPRoutes._156')"
                           align="center"
                           :show-overflow-tooltip="true" />
        </el-table>
      </div>
      <el-pagination ref="pagi"
                     :current-page="callData.Page"
                     :page-size="callData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="calltotal"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
      <div class="sop-dialog-button">
        <el-button type="success"
                   @click="sign_but">&nbsp;{{ $t("SOPRoutes._157") }}&nbsp;</el-button>
      </div>
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
            <div style="
                position: absolute;
                width: 100%;
                height: 6px;
                background: #fff;
                background: #fff;
                top: 0;
                z-index: 99;
              "></div>
            <div style="
                position: absolute;
                width: 100%;
                height: 6px;
                background: #fff;
                background: #fff;
                bottom: 0;
                z-index: 99;
              "></div>
            <div style="
                width: 600px;
                display: flex;
                padding: 0 20px 0 10px;
                position: sticky;
                top: 6px;
                background: #fff;
                z-index: 90;
              ">
              <el-input v-model="WoNoFrom.WO_NO"
                        @input="getOrder"
                        @keyup.enter.native="getOrder"
                        :placeholder="$t('CollectProducts._33')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getOrder">{{ $t("publics.btn.search") }}</el-button>
            </div>
            <!-- 显示工单获取料号 -->
            <el-option v-for="(item, index) in WoNoList"
                       :key="index"
                       :label="item.WO_NO"
                       :value="item.PART_NO"></el-option>
            <div style="
                width: 600px;
                position: sticky;
                bottom: 6px;
                background: #fff;
                z-index: 90;
                padding-left: 15px;
              ">
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
                     style="width: 100%"
                     @change="operationCjange"
                     :placeholder="$t('SfcsOperationSites._9')">
            <el-option v-for="(item, index) in LineList"
                       :key="index"
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
            <div style="
                position: absolute;
                width: 100%;
                height: 6px;
                background: #fff;
                background: #fff;
                top: 0;
                z-index: 99;
              "></div>
            <div style="
                position: absolute;
                width: 100%;
                height: 6px;
                background: #fff;
                background: #fff;
                bottom: 0;
                z-index: 99;
              "></div>
            <div style="
                width: 600px;
                display: flex;
                padding: 0 20px 0 10px;
                position: sticky;
                top: 6px;
                background: #fff;
                z-index: 90;
              ">
              <el-input v-model="StationFrom.OPERATION_SITE_NAME"
                        @input="getStatusList"
                        @keyup.enter.native="getStatusList"
                        :placeholder="$t('CollectProducts._37')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getStatusList">{{ $t("publics.btn.search") }}</el-button>
            </div>
            <el-option v-for="(item,index) in StationtoList"
                       :key="index"
                       :label="item.OPERATION_SITE_NAME"
                       :value="item.OPERATION_ID"></el-option>
            <div style="
                width: 600px;
                position: sticky;
                bottom: 6px;
                background: #fff;
                z-index: 90;
                padding-left: 15px;
              ">
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
    </el-dialog>
  </div>
</template>

<style scoped src="../css/index.css"></style>
<style scoped src="../css/button-style.css"></style>
<script>
// <style scoped src="../../../assets/style/bootstrap.min.css"></style>
// import { andon } from '@/libs/andon.js'
// import {
//   GetPartByPartNo
// } from '@/api/SimpleSOPRoutes/index.js'
import {
  Index,
  CallWindow,
  GetCallCodeChinese,
  GetRecordBySiteId,
  AddCallRecord,
  EditCallRecord,
  LoadResourceProductData,
  LoadEmployeeData,
  LoadResourceData,
  LoadResourceCmpData
} from '@/api/SimpleSOPRoutes/SimpleSOP.js'
import {
  LoadSiteMsg,
  AddOrModify,
  LoadSiteMsgPreview
} from '@/api/SfcsOperationSites'
import { Station } from '@/api/CollectProducts'
// CollectProducts
import helper from '@/api/SmtLineWorkorder'
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import util from '@/libs/util.js'
const API = helper('SmtWo')
const fs = {
  // 全屏 类
  fullScreen: (function () {
    var isFullScreen = false
    var requestFullScreen = function () {
      // 全屏
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        alert(this.$t('pdl.ns'))
      }
    }
    // 退出全屏 判断浏览器种类
    var exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      var exitMethod =
        document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for Internet Explorer
        // eslint-disable-next-line
        var wscript = new ActiveXObject("WScript.Shell");
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
  })()
}
export default {
  fs,
  name: 'SOP',
  data () {
    return {
      fmtCallTypeCode: [
        {
          code: 0,
          name: this.$t('SOPRoutes._158')
        },
        {
          code: 1,
          name: this.$t('SOPRoutes._159')
        },
        {
          code: 2,
          name: this.$t('SOPRoutes._160')
        },
        {
          code: 3,
          name: this.$t('SOPRoutes._161')
        }
      ],
      // 人员信息
      info: {
        USER_NAME: '',
        USER_SEX: '',
        WORKINGYEARS: '',
        EDUCATION: '',
        ENTRYDATE: '',
        PHOTO: '',
        PHOTO_BASE64: '',
        USER_AGE: ''
      },
      bannerHeight: '',
      partNo: undefined,
      page: 1,
      list_rows: 10,
      resourceData: [],
      img_url: process.env.VUE_APP_BASE_IMG,
      img: '',
      innerVisible: false,
      callTable: [],
      callData: {
        Page: 1,
        Limit: 15
      },
      calltotal: 0,
      callVal: {
        CALL_TYPE_CODE: '',
        CALL_CODE: '',
        CALL_CONTENT: ''
      },
      sort: [],
      signArr: {
        CHECKIN_OPERATOR: '', // 账号
        CALL_RECORD_IDS: '' // id
      },
      netData: {},
      PreviewVal: {
        part_no: '',
        operations_id: ''
      },
      userData: {
        OPERATION_SITE_NAME: '',
        OPERATION_LINE_NAME: '',
        WO_NO: '',
        PCB_PN: '',
        MODEL: '',
        STANDARD_HUMAN: '',
        STANDARD_WORK_FORCE: '',
        STANDARD_CAPACITY: ''
      },
      productData: {
        RESOURCE_URL: ''
      },
      Resource: 0,
      Resource1: {},
      Resource2: {},
      Resource3: {},
      Resource4: {},
      Resource5: {},
      Resource6: {},
      // 消息框
      msgArea: '',
      oShowText: false,
      Signradio: '',

      PrimaryOperation: true,
      siteID: '', // 站点id
      account: '',
      siteInfo: {
        part_no: '',
        operations_id: ''
      },
      ROLEstsut: false,
      // 工位
      LineList: [],
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
      // 保存站点
      SiteFrom: {
        SiteId: '',
        UserName: ''
      },
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
      butoShow: false,
      paramsCallContentId: 0
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  mounted () {
    this.$nextTick(function () {
      if (this.userinfo.ROLE_ID) {
        this.ROLEstsut = true
        this.$store.dispatch('custom/permission/getBtnList')
      } else {
        this.ROLEstsut = false
      }
      // this.$store.dispatch('custom/permission/getBtnList')
    })
  },
  created () {
    // this.siteID = 148024 // 站点id
    // this.account = this.$route.query.account
    // this.siteID = this.$route.query.site_id // site_id 站点ID account 账号  name姓名
    const tok = util.cookies.get('token')
    if (!tok) {
      var token = this.$route.query.token
      util.cookies.set('token', token)
    }
    if (this.userinfo.USER_NAME) {
      this.account = this.userinfo.USER_NAME
    } else {
      this.account = this.$route.query.account
    }
    this.siteID = this.$route.query.siteId ? this.$route.query.siteId : '-99' // site_id 站点ID account 账号  name姓名
    this.siteInfo.part_no = this.$route.query.partNo
    this.siteInfo.operations_id = this.$route.query.operationId
    if (tok && !this.$route.query.seif) {
      if (this.siteInfo.part_no) {
        this.WoNoBer = this.$route.query.partNo
      } else {
        this.dialogWoNo = true
      }
      if (this.siteInfo.operations_id) {
        this.StationID = Number(this.$route.query.operationId)
      } else {
        this.dialogStation = true
      }
      this.butoShow = true
      this.getAddOrModify()
      this.getOrder()
      this.siteID = this.$route.query.siteId // 站点ID
      this.userData.MODEL = this.$route.query.description // 机种
      this.WoNoBer = this.$route.query.partNo // 料号
      this.userData.PCB_PN = this.$route.query.partNo // 料号
      this.userData.WO_NO = this.$route.query.wono // 工单
      this.StationFrom.OPERATION_LINE_ID = Number(this.$route.query.operationlionid) || ''
      if (this.StationFrom.OPERATION_LINE_ID) {
        this.getStatusList()
      }
      this.userData.OPERATION_SITE_NAME = this.$route.query.stationname// 工位名称
      this.userData.OPERATION_LINE_NAME = this.$route.query.operationlionname // 线体名称
      if (this.siteID) {
        this.getPreview()
      }
    } else {
      // console.log(this.siteID, 'this.siteID')
      if (Number(this.siteID) === -99) {
        // alert('1')
        this.getPreview()
      } else {
        this.getLoadSiteMsg()
      }
    }
  },

  methods: {
    // 工单
    WoNoClick () {
      this.dialogWoNo = true
    },
    WONOleClose (done) {
      if (!this.WoNoBer) {
        this.$message.error(this.$t('CollectProducts._32'))
      } else {
        done()
      }
    },
    async getOrder () {
      const res = await API.LoadData(this.WoNoFrom)
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
    // 获取料号
    async WoNoChange (e) {
      if (!this.StationID || !this.WoNoBer) {
        return
      }
      this.siteInfo.part_no = this.WoNoBer
      this.WoNoList.map(v => {
        if (e === v.PART_NO) {
          // OPERATION_LINE_NAME
          this.userData.MODEL = v.DESCRIPTION // 机种
          this.userData.PCB_PN = v.PART_NO // 料号
          this.userData.WO_NO = v.WO_NO // 工单
        }
      })
      this.dialogWoNo = false
      this.getPreview()
    },
    // 工位
    StationClick () {
      this.dialogStation = true
      // this.StationFrom.OPERATION_LINE_ID = Number(this.StationFrom.OPERATION_LINE_ID)
    },
    handleClose (done) {
      if (!this.StationID) {
        this.$message.error(this.$t('CollectProducts._36'))
      } else {
        done()
      }
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
          this.userData.OPERATION_LINE_NAME = v.OPERATION_LINE_NAME
          console.log(v, '====')
        }
      })
      this.StationID = ''
      this.getStatusList()
    },
    async getStatusList () {
      const res = await Station(this.StationFrom)
      this.StationtotalPage = res.TotalCount
      const data = JSON.parse(res.Result)
      console.log(typeof data, 'data')
      console.log(this.StationtoList, 'this.StationtoList')
      this.StationtoList = []
      if (data.length !== 0) {
        this.StationtoList = data
      }
      if (this.StationtoList.length === 0) {
        this.StationtoList.push({
          OPERATION_SITE_NAME: '',
          ID: ''
        })
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
    // 选择工位
    StationChange (e) {
      if (this.SiteFrom.OPERATION_LINE_ID !== undefined) {
        this.$message.error(this.$t('SfcsOperationSites._9'))
        return
      }
      this.StationtoList.map(v => {
        if (e === v.OPERATION_ID) {
          console.log(v, 'vvvvuserData.OPERATION_SITE_NAME')
          this.siteID = v.ID
          this.userData.OPERATION_SITE_NAME = v.OPERATION_SITE_NAME
          // this.OPERATION_ID = v.OPERATION_ID
        }
      })
      this.SiteFrom.SiteId = e
      this.siteInfo.operations_id = e
      this.dialogStation = false
      if (this.WoNoBer) {
        this.WoNoChange(this.WoNoBer)
      }
    },
    async getIndex () {
      const res = await Index()
      console.log(res, '------')
    },
    backClick () {
      this.PrimaryOperation = false
      this.$router.push('/SOPsimple/AddOrModify/Index')
    },
    onMouaweOer () {
      this.oShowText = true
    },
    onMouseout () {
      this.oShowText = false
    },
    // 通过工序ID获取站点信息
    async getLoadSiteMsg () {
      const res = await LoadSiteMsg(this.siteID)
      console.log(JSON.parse(res.Result))
      if (res.Result) {
        if (res.Result == null) {
          return
        }
        this.getUserData()
        const data = JSON.parse(res.Result)
        this.userData = data
        console.log(data, '工序ID获取站点信息')
        this.loadResourceData(data.OPERATIONS_ROUTE_ID)
        this.loadResourceProductData(data.ROUTE_ID)
        this.LoadResourceCmpData(data.OPERATIONS_ROUTE_ID)
      }
    },
    async getPreview () {
      LoadSiteMsgPreview(this.siteInfo).then(res => {
        console.log(JSON.parse(res.Result))
        if (res.Result) {
          this.getUserData()
          const data = JSON.parse(res.Result)
          if (!this.butoShow) {
            this.userData = data
          }
          console.log(data, '工序ID获取站点信息')
          this.loadResourceData(data.OPERATIONS_ROUTE_ID)
          this.loadResourceProductData(data.ROUTE_ID)
          this.LoadResourceCmpData(data.OPERATIONS_ROUTE_ID)
        }
      })
        .catch(eer => {
          this.resourceData = []
        })

      // if (res.warnResult) {
      //   this.resourceData = []
      // }
    },

    radar () {
      /* =====================员工技能 雷达图 init=========================== */
      this.PersonRadar = echarts.init(document.getElementById('PersonRadar'))
      var optionRadar = null
      optionRadar = {
        tooltip: {},
        // 图表的位置
        grid: {
          position: 'center'
        },
        radar: {
          shape: 'circle',
          splitNumber: 2, // 雷达图圈数设置
          name: {
            textStyle: {
              color: '#fff'
            }
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(131,141,158,0.6)'
            }
          },
          indicator: [
            {
              name: 'FCT',
              max: 100
            },
            {
              name: 'ICT',
              max: 100
            },
            {
              name: '执锡',
              max: 100
            },
            {
              name: '面板QC',
              max: 100
            },
            {
              name: '底板QC',
              max: 100
            },
            {
              name: '插件',
              max: 100
            },
            {
              name: '特殊岗位',
              max: 100
            },
            {
              name: '包装刷油',
              max: 100
            }
          ],
          nameGap: 5, // 文字距离图形的距离
          radius: 70, // 设置雷达图大小
          // 雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          splitArea: {
            show: false,
            areaStyle: {
              color: '#54dcf2' // 图表背景的颜色
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(131,141,158,0.6)' // 设置网格的颜色
            }
          },
          // 若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
          axisLabel: {
            show: false,
            fontSize: 10,
            color: '#838D9E',
            showMaxLabel: false, // 不显示最大值，即外圈不显示数字30
            showMinLabel: false // 显示最小数字，即中心点显示0
          }
        },
        series: [
          {
            name: '技能分值', // tooltip中的标题
            type: 'radar', // 表示是雷达图
            symbol: 'circle', // 拐点的样式，'circle','rect','angle'等
            symbolSize: 5, // 拐点的大小
            areaStyle: {
              normal: {
                width: 0.1,
                opacity: 0.5
              }
            },
            data: [
              {
                // 插输入数据
                value: [],
                name: '技能分值', // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: 'rgba(255,225,0,.5)',
                    lineStyle: {
                      color: 'rgba(255,225,0,.5)'
                    }
                  }
                },
                // 在拐点处显示数值
                label: {
                  normal: {
                    show: true,
                    formatter: function (params) {
                      return params.value
                    }
                  }
                }
              }
            ]
          }
        ]
      }
      this.PersonRadar.setOption(optionRadar, true)
    },
    getEmployeeData () {
      var PersonRadar = echarts.init(document.getElementById('PersonRadar'))
      var arrseries = [60, 78, 70, 100, 78, 98, 100, 88]
      var arrxradar = [
        {
          name: 'FCT',
          max: 100
        },
        {
          name: 'ICT',
          max: 100
        },
        {
          name: this.$t('SOPRoutes._162'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._163'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._164'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._165'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._166'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._167'),
          max: 100
        }
      ]
      PersonRadar.hideLoading() // 隐藏加载动画
      PersonRadar.setOption({
        // 加载数据图表
        radar: {
          indicator: arrxradar
        },
        series: [
          {
            // 根据名字对应到相应的系列
            data: [
              {
                value: arrseries,
                name: this.$t('SOPRoutes._168'), // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: 'rgba(255,225,0,.5)',
                    lineStyle: {
                      color: 'rgba(255,225,0,.5)'
                    }
                  }
                },
                // 在拐点处显示数值
                label: {
                  normal: {
                    show: true,
                    formatter: function (params) {
                      return params.value
                    }
                  }
                }
              }
            ]
          }
        ]
      })
    },
    /** ===============  */
    async innerVisible_but (type) {
      this.callVal.CALL_TYPE_CODE = type
      this.callVal.CALL_CODE = ''
      this.callVal.CALL_CONTENT = ''
      const res = await this.callWindowInit()
      if (res.Result) {
        this.sort = res.Result
        this.innerVisible = true
        this.initRecord()
      }
    },
    async callWindowInit () {
      // eslint-disable-next-line no-return-await
      return await CallWindow(this.callVal.CALL_TYPE_CODE)
    },
    async handleChangeCallTypeCode (currentVal) {
      this.callVal.CALL_CODE = currentVal
      const res = await this.getCallCodeChinese()
      if (res.Result) {
        // eslint-disable-next-line no-useless-escape
        // const data = res.Result.replace(/\"/g, '')
        const data = res.Result
        this.callVal.CALL_CONTENT = data.CHINESE
        this.paramsCallContentId = data.ID
      }
    },
    async getCallCodeChinese () {
      // eslint-disable-next-line no-return-await
      return await GetCallCodeChinese({
        callCode: this.callVal.CALL_CODE,
        lineName: this.userData.OPERATION_LINE_NAME,
        siteName: this.userData.OPERATION_SITE_NAME
      })
    },
    // 异常区
    async initRecord () {
      const res = await this.getRecordBySiteId()
      if (res.Result) {
        this.callTable = JSON.parse(res.Result)
        this.calltotal = res.TotalCount
        this.handleClassify(JSON.parse(res.Result))
        console.log(this.callTable, 'this.callTable')
      }
    },
    handleSizeChange (val) {
      this.callData.Limit = val
      this.initRecord()
    },
    handleCurrentChange (val) {
      this.callData.Page = val
      this.initRecord()
    },
    async getRecordBySiteId () {
      this.callData.OPERATION_LINE_ID = this.StationFrom.OPERATION_LINE_ID
      this.callData.SITEID = this.StationID
      // eslint-disable-next-line no-return-await
      return await GetRecordBySiteId(this.callData)
    },
    // 选项
    handleClassify (data) {
      const newData = []
      data.map((item) => {
        switch (item.CALL_TYPE_CODE) {
          case this.$t('SOPRoutes._158'):
            if (this.callVal.CALL_TYPE_CODE === 0) {
              newData.push(item)
            }
            break
          case this.$t('SOPRoutes._159'):
            if (this.callVal.CALL_TYPE_CODE === 1) {
              newData.push(item)
            }
            break
          case this.$t('SOPRoutes._160'):
            if (this.callVal.CALL_TYPE_CODE === 2) {
              newData.push(item)
            }
            break
          case this.$t('SOPRoutes._161'):
            if (this.callVal.CALL_TYPE_CODE === 3) {
              newData.push(item)
            }
            break
        }
      })
      return newData
    },
    // 呼叫
    async shout_but () {
      if (this.callVal.CALL_CODE === '') {
        this.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: this.$t('SOPRoutes._169'),
          type: 'warning'
        })
        return
      }
      if (this.callVal.CALL_CONTENT === '') {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._170'),
          type: 'warning'
        })
        return
      }
      const params = {
        ...this.callVal,
        OPERATION_SITE_ID: this.siteID ? this.siteID : '000',
        OPERATOR: this.userinfo.USER_NAME
          ? this.userinfo.USER_NAME
          : this.account,
        CallContentId: this.paramsCallContentId
      }
      const res = await AddCallRecord(params)
      if (res.Result) {
        // var resData = res.Result // 返回的对象
        var myDate = new Date()
        var obj = {
          CREATE_TIME: myDate.toLocaleString(),
          OPERATOR: this.userinfo.USER_NAME
            ? this.userinfo.USER_NAME
            : this.account,
          CALL_CONTENT: this.callVal.CALL_CONTENT
        }
        this.updateMsgArea(obj, 'call')
        // window.top.updateMsgArea && window.top.updateMsgArea(resData, 'call') // 更新消息区
        this.$message.success(this.$t('SOPRoutes._171'))
        this.page = 1
        this.callTable = []
        await this.initRecord()
        this.resetCallVall()
      }
    },
    resetCallVall () {
      this.callVal = {
        CALL_TYPE_CODE: '',
        CALL_CODE: '',
        CALL_CONTENT: ''
      }
      this.paramsCallContentId = 0
    },
    // 签到
    async sign_but () {
      if (this.signArr.CALL_RECORD_IDS === '') {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._172'),
          type: 'warning'
        })
        return false
      }
      const res = await EditCallRecord(this.signArr)
      if (res.Result) {
        this.$message.success(this.$t('SOPRoutes._173'))
        this.callTable = []
        this.page = 1
        this.initRecord()
        let data = JSON.parse(res.Result)
        console.log(data, 'data')
        for (var i = 0; i < data.length; i++) {
          this.updateMsgArea(data[i], 'check')
          // window.top.updateMsgArea(res[i], 'check')
        }
      }
    },
    updateMsgArea (msg, type) {
      var msgArr = ''
      if (type === 'call') {
        msgArr =
          '<p>' +
          this.$t('crp.tb_5') +
          '：' +
          msg.CREATE_TIME +
          '<br/>' +
          this.$t('SOPRoutes._183') +
          '：' +
          msg.OPERATOR +
          this.$t('SOPRoutes._186') +
          '<br/>' +
          this.$t('SOPRoutes._184') +
          '：' +
          msg.CALL_CONTENT +
          '</p>'
      } else if (type === 'check') {
        msgArr =
          '<p>' +
          this.$t('crp.tb_13') +
          '：' +
          msg.CHECKIN_TIME +
          '<br/>' +
          this.$t('SOPRoutes._184') +
          '：' +
          msg.CALL_CONTENT +
          '<br/>' +
          this.$t('SOPRoutes._185') +
          '</p>'
      }
      this.msgArea = msgArr
    },
    handleRowClick (row) {
      var ids = ''
      for (var i = 0; i < row.length; i++) {
        ids += row[i].Id + '|'
      }
      console.log(ids, 'ids')
      this.signArr.CALL_RECORD_IDS = ids
    },
    // 获取员工信息
    async getUserData () {
      const res = await LoadEmployeeData(this.account)
      var data = JSON.parse(res.Result)
      if (res.Result) {
        // if (this.$route.query.name) {
        //   this.info.USER_NAME = this.$route.query.name
        // } else {
        //   this.info.USER_NAME = data.USER_NAME
        // }
        this.info.USER_SEX = data.USER_SEX
        this.info.WORKINGYEARS = data.WORKINGYEARS
        this.info.EDUCATION = data.EDUCATION
        this.info.ENTRYDATE = data.ENTRYDATE
        this.info.PHOTO = data.PHOTO
        this.info.PHOTO_BASE64 = data.PHOTO_BASE64
        this.info.USER_AGE = data.USER_AGE
        console.log(res, '获取员工信息获取员工信息获取员工信息')

        console.log(data, '获取员工信')
        if (data.TRAIN_GRAGE_LIST.length > 0) {
          // showStamper(data.TRAIN_GRAGE_LIST);
          var arrxradar = [] // new Array[]; 数组
          var arrseries = [] // new Array[]; 数组
          for (var i in data.TRAIN_GRAGE_LIST) {
            if (data.TRAIN_GRAGE_LIST[i].GRADE === 0) {
              arrseries.push(60)
            } else {
              arrseries.push(data.TRAIN_GRAGE_LIST[i].GRADE)
            }
            var obj = {} // 对象
            obj.max = 100
            obj.name = data.TRAIN_GRAGE_LIST[i].TRAIN_NAME
            arrxradar.push(obj)
          }

          this.PersonRadar.hideLoading() // 隐藏加载动画
          this.PersonRadar.setOption({
            // 加载数据图表
            radar: {
              indicator: arrxradar
            },
            series: [
              {
                // 根据名字对应到相应的系列
                data: [
                  {
                    value: arrseries,
                    name: this.$t('SOPRoutes._168'), // 设置区域边框和区域的颜色
                    itemStyle: {
                      normal: {
                        color: 'rgba(255,225,0,.5)',
                        lineStyle: {
                          color: 'rgba(255,225,0,.5)'
                        }
                      }
                    },
                    // 在拐点处显示数值
                    label: {
                      normal: {
                        show: true,
                        formatter: function (params) {
                          return params.value
                        }
                      }
                    }
                  }
                ]
              }
            ]
          })
        }
      }
    },

    // 加载作业图列表
    async loadResourceData (e) {
      const res = await LoadResourceData(e)
      if (res.Result) {
        this.resourceData = JSON.parse(res.Result)
        this.resourceData.map(v => {
          v.RESOUTCE_PDF_URL = v.RESOUTCE_PDF_URL || v.RESOURCE_URL
        })
        console.log(this.resourceData, '加载作业图轮播图')
      }
    },
    // 获取产品图:资源列表
    async loadResourceProductData (id) {
      const res = await LoadResourceProductData(id)
      if (res.Result) {
        this.productData = JSON.parse(res.Result)
        // console.log(JSON.parse(res.Result), '获取产品图:资源列表')
      }
    },
    // 获取 零件图:资源列表
    async LoadResourceCmpData (id) {
      const res = await LoadResourceCmpData(id)
      if (res.Result) {
        // console.log(JSON.parse(res.Result), '获取零件图:资源列表')
        const data = JSON.parse(res.Result)
        this.Resource = data.length
        console.log(this.Resource, 'this.Resource')
        this.Resource1 = data[0]
        this.Resource2 = data[1]
        this.Resource3 = data[2]
        this.Resource4 = data[3]
        this.Resource5 = data[4]
        this.Resource6 = data[5]
      }
    },
    matchType (fileName) {
      // 后缀获取
      var suffix = ''
      // 获取类型结果
      var result = ''
      try {
        var flieArr = fileName.split('.')
        suffix = flieArr[flieArr.length - 1]
      } catch (err) {
        suffix = ''
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false
        return result
      }
      // 图片格式
      var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'image'
        return result
      }
      // 匹配txt
      var txtlist = ['txt']
      result = txtlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'txt'
        return result
      }
      // 匹配 excel
      var excelist = ['xls', 'xlsx']
      result = excelist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'excel'
        return result
      }
      // 匹配 word
      var wordlist = ['doc', 'docx']
      result = wordlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'word'
        return result
      }
      // 匹配 pdf
      var pdflist = ['pdf']
      result = pdflist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'pdf'
        return result
      }
      // 匹配 ppt
      var pptlist = ['ppt']
      result = pptlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'ppt'
        return result
      }
      // 匹配 视频
      var videolist = ['mp4', 'avi', 'rmvb', 'flv']
      result = videolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'video'
        return result
      }
      // 匹配 音频
      var radiolist = ['mp3', 'wav', 'wmv']
      result = radiolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'radio'
        return result
      }
      // 其他 文件类型
      result = 'other'
      return result
    }
  }
}
</script>
<style type="text/css" lang="scss">
.primary-operation .el-dialog {
  height: 100%;
  margin: 0;
  background: #040f3c;
}
.primary-operation .el-dialog .el-dialog__body {
  padding: 0;
  height: 90%;
  background: #040f3c;
}
.sop .btn-style {
  margin: 0px;
  margin-top: 40px;
}
.sop .stamper {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: 160px;
  height: 70px;
  line-height: 60px;
  margin: 140px 0 0 300px;
  text-align: center;
  font-size: 40px;
  font-weight: 900;
  font-family: '新宋体';
  transform: rotate(-20deg);
  cursor: pointer;
  border-radius: 50% / 50%;
}

.sop .yes_stamper {
  border: 5px solid rgba(18, 233, 35, 0.6);
  color: rgba(18, 233, 35, 0.6);
}

.sop .no_stamper {
  border: 5px solid rgba(255, 0, 0, 0.6);
  color: rgba(255, 0, 0, 0.6);
}
.sop .border-container {
  color: #ffffff;
}
.sop-dialog {
  overflow: hidden;
}
.sop-dialog .el-dialog__body {
  padding: 15px;
}
.sop-dialog-title {
  background-color: #3e9ce2;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  margin-bottom: 10px;
}
.sop-dialog-area label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
}
.sop-dialog-area label span {
  width: 80px;
}
.sop-dialog-button {
  padding-top: 15px;
  color: #fff;
  text-align: right;
}
/* 按钮 */
.kanban-title-tab {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  font-size: 14px;
}
.kanban-title-tab span {
  width: 50px;
  height: 29px;
  line-height: 29px;
  margin-left: 10px;
  background: rgb(4, 15, 60);
  border-radius: 4px;
  border: 1px solid #23548c;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.kanban-title-tab span:hover {
  background: rgb(4, 15, 60);
}
// 高度设置
.sop-center {
  height: calc(100vh - 90px - 60px);
}
</style>

<style>
.sop {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.carousel-text {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  background: rgba(0, 0, 0, 0.6);
}
.carousel-text .last {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 100%;
  padding: 0px 5px;
}
.sop .el-carousel {
  width: 100%;
  height: 100%;
}
.sop .el-carousel__container {
  width: 100%;
  height: 100%;
}
.sop .el-carousel__container .el-carousel__item {
  text-align: center;
}
.sop .el-carousel__container .el-carousel__item img {
  height: 100%;
}
.sop .btn-6:before {
  content: '';
  background-color: #53cdd8;
  position: absolute;
  z-index: -1;
  top: 0;
  right: -30px;
  height: 100%;
  width: 0;
  -webkit-transform: skew(45deg, 0);
  transform: skew(45deg, 0);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.sop .sp-titx {
  width: 100px !important;
}
.sop .callTable-radio .el-radio__label {
  display: none;
}
.sop-dialog-table {
  height: calc(100vh - 555px);
}
.sop .border-container .div-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style lang="scss" scoped>
.header-title {
  height: 80px;
  line-height: 80px;
}
</style>
