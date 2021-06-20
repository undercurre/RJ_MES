<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header>
        <el-select style="width:280px"
                   v-model="ConfigurationForm.PROJECT_ID"
                   :placeholder="$t('SfcsSampleProjects._1')"
                   @change="searchClick">
          <el-option v-for="item in SpotCheckList"
                     :key="item.ID"
                     :label="item.PROJECT_NAME"
                     :value="item.ID" />
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button v-if="$btnList.indexOf('SampleProjectConfigSave') !== -1"
                   type="success"
                   icon="el-icon-check"
                   @click.prevent="saveClick">{{$t('publics.btn.save')}}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="cleanClick()">{{$t('SfcsSampleProjects._15')}}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsSampleProjectsSave') !== -1"
                   type="primary"
                   icon="el-icon-plus"
                   @click.prevent="addClick">{{$t('SfcsSampleProjects._9')}}</el-button>
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="AddNew">{{$t('SfcsSampleProjects._17')}}</el-button>
      </custom-container-header>
    </template>
    <!-- 表格 -->
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
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="DOWN_RATIO"
                          :title="$t('SfcsSampleProjects._2')"
                          min-width="260"
                          :edit-render="{name:'select', options: currentList,attrs: {disabled: true} }" />
        <vxe-table-column field="DOWN_RATIO_LIMIT_COUNT"
                          prop="DOWN_RATIO_LIMIT_COUNT"
                          :title="$t('SfcsSampleProjects._3')"
                          min-width="250"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}, autoselect: true}" />
        <vxe-table-column field="SAMPLE_RATIO"
                          :title="$t('SfcsSampleProjects._4')"
                          min-width="190"
                          :edit-render="{name:'$select', options: currentList,events: {change: ChangeEvent} }" />
        <vxe-table-column field="UP_RATIO_LIMIT_COUNT"
                          prop="UP_RATIO_LIMIT_COUNT"
                          :title="$t('SfcsSampleProjects._5')"
                          min-width="250"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}, autoselect: true}" />
        <vxe-table-column field="UP_RATIO"
                          :title="$t('SfcsSampleProjects._6')"
                          min-width="250"
                          :edit-render="{name:'select', options: currentList ,attrs: {disabled: true}}" />
        <vxe-table-column :title="$t('SfcsSampleProjects._7')"
                          min-width="180">
          <template v-slot="{ row, $rowIndex }">
            <el-button type="primary"
                       @click="rowAddClick(row, $rowIndex)">{{$t('SfcsSampleProjects._8')}}</el-button>
            <el-button type="danger"
                       @click="removeClick(row)">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 抽检文字名称维护 -->
    <el-dialog v-dialogDrag
               :title="$t('SfcsSampleProjects._10')"
               :visible.sync="dialogTableVisible"
               :close-on-click-modal="false"
               width="60%">
      <div class="dialog-head">
        <el-input v-model="addformData.PROJECT_NAME"
                  :placeholder="$t('SfcsSampleProjects._11')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-input v-model="addformData.DESCRIPTION"
                  :placeholder="$t('SfcsSampleProjects._12')"
                  clearable
                  style="width:150px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="save_but">{{$t('publics.btn.save')}}</el-button>&nbsp;
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click.prevent="add_but(-1)">{{$t('publics.btn.add')}}</el-button>
      </div>
      <div class="addForm">
        <vxe-table ref="_xTable"
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
                   :data="addTable"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}">
          <vxe-table-column min-width="210"
                            field="PROJECT_NAME"
                            :title="$t('SfcsSampleProjects._13')"
                            :edit-render="{name:'input'}" />
          <vxe-table-column min-width="150"
                            field="DESCRIPTION"
                            :title="$t('SfcsSampleProjects._12')"
                            :edit-render="{name:'input'}" />
          <vxe-table-column min-width="100"
                            field="ENABLED"
                            :title="$t('SfcsSampleProjects._14')">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.ENABLED"
                         :active-text="$t('cccn._9')"
                         :inactive-text="$t('cccn._10')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </template>
          </vxe-table-column>
          <vxe-table-column min-width="100"
                            :title="$t('IE.operating')">
            <template v-slot="{ row }">
              <el-button type="danger"
                         @click="remove_but(row,row.$index)">{{$t('se.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="pagination">
        <el-pagination :current-page="addformData.Page"
                       :page-size="addformData.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="addtotalPage"
                       @size-change="addhandleSizeChange"
                       @current-change="addhandleCurrentChange" />
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  Index,
  LoadSampleProjectsData,
  LoadSampleProjectConfigData,
  SaveData,
  SaveSampleProjectConfigData
} from '@/api/SfcsSampleProjects'
export default {
  name: 'SfcsSampleProjects',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        PROJECT_NAME: '', // 抽检方案名称
        DESCRIPTION: '', // 描述
        ENABLED: '', // 是否激活
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.formData
      },
      SpotCheckList: [], // 抽检方案列表
      loading: false,
      mainTable: [],
      ConfigurationForm: {
        ID: null,
        PROJECT_ID: null,
        ORDER_NO: null,
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.ConfigurationForm
      },
      disabled: true,
      currentList: [], // 抽检比例
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      defaultLength: 0,
      isSave: true,
      dialogTableVisible: false,
      addformData: {},
      addTable: [],
      addtotalPage: 0,
      addForm: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      // isShow: false,
      isOne: false,
      isAdd: true,
      validRules: {
        DOWN_RATIO_LIMIT_COUNT: [
          {
            required: true,
            message: this.$t('SfcsSampleProjects._a3')
          }
        ],
        UP_RATIO_LIMIT_COUNT: [
          {
            required: true,
            message: this.$t('SfcsSampleProjects._a5')
          }
        ]
      }
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    AddNew () {
      if (this.isSave === false) return false
      if (!this.ConfigurationForm.PROJECT_ID) return this.$message.error(this.$t('SfcsSampleProjects._1'))
      const record = {
        ID: 0,
        PROJECT_ID: this.ConfigurationForm.PROJECT_ID, // 抽检方案名称维护
        SAMPLE_RATIO: null, // 当前抽检比例
        SAMPLE_RATIO_COUNT: 0, // 当前抽检:后面的数字
        UP_RATIO: null, // 连续Pass跳转比例
        UP_RATIO_LIMIT_COUNT: 1, // 连续Pass数量
        DOWN_RATIO: null, // 连续Fail跳转比例
        DOWN_RATIO_LIMIT_COUNT: 1, // 连续Fail数量
        SAMPLE_COUNT: 0, // 当前抽检:前面的数字
        ORDER_NO: 0 // 序号
      }
      if (this.mainTable.length !== 0) {
        this.isOne = true
        record.UP_RATIO = this.mainTable[0].DOWN_RATIO
      }
      this.$refs.xTable.insertAt(record, null)
      this.isSave = false
    },
    // 获取当前抽检比例
    async getIndex () {
      const res = await Index()
      const data = res.Result
      this.currentList.push({
        value: 0,
        label: ''
      })
      data['SampleRatioList'].map(item => {
        this.currentList.push({
          value: item.LOOKUP_CODE,
          label: item.MEANING
        })
      })
      console.log('当前比例数据:', this.currentList)
    },
    // 获取抽检方案列表
    async getLoadData () {
      const res = await LoadSampleProjectsData(this.formData)
      this.SpotCheckList = res.Result
      this.addTable = res.Result
      this.addtotalPage = res.TotalCount
    },
    // 获取表格数据
    async getLoadSampleProjectConfigData (num) {
      this.loading = true
      const res = await LoadSampleProjectConfigData(this.ConfigurationForm)
      this.loading = false
      this.defaultLength = res.Result.length
      this.totalPage = res.TotalCount
      const data = res.Result
      data.sort((cur, next) => {
        return cur.ORDER_NO > next.ORDER_NO ? 1 : -1
      })
      this.mainTable = data
      if (num === 1) {
        this.rowAddClick()
      }
      // if (this.mainTable.length === 0) {
      //   this.isShow = true
      // } else {
      //   this.isShow = false
      // }
      console.log('表格数据', this.mainTable)
    },
    // 查询
    searchClick () {
      if (
        this.ConfigurationForm.PROJECT_ID === null ||
        !this.ConfigurationForm.PROJECT_ID
      ) {
        return false
      }
      this.formData.Page = 1
      this.isSave = true
      this.getLoadSampleProjectConfigData()
    },
    // 清空
    cleanClick () {
      this.mainTable = []
      this.ConfigurationForm = {}
    },
    ChangeEvent (e) {
      console.log('当前抽检发生改变', e)
      const rowData = e.row
      // 当前抽检比例
      const CurrentSpotCheck = rowData.SAMPLE_RATIO
      const rowIndex = e.$rowIndex
      if (rowIndex === 0 && this.mainTable.length !== 0) {
        if (this.isOne) {
          this.$refs.xTable.getTableData().tableData[rowIndex].DOWN_RATIO = CurrentSpotCheck
          this.$refs.xTable.getTableData().tableData[rowIndex].UP_RATIO = this.mainTable[rowIndex].DOWN_RATIO
          // this.mainTable[rowIndex].DOWN_RATIO = CurrentSpotCheck
        } else {
          // 第一行
          this.mainTable[rowIndex].DOWN_RATIO = CurrentSpotCheck
        }
      } else if (rowIndex + 1 === this.mainTable.length && e.rowIndex !== -1) {
        // 最后一行
        this.mainTable[rowIndex].UP_RATIO = CurrentSpotCheck
      } else if (e.rowIndex === -1) {
        // 新增
        if (rowData.insertIndex === -1) {
          // 插入
          this.mainTable[rowIndex - 1].UP_RATIO = CurrentSpotCheck
          this.mainTable[rowIndex].DOWN_RATIO = CurrentSpotCheck
        } else if (this.mainTable.length === 0) {
          rowData.DOWN_RATIO = CurrentSpotCheck
          rowData.UP_RATIO = CurrentSpotCheck
        } else {
          rowData.UP_RATIO = CurrentSpotCheck
          this.mainTable[rowIndex - 1].UP_RATIO = CurrentSpotCheck
        }
      } else {
        this.mainTable[rowIndex - 1].UP_RATIO = CurrentSpotCheck
        this.mainTable[rowIndex + 1].DOWN_RATIO = CurrentSpotCheck
      }
      const SAMPLE_RATIO = CurrentSpotCheck
      let MEANING = ''
      this.currentList.map(item => {
        if (item.value === SAMPLE_RATIO) {
          MEANING = item.label
        }
      })
      if (!MEANING) {
        this.$message.error('当前比例数据错误')
      }
      let res = MEANING.split(':') // 字符串切割
      rowData.SAMPLE_COUNT = parseInt(res[0])
      rowData.SAMPLE_RATIO_COUNT = parseInt(res[1])
    },
    // 插入
    rowAddClick (row, rowIndex) {
      console.log('插入row:', row)
      console.log('插入rowIndex:', rowIndex)
      if (this.isSave === true) {
        if (rowIndex + 1 === this.defaultLength) {
          const record = {
            ID: 0,
            PROJECT_ID: this.ConfigurationForm.PROJECT_ID, // 抽检方案名称维护
            SAMPLE_RATIO: null, // 当前抽检比例
            SAMPLE_RATIO_COUNT: 0, // 当前抽检:后面的数字
            UP_RATIO: null, // 连续Pass跳转比例
            UP_RATIO_LIMIT_COUNT: 1, // 连续Pass数量
            DOWN_RATIO: row.SAMPLE_RATIO, // 连续Fail跳转比例
            DOWN_RATIO_LIMIT_COUNT: 1, // 连续Fail数量
            SAMPLE_COUNT: 0, // 当前抽检:前面的数字
            ORDER_NO: (rowIndex + 1) * 10 // 序号
          }
          console.log('最后record:', record)
          this.$refs.xTable.insertAt(record, -1).then(({ row }) => {
            this.$refs.xTable.setActiveRow(row)
          })
          this.isSave = false
          this.isOne = false
        } else {
          const record = {
            ID: 0,
            PROJECT_ID: this.ConfigurationForm.PROJECT_ID, // 抽检方案名称维护
            SAMPLE_RATIO: null, // 当前抽检比例
            SAMPLE_RATIO_COUNT: 0, // 当前抽检:后面的数字
            UP_RATIO: this.mainTable[rowIndex + 1].SAMPLE_RATIO, // 连续Pass跳转比例
            UP_RATIO_LIMIT_COUNT: 1, // 连续Pass数量
            DOWN_RATIO: this.mainTable[rowIndex].SAMPLE_RATIO, // 连续Fail跳转比例
            DOWN_RATIO_LIMIT_COUNT: 1, // 连续Fail数量
            SAMPLE_COUNT: 0, // 当前抽检:前面的数字
            ORDER_NO: (rowIndex + 1) * 10, // 序号
            insertIndex: -1
          }
          console.log('插入record:', record)
          this.$refs.xTable
            .insertAt(record, this.mainTable[rowIndex + 1])
            .then(({ row }) => {
              this.$refs.xTable.setActiveRow(row)
              // 叠加ORDER_NO +10
              this.mainTable.map(item => {
                if (item['ORDER_NO'] >= record.ORDER_NO) {
                  item['ORDER_NO'] += 10
                }
              })
              console.log(this.mainTable)
            })
          this.isSave = false
          this.isOne = false
        }
      } else {
        this.saveClick2(e => {
          if (e) {
            // console.log('插入row:', row)
            // console.log('插入rowIndex:', rowIndex)
            console.log('isAdd:', this.isAdd)
            console.log('长度:', this.mainTable.length)
            if (this.isAdd === false) return false
            if (rowIndex + 1 === this.defaultLength) {
              const record = {
                ID: 0,
                PROJECT_ID: this.ConfigurationForm.PROJECT_ID, // 抽检方案名称维护
                SAMPLE_RATIO: null, // 当前抽检比例
                SAMPLE_RATIO_COUNT: 0, // 当前抽检:后面的数字
                UP_RATIO: null, // 连续Pass跳转比例
                UP_RATIO_LIMIT_COUNT: 1, // 连续Pass数量
                DOWN_RATIO: row.SAMPLE_RATIO, // 连续Fail跳转比例
                DOWN_RATIO_LIMIT_COUNT: 1, // 连续Fail数量
                SAMPLE_COUNT: 0, // 当前抽检:前面的数字
                ORDER_NO: (rowIndex + 1) * 10 // 序号
              }
              console.log('最后record:', record)
              this.$refs.xTable.insertAt(record, -1).then(({ row }) => {
                this.$refs.xTable.setActiveRow(row)
              })
              this.isSave = false
              this.isOne = false
            } else {
              const record = {
                ID: 0,
                PROJECT_ID: this.ConfigurationForm.PROJECT_ID, // 抽检方案名称维护
                SAMPLE_RATIO: null, // 当前抽检比例
                SAMPLE_RATIO_COUNT: 0, // 当前抽检:后面的数字
                UP_RATIO: this.mainTable[rowIndex + 1].SAMPLE_RATIO, // 连续Pass跳转比例
                UP_RATIO_LIMIT_COUNT: 1, // 连续Pass数量
                DOWN_RATIO: this.mainTable[rowIndex].SAMPLE_RATIO, // 连续Fail跳转比例
                DOWN_RATIO_LIMIT_COUNT: 1, // 连续Fail数量
                SAMPLE_COUNT: 0, // 当前抽检:前面的数字
                ORDER_NO: (rowIndex + 1) * 10, // 序号
                insertIndex: -1
              }
              console.log('插入record:', record)
              this.$refs.xTable
                .insertAt(record, this.mainTable[rowIndex + 1])
                .then(({ row }) => {
                  this.$refs.xTable.setActiveRow(row)
                  // 叠加ORDER_NO +10
                  this.mainTable.map(item => {
                    if (item['ORDER_NO'] >= record.ORDER_NO) {
                      item['ORDER_NO'] += 10
                    }
                  })
                  console.log(this.mainTable)
                })
              this.isSave = false
              this.isOne = false
            }
          }
        })
      }
    },
    // 删除
    removeClick (row) {
      console.log(row)
      var that = this
      // const rowORDERNO = row.ORDER_NO
      if (!row) return false
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('publics.tips.tips'),
        {
          confirmButtonText: this.$t('publics.tips.confirm'),
          cancelButtonText: this.$t('publics.tips.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          that.$refs.xTable.remove(row)
          let postdata = that.$refs.xTable.getRecordset()
          if (
            postdata.insertRecords.length ||
            postdata.updateRecords.length ||
            postdata.removeRecords.length
          ) {
            this.$refs.xTable.validate(async (valid) => {
              if (valid) {
                that.form.RemoveRecords = postdata.removeRecords
                // 叠加ORDER_NO +10
                this.$refs.xTable.getTableData().tableData.map(item => {
                  if (item['ORDER_NO'] > row.ORDER_NO) {
                    item['ORDER_NO'] -= 10
                  }
                })
                const res = await SaveSampleProjectConfigData(this.form)
                if (res.Result) {
                  that.form = {}
                  that.$notify({
                    title: that.$t('publics.tips.success'),
                    message: that.$t('publics.tips.deleteSuccess'),
                    type: 'success',
                    duration: 2000
                  })
                }
              }
            })
          }
          // that.mainTable[rowORDERNO + 1].DOWN_RATIO =
          //   that.mainTable[rowORDERNO - 1].SAMPLE_RATIO
          console.log(that.mainTable)
        })
        .catch(() => { })
    },
    // 保存
    async saveClick () {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.SAMPLE_COUNT === 0 &&
        postdata.insertRecords.SAMPLE_RATIO_COUNT === 0 &&
        postdata.updateRecords.SAMPLE_COUNT === 0 &&
        postdata.updateRecords.SAMPLE_RATIO_COUNT === 0 &&
        postdata.removeRecords.SAMPLE_COUNT === 0 &&
        postdata.removeRecords.SAMPLE_RATIO_COUNT === 0
      ) {
        this.$message({
          message: this.$t('SfcsSampleProjects._16'),
          type: 'error'
        })
      } else if (
        postdata.insertRecords.length ||
        postdata.updateRecords.length ||
        postdata.removeRecords.length
      ) {
        that.$refs.xTable.validate(valid => {
          if (valid) {
            that.form = {
              InsertRecords: [],
              UpdateRecords: [],
              RemoveRecords: []
            }
            if (that.isOne) {
              that.mainTable.map(item => {
                item.ORDER_NO += 10
                that.form.UpdateRecords.push(item)
              })
              that.form.InsertRecords = postdata.insertRecords
              // that.form.UpdateRecords = postdata.updateRecords
            } else {
              that.form.InsertRecords = postdata.insertRecords
              that.form.UpdateRecords = postdata.updateRecords
              that.form.RemoveRecords = postdata.removeRecords
            }
            console.log(this.form)
            SaveSampleProjectConfigData(this.form).then(res => {
              if (res.ErrorInfo.Status) {
                that.$message({
                  message: res.ErrorInfo.Message,
                  type: 'error'
                })
              } else if (res.Result === true) {
                this.form = {}
                that.$notify({
                  title: that.$t('crss._20'),
                  message: that.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
                that.getLoadSampleProjectConfigData()
                that.isSave = true
              }
            })
          }
        })
      }
    },
    // 新增插入保存
    saveClick2 (backCall) {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.SAMPLE_COUNT === 0 &&
        postdata.insertRecords.SAMPLE_RATIO_COUNT === 0 &&
        postdata.updateRecords.SAMPLE_COUNT === 0 &&
        postdata.updateRecords.SAMPLE_RATIO_COUNT === 0 &&
        postdata.removeRecords.SAMPLE_COUNT === 0 &&
        postdata.removeRecords.SAMPLE_RATIO_COUNT === 0
      ) {
        this.$message({
          message: this.$t('SfcsSampleProjects._16'),
          type: 'error'
        })
      } else if (
        postdata.insertRecords.length ||
        postdata.updateRecords.length ||
        postdata.removeRecords.length
      ) {
        this.$refs.xTable.validate(valid => {
          if (valid) {
            this.form.InsertRecords = postdata.insertRecords
            this.form.UpdateRecords = postdata.updateRecords
            this.form.RemoveRecords = postdata.removeRecords
            SaveSampleProjectConfigData(this.form).then(async res => {
              if (res.ErrorInfo.Status) {
                this.$message({
                  message: res.ErrorInfo.Message,
                  type: 'error'
                })
              } else if (res.Result === true) {
                that.form = {}
                that.isAdd = true
                that.isSave = true
                await that.getLoadSampleProjectConfigData()
                backCall(true) // 重新拉数据会导致你插入状态消失
              }
            })
          }
        })
      }
    },
    addClick () {
      this.dialogTableVisible = true
    },
    addhandleSizeChange (val) {
      this.addformData.Limit = val
      this.getLoadSampleProjectConfigData()
    },
    addhandleCurrentChange (val) {
      this.addformData.Page = val
      this.getLoadSampleProjectConfigData()
    },
    // 查询
    async search_but () {
      this.isOne = false
      this.addformData.Page = 1
      const res = await LoadSampleProjectsData(this.addformData)
      this.addTable = res.Result
      this.addtotalPage = res.TotalCount
    },
    // 新增插入
    add_but (row) {
      const record = {
        ID: 0,
        PROJECT_NAME: '',
        DESCRIPTION: '',
        ENABLED: 'Y'
      }
      this.$refs._xTable.insertAt(record, row).then(({ row }) => {
        this.$refs._xTable.setActiveRow(row)
      })
    },
    // 删除
    remove_but (row, index) {
      if (row) {
        this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).then(() => {
          this.$refs._xTable.remove(row)
          this.$notify({
            title: this.$t('publics.tips.success'),
            message: this.$t('publics.tips.deleteSuccess'),
            type: 'success',
            duration: 2000
          })
          this.save_but()
        })
      } else {
        return false
      }
    },
    // 保存
    async save_but () {
      var that = this
      var postdata = this.$refs._xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs._xTable.validate(valid => {
          if (valid) {
            this.addForm.InsertRecords = postdata.insertRecords
            this.addForm.UpdateRecords = postdata.updateRecords
            this.addForm.RemoveRecords = postdata.removeRecords
            SaveData(this.addForm).then(response => {
              if (response.Result) {
                that.addForm = {}
                that.search_but()
                that.getLoadData()
                that.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addForm {
  height: calc(100vh - 400px);
  margin-top: 10px;
}
.pagination {
  padding-top: 10px;
}
</style>
