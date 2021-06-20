<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="getLoadData"
                               importBtnName="SfcsScraperConfigImport"
                               exportBtnName="SfcsScraperConfigExport"
                               exportTplName="SfcsScraperConfigExportTPL">
        <el-input v-model="formData.Key"
                  :placeholder="$t('ssc_rd.key')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('ssc_rd.sh') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="insertEvent(null)"
                   v-if="$btnList.indexOf('SfcsScraperConfigAdd') !== -1">{{ $t('ssc_rd.add') }}</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick"
        >{{ $t('ssc_rd.se') }}</el-button>-->
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-current-row
                 highlight-hover-row
                 show-overflow
                 auto-resize
                 keep-source
                 stripe
                 :loading="loading"
                 :data="mainTable"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}"
                 @cell-click="cellClick">
        <vxe-table-column field="SCRAPER_NO"
                          width="200"
                          :title="$t('ssc_rd.tb_sn')"
                          :edit-render="{name: '$input', props: {readonly: true}}">
          <!-- <template v-slot:edit="{ row, $rowIndex }">
            <div>
              <vxe-input
                v-model="row.SCRAPER_NO"
                :disabled="!disabled && $rowIndex === currentRowIndex"
              ></vxe-input>
            </div>
          </template>-->
        </vxe-table-column>
        <vxe-table-column field="LOCATION"
                          width="200"
                          :title="$t('ssc_rd.tb_ss')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="CREATE_TIME"
                          width="180"
                          :title="$t('ssc_rd.tb_sd')"
                          :edit-render="{name: '$input', props: {readonly: true}}"></vxe-table-column>
        <vxe-table-column field="ALARM_HOURS"
                          width="180"
                          :title="$t('ssc_rd.tb_ad')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="INTERVAL"
                          width="220"
                          :title="$t('ssc_rd.tb_ai')"
                          :edit-render="{name: '$input', props: {readonly: true}}"></vxe-table-column>
        <vxe-table-column field="STOP_HOURS"
                          width="180"
                          :title="$t('ssc_rd.tb_dh')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="180"
                          field="ENABLED"
                          :title="$t('ssc_rd.tb_an')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <span v-show="row.ENABLED==='Y'"
                  class="green-txt">{{$t('SfcsPn._41')}}</span>
            <span v-show="row.ENABLED==='N'"
                  class="red-txt">{{$t('SfcsPn._42')}}</span>
          </template>
          <!-- <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch
                v-model="row.ENABLED"
                :active-text="$t('ssc_rd.yes')"
                :inactive-text="$t('ssc_rd.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </div>
          </template>-->
        </vxe-table-column>
        <vxe-table-column width="150"
                          field="ORGANIZE_ID"
                          :title="$t('plbd._2')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column :title="$t('publics.field.operate')"
                          min-width="160"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)"
                       v-if="$btnList.indexOf('SfcsScraperConfigEdit') !== -1">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick({ID: row.ID}, row.$index)"
                       v-if="$btnList.indexOf('SfcsScraperConfigRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- modal -->
    <el-dialog v-dialogDrag
               :title="dialogText"
               :visible.sync="dialogVisible"
               width="60%"
               :close-on-click-modal="false">
      <div>
        <el-form ref="modifyForm"
                 :model="modifyForm"
                 :rules="validRules"
                 :show-message="false"
                 class="custom-form custom-form-x"
                 label-position="top">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ssc_rd.tb_sn')"
                            prop="SCRAPER_NO">
                <el-input v-model="modifyForm.SCRAPER_NO"
                          clearable
                          placeholder=" "
                          :disabled="isNew" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ssc_rd.tb_ss')"
                            prop="LOCATION">
                <el-input v-model="modifyForm.LOCATION"
                          placeholder=" "
                          clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ssc_rd.tb_sd')"
                            prop="CREATE_TIME">
                <!-- <el-input v-model="modifyForm.CREATE_TIME" type="date" /> -->
                <el-date-picker style="width:100%"
                                v-model="modifyForm.CREATE_TIME"
                                value-format="yyyy-MM-dd"
                                type="date" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ssc_rd.tb_ad')"
                            prop="ALARM_HOURS">
                <el-input v-model="modifyForm.ALARM_HOURS"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ssc_rd.tb_ai')"
                            prop="INTERVAL">
                <el-input v-model="modifyForm.INTERVAL"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('ssc_rd.tb_dh')"
                            prop="STOP_HOURS">
                <el-input v-model="modifyForm.STOP_HOURS"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ssc_rd.tb_an')"
                            prop="ENABLED">
                <el-select v-model="modifyForm.ENABLED"
                           style="width:100%">
                  <el-option v-for="item in DoubleSided"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('plbd._2')"
                            prop="ORGANIZE_ID">
                <el-cascader v-model="modifyForm.ORGANIZE_ID"
                             :options="organizeList"
                             style="width: 100%"
                             :show-all-levels="false"
                             placeholder=" "
                             :props="casProps"
                             @change="handleChangeCascader" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
