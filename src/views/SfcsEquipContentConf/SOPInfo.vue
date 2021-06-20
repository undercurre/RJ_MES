<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        exportBtnName="SfcsEquipContentConfExport"
        importBtnName="SfcsEquipContentConfImport"
        exportTplName="SfcsEquipContentConfExportTpl"
      >
        <el-select
          v-model="formData.CATEGORY_ID"
          clearable
          style="width:190px"
          :placeholder="$t('se_cc.a_ec')"
        >
          <el-option
            v-for="item in deviceList"
            :key="item.LOOKUP_CODE"
            :label="item.CHINESE"
            :value="item.LOOKUP_CODE"
          />
        </el-select>&nbsp;
        <el-select
          v-model="formData.KEEP_TYPE"
          clearable
          style="width:180px"
          :placeholder="$t('se_cc.a_mt')"
        >
          <el-option
            v-for="item in maintainList"
            :key="item.KEEP_TYPE"
            :label="item.label"
            :value="item.KEEP_TYPE"
          />
        </el-select>&nbsp;
        <el-input
          v-model="formData.Key"
          :placeholder="$t('se_cc.emi')"
          style="width:180px"
          @keyup.enter.native="search_but"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="search_but"
        >{{ $t('se_cc.search') }}</el-button>
        <el-button
          v-if="$btnList.indexOf('SfcsEquipContentConfAdd') !== -1"
          type="success"
          icon="el-icon-plus"
          @click="add_but"
        >{{ $t('se_cc.add') }}</el-button>
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
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      >
        <vxe-table-column width="120" :title="$t('se_cc.sn')">
          <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
        </vxe-table-column>
        <vxe-table-column
          field="CATEGORY_NAME"
          width="150"
          :title="$t('se_cc.ec')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column field="KEEP_TYPE" width="150" :title="$t('se_cc.mt')">
          <template slot-scope="scope">
            <span v-if="scope.row.KEEP_TYPE == 0">{{$t('se_cc.dm')}}</span>
            <span v-else-if="scope.row.KEEP_TYPE == 1">{{$t('se_cc.mm')}}</span>
            <span v-else-if="scope.row.KEEP_TYPE == 2">{{$t('se_cc.am')}}</span>
            <span v-else-if="scope.row.KEEP_TYPE == 3">{{$t('se_cc.wm')}}</span>
            <span v-else-if="scope.row.KEEP_TYPE == 4">{{$t('se_cc.sm')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="KEEP_CONTENT"
          width="200"
          :title="$t('se_cc.Mm')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="KEEP_TOOLS"
          width="250"
          :title="$t('se_cc.mta')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="ORDER_NO"
          width="110"
          :title="$t('se_cc.Sort')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column field="ENABLE" fixed="right" width="100" :title="$t('se_cc.e')">
          <template v-slot="{ row }">
            <el-switch
              :disabled="$btnList.indexOf('SfcsEquipContentConfstatus') == -1"
              v-model="row.ENABLE"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
              @change="change(row.$index,row)"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column field="ENABLED" fixed="right" width="200" :title="$t('se_cc.operate')">
          <template slot-scope="scope">
            <el-button
              v-if="$btnList.indexOf('SfcsEquipContentConfedit') !== -1"
              type="primary"
              size="small"
              @click="edit_but(scope.row)"
            >{{$t('se_cc.edit')}}</el-button>
            <el-button
              v-if="$btnList.indexOf('SfcsEquipContentConfdelete') !== -1"
              type="danger"
              size="small"
              @click="remove_but(scope.row)"
            >{{$t('se_cc.delete')}}</el-button>
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
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  Index,
  LoadData,
  ChangeEnabled,
  DeleteOneById
} from '@/api/SfcsEquipContentConf'
import { mapGetters } from 'vuex'
import Bus from '@/plugin/bus'
export default {
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        KEEP_TYPE: '',
        CATEGORY_ID: '',
        Key: '',
        ...this.formData
      },
      deviceList: [],
      maintainList: [
        {
          KEEP_TYPE: 0,
          label: this.$t('se_cc.dm')
        },
        {
          KEEP_TYPE: 1,
          label: this.$t('se_cc.mm')
        },
        {
          KEEP_TYPE: 2,
          label: this.$t('se_cc.am')
        },
        {
          KEEP_TYPE: 3,
          label: this.$t('se_cc.wm')
        },
        {
          KEEP_TYPE: 4,
          label: this.$t('se_cc.sm')
        }
      ],
      loading: false,
      mainTable: [],
      excite: {
        Id: '',
        Status: '',
        Operator: ''
      }
    }
  },
  created () {
    this.getIndex()
    this.excite.Operator = this.userinfo.USER_NAME
  },
  methods: {
    async getIndex () {
      const res = await Index()
      this.deviceList = res.Result ? res.Result : []
      this.getLoadData()
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    search_but () {
      this.getLoadData()
    },
    // 添加按钮
    add_but () {
      this.$emit('close')
      this.$nextTick(function () {
        Bus.$emit('EditID', -1)
      })
    },
    // 编辑按钮
    edit_but (row) {
      this.$emit('close')
      this.$nextTick(function () {
        Bus.$emit('EditID', row.ID)
      })
    },
    // 删除
    remove_but (row) {
      if (row) {
        console.log(row)
        this.$confirm(
          this.$t('se_cc.a_ysywtdtrod'),
          this.$t('IpqaMst.IpqaMstList.prompt'),
          {
            confirmButtonText: this.$t('IpqaMst.IpqaMstList.confirm'),
            cancelButtonText: this.$t('IpqaMst.IpqaMstList.cancel'),
            type: 'warning'
          }
        )
          .then(() => {
            DeleteOneById(row.ID).then((res) => {
              if (res.ErrorInfo.Status) {
                this.$message({
                  type: 'error',
                  message: res.ErrorInfo.Message
                })
              } else if (res.Result) {
                this.getLoadData()
                this.$notify({
                  title: this.$t('IpqaMst.IpqaMstList.success'),
                  message: this.$t('IpqaMst.IpqaMstList.sudeleted'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          })
          .catch(() => {
            this.$message(this.$t('IpqaMst.IpqaMstList.opecanc'))
          })
      } else {
        return false
      }
    },
    // 是否有效
    change (index, row) {
      console.log(row)
      this.excite.Id = row.ID
      if (row.ENABLE === 'Y') {
        this.excite.Status = true
      } else {
        this.excite.Status = false
      }
      this.$confirm(this.$t('se_cc.ftcuc'), this.$t('Manager.prompt'), {
        confirmButtonText: this.$t('Manager.confirm'),
        cancelButtonText: this.$t('Manager.cancel'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.excite).then((res) => {
            if (res.ErrorInfo.Status) {
              this.$message({
                type: 'error',
                message: res.ErrorInfo.Message
              })
              this.getLoadData()
            } else if (res.Result) {
              this.getLoadData()
              this.$message({
                type: 'success',
                message: this.$t('Manager.Succfied')
              })
            }
          })
        })
        .catch(() => {
          this.getLoadData()
          this.$message({
            type: 'info',
            message: this.$t('Manager.edit')
          })
        })
    }
  }
}
</script>

<style>
</style>
