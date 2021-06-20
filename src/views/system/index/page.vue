<template>
  <d2-container>
    <el-row>
      <el-col :span="16">
        <el-row>
          <div style="margin-bottom: 10px">
            <div ref="topBlock"
                 style="
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
              ">
              <el-image style="height: 100%; font-size: 0"
                        :src="require('@/assets/images/WechatIMG2212.jpeg')"
                        fit="fill"
                        lazy></el-image>
            </div>
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <!-- 通知公告 -->
            <el-card class="box-card no-shadow"
                     ref="tongzhigonggao">
              <div slot="header"
                   class="clearfix"
                   style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                ">
                <div style="display: flex; align-items: center">
                  <i class="el-icon-s-order"
                     style="color: #3398db; margin-right: 5px; font-size: 18px"></i>
                  <span style="font-size: 16px; color: #333">{{
                    $t("homePage._5")
                  }}</span>
                </div>
                <span class="load-more"
                      @click="lookMoreGonggao">{{ $t("homePage._6") }} >></span>
              </div>
              <div class="list"
                   style="overflow: auto; height: 180px">
                <div :class="{activeColor:GonggaoInfoArr.indexOf(index) !== -1}"
                     class="item-x"
                     v-for="(item,index) in announcementList"
                     :key="index"
                     @click="toGonggaoInfo(item,index)">
                  <div style="
                      display: flex;
                      align-items: center;
                      width: 60%;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    ">
                    <el-tag effect="dark"
                            v-if="item.IS_TOP"
                            type="danger"
                            style="margin-right: 5px"
                            size="mini">{{ $t("homePage._7") }}</el-tag>
                    <span class="title">{{ item.TITLE }}</span>
                  </div>
                  <span class="time"
                        style="font-size: 14px">{{
                    item.UPDATED_TIME || item.CRATED_TIME
                  }}</span>
                </div>
                <div class="empty-page"
                     style="width: 100%; height: 100%"
                     v-show="announcementList.length <= 0">
                  <el-image :src="require('@/assets/images/empty-image-default.png')"
                            fit="cover"></el-image>
                </div>
              </div>
            </el-card>
            <!-- 预警信息 -->
            <el-card class="box-card no-shadow"
                     ref="yujingxinxi"
                     style="padding-top: 20px">
              <div slot="header"
                   class="clearfix"
                   style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                ">
                <div style="display: flex; align-items: center">
                  <i class="el-icon-s-marketing"
                     style="color: #3398db; margin-right: 5px; font-size: 18px"></i>
                  <span style="font-size: 16px; color: #333">{{
                    $t("homePage._8")
                  }}</span>
                </div>
                <span class="load-more"
                      @click="toWarningList">{{ $t("homePage._6") }} >></span>
              </div>
              <div class="list"
                   style="max-height: 465px; overflow: auto">
                <div :class="{activeColor:warningArr.indexOf(index) !== -1}"
                     class="item-x"
                     v-for="(item,index) in WarningList"
                     :key="index"
                     @click="toWarning(item,index)">
                  <div style="
                      display: flex;
                      align-items: center;
                      width: 60%;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    ">
                    <el-tag effect="dark"
                            type="danger"
                            size="mini"
                            style="margin-right: 5px"
                            v-if="item.STATUS === 0">{{ $t("homePage._9") }}</el-tag>
                    <el-tag effect="dark"
                            type="warning"
                            size="mini"
                            style="margin-right: 5px"
                            v-if="item.STATUS === 1">{{ $t("homePage._10") }}</el-tag>
                    <el-tag effect="dark"
                            type="success"
                            size="mini"
                            style="margin-right: 5px"
                            v-if="item.STATUS === 2">{{ $t("homePage._11") }}</el-tag>
                    <el-tag effect="dark"
                            type="info"
                            size="mini"
                            style="margin-right: 5px"
                            v-if="item.STATUS === 3">{{ $t("homePage._12") }}</el-tag>
                    <!--                    <el-tooltip class="item" effect="dark" :content="item.CALL_CONTENT" placement="top-start">-->
                    <!--                      <span class="title">{{item.CALL_CONTENT}}</span>-->
                    <!--                    </el-tooltip>-->
                    <el-popover placement="right"
                                width="400"
                                trigger="hover"
                                disabled>
                      <div>
                        <el-form>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item :label="$t('homePage._13') + ':'">{{
                                item.CALL_CODE
                              }}</el-form-item>
                              <el-form-item :label="$t('homePage._14') + ':'">{{
                                item.LINE_TYPE
                              }}</el-form-item>
                              <el-form-item :label="$t('homePage._15') + ':'">{{
                                item.OPERATION_NAME
                              }}</el-form-item>
                              <el-form-item :label="$t('homePage._16') + ':'">{{
                                item.OPERATOR
                              }}</el-form-item>
                              <el-form-item :label="$t('homePage._17') + ':'">
                                <span v-if="item.STATUS === 0">{{
                                  $t("homePage._9")
                                }}</span>
                                <span v-if="item.STATUS === 1">{{
                                  $t("homePage._10")
                                }}</span>
                                <span v-if="item.STATUS === 2">{{
                                  $t("homePage._11")
                                }}</span>
                                <span v-if="item.STATUS === 3">{{
                                  $t("homePage._12")
                                }}</span>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item :label="$t('homePage._18') + ':'">{{
                                item.CALL_CONTENT
                              }}</el-form-item>
                              <el-form-item :label="$t('homePage._19') + ':'">{{
                                item.OPERATION_LINE_NAME
                              }}</el-form-item>
                              <el-form-item :label="$t('homePage._20') + ':'">{{
                                item.OPERATION_SITE_NAME
                              }}</el-form-item>
                              <el-form-item :label="$t('homePage._21') + ':'">{{
                                item.CREATE_TIME
                              }}</el-form-item>
                            </el-col>
                          </el-row>
                        </el-form>
                      </div>
                      <span class="title"
                            slot="reference">{{
                        item.CALL_CONTENT
                      }}</span>
                    </el-popover>
                  </div>
                  <span class="time"
                        style="font-size: 14px">{{
                    item.CREATE_TIME
                  }}</span>
                </div>
                <div class="empty-page"
                     style="width: 100%; height: 100%"
                     v-show="WarningList.length <= 0">
                  <el-image :src="require('@/assets/images/empty-image-default.png')"
                            fit="cover"></el-image>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <div>
              <!-- 常用功能 -->
              <el-card class="box-card no-shadow"
                       ref="changyonggongneng">
                <div slot="header"
                     class="clearfix">
                  <i class="el-icon-s-promotion"
                     style="color: #3398db; margin-right: 5px; font-size: 18px"></i>
                  <span style="font-size: 16px; color: #333">{{
                    $t("homePage._22")
                  }}</span>
                </div>
                <el-card shadow="hover"
                         v-for="(item, index) in commonFunctionsList"
                         :key="index"
                         class="textItem">
                  <div style="cursor: pointer"
                       @click="toCommonFunctions(item)">
                    <i class="FeaturesIcon fa"
                       :class="`fa-${item.MENU_ICON || 'paperclip'}`"
                       :style="{ color: iconColors[index] }"></i>
                    <span class="name-block"
                          style="
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: 14px;
                        display: inline-block;
                        width: 100%;
                      ">{{
                        $i18n.locale === "zh-chs"
                          ? item.MENU_TITLE
                          : item.MENU_EN_TITLE
                      }}</span>
                  </div>
                </el-card>
              </el-card>
              <!-- 待办事项 -->
              <el-card class="box-card no-shadow"
                       style="margin-top: 10px">
                <div slot="header"
                     class="clearfix"
                     style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  ">
                  <div style="display: flex; align-items: center">
                    <i class="el-icon-s-platform"
                       style="color: #3398db; margin-right: 5px; font-size: 18px"></i>
                    <span style="font-size: 16px; color: #333">{{
                      $t("homePage._23")
                    }}</span>
                  </div>
                  <span class="load-more"
                        @click="toDoList">{{ $t("homePage._6") }} >></span>
                </div>
                <div>
                  <div class="list"
                       :style="{
                      maxHeight: '400px',
                      overflowY: 'auto',
                    }">
                    <div :class="{activeColor:toDoArr.indexOf(index) !== -1}"
                         class="item-x"
                         v-for="(item,index) in WaitList"
                         :key="index"
                         @click="toDo(item,index)">
                      <div>
                        <el-tag effect="dark"
                                type="danger"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 0">{{ $t("homePage._9") }}</el-tag>
                        <el-tag effect="dark"
                                type="warning"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 1">{{ $t("homePage._10") }}</el-tag>
                        <el-tag effect="dark"
                                type="success"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 2">{{ $t("homePage._11") }}</el-tag>
                        <el-tag effect="dark"
                                type="info"
                                size="mini"
                                style="margin-right: 5px"
                                v-if="item.STATUS === 3">{{ $t("homePage._12") }}</el-tag>
                        <span class="title">{{ item.CALL_CONTENT }}</span>
                      </div>
                      <span class="time"
                            style="font-size: 14px">{{
                        item.CREATE_TIME
                      }}</span>
                    </div>
                    <div class="empty-page"
                         style="width: 100%; height: 100%"
                         v-show="!WaitList.length">
                      <el-image :src="
                          require('@/assets/images/empty-image-default.png')
                        "
                                fit="cover"></el-image>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8"
              style="padding: 0 0 0 10px">
        <el-row>
          <!-- 备忘录 -->
          <div style="margin-bottom: 0px; zoom: 1">
            <el-card class="topBox-card no-shadow">
              <el-calendar class="my-calendar">
                <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
                <template slot="dateCell"
                          slot-scope="{ date, data }">
                  <p @click="memorandumClick(date, data)"
                     style="
                      height: 100%;
                      overflow: hidden;
                      text-align: center;
                      font-size: 14px;
                      margin-block-start: 0 !important;
                      margin-block-end: 0 !important;
                    ">
                    <!--这里原本有动态绑定的class，去掉-->
                    <span style="
                        font-size: 14px !important;
                        display: block;
                        margin-top: 2px;
                      ">{{ data.day.split("-").slice(1).join("-") }}</span>
                    <span style="
                        font-size: 14px;
                        color: #e6a23c;
                        display: block;
                        margin-top: 5px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                      ">{{ dealMyDate(data.day) }}</span>
                  </p>
                </template>
              </el-calendar>
            </el-card>
          </div>
        </el-row>
        <el-row>
          <!-- 版本信息 -->
          <el-card class="no-shadow x-2x2">
            <div slot="header"
                 class="clearfix"
                 style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              ">
              <div style="display: flex; align-items: center">
                <i class="el-icon-s-flag"
                   style="color: #3398db; margin-right: 5px; font-size: 18px"></i>
                <span style="font-size: 16px; color: #333">{{
                  $t("homePage._24")
                }}</span>
              </div>
              <span class="load-more"
                    @click="toVersionList">{{ $t("homePage._6") }} >></span>
            </div>
            <div class="block">
              <el-timeline class="no-shadow"
                           style="overflow-y: auto; max-height: 400px">
                <el-timeline-item v-for="(itme, index) in MvcData"
                                  :key="index"
                                  :timestamp="itme.CRATED_TIME"
                                  placement="top">
                  <div style="cursor: pointer"
                       @click="toVersion(itme)">
                    <el-card class="timeline-x">
                      <h4 style="font-weight: normal">{{ itme.TITLE }}</h4>
                      <p style="color: #999">
                        {{ itme.UPDATED_BY }} {{ $t("homePage._40") }}
                        <span style="font-size: 14px">{{
                          itme.UPDATED_TIME
                        }}</span>
                      </p>
                    </el-card>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>

    <el-divider>
      <span style="color: #e5e5e5">{{ $t("homePage._25") }}</span>
    </el-divider>

    <el-dialog :title="$t('homePage._26')"
               :visible.sync="dialogTableVisible"
               class="beiwanglu"
               :before-close="handlebeforeClose">
      <div style="margin-bottom: 10px">
        <el-button type="success"
                   @click="AddBeiwanglu">{{
          $t("homePage._27")
        }}</el-button>
      </div>
      <el-table :data="beiWangList"
                highlight-current-row
                border
                height="400px">
        <el-table-column type="index"
                         align="center"
                         :label="$t('homePage._28')"
                         width="50"></el-table-column>
        <el-table-column align="center"
                         property="TAG"
                         :label="$t('homePage._29')"
                         min-width="100"></el-table-column>
        <el-table-column align="center"
                         property="TITLE"
                         :label="$t('homePage._30')"
                         min-width="150"></el-table-column>
        <el-table-column align="center"
                         property="REMARK"
                         :label="$t('homePage._31')"
                         min-width="200"
                         show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right"
                         :label="$t('homePage._32')"
                         align="center"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="
                deleteRow(scope.$index, beiWangList, scope.row)
              "
                       type="text"
                       size="small">{{ $t("homePage._33") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--    modal-->
    <el-dialog :title="$t('homePage._26')"
               :visible.sync="dialogTableVisible2"
               class="beiwanglu"
               width="30%">
      <div>
        <el-form ref="beiwangluForm"
                 :model="beiwangluForm"
                 label-width="120px">
          <el-form-item :label="$t('homePage._30')">
            <el-input v-model="beiwangluForm.TITLE"
                      placeholder=" "></el-input>
          </el-form-item>
          <el-form-item :label="$t('homePage._29')"
                        prop="TAG">
            <el-time-picker style="width: 100%"
                            v-model="beiwangluForm.TAG"
                            :default-value="new Date()"
                            placeholder=" "
                            value-format="HH:mm:ss"></el-time-picker>
          </el-form-item>
          <el-form-item :label="$t('homePage._31')">
            <el-input type="textarea"
                      v-model="beiwangluForm.REMARK"
                      placeholder=" "></el-input>
          </el-form-item>
          <el-form-item>
            <div style="text-align: right">
              <el-button @click="dialogTableVisible2 = false">{{
                $t("homePage._34")
              }}</el-button>
              <el-button type="primary"
                         plain
                         @click="onSubmit">{{
                $t("homePage._35")
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  MesHomeMemorandumLoadData,
  SaveData as _SaveData,
  DeleteOneById as _DeleteOneById
} from '@/api/MesHomeMemorandum'
import { MesHomeArticleLoadData } from '@/api/MesHomeArticle'
import { LoadEarlyWarningData, LoadWaitTakeData } from '@/api/AndonCallRecord'
import { MVCLoadData } from '@/api/Index'
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'
export default {
  components: {},
  data () {
    return {
      ProductionCapacity: null,
      OperatingStatus: null,
      PassRate: null,
      DefectiveRate: null,
      banner: {
        title: 'IMS v2.1',
        subTitle: this.$t('homePage._4')
      },
      resDate: [],
      value: new Date(),
      iconArray: [
        'el-icon-setting',
        'el-icon-picture',
        'el-icon-s-flag',
        'el-icon-s-check',
        'el-icon-share',
        'el-icon-headset',
        'el-icon-chat-dot-round'
      ],
      iconColors: [
        '#33B5E5',
        '#0099CC',
        '#AA66CC',
        '#CC0000',
        '#99CC00',
        '#669900',
        '#FFBB33'
      ],
      announcementList: [],
      MvcData: [],
      WarningList: [],
      WaitList: [],
      dialogTableVisible: false,
      dialogTableVisible2: false,
      beiWangList: [],
      beiwangluForm: {},
      currentRiqi: '',
      loading: null,
      GonggaoInfoArr: [],
      warningArr: [],
      toDoArr: []
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'commonFunctionsList', 'initFlag'])
  },
  created () {
    if (!this.initFlag) {
      this.loading = this.$loading({
        lock: true,
        text: 'System Initializing...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
  },
  watch: {
    '$i18n.locale': {
      handler () {
        this.banner.subTitle = this.$t('homePage._1')
      }
    }
  },
  methods: {
    ...mapActions({
      getData: 'custom/commonFunctions/getData',
      setData: 'custom/commonFunctions/setData'
    }),
    // 查询首页待办信息数据
    async getLoadWaitTakeData () {
      const res = await LoadWaitTakeData({ User_ID: this.userinfo.ID })
      this.WaitList = res.Result ? res.Result : []
    },
    // 获取首页预警信息数据
    async getLoadEarlyWarningData () {
      const res = await LoadEarlyWarningData({ User_ID: this.userinfo.ID })
      this.WarningList = res.Result ? res.Result : []
    },
    // 获取备忘录
    async getMemorandumLoadData () {
      this.resDate = []
      const res = await MesHomeMemorandumLoadData({
        USER_ID: this.userinfo.ID
      })
      const data = res.Result || []
      data.map((item) => {
        this.resDate.push({
          date: item.TAR_DATE.replace(/\s+/g, ''),
          content: item.TITLE.replace(/\s+/g, '')
        })
      })
    },
    // 获取公告
    async getMesHomeArticleLoadData () {
      const res = await MesHomeArticleLoadData()
      const data = res.Result || []
      this.announcementList = data
    },
    // 获取版本更新信息
    async getMVCLoadData () {
      const res = await MVCLoadData()
      if (res.Result) {
        this.MvcData = res.Result
      }
    },
    // 备忘录遍历
    dealMyDate (v) {
      let len = this.resDate.length
      let res = ''
      for (let i = 0; i < len; i++) {
        if (this.resDate[i].date === v) {
          res = this.resDate[i].content
          break
        }
      }
      return res
    },
    // 备忘录跳转
    _memorandumClick (e) {
      this.$confirm('马上跳转到配置页面？', this.$t('MesTongsApply._91'), {
        confirmButtonText: this.$t('MesTongsApply._92'),
        cancelButtonText: this.$t('MesTongsApply._93'),
        type: 'warning'
      })
        .then(async () => {
          this.$router.push({ path: '/MesHomeMemorandum/Index' })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消跳转'
          })
        })
    },
    async memorandumClick (date, data) {
      const riqi = data.day
      const uid = this.userinfo.ID
      const res = await MesHomeMemorandumLoadData({
        USER_ID: uid,
        TAR_DATE: riqi
      })
      const list = res.Result || []
      this.beiWangList = list
      this.currentRiqi = riqi
      this.dialogTableVisible = true
      if (list.length) {
        // TODO 已经有备忘录了
      } else {
        // TODO 还没有备忘录
      }
    },
    async deleteRow (index, rows, row) {
      const res = await _DeleteOneById(row.ID)
      if (res.Result) {
        this.$message.success(this.$t('homePage._36'))
        rows.splice(index, 1)
      }
    },
    AddBeiwanglu () {
      this.beiwangluForm = {
        TAG: dayjs().format('HH:mm:ss')
      }
      this.dialogTableVisible2 = true
    },
    async onSubmit () {
      if (!this.currentRiqi) {
        this.$message.error(this.$t('homePage._37'))
        return false
      }
      if (!this.beiwangluForm.TITLE) {
        this.$message.error(this.$t('homePage._38'))
        return false
      }
      const res = await _SaveData({
        InsertRecords: [
          {
            ID: 0,
            USER_ID: this.userinfo.ID,
            TAR_DATE: this.currentRiqi,
            TITLE: this.beiwangluForm.TITLE,
            TAG: this.beiwangluForm.TAG || '',
            REMARK: this.beiwangluForm.REMARK || '',
            CREATED_BY: this.userinfo.USER_NAME || '',
            STATUS: 1,
            CRATED_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            FLAG: 1
          }
        ]
      })
      if (res.Result) {
        this.$message.success(this.$t('homePage._39'))
        this.dialogTableVisible2 = false
        const res = await MesHomeMemorandumLoadData({
          USER_ID: this.userinfo.ID,
          TAR_DATE: this.currentRiqi
        })
        const list = res.Result || []
        this.beiWangList = list
      }
    },
    handlebeforeClose (done) {
      this.dialogVisible = false
      this.getMemorandumLoadData()
      done()
    },
    toGonggaoInfo (item, index) {
      this.GonggaoInfoArr.push(index)
      window.open(
        window.location.origin + '#/PreviewArticle/index?ID=' + item.ID
      )
    },
    lookMoreGonggao () {
      window.open(window.location.origin + '#/PreviewArticleList/index')
    },
    toVersion (item) {
      window.open(
        window.location.origin + '#/VersionInformation/index?ID=' + item.ID
      )
    },
    toVersionList () {
      window.open(window.location.origin + '#/VersionInformationList/index')
    },
    toWarningList () {
      window.open(window.location.origin + '#/WarningInformationList/index')
    },
    toWarning (item, index) {
      this.warningArr.push(index)
      window.open(
        window.location.origin + '#/WarningInformation/index?ID=' + item.ID
      )
    },
    toDoList () {
      window.open(window.location.origin + '#/ToDoList/index')
    },
    toDo (item, index) {
      this.toDoArr.push(index)
      window.open(window.location.origin + '#/ToDo/index?ID=' + item.ID)
    },
    toCommonFunctions (item) {
      this.$router.push({
        path: item.MENU_PATH
      })
    }
  },
  async mounted () {
    Promise.all([
      await this.getMemorandumLoadData(),
      await this.getMesHomeArticleLoadData(),
      await this.getMVCLoadData(),
      await this.getLoadEarlyWarningData(),
      await this.getLoadWaitTakeData()
    ])
    await this.setData()
    await this.getData()
    if (this.loading) this.loading.close()
  },
  beforeDestroy () { }
}
</script>

<style lang="scss" scoped>
.activeColor {
  color: #e6a23c !important;
}
.AlarmDetails {
  display: inline-block;
  margin: 10px 0;
  padding: 0 10px;
  color: rgb(119, 119, 119);
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
a:hover {
  color: #3398db;
}
.Yield {
  display: inline-block;
  width: 30px;
  height: 100px;
  // background-color: #727375;
  background: -webkit-gradient(
    linear,
    100% 0%,
    0% 0%,
    from(#bbb8b8),
    color-stop(0.5, #777676),
    to(#bbb8b8)
  );
  // margin-right: 10px;
  color: #fff;
  line-height: 100px;
  font-size: 28px;
  text-align: center;
}
</style>

<style lang="scss" scoped>
.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}
.is-selected {
  color: #f8a535;
  font-size: 10px;
  margin-top: 5px;
}
#calendar
  .el-button-group
  > .el-button:not(:first-child):not(:last-child):after {
  content: '当月';
}
.el-card__body {
  display: flex;
  flex-flow: row wrap;
}
.textItem {
  display: inline-block;
  width: 25%;
  // height: 100px;
  box-sizing: border-box;
  text-align: center;
}
.textItem[data-v-f069e63c] {
  margin: 0;
}
.FeaturesIcon {
  color: #3398db;
  font-size: 30px;
  display: block;
  line-height: 50px;
}
.name-block {
  font-size: 15px;
  color: #333;
}
.empty-page {
  display: flex;
  justify-content: center;
  img {
    display: block;
  }
}
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
.item-x .time {
  color: #999;
}
.item-x:hover .time {
  color: #666;
}
.load-more {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
}
// .list {
//   background: url(../../../assets/images/empty-image-default.png);
// }
</style>

<style>
.el-calendar__header {
  padding: 5px;
}
.el-calendar-table thead th {
  padding: 6px 0;
}
.box-card .el-card__header {
  padding: 10px 20px !important;
}

.box-card .el-card__body {
  padding: 5px 10px !important;
}

.custom-index-tabs .el-tabs__content {
  overflow-y: auto;
}

.el-calendar__body {
  padding: 0 0 0 0 !important;
}

.no-shadow {
  box-shadow: none !important;
  border: none !important;
  padding-inline-start: 0 !important;
}
.title {
  width: 50%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* .title:hover {
  width: auto;
} */

.el-calendar-table .el-calendar-day {
  padding: 5px !important;
}

.el-calendar-table .el-calendar-day {
  height: 55px !important;
}

.el-calendar-table thead th {
  font-size: 14px !important;
}

.el-calendar__title {
  color: #333 !important;
  font-weight: normal !important;
}

.beiwanglu .el-dialog__body {
  padding: 10px 20px 20px;
}

.timeline-x .el-card__body {
  padding: 0 20px 0 20px !important;
}

.x-2x2 > .el-card__body {
  padding: 20px 0 20px 0 !important;
}
</style>