// import dayjs from 'dayjs'
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData
} from '@/api/SysOrganize'
import { cloneDeep } from 'lodash'
const API = helper('SfcsScraperConfig')
export default {
  name: 'SfcsScraperConfig',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      validRules: {
        SCRAPER_NO: [
          {
            required: true,
            message: this.$t('ssc_rd.vl_sh')
          }
        ],
        LOCATION: [
          {
            required: true,
            message: this.$t('ssc_rd.vl_ss')
          }
        ],
        CREATE_TIME: [
          {
            required: true,
            message: this.$t('ssc_rd.vl_sd')
          }
        ]
      },
      currentRowIndex: -1,
      disabled: false,
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      isNew: false,
      // -----------
      dialogVisible: false,
      modifyForm: {},
      dialogText: '',
      organizeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      DoubleSided: [
        {
          value: 'Y',
          label: 'Y'
        },
        {
          value: 'N',
          label: 'N'
        }
      ],
      planData: []
    }
  },
  methods: {
    // handleChangeDatetime (e, field) {
    //   this.modifyForm[field] = dayjs(e).format('YYYY-MM-DD HH:mm:ss')
    //   console.log(this.modifyForm[field])
    // },
    resetForm () {
      this.mainTable = []
      this.formData.Page = 1
      this.dialogVisible = false
      this.getLoadData()
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.modifyForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
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
      manager.map(item => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
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
    // 修改
    editClick (row) {
      // 直接抄 【】
      this.isNew = true
      let modifyForm = cloneDeep(row)
      let stop = this.organizeList.map(item => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      const O_ID = modifyForm.O_ID || modifyForm.ORGANIZE_ID
      if (!O_ID) {
        return false
      }
      modifyForm.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.modifyForm = modifyForm
      this.dialogVisible = true
      this.dialogText = this.$t('publics.btn.edit')
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
    // 新增
    insertEvent () {
      // 直接抄 【】
      this.isNew = false
      this.dialogVisible = true
      this.modifyForm = {}
      this.dialogText = this.$t('publics.btn.add')
    },
    // 提交
    submitModifyForm () {
      // 直接抄
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          if (
            Object.prototype.toString.call(this.modifyForm.ORGANIZE_ID) ===
            '[object Array]'
          ) {
            this.modifyForm.ORGANIZE_ID = this.modifyForm.ORGANIZE_ID[this.modifyForm.ORGANIZE_ID.length - 1]
          }
          let form = {}
          if (this.modifyForm.ID) {
            form = {
              updateRecords: [this.modifyForm]
            }
          } else {
            this.modifyForm.ID = 0
            form = {
              insertRecords: [this.modifyForm]
            }
          }
          const res = await API.SaveData(form)
          if (res.Result) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
            this.resetForm()
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    },
    async cellClick (e) {
      const { $rowIndex, row, columnIndex } = e
      if (columnIndex === 7) {
        return false
      }
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
        this.disabled = false
      }
      const res = await API.ItemIsByUsed({
        SCRAPER_NO: row.SCRAPER_NO
      })
      if (res.Result === true) {
        return false
      } else {
        this.disabled = true
        const set = [
          'SCRAPER_NO',
          'LOCATION',
          'CREATE_TIME',
          'ALARM_HOURS',
          'INTERVAL',
          'STOP_HOURS',
          'ENABLED'
        ]
        this.$nextTick(() => {
          this.$refs.xTable.setActiveCell(row, set[columnIndex])
        })
      }
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
        this.getOrganize()
      }
    },
    async getLoadData () {
      this.loading = true
      this.formData.USER_ID = this.userId
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      console.log('================= ', this.mainTable)
      this.totalPage = res.TotalCount || 0
    },
    // 删除
    async removeClick (row) {
      console.log(row)
      if (row) {
        var result = await API.ItemIsByUsed(row.SCRAPER_NO)
        if (result.Result === true || result.Result === true) {
          this.$message({
            message: result.ErrorInfo.Message || this.$t('ssc_rd.me_dl'),
            type: 'error'
          })
        } else {
          this.$confirm(this.$t('ssc_rd.me_cf'), this.$t('ssc_rd.me_pt'), {
            confirmButtonText: this.$t('ssc_rd.me_c'),
            cancelButtonText: this.$t('ssc_rd.me_cl'),
            type: 'warning'
          })
            .then(() => {
              if (row.ID === 0) {
                this.$refs.xTable.remove(row)
                this.$notify({
                  title: this.$t('ssc_rd.me_su'),
                  message: this.$t('ssc_rd.me_dlsu'),
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.form.insertRecords = []
                this.form.updateRecords = []
                this.form.removeRecords = [row]
                API.SaveData(this.form).then(res => {
                  if (res.ErrorInfo.Status) {
                    this.$message({
                      type: 'error',
                      message: res.ErrorInfo.Message
                    })
                  } else {
                    this.getLoadData()
                    this.$notify({
                      title: this.$t('ssc_rd.me_su'),
                      message: this.$t('ssc_rd.me_dlsu'),
                      type: 'success',
                      duration: 2000
                    })
                  }
                })
              }
            })
            .catch(() => { })
        }
      }
    },
    // 新增
    // async insertEvent(row) {
    //   const record = {
    //     ID: 0,
    //     SCRAPER_NO: null,
    //     LOCATION: null,
    //     CREATOR: this.userinfo.USER_NAME,
    //     CREATE_TIME: null,
    //     ALARM_HOURS: null,
    //     INTERVAL: null,
    //     STOP_HOURS: null,
    //     ENABLED: "Y"
    //   };
    //   const e = await this.$refs.xTable.insertAt(record, row);
    //   this.disabled = true;
    //   this.currentRowIndex = 0;
    //   this.$refs.xTable.setActiveCell(e.row, "SCRAPER_NO");
    // },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 保存
    preserveClick () {
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.xTable.validate(async valid => {
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            this.form.removeRecords = postdata.removeRecords
            const res = await API.SaveData(this.form)
            if (res.Result) {
              this.form = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('publics.tips.submitSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
<style>
.custom-form-x .el-col-12 {
  padding: 0 5px;
}
</style>
