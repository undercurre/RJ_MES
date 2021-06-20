<template>
  <custom-container bodyBg="red">
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
        :isFull="true"
      >
        <el-button
          type="primary"
          icon="el-icon-circle-check"
          @click.prevent="saveData"
          v-if="$btnList.indexOf('PatchlineconfigSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-s-operation"
          @click="addLine"
          v-if="$btnList.indexOf('PatchlineconfigCreateLine') !== -1"
        >{{ $t('Patchlineconfig._1') }}</el-button>
        <el-button
          type="warning"
          icon="el-icon-edit-outline"
          @click="modifyLine"
          v-if="$btnList.indexOf('PatchlineconfigCreateLine') !== -1"
        >{{ $t('Patchlineconfig._2') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-folder-add"
          @click="addSMT"
          v-if="$btnList.indexOf('PatchlineconfigCreateStation') !== -1"
        >{{ $t('Patchlineconfig._3') }}</el-button>
        <el-button
          type="warning"
          icon="el-icon-edit"
          @click="modifySMT"
          v-if="$btnList.indexOf('PatchlineconfigCreateStation') !== -1"
        >{{ $t('Patchlineconfig._4') }}</el-button>
      </custom-container-header>
    </template>
    <div
      style="width: 100vw;position: relative;margin-left: -20px; overflow: hidden;height: calc(100vh - 57px - 20px)"
    >
      <el-row>
        <el-col :span="4">
          <div
            class="x-height grid-content bg-purple"
            style="margin: 0 2px;border: 1px solid rgb(221, 223, 230);border-radius: 4px"
          >
            <div>
              <span
                style="display: block;color: #606266;font-size: 14px;margin: 5px 0 5px 10px;"
              >{{ $t('Patchlineconfig._5') }}</span>
            </div>
            <div
              class="x-1-height"
              style="margin: 0 2px 2px;border: 1px solid rgb(221, 223, 230);border-radius: 4px"
            >
              <el-input
                class="search-line"
                size="mini"
                v-model="filterLineName"
                @input="fileterLine"
                prefix-icon="el-icon-search"
              ></el-input>
              <div
                @contextmenu="handleContextmenuLine($event, key, 'deleteLine')"
                :class="{
                'x-line-item': currentLineItem === key,
                'is-hide': item.flag
              }"
                class="line-item"
                @click="handleChooseLine(item, key)"
                v-for="(item, key) in tempLinesLists"
                :key="item.ID"
              >{{ item.LINE_NAME }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple-light">
            <div class="x-height" style="background: rgb(237, 245, 253)">
              <div>
                <span
                  style="display: block;color: #606266;font-size: 18px;padding: 5px 0 5px 10px;font-weight: bold"
                >{{ linesLists[currentLineItem] ? linesLists[currentLineItem].LINE_NAME : '' }}</span>
              </div>
              <div class="block-ctx">
                <div class="SMT-ctx">
                  <div
                    style="display: flex;align-items:center"
                    v-for="(item, key) in RoutStationList"
                    :key="item.ID"
                  >
                    <div
                      class="SMT-item"
                      v-show="!item.flag"
                      @click="handleChooseStation(item, key)"
                      @contextmenu="handleContextmenuLine($event, key, 'deleteStation')"
                    >
                      <div class="block">
                        <span
                          style="display: block;color: #606266;font-size: 14px;margin: 5px 0 5px 10px;font-weight: bold"
                        >{{ item.SMT_NAME }}</span>
                        <img src="@/assets/images/SMT.png" alt />
                      </div>

                      <div class="checked" v-if="currentStation === key">
                        <svg
                          t="1586173213914"
                          class="icon"
                          viewBox="0 0 1610 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          p-id="3945"
                          width="200"
                          height="200"
                        >
                          <path
                            d="M1477.266481 53.200311C1496.76388 34.680344 1528.294059 34.603008 1547.995672 53.316901 1567.560899 71.901233 1567.840841 101.766485 1548.118406 120.500175L626.797373 995.631397C603.534726 1016.220623 563.997062 1029.339038 513.058328 983.938633L17.15634 512.898341C-2.425954 494.297819-2.576189 464.283063 17.125474 445.56917 36.6907 426.984838 68.302946 426.881024 88.008314 445.598476L576.082798 909.2037 1477.266481 53.200311Z"
                            p-id="3946"
                            fill="#ffffff"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="next-corrow" v-if="!item.flag && key < RoutStationList.length - 1">
                      <svg
                        t="1586167103877"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3122"
                        width="200"
                        height="200"
                      >
                        <path
                          d="M989.866667 482.133333L597.333333 110.933333c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733334l315.733333 298.666666H64c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667H853.333333l-315.733333 298.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 8.533333 8.533333 21.333333 12.8 29.866667 12.8 8.533333 0 21.333333-4.266667 29.866666-12.8l392.533334-371.2c8.533333-8.533333 12.8-21.333333 12.8-29.866667s-4.266667-21.333333-12.8-29.866667z"
                          fill="#2497FF"
                          p-id="3123"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div
            class="x-height grid-content bg-purple-light"
            style="margin: 0 2px;border: 1px solid rgb(221, 223, 230);border-radius: 4px"
          >
            <div>
              <span
                style="display: block;color: #606266;font-size: 14px;margin: 5px 0 5px 10px;"
              >{{ linesLists[currentLineItem] ? linesLists[currentLineItem].LINE_NAME : '' }} {{ $t('Patchlineconfig._6') }}</span>
            </div>
            <div
              class="x-2-height"
              style="margin: 0 2px 2px;border: 1px solid rgb(221, 223, 230);border-radius: 4px;padding: 2px 2px 2px 0"
            >
              <el-form ref="lineSet" size="mini" :model="lineSetForm" label-width="130px">
                <el-form-item :label="$t('Patchlineconfig._7')">
                  <el-input  type="number" v-model="lineSetForm._1.VALUE"></el-input>
                </el-form-item>
                <!-- DIO卡类型 -->
                <el-form-item :label="$t('Patchlineconfig._55')">
                  <el-select  style="width:100%" v-model="lineSetForm._2.VALUE">
                     <el-option
                      v-for="(item, index) in dioList"
                      :key="index"
                      :label="item.key"
                      :value="item.key"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- DIO端口 -->
                <el-form-item :label="$t('Patchlineconfig._8')">
                  <el-select style="width:100%" v-model="lineSetForm._3.VALUE">
                    <el-option
                      v-for="(item, index) in InputPcbScanner"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- DIO 串口配置 -->
                <el-form-item  :label="$t('Patchlineconfig._54')">
                  <el-input  type="text" v-model="lineSetForm._4.VALUE"></el-input>
                </el-form-item>
                <!-- 开始站点 -->
                  <el-form-item label="开始站点">
                    <el-select style="width:100%" clearable v-model="lineSetForm._5.VALUE">
                   <el-option
                      v-for="(item, index) in SitesDataList"
                      :key="index"
                      :label="item.OPERATION_SITE_NAME"
                      :value="item.ID.toString()"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 结束站点 -->
                <el-form-item label="结束站点">
                    <el-select style="width:100%" clearable v-model="lineSetForm._6.VALUE">
                   <el-option
                      v-for="(item, index) in SitesDataList"
                      :key="index"
                      :label="item.OPERATION_SITE_NAME"
                      :value="item.ID.toString()"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <span
                style="display: block;color: #606266;font-size: 14px;margin: 5px 0 5px 10px;"
              >{{ RoutStationList[currentStation] ? RoutStationList[currentStation].SMT_NAME : '' }} {{ $t('Patchlineconfig._10') }}</span>
            </div>
            <div
              class="x-3-height"
              style="margin: 0 2px 2px;border: 1px solid rgb(221, 223, 230);border-radius: 4px;padding: 2px 2px 2px 0"
            >
              <el-form
                ref="SMTSet"
                size="mini"
                :model="SMTSetForm"
                label-width="150px"
                :disabled="!RoutStationList[currentStation]"
              >
              <!-- :disabled="!RoutStationList[currentStation]" -->
                <el-form-item :label="$t('Patchlineconfig._51')">
                  <el-input v-model="SMTSetForm._15.value" placeholder=" " style="width: 100%" @blur="hanlderCheckMachineName"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._11')">
                  <el-select v-model="SMTSetForm._0.value" style="width: 100%">
                    <el-option
                      v-for="(item, index) in machineList"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._12')">
                  <el-input v-model="SMTSetForm._1.value" type="number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._13')">
                  <el-input v-model="SMTSetForm._2.value" type="number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._14')">
                  <el-input v-model="SMTSetForm._3.value" type="number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._15')">
                  <el-select v-model="SMTSetForm._4.value" style="width: 100%">
                    <el-option
                      v-for="(item, index) in stationNolist"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._16')">
                  <el-input v-model="SMTSetForm._5.value" type="number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._17')">
                  <el-input v-model="SMTSetForm._6.value" type="number"></el-input>
                </el-form-item>

                <el-form-item :label="$t('Patchlineconfig._18')">
                  <el-select multiple v-model="SMTSetForm._7.value" style="width: 100%">
                    <el-option
                      v-for="(item, index) in InputPcbScanner"
                      :key="index"
                      :value="item"
                      :label="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._19')">
                  <el-input v-model="SMTSetForm._8.value" type="text"></el-input>
                </el-form-item>

                  <!-- 出口扫码枪端口 -->
                 <el-form-item :label="$t('Patchlineconfig._56')">
                  <el-select multiple v-model="SMTSetForm._16.value" style="width: 100%">
                   <el-option
                      v-for="(item, index) in InputPcbScanner"
                      :key="index"
                      :value="item"
                      :label="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <!-- 出口扫码枪串口配置 -->
                <el-form-item :label="$t('Patchlineconfig._57')">
                  <el-input v-model="SMTSetForm._17.value" type="text"></el-input>
                </el-form-item>

                <el-form-item :label="$t('Patchlineconfig._21')">
                  <el-input v-model="SMTSetForm._9.value" type="number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._22')">
                  <el-input v-model="SMTSetForm._10.value" type="number"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._23')">
                  <el-select v-model="SMTSetForm._11.value" style="width: 100%">
                    <el-option
                      v-for="item in wsList"
                      :key="item.value"
                      :label="item.key"
                      :value="item.value.toString()"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._24')">
                  <el-input v-model="SMTSetForm._12.value" type="number"></el-input>
                </el-form-item>

                <el-form-item :label="$t('Patchlineconfig._25')">
                  <el-select v-model="SMTSetForm._13.value" style="width: 100%">
                    <el-option
                      v-for="(item, index) in wsList"
                      :key="index"
                      :label="item.key"
                      :value="item.value.toString()"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('Patchlineconfig._26')">
                  <el-checkbox v-model="SMTSetForm._14.value"></el-checkbox>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 右击框 -->
    <d2-contextmenu :visible.sync="contextmenuFlag" :x="contentmenuX" :y="contentmenuY">
      <d2-contextmenu-list :menulist="contextmenuList" @rowClick="contextmenuClick" />
    </d2-contextmenu>
    <!-- 新增编辑线别 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      width="40%"
      :title="titleText"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="lineModifyOrAdd"
        :show-message="false"
        :model="lineAddForm"
        :rules="lineAddRules"
        label-width="120px"
      >
        <el-form-item :label="$t('Patchlineconfig._27')" prop="LINE_NAME">
          <el-input v-model="lineAddForm.LINE_NAME"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Patchlineconfig._28')" prop="LOCATION">
          <el-input v-model="lineAddForm.LOCATION"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Patchlineconfig._29')" prop="PLANT">
          <el-select v-model="lineAddForm.PLANT" clearable filterable placeholder=" " style="width: 100%" >
            <el-option v-for="item in LineTypeList" :key="item.LOOKUP_CODE" :label="item.CHINESE" :value="item.LOOKUP_CODE.toString()"></el-option>
          </el-select>
          <!-- <el-input v-model="lineAddForm.PLANT"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('plbd._2')" prop="ORGANIZE_ID">
          <el-cascader
            v-model="lineAddForm.ORGANIZE_ID"
            :options="organizeList"
            style="width: 100%"
            :show-all-levels="false"
            placeholder=" "
            :props="casProps"
            @change="handleChangeCascader"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="cancelEditLine"
          icon="el-icon-minus"
          type="danger"
        >{{ $t('Menu.cancel') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="createLine"
        >{{ $t('Menu.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 新增编辑机台 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="titleText2"
      :visible.sync="dialogFormVisible2"
      width="45%"
    >
      <el-form
        ref="stationModifyOrAdd"
        :show-message="false"
        :model="stationAddForm"
        :rules="stationAddRules"
        label-width="120px"
      >
        <el-form-item :label="$t('Patchlineconfig._30')" prop="SMT_NAME">
          <el-input v-model="stationAddForm.SMT_NAME"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Patchlineconfig._31')" prop="TYPE">
          <el-select v-model="stationAddForm.TYPE">
            <div
              style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)"
            >
              <span
                style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px"
              >{{ $t('Patchlineconfig._32') }}</span>
              <span
                style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)"
              >{{ $t('Patchlineconfig._33') }}</span>
            </div>
            <el-option
              style="width: 360px;display: flex"
              v-for="item in StatusList"
              :key="parseInt(item.ID)"
              :value="parseInt(item.ID)"
              :label="item.NAME"
            >
              <span
                style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              >{{ item.ID }}</span>
              <span
                style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)"
              >{{ item.NAME }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Patchlineconfig._34')">
          <el-input v-model="stationAddForm.DESCRIPTION"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Patchlineconfig._35')">
          <el-switch
            v-model="stationAddForm.ENABLED"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="Y"
            inactive-value="N"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="cancelEditStation"
          icon="el-icon-minus"
          type="danger"
        >{{ $t('Menu.cancel') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="createStation"
        >{{ $t('Menu.confirm') }}</el-button>
      </div>
    </el-dialog>
  </custom-container>
</template>

<script>
import {
  Index,
  GetRoutStation,
  GetLinesConfig,
  GetStationConfig,
  SaveData,
  IsExistMacheName
} from '@/api/Patchlineconfig'
import { cloneDeep } from 'lodash'
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData
} from '@/api/SysOrganize'
import {
  LoadMESLineType
} from '@/api/SfcsOperationLines'
import {
  LoadData as SfcsOperationSitesData
} from '@/api/SfcsOperationSites'
export default {
  name: 'Patchlineconfig',
  components: {
    customContainer,
    customContainerHeader,
    D2Contextmenu: () => import('@/layout/header-aside/components/contextmenu'),
    D2ContextmenuList: () =>
      import(
        '@/layout/header-aside/components/contextmenu/components/contentmenuList'
      )
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      SitesDataList: [],
      // 右击
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuList: [
        {
          icon: 'times-circle',
          title: `${this.$t('Patchlineconfig._36')}`,
          value: 'deleteLine'
        }
      ],
      rightClickIndex: -1, // 右击index
      eventCommand: '', // 执行的事假
      lineName: '',
      currentLineItem: 0,
      lineSetForm: {
        _1: {},
        _2: {},
        _3: {},
        _4: {},
        _5: {},
        _6: {}
      },
      SMTSetForm: {
        _0: {
          config_type: 105,
          value: ''
        },
        _1: {
          config_type: 110,
          value: ''
        },
        _2: {
          config_type: 111,
          value: ''
        },
        _3: {
          config_type: 112,
          value: ''
        },
        _4: {
          config_type: 113,
          value: ''
        },
        _5: {
          config_type: 114,
          value: ''
        },
        _6: {
          config_type: 115,
          value: ''
        },
        _7: {
          config_type: 117,
          value: ''
        },
        _8: {
          config_type: 140,
          value: ''
        },
        _9: {
          config_type: 119,
          value: ''
        },
        _10: {
          config_type: 107,
          value: ''
        },
        _11: {
          config_type: 120,
          value: ''
        },
        _12: {
          config_type: 108,
          value: ''
        },
        _13: {
          config_type: 121,
          value: ''
        },
        _14: {
          config_type: 139,
          value: ''
        },
        _15: {
          config_type: 142,
          value: ''
        },
        _16: {
          config_type: 118,
          value: ''
        },
        _17: {
          config_type: 141,
          value: ''
        }
      },
      linesLists: [],
      wsList: [],
      dioList: [],
      machineList: [],
      stationNolist: [],
      StatusList: [],
      YNList: [],
      InputPcbScanner: [],
      StationDefualt: [],
      currentStation: -1,
      RoutStationList: [],
      tempLinesLists: [],
      filterLineName: '',
      defaultSMTSetForm: {},
      updateStationConfig: {}, // 更新机台
      // 新增修改线体
      titleText: '',
      dialogFormVisible: false,
      lineAddForm: {},
      lineAddRules: {
        LINE_NAME: [
          {
            required: true,
            message: this.$t('Patchlineconfig._37'),
            trigger: 'blur'
          }
        ],
        LOCATION: [
          {
            required: true,
            message: this.$t('Patchlineconfig._38'),
            trigger: 'blur'
          }
        ],
        PLANT: [
          {
            required: true,
            message: this.$t('Patchlineconfig._39'),
            trigger: 'blur'
          }
        ],
        ORGANIZE_ID: [
          {
            required: true,
            message: this.$t('plbd._1'),
            trigger: 'blur'
          }
        ]
      },
      // 新增修改机台
      titleText2: '',
      dialogFormVisible2: false,
      stationAddForm: {},
      stationAddRules: {
        SMT_NAME: [
          {
            required: true,
            message: this.$t('Patchlineconfig._40'),
            trigger: 'blur'
          }
        ],
        TYPE: [
          {
            required: true,
            message: this.$t('Patchlineconfig._41'),
            trigger: 'blur'
          }
        ]
      },
      form: {},
      defaultLineConfigList: {
        _1: {
          CONFIG_TYPE: 1,
          VALUE: ''
        },
        _2: {
          CONFIG_TYPE: 4,
          VALUE: ''
        },
        _3: {
          CONFIG_TYPE: 20,
          VALUE: ''
        },
        _4: {
          CONFIG_TYPE: 21,
          VALUE: ''
        },
        _5: {
          CONFIG_TYPE: 22,
          VALUE: ''
        },
        _6: {
          CONFIG_TYPE: 19,
          VALUE: ''
        }
      },
      organizeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      planData: [],
      LineTypeList: []
    }
  },
  methods: {
    async getLineTypeList () {
      const res = await LoadMESLineType()
      this.LineTypeList = res.Result || []
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.lineAddForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userinfo.ID,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager = this.unique(manager)
      manager.map(item => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    unique (obj) {
      const res = new Map()
      return obj.filter((a) => !res.has(a.ORGANIZE_ID) && res.set(a.ORGANIZE_ID, 1))
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map(item => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    async getIndex () {
      const res = await Index({
        USER_ID: this.userinfo.ID
      })
      if (res.Result) {
        const data = res.Result
        // //console.log(data)
        Object.keys(data).forEach(item => {
          this[item] = data[item]
        })
        this.tempLinesLists = this.linesLists

        this.StationDefualt.map(item => {
          Object.keys(this.lineSetForm).forEach(_item => {
            if (this.SMTSetForm[_item].config_type === item.config_type) {
              this.SMTSetForm[_item].value = item.value
            }
          })
        })

        // this.StationDefualt.map((item, index) => {
        //   this.SMTSetForm[`_${index}`] = {
        //     config_type: item.config_type,
        //     value: item.value
        //   }
        // })
        console.log(this.SMTSetForm)
        this.defaultSMTSetForm = cloneDeep(this.SMTSetForm)
        this.getRoutStation()
        this.getLinesConfig()
        this.getOrganize()
        this.getLineTypeList()
        this.getOperationSitesData()
      }
    },
    async getOperationSitesData () {
      let res = await SfcsOperationSitesData({ OPERATION_LINE_ID: this.linesLists[this.currentLineItem].ID, 'ENABLED': 'Y' })
      if (res.Result) {
        res.Result = JSON.parse(res.Result)
        this.SitesDataList = res.Result
      }
    },
    handleChooseLine (item, key) {
      if (this.filterLineName) {
        this.linesLists.map((_item, index) => {
          if (_item.ID === item.ID) {
            this.saveLineSetForm()
            this.currentLineItem = index
          }
        })
      } else {
        this.saveLineSetForm()
        this.currentLineItem = key
      }
      this.saveStationSetForm()
      this.currentStation = -1
      this.getRoutStation()
      this.getLinesConfig()
    },
    // 保存lineConfigForm [切换前更新下]
    saveLineSetForm () {
      this.linesLists[this.currentLineItem].lineSetForm = this.lineSetForm
    },
    // 保存stationConfigForm
    saveStationSetForm () {
      const STATION_ID = this.RoutStationList[this.currentStation]?.ID || 0
      if (!STATION_ID) {
        return false
      }
      this.updateStationConfig[STATION_ID] = this.SMTSetForm
    },
    async getRoutStation () {
      if (!this.linesLists[this.currentLineItem]?.ID) {
        return false
      }
      if (this.linesLists[this.currentLineItem].RoutStationList?.length) {
        this.RoutStationList = this.linesLists[this.currentLineItem].RoutStationList
        return false
      }
      const res = await GetRoutStation(
        this.linesLists[this.currentLineItem].ID
      )
      this.RoutStationList = res.Result || []
      this.linesLists[this.currentLineItem].RoutStationList = res.Result || []
    },
    handleChooseStation (item, key) {
      this.saveStationSetForm()
      this.currentStation = key
      this.getStationConfig()
    },
    async getLinesConfig () {
      const LINE_ID = this.linesLists[this.currentLineItem]?.ID || 0
      if (!LINE_ID) {
        return false
      }
      if (this.linesLists[this.currentLineItem].lineSetForm?.length) {
        this.lineSetForm = this.linesLists[this.currentLineItem].lineSetForm
        return false
      }

      const res = await GetLinesConfig(LINE_ID)
      const data = res.Result || []
      this.lineSetForm = cloneDeep(this.defaultLineConfigList)
      data.map(item => {
        Object.keys(this.lineSetForm).forEach(_item => {
          if (this.lineSetForm[_item].CONFIG_TYPE === item.CONFIG_TYPE) {
            this.lineSetForm[_item].VALUE = item.VALUE
            // //console.log(this.lineSetForm[_item], item)
          }
        })
      })
      console.log(this.lineSetForm)
      // this.lineSetForm._2.VALUE = this.InputPcbScanner[this.lineSetForm._2.VALUE]
      this.linesLists[this.currentLineItem].lineSetForm = this.lineSetForm // 更新LineConfig
      this.getOperationSitesData()// 重新获取站点名称
    },
    // 获取机台信息
    async getStationConfig () {
      const STATION_ID = this.RoutStationList[this.currentStation]?.ID || 0
      if (!STATION_ID) {
        return false
      }
      if (this.updateStationConfig[STATION_ID]) {
        this.SMTSetForm = this.updateStationConfig[STATION_ID]
        return false
      }
      const res = await GetStationConfig(STATION_ID)
      if (res.Result) {
        const data = res.Result
        const tempSMTSetForm = cloneDeep(this.defaultSMTSetForm)
        data.map(item => {
          Object.keys(tempSMTSetForm).forEach(_item => {
            if (
              item.CONFIG_TYPE === parseInt(tempSMTSetForm[_item].config_type)
            ) {
              tempSMTSetForm[_item].value = item.VALUE
            }
          })
        })
        tempSMTSetForm._7.value = tempSMTSetForm._7.value.trim().toString()
        tempSMTSetForm._16.value = tempSMTSetForm._16.value.trim().toString()
        // 自动扫码枪端口 变成数组
        tempSMTSetForm._7.value = tempSMTSetForm._7.value.length > 0 ? tempSMTSetForm._7.value.toString().split(',') : []
        tempSMTSetForm._16.value = tempSMTSetForm._16.value.length > 0 ? tempSMTSetForm._16.value.toString().split(',') : []
        this.SMTSetForm = tempSMTSetForm
        this.updateStationConfig[STATION_ID] = tempSMTSetForm
      } else {
        this.SMTSetForm = cloneDeep(this.defaultSMTSetForm)
        this.updateStationConfig[STATION_ID] = cloneDeep(
          this.defaultSMTSetForm
        )
      }
    },
    // 新增线体
    addLine () {
      this.titleText = this.$t('Patchlineconfig._42')
      this.dialogFormVisible = true
      this.lineAddForm = {}
    },
    // 修改线体
    modifyLine () {
      const lineObj = this.linesLists[this.currentLineItem] || null
      if (!lineObj) {
        this.$message.error(this.$t('Patchlineconfig._43'))
        return false
      }

      let stop = this.organizeList.map(item => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      // //console.log('这里啊：', stop, lineObj)
      const O_ID = lineObj.O_ID || lineObj.ORGANIZE_ID
      if (!O_ID) {
        return false
      }
      lineObj.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.lineAddForm = lineObj
      this.titleText = this.$t('Patchlineconfig._44')
      this.dialogFormVisible = true
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map(item => {
        if (item.ID === id) {
          if (item.PARENT_ORGANIZE_ID && item.ID !== stop) {
            arr.push(
              ...this.reverseGetTree(data, item.PARENT_ORGANIZE_ID, stop)
            )
          }
          arr.push(item.ID)
        }
      })
      return arr
    },
    // 新增机台
    addSMT () {
      const LINE_ID = this.linesLists[this.currentLineItem]?.ID
      if (!LINE_ID) {
        this.$message.error(this.$t('Patchlineconfig._43'))
        return false
      }
      this.titleText2 = this.$t('Patchlineconfig._45')
      this.dialogFormVisible2 = true
      this.stationAddForm = {
        Line_ID: LINE_ID,
        ENABLED: 'Y'
      }
    },
    // 修改机台
    modifySMT () {
      const stationList = this.linesLists[this.currentLineItem]
        ?.RoutStationList
      if (!stationList) {
        this.$message.error(this.$t('Patchlineconfig._46'))
        return false
      }
      const station = stationList[this.currentStation]
      if (!station) {
        this.$message.error(this.$t('Patchlineconfig._46'))
        return false
      }
      this.stationAddForm = station
      this.titleText2 = this.$t('Patchlineconfig._47')
      this.dialogFormVisible2 = true
    },
    fileterLine (e) {
      if (e) {
        const res = []
        this.linesLists.map(item => {
          if (item.LINE_NAME.indexOf(e) !== -1) {
            res.push(item)
          }
        })
        this.tempLinesLists = res
      } else {
        this.tempLinesLists = this.linesLists
      }
    },
    // 取消修改新增线别
    cancelEditLine () {
      this.titleText = ''
      this.dialogFormVisible = false
      this.lineAddForm = {}
    },
    // 创建修改线别
    createLine () {
      this.$refs.lineModifyOrAdd.validate(async (valid, errInfo) => {
        if (valid) {
          if (this.lineAddForm.ID) {
            // 更新
            // console.log('更新了线体: ', this.linesLists[this.currentLineItem])
            const data = this.linesLists[this.currentLineItem]
            // this.saveData()
            const updateLines = [{
              ID: data.ID,
              LINE_NAME: data.LINE_NAME,
              LOCATION: data.LOCATION,
              PLANT: data.PLANT,
              ORGANIZE_ID: data.ORGANIZE_ID ? data.ORGANIZE_ID[data.ORGANIZE_ID.length - 1] : 0
            }]
            const res = await SaveData({
              updateLines
            })
            if (res.Result) {
              this.resetData()
              this.dialogFormVisible = false
              this.$message.success(this.$t('publics.tips.handleSuccess'))
            }
          } else {
            this.lineAddForm.ID = 0
            this.linesLists.unshift(this.lineAddForm)
            // 定位
            this.saveData()
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            // console.log(e.message)
          }
        }
      })
    },
    // 保存
    async saveData () {
      // 组装出 保存的数据
      this.saveLineSetForm()
      // 处理更新机台 config
      const updateStationConfig = []
      Object.keys(this.updateStationConfig).forEach(item => {
        Object.keys(this.updateStationConfig[item]).forEach(_item => {
          // eslint-disable-next-line no-unused-expressions
          this.updateStationConfig[item][_item].value instanceof Array ? this.updateStationConfig[item][_item].value = this.updateStationConfig[item][_item].value.toString() : this.updateStationConfig[item][_item].value

          updateStationConfig.push({
            STATION_ID: item,
            CONFIG_TYPE: this.updateStationConfig[item][_item].config_type,
            VALUE: this.updateStationConfig[item][_item].value
          })
        })
      })
      // 处理 line config
      // 处理新增
      const insertLines = []
      // 处理更新
      const updateLineConfigs = []
      // 处理删除
      const removeLines = []
      // 处理新增机台
      const insertStations = []
      // 处理更新机台
      const updateStations = []
      // 处理删除机台
      const removeStations = []
      this.linesLists.map(item => {
        const LINE_ID = item.ID
        const flag = item.flag // 删除flag
        if (!flag) {
          // 更新
          if (LINE_ID) {
            const lineSetForm = item.lineSetForm
            if (lineSetForm) {
              Object.keys(lineSetForm).forEach(_item => {
                // console.log(lineSetForm[_item])
                updateLineConfigs.push({
                  LINE_ID: LINE_ID,
                  CONFIG_TYPE: lineSetForm[_item].CONFIG_TYPE,
                  VALUE: lineSetForm[_item].VALUE
                })
              })
            }
          } else {
            // 新增
            insertLines.push({
              ID: 0,
              LINE_NAME: item.LINE_NAME,
              LOCATION: item.LOCATION,
              PLANT: item.PLANT,
              ORGANIZE_ID: item.ORGANIZE_ID
            })
          }
        } else {
          // 删除线体
          removeLines.push({
            ID: item.ID,
            LINE_NAME: item.LINE_NAME,
            LOCATION: item.LOCATION,
            PLANT: item.PLANT
          })
        }
        // 机台逻辑数据组装
        const RoutStationList = item.RoutStationList
        if (RoutStationList) {
          RoutStationList.map(_item => {
            if (!_item.flag) {
              if (_item.ID) {
                // 修改机台
                updateStations.push({
                  ID: _item.ID,
                  SMT_NAME: _item.SMT_NAME,
                  TYPE: _item.TYPE,
                  DESCRIPTION: _item.DESCRIPTION,
                  ENABLED: _item.ENABLED
                })
              } else {
                // 新增机台
                insertStations.push({
                  ID: 0,
                  Line_ID: _item.Line_ID,
                  SMT_NAME: _item.SMT_NAME,
                  TYPE: _item.TYPE,
                  DESCRIPTION: _item.DESCRIPTION,
                  ENABLED: _item.ENABLED
                })
              }
            } else {
              // 删除机台
              removeStations.push({
                ID: _item.ID,
                SMT_NAME: _item.SMT_NAME,
                TYPE: _item.TYPE,
                DESCRIPTION: _item.DESCRIPTION,
                ENABLED: _item.ENABLED
              })
            }
          })
        }
      })
      /** 源数据结构 */
      // console.log('============= ', this.updateStationConfig, this.linesLists)
      /** 源数据结构 */
      const res = await SaveData({
        insertLines,
        updateLineConfigs,
        updateStationConfig,
        removeLines,
        insertStations,
        updateStations,
        removeStations
      })
      /** 最终数据结构 */
      console.log('最终数据结构： ', {
        insertLines,
        updateLineConfigs,
        updateStationConfig,
        removeLines,
        insertStations,
        updateStations,
        removeStations
      })
      /** 最终数据结构 */
      if (res.Result) {
        this.$message.success(this.$t('publics.tips.handleSuccess'))
        this.resetData()
      }
    },
    /**
     * @description 右键row-click事件
     */
    contextmenuClick (command) {
      this[this.eventCommand]()
      this.contextmenuFlag = false
    },
    /**
     * @description 右键线体删除
     */
    handleContextmenuLine (event, index, command) {
      this.rightClickIndex = index
      event.preventDefault() // 组织事件冒泡
      event.stopPropagation()
      this.eventCommand = command
      this.contentmenuX = event.clientX
      this.contentmenuY = event.clientY
      this.contextmenuFlag = true
    },
    // 删除线体方法
    async deleteLine () {
      if (
        await this.$confirm(
          this.$t('Patchlineconfig._48'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel')
          }
        ).catch(() => {})
      ) {
        /** 考虑一种情况就是如果删除到最后一个发生的问题 */
        const lineObj = this.linesLists[this.rightClickIndex]
        if (lineObj) {
          // lineObj.flag = 1
          this.$set(this.linesLists[this.rightClickIndex], 'flag', 1) // 由于视图更新渲染比较慢，所以使用this.$set()的形式
        } else {
          this.$message.error(this.$t('Patchlineconfig._49'))
          return false
        }
        // 处理 currentLineItem
        if (this.currentLineItem === this.rightClickIndex) {
          if (this.currentLineItem === 0) {
            this.currentLineItem += 1
          } else {
            this.currentLineItem -= 1
          }
          this.handleChooseLine(null, this.currentLineItem)
        }
      }
    },
    // 取消新增机台
    cancelEditStation () {
      this.titleText2 = ''
      this.dialogFormVisible2 = false
      this.stationAddForm = {}
    },
    // 新增机台
    createStation () {
      this.$refs.stationModifyOrAdd.validate((valid, errInfo) => {
        if (valid) {
          if (this.stationAddForm.ID) {
            // 更新
            console.log(
              '更新机台了： ',
              this.linesLists[this.currentLineItem].RoutStationList[this.currentStation]
            )
            // 调用保存方法
            this.saveData()
          } else {
            // 新增机台
            this.stationAddForm.ID = 0
            this.linesLists[this.currentLineItem].RoutStationList.push(
              this.stationAddForm
            )
            // 调用保存方法
            this.saveData()
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            // console.log(e.message)
          }
        }
      })
    },
    // 删除机台
    async deleteStation () {
      if (
        await this.$confirm(
          this.$t('Patchlineconfig._50'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel')
          }
        ).catch(() => {})
      ) {
        /** 考虑一种情况就是如果删除到最后一个发生的问题 */
        const routStationList = this.linesLists[this.currentLineItem]
          ?.RoutStationList
        if (!routStationList) {
          this.$message.error(this.$t('Patchlineconfig._46'))
          return false
        }
        const stationObj = routStationList[this.rightClickIndex]
        if (!stationObj) {
          this.$message.error(this.$t('Patchlineconfig._46'))
          return false
        }
        this.$set(
          this.linesLists[this.currentLineItem].RoutStationList[this.rightClickIndex],
          'flag',
          1
        )
        // 处理更新currentStation
        if (this.currentStation === this.rightClickIndex) {
          if (this.currentStation === 0) {
            this.currentStation += 1
          } else {
            this.currentStation -= 1
          }
          this.handleChooseStation(null, this.currentStation)
        }
      }
    },
    resetData () {
      const data = {
        SitesDataList: [],
        contextmenuFlag: false,
        contentmenuX: 0,
        contentmenuY: 0,
        contextmenuList: [
          {
            icon: 'times-circle',
            title: `${this.$t('Patchlineconfig._36')}`,
            value: 'deleteLine'
          }
        ],
        rightClickIndex: -1, // 右击index
        eventCommand: '', // 执行的事假
        lineName: '',
        currentLineItem: this.currentLineItem,
        lineSetForm: {
          _1: {},
          _2: {},
          _3: {},
          _4: {},
          _5: {},
          _6: {}
        },
        SMTSetForm: {
          _0: {
            config_type: 105,
            value: ''
          },
          _1: {
            config_type: 110,
            value: ''
          },
          _2: {
            config_type: 111,
            value: ''
          },
          _3: {
            config_type: 112,
            value: ''
          },
          _4: {
            config_type: 113,
            value: ''
          },
          _5: {
            config_type: 114,
            value: ''
          },
          _6: {
            config_type: 115,
            value: ''
          },
          _7: {
            config_type: 117,
            value: ''
          },
          _8: {
            config_type: 140,
            value: ''
          },
          _9: {
            config_type: 119,
            value: ''
          },
          _10: {
            config_type: 107,
            value: ''
          },
          _11: {
            config_type: 120,
            value: ''
          },
          _12: {
            config_type: 108,
            value: ''
          },
          _13: {
            config_type: 121,
            value: ''
          },
          _14: {
            config_type: 139,
            value: ''
          },
          _15: {
            config_type: 142,
            value: ''
          },
          _16: {
            config_type: 118,
            value: ''
          },
          _17: {
            config_type: 141,
            value: ''
          }
        },
        linesLists: [],
        wsList: [],
        dioList: [],
        machineList: [],
        stationNolist: [],
        StatusList: [],
        YNList: [],
        InputPcbScanner: [],
        StationDefualt: [],
        currentStation: -1,
        RoutStationList: [],
        tempLinesLists: [],
        filterLineName: '',
        defaultSMTSetForm: {},
        updateStationConfig: {}, // 更新机台
        // 新增修改线体
        titleText: '',
        dialogFormVisible: false,
        lineAddForm: {},
        lineAddRules: {
          LINE_NAME: [
            {
              required: true,
              message: this.$t('Patchlineconfig._37'),
              trigger: 'blur'
            }
          ],
          LOCATION: [
            {
              required: true,
              message: this.$t('Patchlineconfig._38'),
              trigger: 'blur'
            }
          ],
          PLANT: [
            {
              required: true,
              message: this.$t('Patchlineconfig._39'),
              trigger: 'blur'
            }
          ],
          ORGANIZE_ID: [
            {
              required: true,
              message: this.$t('plbd._1'),
              trigger: 'blur'
            }
          ]
        },
        // 新增修改机台
        titleText2: '',
        dialogFormVisible2: false,
        stationAddForm: {},
        stationAddRules: {
          SMT_NAME: [
            {
              required: true,
              message: this.$t('Patchlineconfig._40'),
              trigger: 'blur'
            }
          ],
          TYPE: [
            {
              required: true,
              message: this.$t('Patchlineconfig._41'),
              trigger: 'blur'
            }
          ]
        },
        form: {},
        defaultLineConfigList: {
          _1: {
            CONFIG_TYPE: 1,
            VALUE: ''
          },
          _2: {
            CONFIG_TYPE: 4,
            VALUE: ''
          },
          _3: {
            CONFIG_TYPE: 20,
            VALUE: ''
          },
          _4: {
            CONFIG_TYPE: 21,
            VALUE: ''
          },
          _5: {
            CONFIG_TYPE: 22,
            VALUE: ''
          },
          _6: {
            CONFIG_TYPE: 19,
            VALUE: ''
          }
        },
        organizeList: [],
        casProps: {
          label: 'ORGANIZE_NAME',
          value: 'ID',
          children: 'children',
          checkStrictly: true
        },
        planData: [],
        LineTypeList: []
      }
      Object.assign(this.$data, data)
      this.getIndex()
    },
    // 检查机械名称
    async hanlderCheckMachineName () {
      const STATION_ID = this.RoutStationList[this.currentStation]?.ID || 0
      if (!STATION_ID) {
        return false
      }
      if (this.SMTSetForm._15.value) {
        const res = await IsExistMacheName({
          ID: STATION_ID,
          Name: this.SMTSetForm._15.value
        }).catch(_ => {
          this.$set(this.SMTSetForm._15, 'value', '')
        })
        if (res.Result !== void (0)) {
          if (res.Result) {
            this.$set(this.SMTSetForm._15, 'value', '')
            this.$message.error(this.$t('Patchlineconfig._52'))
          }
        } else {
          this.$set(this.SMTSetForm._15, 'value', '')
          this.$message.error(this.$t('Patchlineconfig._53'))
        }
      }
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style lang="scss" scoped>
.x-height {
  height: calc(100vh - 58px - 20px);
  box-sizing: border-box;
}
.x-1-height {
  height: calc(100% - 31px - 2px);
  box-sizing: border-box;
  overflow: auto;
}
.x-2-height {
  height: calc(30% - 31px - 2px);
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.x-3-height {
  height: calc(70% - 31px - 6px);
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.search-line {
  position: sticky;
  top: 0;
  margin: 2px;
  width: calc(100% - 4px);
  box-sizing: border-box;
}
.line-item {
  font-size: 14px;
  line-height: 28px;
  padding-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px dashed rgb(221, 223, 230);
  cursor: pointer;
  user-select: none;
}
.line-item:active {
  background: rgb(233, 247, 254);
}
.x-line-item {
  background: rgb(233, 247, 254);
}
.block-ctx {
  overflow-y: hidden;
  height: calc(100% - 27px - 12px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  overflow-x: scroll;
  .SMT-ctx {
    padding: 0 50px;
    display: flex;
    align-items: center;
    .next-corrow {
      display: block;
      margin: 0 30px;
      svg {
        display: block;
        width: 50px;
        height: 50px;
      }
    }
    .SMT-item {
      width: 200px;
      height: 210px;
      background: rgb(172, 235, 161);
      position: relative;
      cursor: pointer;
      .block {
        border: 1px solid rgb(221, 223, 230);
        span {
          width: 100%;
          text-align: left;
        }
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: calc(100% - 8px);
        margin-bottom: 8px;
        img {
          height: 83%;
          display: block;
        }
      }
      .checked {
        position: absolute;
        width: 0;
        height: 0;
        top: 0;
        right: 0;
        border-top: 50px solid rgb(51, 51, 51);
        border-left: 50px solid transparent;
        svg {
          position: absolute;
          top: -45px;
          right: 5px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
.is-hide {
  display: none;
}
</style>
