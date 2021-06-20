<template>
  <div class="container">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleCollapseOpen" @close="handleCollapseClose" :collapse="isCollapse" @select="selectCollapse">
      <el-menu-item :index="item.ID" v-for="item in modulesList" :key="item.ID">
        <i class="el-icon-menu"></i>
        <span slot="title" style="display: inline-block; width: 100%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">{{ item.REPORT_NAME }}</span>
      </el-menu-item>
    </el-menu>
    <div class="content">
      <div class="header">
        <custom-container-header :importBtnName = "moduleName + 'Import'"
                                 :exportBtnName = "moduleName + 'Export'"
                                 :exportTplName = "moduleName + 'ExportTPL'"
                                 export-mehods-name="exportData"
        >
          <!--报表中心按钮-->
          <el-button @click="changeCollapse" icon="el-icon-folder-opened" style="margin-right: 10px"></el-button>
          <!--    普通输入框    -->
          <el-input v-for="item in headerConfig.inputList" :key="item.PARAM_NAME" :placeholder="'请输入'+item.REMARK" v-model="form[item.PARAM_NAME]" style="width: 150px; margin-right: 10px" size="small"></el-input>
          <!--   普通下拉框     -->
          <el-select v-for="item in headerConfig.selectList" :key="item.PARAM_NAME" :placeholder="'请选择'+item.REMARK" v-model="form[item.PARAM_NAME]" style="width: 150px; margin-right: 10px" size="small">
            <el-option v-for="option in item.REFERENCE_List"
                       :key="option.CODE"
                       :label="option.NAME"
                       :value="option.CODE">
            </el-option>
          </el-select>
          <!--    分页下拉框    -->
          <PSelect v-for="item in headerConfig.PSelectList"
                   :key="item.PARAM_NAME"
                   :bind-data="form[item.PARAM_NAME]"
                   :placeholder-str="item.REMARK"
                   :p-a-r-a-m_-n-a-m-e="item.PARAM_NAME"
                   :MST_ID="moduleID"
                   @getData="setPSelectData"
                   style="width: 150px; margin-right: 10px"
          ></PSelect>
          <!--    搜索按钮    -->
          <el-button
            type="primary"
            icon="el-icon-search"
            @click.prevent="searchClick"
          >{{ $t("plbd.hd_sf") }}</el-button
          >
          <!--    新增按钮    -->
  <!--        <el-button-->
  <!--          type="success"-->
  <!--          @click="insertEvent(null)"-->
  <!--          icon="el-icon-plus"-->
  <!--        >{{ $t("plbd.add") }}</el-button>-->
          <!--    高级筛选按钮    -->
          <el-button type="primary" icon="el-icon-finished" @click="sort_drawer = true" size="small">高级筛选</el-button>
        </custom-container-header>
      </div>
      <div class="table">
  <!--      <vxe-table-->
  <!--        border-->
  <!--        resizable-->
  <!--        show-overflow-->
  <!--        align="center"-->
  <!--        :data="tableData"-->
  <!--        ref="centerTable"-->
  <!--        >-->
  <!--        <vxe-table-column type="seq" width="60"></vxe-table-column>-->
          <vxe-grid
            :columns="columnList"
            :data="tableData"
            border="full"
            height="auto"
          >
          </vxe-grid>
  <!--        <vxe-table-column v-for="item in columnList" :key="item.ORD_IDX" :field="item.COLUMN_NAME" width="150" :title="item.COLUMN_CAPTION">-->
  <!--          <template v-slot:default = "{ row }">-->
  <!--            <span>{{ row[item.COLUMN_NAME] || item.COLUMN_CAPTION }}</span>-->
  <!--&lt;!&ndash;            <span v-if="item.DATA_TYPE === 2">{{ item.REFERENCE_List.filter(fil => fil.CODE === row[item.PARAM_NAME])[0].NAME }}</span>&ndash;&gt;-->
  <!--          </template>-->
  <!--          <template #edit = "{ row }">-->
  <!--            <vxe-input type="text" v-model="row[item.PARAM_NAME]" v-if="item.DATA_TYPE === 1"></vxe-input>-->
  <!--            <vxe-select v-model="row[item.PARAM_NAME]" v-if="item.DATA_TYPE === 2">-->
  <!--              <vxe-option v-for="option in item.REFERENCE_List"-->
  <!--                         :key="option.CODE"-->
  <!--                         :label="option.NAME"-->
  <!--                         :value="option.CODE">-->
  <!--              </vxe-option>-->
  <!--            </vxe-select>-->
  <!--            <PSelect-->
  <!--                     :bind-data="row[item.PARAM_NAME]"-->
  <!--                     :placeholder-str="item.REMARK"-->
  <!--                     :p-a-r-a-m_-n-a-m-e="item.PARAM_NAME"-->
  <!--                     @getData="setPSelectData"-->
  <!--                     style="width: 150px; margin-right: 10px"-->
  <!--                     v-if="item.DATA_TYPE === 3"-->
  <!--            ></PSelect>-->
  <!--          </template>-->
  <!--        </vxe-table-column>-->
  <!--        <vxe-table-column field="ENABLED" fixed="right" width="200" :title="$t('se_cc.operate')">-->
  <!--          <template slot-scope="scope">-->
  <!--            <el-button-->
  <!--              v-if="$btnList.indexOf('SfcsEquipContentConfedit') !== -1"-->
  <!--              type="primary"-->
  <!--              size="small"-->
  <!--              @click="edit_btn(scope.row)"-->
  <!--            >{{$t('se_cc.edit')}}</el-button>-->
  <!--            <el-button-->
  <!--              v-if="$btnList.indexOf('SfcsEquipContentConfdelete') !== -1"-->
  <!--              type="danger"-->
  <!--              size="small"-->
  <!--              @click="remove_btn(scope.row)"-->
  <!--            >{{$t('se_cc.delete')}}</el-button>-->
  <!--          </template>-->
  <!--        </vxe-table-column>-->
  <!--      </vxe-table>-->
      </div>
      <div class="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.currentPage"
          :page-sizes="[15, 20, 30, 40]"
          :page-size="listQuery.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-drawer title="高级筛选"
                 :visible.sync="sort_drawer"
                 direction="rtl"
                 :before-close="sort_handleClose"
                 size="60%"
      >
        <div style="height: 15%">
          <el-button type="primary" @click="addSort">新增</el-button>
          <el-button type="primary" @click="resetSort">重置</el-button>
          <el-button type="primary" @click="submitSort">确认</el-button>
        </div>
        <vxe-table
          ref="conditionTable"
          border
          resizable
          height="85%"
          size="medium"
          align="center"
          highlight-current-row
          highlight-hover-row
          show-overflow
          auto-resize
          keep-source
          stripe
          :data="sortList"
          :mouse-config="{ selected: true }"
          :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
          :radio-config="{ labelField: 'name', trigger: 'row' }"
          :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
        >
          <vxe-table-column
            min-width="150"
            field="REMARK"
            :title="'筛选字段'"
            :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
          >
            <template v-slot:edit="{ row }">
              <el-select
                v-model="row.PARAM_NAME"
                style="width: 100%"
                placeholder=" "
              >
                <el-option
                  v-for="(item, index) in data"
                  :key="index"
                  :label="item.REMARK"
                  :value="item.PARAM_NAME"
                >
                </el-option>
              </el-select>
            </template>
          </vxe-table-column>
          <vxe-table-column
            min-width="150"
            field="ACTION_TYPE"
            :title="'筛选类型'"
            :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
          >
            <template v-slot:edit="{ row }">
              <el-select
                v-model="row.ACTION_TYPE"
                style="width: 100%"
                placeholder=" "
              >
                <el-option
                  v-for="(item, index) in typeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </vxe-table-column>
          <vxe-table-column field="PARAM_VALUE" width="150" title="输入值" :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
            <template v-slot:edit="{ row }">
              <el-input v-model="row.PARAM_VALUE" v-if="row.DATA_TYPE === 1"></el-input>
              <el-select v-model="row.PARAM_VALUE" v-if="row.DATA_TYPE === 2">
                <el-option v-for="option in row.REFERENCE_List"
                            :key="option.CODE"
                            :label="option.NAME"
                            :value="option.CODE">
                </el-option>
              </el-select>
              <PSelect
                :bind-data="row.PARAM_VALUE"
                :placeholder-str="row.REMARK"
                :p-a-r-a-m_-n-a-m-e="row.PARAM_NAME"
                @getData="setPSelectData"
                style="width: 150px; margin-right: 10px"
                v-if="row.DATA_TYPE === 3"
              ></PSelect>
            </template>
          </vxe-table-column>
          <vxe-table-column field="ENABLED" width="100" :title="$t('se_cc.operate')">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="small"
                @click="removeSort(scope.row)"
              >{{$t('se_cc.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import PSelect from '@/components/PSelect'
import CustomContainerHeader from '@/components/custom-container-header'
import request from '@/plugin/axios'
import { LoadData, GetParamsForQuery, QuerySql, LoadDtlData } from '@/api/ReportMst'

export default {
  name: 'CustomReport',
  data () {
    return {
      // 当前报表模块名称,用于构建头部功能栏的功能按键
      moduleName: '',
      moduleID: '',
      // 报表中心按钮
      modulesList: [],
      // 列表列
      columnList: [],
      // 搜索表单
      form: {},
      // 新增表单
      edit: {},
      // 报表配置数据
      data: [],
      // 顶部功能栏
      // 普通输入框
      headerConfig: {
        inputList: [],
        // 日期输入框
        dateList: [],
        // 普通下拉框
        selectList: [],
        // 分页下拉框
        PSelectList: []
      },
      // 列表数据
      tableData: [],
      // 分页
      total: 400,
      listQuery: {
        currentPage: 1,
        limit: 15,
        Key: ''
      },
      // 高级筛选开关
      sort_drawer: false,
      // 高级筛选种类
      typeList: [
        { value: 1, label: '等于(=)' },
        { value: 2, label: '大于(>)' },
        { value: 3, label: '大于等于(>=)' },
        { value: 4, label: '小于(<)' },
        { value: 5, label: '小于等于(<=)' },
        { value: 6, label: '模糊搜索(like)' }
      ],
      sortList: [],
      isCollapse: true
    }
  },
  methods: {
    selectCollapse (index) {
      this.moduleID = index
      this.moduleName = this.modulesList.filter(item => item.ID === index)[0].REPORT_NAME
    },
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    },
    handleCollapseOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleCollapseClose (key, keyPath) {
      console.log(key, keyPath)
    },
    submitSort () {
      this.sort_drawer = false
      this.searchClick()
    },
    resetSort () {
      this.sortList = []
      this.addSort()
    },
    addSort () {
      this.sortList.push({
        REMARK: '',
        PARAM_NAME: '',
        ACTION_TYPE: '',
        PARAM_VALUE: '',
        DATA_TYPE: '',
        REFERENCE_List: []
      })
    },
    removeSort (row) {
      this.sortList = this.sortList.filter(item => item.PARAM_NAME !== row.PARAM_NAME)
    },
    async getModulesList () {
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.modulesList = res.Result
      }
      this.moduleID = this.modulesList[0].ID
      this.moduleName = this.modulesList[0].REPORT_NAME
    },
    // async edit_btn (row) {
    //   Object.keys(row).forEach(item => {
    //     this.form[item] = row[item]
    //   })
    //   const res = await request.post(this.data.updateData, this.form)
    //   this.tableData = res.Result.data
    // },
    // async remove_btn (row) {
    //   const res = await request.post(this.data.updateData, row.id)
    //   this.tableData = res.Result.data
    // },
    async LoadDtlData (moduleID) {
      const res = await LoadDtlData({ mst_id: moduleID })
      this.columnList = res.Result.map(item => {
        return {
          field: item.COLUMN_NAME,
          title: item.COLUMN_CAPTION,
          width: 150,
          align: 'center'
        }
      })
      this.columnList.unshift({ type: 'seq', width: 60, align: 'center' })
      this.searchClick()
    },
    async searchClick () {
      // const res = await request.post(this.data.selectData, this.listQuery)
      // this.tableData = res.Result.data
      // this.total = res.Result.totalcount
      // this.listQuery.currentPage = res.Result.currentPage
      // this.listQuery.limit = res.Result.limit
      const res = await QuerySql({
        MST_ID: this.moduleID,
        Params: this.sortList || [],
        Page: this.listQuery.currentPage,
        Limit: this.listQuery.limit,
        Key: this.listQuery.Key
      })
      this.tableData = res.Result
      this.total = res.TotalCount
    },
    // async insertEvent () {
    //   const res = await request.post(this.data.saveData, this.form)
    //   this.tableData = res.Result.data
    // },
    // async changeSwitch (row) {
    //   await this.edit_btn(row)
    // },
    sort_handleClose () {
      this.sort_drawer = false
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.searchClick()
    },
    handleCurrentChange (val) {
      this.listQuery.currentPage = val
      this.searchClick()
    },
    updateView () {
      this.$forceUpdate()
    },
    setPSelectData (val) {
      this.form[val.name] = val.val
    },
    async getParamsForQuery (moduleID) {
      const res = await GetParamsForQuery({ id: moduleID })
      this.data = res.Result
      // 伪数据 1为普通输入框 2为普通下拉框 3为分页下拉框
      this.data.forEach(item => {
        if (item.PARAM_NAME) {
          this.$set(this.form, item.PARAM_NAME.toString(), '')
        }
      })
      this.$forceUpdate()
      const header = this.data.filter(item => item.IS_DEFAULT === 'Y')
      this.headerConfig.inputList = header.filter(item => item.DATA_TYPE === 1)
      this.headerConfig.selectList = header.filter(item => {
        return item.DATA_TYPE === 2 && item.IS_PAGING === 'N'
      })
      this.headerConfig.PSelectList = header.filter(item => {
        return item.DATA_TYPE === 2 && item.IS_PAGING === 'Y'
      })
    }
  },
  created () {
    this.getModulesList()
  },
  watch: {
    moduleID (val) {
      this.moduleName = this.modulesList.filter(item => item.ID === val)[0].REPORT_NAME
      this.getParamsForQuery(val)
      this.LoadDtlData(val)
    },
    sortList: {
      deep: true,
      handler (val) {
        val.forEach(item => {
          item.DATA_TYPE = this.data.filter(data => data.PARAM_NAME === item.PARAM_NAME)[0].DATA_TYPE
          item.REMARK = this.data.filter(data => data.PARAM_NAME === item.PARAM_NAME)[0].REMARK
          item.REFERENCE_List = this.data.filter(data => data.PARAM_NAME === item.PARAM_NAME)[0].REFERENCE_List
        })
      }
    }
  },
  components: {
    CustomContainerHeader,
    PSelect
  }
}
</script>

<style scoped lang="scss">
  .container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    .el-menu{
    }
    .content{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      width: calc(100% - 65px);
      padding: 10px 20px;
      box-sizing: border-box;
      background-color: #FFFFFF;
      .header,.footer,.table{
        width: 100%;
      }
      .table{
        height: calc(100% - 84px);
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
 ::v-deep .el-drawer__body{
   padding: 20px;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
 }
</style>
