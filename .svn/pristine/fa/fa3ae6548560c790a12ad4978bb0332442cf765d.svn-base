<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        importBtnName="MesProductionPreConfImport"
        exportBtnName="MesProductionPreConfExport"
        exportTplName="MesProductionPreConfExportTPL"
      >
        <el-select
          v-model="formData.CONTENT_TYPE"
          :placeholder="$t('MesProductionPreConf._2')"
          clearable
          filterable
          style="width: 190px"
        >
          <el-option
            v-for="item in ContentTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          v-model="formData.CONFIRM_CONTENT"
          style="width: 180px"
          clearable
          :placeholder="$t('MesProductionPreConf._1')"
        ></el-input>
        <el-select
          v-model="formData.CLASS_TYPE"
          :placeholder="$t('MesProductionPreConf._3')"
          clearable
          filterable
          style="width: 200px"
        >
          <el-option
            v-for="item in ClassTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('publics.btn.search') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="insertEvent(null)"
          v-if="$btnList.indexOf('MesProductionPreConfAdd') !== -1"
        >{{ $t('publics.btn.add') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="preserveClick()"
          v-if="$btnList.indexOf('MesProductionPreConfEdit') !== -1"
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
        highlight-current-row
        highlight-hover-row
        show-overflow
        auto-resize
        keep-source
        :loading="loading"
        :data="mainTable"
        :edit-rules="validRules"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <vxe-table-column
          field="CONTENT_TYPE"
          min-width="180"
          :title="$t('MesProductionPreConf._4')"
          :edit-render="{name: '$select', options: ContentTypeList}"
        />
        <vxe-table-column
          field="CONTENT"
          min-width="180"
          :title="$t('MesProductionPreConf._5')"
          :edit-render="{name: '$input'}"
        />
        <vxe-table-column
          field="CONFIRM_CONTENT"
          min-width="220"
          :title="$t('MesProductionPreConf._6')"
          :edit-render="{name: '$input'}"
        />
        <vxe-table-column
          field="CREATE_TIME"
          min-width="180"
          :title="$t('MesProductionPreConf._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="CREATOR"
          min-width="180"
          :title="$t('MesProductionPreConf._8')"
          :edit-render="{name: '$input'}"
        />
        <vxe-table-column
          field="CLASS_TYPE"
          min-width="180"
          :title="$t('MesProductionPreConf._9')"
          :edit-render="{name: '$select', options: ClassTypeList}"
        />
        <vxe-table-column
          field="ENABLED"
          width="180"
          :title="$t('SmtStencilConfig._6')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch
                v-model="row.ENABLED"
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
          :title="$t('publics.field.operate')"
          width="120"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              type="danger"
              @click="removeClick(row, {
                  id: row.ID
              })"
              v-if="$btnList.indexOf('MesProductionPreConfRemove') !== -1"
            >{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
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
import { mapGetters } from 'vuex'
const API = helper('MesProductionPreConf')
export default {
  name: 'MesProductionPreConf',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => API.SaveData(e),
      defaultCheckIsUsedAPI: e => API.ItemIsByUsed(e),
      isNeedDeleteCheck: true
    })
  ],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      ClassTypeList: [],
      ContentTypeList: [],
      formData: {
        CONTENT_TYPE: '',
        CLASS_TYPE: '',
        CONFIRM_CONTENT: '', // 确认标准
        ...this.formData
      },
      validRules: {
        CONTENT_TYPE: [
          {
            required: true,
            message: this.$t('MesProductionPreConf._10')
          }
        ],
        CONTENT: [
          {
            required: true,
            message: this.$t('MesProductionPreConf.11')
          }
        ],
        CONFIRM_CONTENT: [
          {
            required: true,
            message: this.$t('MesProductionPreConf.12')
          }
        ],
        CREATOR: [
          {
            required: true,
            message: this.$t('MesProductionPreConf.13')
          }
        ],
        CLASS_TYPE: [
          {
            required: true,
            message: this.$t('MesProductionPreConf.14')
          }
        ]
      }
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        const { ClassTypeList, ContentTypeList } = res.Result
        this.ContentTypeList = ContentTypeList.map(item => {
          return {
            label: item.CHINESE,
            value: item.LOOKUP_CODE.toString(),
            disabled: false
          }
        })
        this.ClassTypeList = ClassTypeList.map(item => {
          return {
            label: item.CHINESE,
            value: item.LOOKUP_CODE.toString(),
            disabled: false
          }
        })
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = (res.Result || []).map(item => {
        item.CONTENT_TYPE = item.CONTENT_TYPE.toString()
        item.CLASS_TYPE = item.CLASS_TYPE.toString()
        return item
      })
      this.totalPage = res.TotalCount || 0
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        CONTENT_TYPE: '',
        CONTENT: '',
        CONFIRM_CONTENT: '',
        CREATE_TIME: '',
        CREATOR: this.userinfo.USER_NAME,
        CLASS_TYPE: '',
        ENABLED: 'N'
      }
      const e = await this.$refs.xTable.insertAt(record, row)
      this.$refs.xTable.setActiveCell(e.row, 'CONTENT_TYPE')
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style>
</style>
