<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header>
        <el-select clearable
                   v-model="formData.LEVEL_CODE"
                   :placeholder="$t('SmtMsdLevelRule._1')"
                   style="width:200px">
          <el-option v-for="item in LEVEL_CODEList"
                     :label="item.CN_DESC"
                     :key="item.VALUE"
                     :value="item.VALUE" />
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addClick(0)">{{$t('publics.btn.add')}}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="handleSave">{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table row-key
                 ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 keep-source
                 stripe
                 :loading="loading"
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                 @cell-click="cellClick">
        <vxe-table-column min-width="170"
                          field="LEVEL_CODE"
                          :title="$t('SmtMsdBakeRule._2')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible', autoselect: true}">
          <template v-slot:edit="{row, $rowIndex}">
            <div>
              <span v-show="$rowIndex !== currentRowIndex">{{ getCollectName(row.LEVEL_CODE,LEVEL_CODEList) }}</span>
              <el-select class="custom-select"
                         v-show="$rowIndex === currentRowIndex"
                         v-model="row.LEVEL_CODE"
                         style="width: 100%">
                <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
                  <span style="width: 40%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{ $t('SmtMsdBakeRule._19') }}</span>
                  <span style="width: 60%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ $t('SmtMsdBakeRule._20') }}</span>
                </div>
                <el-option style="width: 360px;display: flex"
                           v-for="item in LEVEL_CODEList"
                           :key="item.VALUE"
                           :value="item.VALUE"
                           :label="item.CN_DESC">
                  <span style="width: 40%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.VALUE }}</span>
                  <span style="width: 60%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.CN_DESC }}</span>
                </el-option>
              </el-select>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="180"
                          field="MIN_THICKNESS"
                          :title="$t('SmtMsdLevelRule._3')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
        <vxe-table-column min-width="190"
                          field="MAX_THICKNESS"
                          :title="$t('SmtMsdLevelRule._4')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
        <vxe-table-column min-width="200"
                          field="TEMPERATURE"
                          :title="$t('SmtMsdLevelRule._5')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
        <vxe-table-column min-width="180"
                          field="HUMIDITY"
                          :title="$t('SmtMsdLevelRule._6')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
        <vxe-table-column min-width="140"
                          field="FLOOR_LIFE"
                          :title="$t('SmtMsdLevelRule._7')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
        <vxe-table-column min-width="170"
                          field="ENABLED"
                          :title="$t('SmtMsdLevelRule._8')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <el-switch v-model="row.ENABLED"
                       :active-text="$t('publics.btn.yes')"
                       :inactive-text="$t('publics.btn.no')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N" />
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="140"
                          :title="$t('publics.field.operate')"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)">{{ $t('publics.btn.delete') }}</el-button>
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
  </d2-container>
</template>

<script>
import helper from '@/api/Helper'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
const API = helper('SmtMsdLevelRule')
export default {
  name: 'SmtMsdLevelRule',
  components: {
    customContainerHeader
  },
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => API.SaveData(e)
    })
  ],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      LEVEL_CODEList: [], // 等级下拉数据
      loading: false,
      mainTable: [],
      currentRowIndex: -1,
      saveArray: 0,
      validRules: {
        LEVEL_CODE: [
          {
            required: true,
            message: this.$t('SmtMsdLevelRule._1')
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
    async getIndex () {
      const res = await API.Index()
      this.LEVEL_CODEList = res.Result.LevelCode ? res.Result.LevelCode : []
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      const data = res.Result
      this.mainTable = data || []
      console.log(this.mainTable, '获取表格')
      this.totalPage = res.TotalCount ? res.TotalCount : 0
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    addClick (row) {
      const record = {
        ID: 0,
        LEVEL_CODE: '',
        MIN_THICKNESS: 0,
        MAX_THICKNESS: 0,
        TEMPERATURE: 0,
        HUMIDITY: 0,
        FLOOR_LIFE: 0,
        ENABLED: ''
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    // 保存
    handleSave () {
      const data = this.$refs.xTable.getTableData().fullData
      this.saveArray = data.length
      console.log('===============', data)
      // TODO 判断
      data.map(item => {
        if (item.MIN_THICKNESS > item.MAX_THICKNESS) {
          this.$message.error(this.$t('SmtMsdBakeRule._15'))
          return false
        }
        this.saveArray -= 1
      })
      if (this.saveArray === 0) {
        this.preserveClick()
      }
    },
    getCollectName (id, originData) {
      let res = ''
      originData.map(item => {
        if (item.VALUE === id) {
          res = item.CN_DESC
        }
      })
      return res
    },
    cellClick (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
      this.currentIndex = $rowIndex
    },
    changeMin (e) {
      console.log(e)
    }
  }
}
</script>

<style>
</style>
