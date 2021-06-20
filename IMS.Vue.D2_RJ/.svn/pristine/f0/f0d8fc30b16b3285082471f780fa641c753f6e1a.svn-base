<template>
  <div>
    <el-tooltip effect="dark" :content="$t('header._11')" placement="bottom">
      <el-button
        class="d2-ml-0 d2-mr btn-text can-hover"
        type="text"
        @click="open"
      >
        <d2-icon name="print" style="font-size: 16px" />
      </el-button>
    </el-tooltip>
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('header._11')"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <el-form
        ref="Printform"
        label-width="120px"
        size="small"
        label-position="left"
      >
        <el-form-item :label="$t('MesBatchManager._58')">
          <el-input disabled v-model="CurrentName" />
        </el-form-item>
      </el-form>
      <div style="height: 300px">
        <vxe-table
          ref="xTable"
          border
          stripe
          keep-source
          highlight-hover-row
          show-overflow
          auto-resize
          width="100%"
          height="100%"
          :edit-config="{ mode: 'row', showStatus: true }"
          :radio-config="{ labelField: 'name', trigger: 'row' }"
          :data="PrintList"
          @cell-click="cellClick"
        >
          <vxe-table-column
            show-overflow
            :title="$t('srr._38')"
            type="radio"
            width="90"
            align="center"
          />
          <vxe-table-column
            show-overflow
            :title="$t('MesBatchManager._60')"
            min-width="150"
            align="center"
          >
            <template v-slot="row">
              {{ printName(row) }}
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="primary" @click="SetPrinName">
          {{ $t("MesBatchManager._59") }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialogVisible: false,
      PrintList: [],
      CurrentName: ''
    }
  },
  created () {},
  methods: {
    open () {
      this.GetCurrentPrintName()
      this.GetPrintList()
      this.dialogVisible = true
    },
    // 当前
    GetCurrentPrintName () {
      axios
        .get('http://localhost:42737/Printer/GetCurrentPrintName', {
          timeout: 60000 * 5
        })
        .then((response) => {
          const res = response.data
          if (res.Code === 1) {
            this.CurrentName = res.Data
          } else {
            this.$message.error(res.Msg || '请求失败')
          }
        })
        // 失败返回
        .catch((error) => {
          this.$message.error(this.$t('MesBatchManager._62'))
          console.log('error', error)
        })
    },
    // 获取打印机列表
    GetPrintList () {
      axios
        .get('http://localhost:42737/Printer/GetPrintList', {
          timeout: 60000 * 5
        })
        .then((response) => {
          const _res = response.data
          if (_res.Code === 1) {
            this.PrintList = _res.Data
          } else {
            this.$message.error(_res.Msg || '请求失败')
          }
        })
        // 失败返回
        .catch((error) => {
          this.$message.error(this.$t('MesBatchManager._62'))
          console.log('error', error)
        })
    },
    printName (row) {
      return row.row
    },
    cellClick (e) {
      this.PrintName = e.row
    },
    SetPrinName () {
      if (!this.PrintName || this.PrintName === '') {
        this.$message.error(this.$t('MesBatchManager._61'))
        return false
      }

      axios
        .post(
          'http://localhost:42737/Printer/SetPrintName',
          {
            PrintName: this.PrintName
          },
          {
            timeout: 60000 * 5
          }
        )
        .then((response) => {
          const res = response.data
          if (res.Code === 1) {
            this.$notify({
              title: this.$t('publics.tips.handleSuccess'),
              message: this.$t('publics.tips.saveSuccess'),
              type: 'success',
              duration: 2000
            })
            this.GetCurrentPrintName()
            this.dialogVisible = false
          } else {
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.Msg || '请求失败',
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch((error) => {
          this.$message.error(this.$t('MesBatchManager._62'))
          console.log('error', error)
        })
      this.GetCurrentPrintName()
    }
  }
}
</script>

<style>
</style>
