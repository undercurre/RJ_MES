<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-select style="width:260px" v-model="formData.CHECK_TYPE" :placeholder="$t('MesFirstCheckItems._1')">
          <el-option
            v-for="item in CheckCategoryList"
            :key="item.LOOKUP_CODE"
            :label="item.MEANING"
            :value="item.LOOKUP_CODE"
          />
        </el-select>
        <el-input
          clearable
          v-model="formData.CHECK_ITEM"
          :placeholder="$t('MesFirstCheckItems._2')"
          style="width:220px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-input
          clearable
          v-model="formData.CHECK_GIST"
          :placeholder="$t('MesFirstCheckItems._3')"
          style="width:220px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button
          type="success"
          icon="el-icon-plus"
          @click.prevent="addClick"
        >{{$t('publics.btn.add')}}</el-button>&nbsp;
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="cleanClick"
        >{{$t('publics.btn.clear')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->
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
        <vxe-table-column min-width="80" :title="$t('se_cc.sn')">
          <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="CHECK_TYPE_NAME"
          :title="$t('MesFirstCheckItems._4')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CHECK_ITEM"
          :title="$t('MesFirstCheckItems._5')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CHECK_GIST"
          :title="$t('MesFirstCheckItems._6')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="80"
          field="ORDER_NO"
          :title="$t('MesFirstCheckItems._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATE_USER"
          :title="$t('MesFirstCheckItems._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATE_TIME"
          :title="$t('MesFirstCheckItems._9')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="180"
          field="UPDATE_USER"
          :title="$t('MesFirstCheckItems._10')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="UPDATE_TIME"
          :title="$t('MesFirstCheckItems._11')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="REMARK"
          :title="$t('MesFirstCheckItems._12')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column min-width="150" field="ENABLED" :title="$t('MesFirstCheckItems._13')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ENABLED"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
              @change="change(scope.$index, scope.row)"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('plbd.tb_og')" min-width="180" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="editClick(row, row.$index)"
            >{{ $t('publics.btn.edit') }}</el-button>
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
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
    <!-- 编辑框 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="120px"
        :rules="validRules"
        :show-message="false"
      >
        <el-form-item :label="$t('MesFirstCheckItems._14')">
          <el-select style="width:100%" v-model="editForm.CHECK_TYPE" :placeholder="$t('MesFirstCheckItems._1')">
            <el-option
              v-for="item in CheckCategoryList"
              :key="item.LOOKUP_CODE"
              :label="item.MEANING"
              :value="item.LOOKUP_CODE"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('MesFirstCheckItems._5')">
          <el-input v-model="editForm.CHECK_ITEM" :placeholder="$t('MesFirstCheckItems._2')" />
        </el-form-item>
        <el-form-item :label="$t('MesFirstCheckItems._6')">
          <el-input v-model="editForm.CHECK_GIST" :placeholder="$t('MesFirstCheckItems._3')" />
        </el-form-item>
        <el-form-item :label="$t('MesFirstCheckItems._7')">
          <el-input v-model="editForm.ORDER_NO" :placeholder="$t('MesFirstCheckItems._15')" type="number" min="0" />
        </el-form-item>
        <el-form-item :label="$t('MesFirstCheckItems._12')">
          <el-input type="textarea" :rows="3" :placeholder="$t('MesFirstCheckItems._16')" v-model="editForm.REMARK" />
        </el-form-item>
        <el-form-item :label="$t('MesFirstCheckItems._17')">
          <el-switch
            v-model="editForm.ENABLED"
            :active-text="$t('publics.btn.yes')"
            :inactive-text="$t('publics.btn.no')"
            active-color="#13ce66"
            inactive-color="#cccccc"
            active-value="Y"
            inactive-value="N"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-top:20px">
        <el-button type="primary" @click.prevent="saveClick">{{$t('ssc_rd.sure')}}</el-button>&nbsp;
        <el-button @click.prevent="resetClick">{{$t('MesFirstCheckItems._18')}}</el-button>&nbsp;
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  LoadData,
  AddOrModifyAsync,
  GetListByType,
  DeleteOneById
} from '@/api/MesFirstCheckItems'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'MesFirstCheckItems',
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
        Limit: 15
      },
      CheckCategoryList: [],
      mainTable: [],
      totalPage: 0,
      loading: false,
      excite: {},
      dialogVisible: false,
      editForm: {}, // 编辑框
      validRules: {
        CHECK_ITEM: [{ required: true, message: this.$t('MesFirstCheckItems._2') }],
        CHECK_GIST: [{ required: true, message: this.$t('MesFirstCheckItems._3') }]
      },
      dialogTitle: ''
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    async getIndex () {
      const res = await GetListByType()
      this.CheckCategoryList = res.Result
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    addClick () {
      this.editForm = {}
      this.editForm.ID = 0
      this.ENABLED = ''
      this.editForm.ORGANIZE_ID = 3
      this.editForm.CREATE_USER = this.userinfo.USER_NAME
      const nowDate = this.getNowDate(new Date())
      this.editForm.CREATE_TIME = nowDate
      this.dialogVisible = true
      this.dialogTitle = this.$t('MesFirstCheckItems._19')
    },
    editClick (row) {
      this.dialogVisible = true
      this.dialogTitle = this.$t('MesFirstCheckItems._20')
      this.editForm = { ...row }
    },
    resetClick () {
      this.editForm = {}
    },
    change (index, row) {
      this.editForm = { ...row }
      this.excite.Id = row.ID
      if (row.ENABLED === 'Y') {
        this.excite.Status = true
      } else {
        this.excite.Status = false
      }
      this.$confirm(
        this.$t('SfcsOperationLines._20'),
        this.$t('Manager.prompt'),
        {
          confirmButtonText: this.$t('Manager.confirm'),
          cancelButtonText: this.$t('Manager.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          this.saveClick(1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
          this.getLoadData()
        })
    },
    // 删除
    removeClick (row) {
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await DeleteOneById(row.ID)
          if (res.Result) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getLoadData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 保存
    saveClick (num) {
      const nowDate = this.getNowDate(new Date())
      this.editForm.UPDATE_TIME = nowDate
      this.editForm.UPDATE_USER = this.userinfo.USER_NAME
      console.log('this.editForm:', this.editForm)
      AddOrModifyAsync(this.editForm).then(res => {
        if (res.Result) {
          if (num === 1) {
            this.getLoadData()
          } else {
            this.getLoadData()
            this.$notify({
              title: this.$t('sao._12'),
              message: this.$t('sao._13'),
              type: 'success',
              duration: 2000
            })
          }
          this.dialogVisible = false
        }
        this.dialogVisible = false
      })
    },
    cleanClick () {
      this.formData = {}
      this.formData = {
        Page: 1,
        Limit: 15
      }
      this.getLoadData()
    },
    // 获取当前时间
    getNowDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>

<style>
</style>
