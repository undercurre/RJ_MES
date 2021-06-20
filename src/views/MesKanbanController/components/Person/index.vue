<template>
  <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('SfcsRework._21')"
               width="50%"
               :visible.sync="dialogVisible">
      <el-form ref="editForm"
               label-width="80px"
               :model="editForm">
        <el-form-item label="用户账号">
          <el-input clearable
                    v-model="listQuery.User_Name"
                    style="width: 200px"
                    @keyup.enter.native="searchClick"
                    placeholder="请输入用户账号" />
          <el-button type="primary"
                     icon="el-icon-search"
                     @click.prevent="searchClick">{{ $t("publics.btn.search") }}</el-button>
        </el-form-item>
      </el-form>
      <div style="height: 500px; margin-bottom: 10px">
        <vxe-table
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
                   stripe :sort-config="{trigger: 'cell'}"
                   :loading="loading"
                   :data="mainTable"
                   :mouse-config="{ selected: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   @cell-click="cellClick">
          <vxe-table-column sortable type="radio"
                            width="60" />
          <vxe-table-column sortable min-width="150"
                            field="User_Name"
                            title="用户账号"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column sortable min-width="180"
                            field="Nick_Name"
                            title="用户昵称"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
        </vxe-table>
      </div>
      <el-pagination :current-page="listQuery.Page"
                     :page-size="listQuery.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary" @click="wonoSubmit">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { page } from '@/api/sys.user'
export default {
  data () {
    return {
      dialogVisible: false,
      totalPage: 0,
      mainTable: [],
      loading: false,
      listQuery: {
        User_Name: '',
        Page: 1,
        Limit: 15
      },
      editForm: {}
    }
  },
  methods: {
    wonoSubmit () {
      if (this.editForm.Id && this.editForm.Id > 0) {
        this.$emit('personVal', this.editForm)
        this.dialogVisible = false
      } else {
        return this.$message({
          message: '请选择用户账号',
          type: 'warning'
        })
      }
    },
    cellClick ({ row }) {
      this.editForm = row
    },
    searchClick () {
      this.listQuery.Page = 1
      this.listQuery.Limit = 15
      this.LoadData()
    },
    async LoadData () {
      this.loading = true
      const res = await page(this.listQuery)
        .catch(() => {
          this.loading = false
        })
      this.loading = false
      if (res.Result) {
        this.totalPage = res.TotalCount ? res.TotalCount : 0
        if (res.Result.length > 0) {
          this.mainTable = res.Result
        } else {
          this.mainTable = []
        }
      }
    },
    handleResetCustomer () {
      this.listQuery = {
        User_Name: '',
        Page: 1,
        Limit: 15
      }
    },
    handleSizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.LoadData()
    },
    handleCurrentChange (Page) {
      this.listQuery.Page = Page
      this.LoadData()
    }
  }
}
</script>

<style>
</style>
