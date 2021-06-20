<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        exportMehodsName="exportData"
        importBtnName="SfcsMessageConfigImport"
        exportBtnName="SfcsMessageConfigExport"
        exportTplName="SfcsMessageConfigExportTPL"
      >
        <el-input
          style="width:150px"
          v-model="formData.MESSAGE_NO"
          :placeholder="$t('SfcsMessageConfig._10')"
          clearable
        />
        <el-input
          style="width:150px"
          v-model="MESSAGE"
          :placeholder="$t('SfcsMessageConfig._11')"
          clearable
        />
        <el-select
          v-model="formData.CATEGORY"
          :placeholder="$t('SfcsMessageConfig._12')"
          clearable
          filterable
          style="width:150px"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          style="width:150px"
          v-model="formData.APPLICATION_NAME"
          :placeholder="$t('SfcsMessageConfig._13')"
          clearable
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('publics.btn.search') }}</el-button>
        <el-button
          type="success"
          @click="insertEvent(null)"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SfcsMessageConfigAdd') !== -1"
        >{{ $t('publics.btn.add') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick()"
          v-if="$btnList.indexOf('SfcsMessageConfigEdit') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table
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
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
        @cell-click="cellClick"
      >
        <vxe-table-column
          field="MESSAGE_NO"
          min-width="170"
          :title="$t('SfcsMessageConfig._2')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          field="CHINESE_MESSAGE"
          min-width="200"
          :title="$t('SfcsMessageConfig._3')"
          :edit-render="{name:'input'}"
        />
        <vxe-table-column
          min-width="200"
          field="ENGLISH_MESSAGE"
          :title="$t('SfcsMessageConfig._4')"
          :edit-render="{name:'input'}"
        />
        <vxe-table-column
          field="PARAMETERS_COUNT"
          min-width="150"
          :title="$t('SfcsMessageConfig._5')"
          :edit-render="{name:'$input', props: {type: 'number'}}"
        />
        <vxe-table-column
          field="CATEGORY"
          min-width="100"
          :title="$t('SfcsMessageConfig._6')"
          :edit-render="{name: 'select', options: statusList}"
        />
        <vxe-table-column
          field="BACKGROUND_FLAG"
          min-width="210"
          :title="$t('SfcsMessageConfig._7')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row, $rowIndex }">
            <div>
              <el-switch
                v-model="row.BACKGROUND_FLAG"
                :disabled="$rowIndex !== currentRowIndex"
                :active-text="$t('publics.btn.yes')"
                :inactive-text="$t('publics.btn.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="APPLICATION_NAME"
          min-width="200"
          :title="$t('SfcsMessageConfig._8')"
          :edit-render="{name:'input'}"
        />
        <vxe-table-column :title="$t('plbd.tb_og')" min-width="120" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
              v-if="$btnList.indexOf('SfcsMessageConfigRemove') !== -1"
            >{{ $t('plbd.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
        class="SmtLineSubstitute-pagination"
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </d2-container>
</template>

<script>
import helper from '@/api/Helper'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
const API = helper('SfcsMessageConfig')
export default {
  name: 'SfcsMessageConfig',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => API.SaveData(e)
    })
  ],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        MESSAGE_NO: '',
        CHINESE_MESSAGE: '',
        ENGLISH_MESSAGE: '',
        CATEGORY: '',
        APPLICATION_NAME: '',
        ...this.formData
      },
      MESSAGE: '',
      validRules: {
        MESSAGE_NO: [
          {
            required: true,
            message: this.$t('SfcsMessageConfig._9')
          }
        ],
        CHINESE_MESSAGE: [
          {
            required: true,
            message: this.$t('SfcsMessageConfig._14')
          }
        ],
        ENGLISH_MESSAGE: [
          {
            required: true,
            message: this.$t('SfcsMessageConfig._15')
          }
        ],
        PARAMETERS_COUNT: [
          {
            required: true,
            message: this.$t('SfcsMessageConfig._16')
          }
        ],
        CATEGORY: [
          {
            required: true,
            message: this.$t('SfcsMessageConfig._17')
          }
        ],
        BACKGROUND_FLAG: [
          {
            required: true,
            message: this.$t('SfcsMessageConfig._18')
          }
        ],
        APPLICATION_NAME: [
          {
            required: true,
            message: this.$t('SfcsMessageConfig._19')
          }
        ]
      },
      currentRowIndex: -1,
      statusList: [],
      enabledList: []
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        const { statusList, enabled } = res.Result

        this.statusList.push({
          label: '',
          value: '',
          disabled: false
        })
        statusList.map(item => {
          this.statusList.push({
            label: item.MEANING,
            value: item.LOOKUP_CODE.toString(),
            disabled: false
          })
        })
        this.enabledList = enabled
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async cellClick (e) {
      const { $rowIndex, columnIndex } = e
      if (columnIndex === 7) {
        return false
      }
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        MESSAGE_NO: '',
        CHINESE_MESSAGE: '',
        ENGLISH_MESSAGE: '',
        PARAMETERS_COUNT: '',
        CATEGORY: '',
        BACKGROUND_FLAG: '',
        APPLICATION_NAME: ''
      }
      const e = await this.$refs.xTable.insertAt(record, row)
      this.disabled = true
      this.currentRowIndex = 0
      this.$refs.xTable.setActiveCell(e.row, 'MESSAGE_NO')
    },
    // 搜索
    searchClick () {
      if (this.$i18n.locale !== 'zh-chs') {
        this.formData.ENGLISH_MESSAGE = this.MESSAGE
        this.formData.CHINESE_MESSAGE = ''
      } else {
        this.formData.CHINESE_MESSAGE = this.MESSAGE
        this.formData.ENGLISH_MESSAGE = ''
      }
      this.formData.Page = 1
      this.getLoadData()
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter', this)
    next()
  },
  created () {
    console.log('created')
    this.getIndex()
  }
}
</script>
