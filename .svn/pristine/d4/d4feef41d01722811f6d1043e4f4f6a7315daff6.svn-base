/* eslint-disable no-unused-vars */
<template>
  <d2-container>
    <template slot="header">
      <custom-container-header>
        <el-select v-model="formData.WO_NO" :placeholder="$t('BurnDownload._1')" clearable>
          <el-option
            v-for="(item,index) in WorkOrderList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="formData.APPLY_NO" :placeholder="$t('BurnDownload._2')" clearable>
          <el-option
            v-for="(item,index) in ManagementNumberList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('plbd.hd_sf') }}</el-button>
        <el-button
          type="success"
          @click="downClick"
          icon="el-icon-download"
          v-if="$btnList.indexOf('GetDownAddress') !== -1"
        >{{$t('BurnDownload._3')}}</el-button>
      </custom-container-header>
    </template>
    <div class="ConfirmTable-container">
      <vxe-table
        ref="xTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        highlight-hover-row
        auto-resize
        keep-source
        stripe
        :data="mainTable"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
        @cell-click="cellClick"
      >
        <vxe-table-column
          min-width="150"
          field="WO_NO"
          :title="$t('BurnDownload._4')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="150"
          field="PART_CODE"
          :title="$t('BurnDownload._5')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="150"
          field="DOWN_NO"
          :title="$t('BurnDownload._6')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="150"
          field="APPLY_NO"
          :title="$t('BurnDownload._7')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATE_TIME"
          :title="$t('BurnDownload._8')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column :title="$t('sdr_le.tb_og')" min-width="120" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="ScanCodeClick(row, row.$index)"
              v-if="$btnList.indexOf('SaveBurnSNByTrans') !== -1"
            >{{$t('BurnDownload._9')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="ConfirmPagination">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="bottomTable-container">
      <vxe-table
        ref="bTable"
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
        :data="mainTable2"
        :mouse-config="{selected: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      >
        <vxe-table-column
          min-width="150"
          field="FILE_NAME"
          :title="$t('BurnDownload._10')"
          :edit-render="{name: '$input',props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="FILE_LEN"
          :title="$t('BurnDownload._11')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="150"
          field="FILE_TYPE"
          :title="$t('BurnDownload._12')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="150"
          field="FILE_TIME"
          :title="$t('BurnDownload._13')"
          :edit-render="{name: '$input',props: {readonly: true}}"
        />
      </vxe-table>
    </div>
    <!-- 下载框 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="$t('BurnDownload._14')"
      width="60%"
      :visible.sync="dialogTableVisible"
    >
      <el-form ref="downForm" label-width="150px" :model="downForm">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('BurnDownload._4')">
              <el-input v-model="downForm.Wo_No" diasbled @keyup.enter.native="downFormSearch" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'SN'">
              <el-input v-model="downForm.SN" diasbled @keyup.enter.native="downFormSearch" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="height:400px">
        <vxe-table
          ref="downTable"
          border
          resizable
          height="100%"
          size="medium"
          align="center"
          highlight-hover-row
          auto-resize
          keep-source
          stripe
          :data="mainTable3"
          :checkbox-config="{checkStrictly: true}"
        >
          <vxe-table-column type="checkbox" min-width="60"></vxe-table-column>
          <vxe-table-column min-width="120" :title="$t('se.sn')">
            <template v-slot="{$rowIndex}">{{ $rowIndex + 1 }}</template>
          </vxe-table-column>
          <vxe-table-column
            min-width="150"
            field="FileName"
            :title="$t('BurnDownload._10')"
            :edit-render="{name: 'input'}"
          />
          <vxe-table-column
            min-width="150"
            field="Path"
            :title="$t('BurnDownload._15')"
            :edit-render="{name: 'input'}"
            show-overflow
          />
          <vxe-table-column
            min-width="150"
            field="Type"
            :title="$t('BurnDownload._16')"
            :edit-render="{name: 'input'}"
            show-overflow
          />
        </vxe-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="downloadClick">{{$t('BurnDownload._3')}}</el-button>
      </span>
    </el-dialog>
    <!-- 扫码 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="$t('BurnDownload._17')"
      width="70%"
      :visible.sync="ScanCodeVisible"
    >
      <el-form ref="ScanCodeForm" label-width="150px" :model="ScanCodeForm">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('BurnDownload._4')">
              <el-input v-model="ScanCodeForm.WO_NO" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('BurnDownload._5')">
              <el-input v-model="ScanCodeForm.PART_CODE" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('BurnDownload._18')">
              <el-input v-model="ScanCodeForm.CODE" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('BurnDownload._6')">
              <el-input v-model="ScanCodeForm.DOWN_NO" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('BurnDownload._7')">
              <el-input v-model="ScanCodeForm.APPLY_NO" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('BurnDownload._8')">
              <el-input v-model="ScanCodeForm.CREATE_TIME" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'SN'">
              <el-input v-model="ScanCodeForm.SN" @keyup.enter.native="searchSN" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('BurnDownload._19')">
              <el-input v-model="ScanCodeForm.num" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <span
            class="demonstration"
            style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
          >{{$t('BurnDownload._20')}}</span>
        </div>
        <div class="content-block">
          <div
            class="item"
            v-for="(item,index) in mainTable4"
            :key="index"
            :style="{background: item.type === 1 ? '#67C23A' : '#F56C6C'}"
          >{{item.value}}</div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ScanCodeVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import request from 'axios'
// eslint-disable-next-line no-unused-vars
import downloadjs from 'downloadjs'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  DownLogLoadData,
  GetDownAddress,
  GetFilesByPath,
  DownDetailLoadData,
  SNLoadData,
  SaveBurnSNByTrans
} from '@/api/BurnDownload'
import { mapGetters } from 'vuex'
export default {
  name: 'BurnDownload',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      mainTable: [],
      dialogTableVisible: false,
      mainTable2: [],
      mainTable3: [],
      mainTable4: [],
      downForm: {
        WO_NO: '',
        BURN_FILE_ID: 0,
        USER_NAME: '',
        PathList: [],
        Type: 0
      },
      ManagementNumberList: [],
      WorkOrderList: [],
      ScanCodeVisible: false,
      textarea: '',
      ScanCodeForm: {},
      addForm: {},
      snForm: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      form: {
        APPLY_ID: 0,
        USER_NAME: '',
        DownLoad: [
          {
            BURN_FILE_ID: 0,
            Path: '',
            Type: 0
          }
        ]
      }
    }
  },
  created () {
    this.getLoadData(1)
  },
  methods: {
    async getLoadData (num) {
      if (num === 1) {
        const res = await DownLogLoadData({ Limit: 9999999 })
        const data = res.Result
        const ManagementNumberBox = []
        const WorkOrderBox = []
        data.map((item) => {
          ManagementNumberBox.push(item.APPLY_NO)
          WorkOrderBox.push(item.WO_NO)
        })
        const ManagementNumberBox2 = [...new Set(ManagementNumberBox)]
        ManagementNumberBox2.map((item) => {
          this.ManagementNumberList.push({
            label: item,
            value: item,
            disabled: false
          })
        })
        const WorkOrderBox2 = [...new Set(WorkOrderBox)]
        WorkOrderBox2.map((item) => {
          this.WorkOrderList.push({
            label: item,
            value: item,
            disabled: false
          })
        })
      }
      const res = await DownLogLoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
      }
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 查下表
    async getDownDetailLoadData (e) {
      const res = await DownDetailLoadData({ MST_ID: e })
      this.mainTable2 = res.Result ? res.Result : []
    },
    // 下载
    downClick () {
      this.downForm = {}
      this.mainTable3 = []
      this.dialogTableVisible = true
    },
    async downFormSearch () {
      const res = await GetFilesByPath({ Wo_No: this.downForm.Wo_No })
      if (res.Result) {
        this.mainTable3 = res.Result
        this.totalPage3 = res.TotalCount
      }
    },
    // 扫码
    ScanCodeClick (row) {
      this.ScanCodeForm = {}
      this.ScanCodeForm = row
      this.ScanCodeVisible = true
    },
    // 提交
    submitModifyForm () {
      this.mainTable4 = []
      this.snForm = {
        InsertRecords: [
          {
            ID: 0,
            DOWN_ID: this.ScanCodeForm.ID,
            DOWN_NO: this.ScanCodeForm.DOWN_NO,
            SN: this.ScanCodeForm.SN,
            USER_NAME: this.userinfo.USER_NAME,
            APPLY_NO: this.ScanCodeForm.DOWN_NO
          }
        ]
      }
      console.log(this.snForm)
      SaveBurnSNByTrans(this.snForm).then((res) => {
        if (res.Result) {
          this.mainTable4.push({ type: 1, value: this.$t('BurnDownload._21') })
          this.$notify({
            title: this.$t('sld.success'),
            message: this.$t('sld.subsu'),
            type: 'success',
            duration: 2000
          })
        } else {
          this.mainTable4.push({ type: 2, value: this.$t('BurnDownload._22') })
        }
      })
    },
    async cellClick (e) {
      this.getDownDetailLoadData(e.row.ID)
    },
    // 下载按钮
    downloadClick () {
      this.getDownAddress()
    },
    async getDownAddress () {
      this.form = {
        APPLY_ID: 0,
        USER_NAME: '',
        DownLoad: [
          {
            BURN_FILE_ID: 0,
            Path: '',
            Type: 0
          }
        ]
      }
      let selectRecords = this.$refs.downTable.getCheckboxRecords()
      // console.log(selectRecords)
      this.form.APPLY_ID = selectRecords[0].APPLY_ID
      this.form.USER_NAME = this.userinfo.USER_NAME
      selectRecords.map((item) => {
        this.form.DownLoad.push({
          BURN_FILE_ID: item.ID,
          Path: item.Path,
          Type: parseInt(item.Type)
        })
      })
      const res = await GetDownAddress(this.form)
      console.log(res.Result)
      if (res.Result) {
        window.open(process.env.VUE_APP_BASE_IMG + res.Result.data[0])
      }
      this.dialogTableVisible = false
    },
    async searchSN () {
      const res = await SNLoadData({ SN: this.ScanCodeForm.SN })
      this.ScanCodeForm.num = res.TotalCount ? res.TotalCount : 0
      this.$forceUpdate()
      this.submitModifyForm()
    }
  }
}
</script>
<style lang="scss" scoped>
.ConfirmTable-container {
  height: calc(100vh - 60px - 41px - 53px - 300px);
}
.ConfirmPagination {
  margin: 10px 0;
}
.bottomTable-container {
  height: calc(100vh - 60px - 41px - 53px - 300px - 42px - 45px);
}
.AddOrModify-select {
  margin-bottom: 20px;
}
.content-block {
  border: 1px solid rgb(233, 234, 236);
  box-sizing: border-box;
  height: 300px;
  overflow: auto;
  background: rgb(249, 219, 189);
}
</style>
