<template>
  <d2-container class="AndonCallContentConfig">
    <template slot="header">
      <!--            tableName="Andon_Call_Content_Config"
                               exportBtnName="CallContentConfigExport"
                               importBtnName="CallContentConfigImport"
                               exportTplName="CallContentConfigExportTpl" -->
      <custom-container-header
        defaultTotalPage="totalCount"
        defaultLoadingFlag="listLoading"
        defaultFormData="listQuery"
        exportMehodsName="getList"
      >
        <el-select
          v-model="listQuery.CALL_CATEGORY_CODE"
          clearable
          style="width: 200px"
          :placeholder="$t('AndonCallContentConfig._2')"
          @change="changeCALL_CATEGORY_CODE"
        >
          <el-option
            v-for="item in CALL_CATEGORY_CODEList"
            :key="item.LOOKUP_CODE"
            :label="item.DESCRIPTION"
            :value="item.LOOKUP_CODE"
          /> </el-select
        >&nbsp;
        <el-select
          v-model="listQuery.CALL_TYPE_CODE"
          clearable
          style="width: 200px"
          :placeholder="$t('AndonCallContentConfig._1')"
        >
          <el-option
            v-for="item in CALL_TYPE_CODEList"
            :key="item.LOOKUP_CODE"
            :label="item.DESCRIPTION"
            :value="item.LOOKUP_CODE"
          /> </el-select
        >&nbsp;
        <el-input
          v-model="listQuery.CALL_TITLE"
          :placeholder="$t('AndonCallContentConfig._3')"
          clearable
          style="width: 200px"
          @input="SearchBut"
          @keyup.enter.native="SearchBut"
        />&nbsp;
        <el-select
          v-model="listQuery.ENABLED"
          clearable
          style="width: 200px"
          :placeholder="$t('AndonCallContentConfig._4')"
        >
          <el-option :label="$t('publics.btn.yes')" value="Y" />
          <el-option :label="$t('publics.btn.no')" value="N" /> </el-select
        >&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="SearchBut"
          >{{ $t("publics.btn.search") }}</el-button
        >
        <el-button
          type="success"
          v-if="$btnList.indexOf('AndonCallContentConfigAdd') !== -1"
          icon="el-icon-plus"
          @click.prevent="AddBut"
          >{{ $t("publics.btn.add") }}</el-button
        >
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
        :loading="listLoading"
        :data="mainTable"
        :mouse-config="{ selected: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
      >
        <vxe-table-column
          min-width="180"
          field="CALL_CODE"
          :title="$t('AndonCallContentConfig._5')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="180"
          field="CALL_CATEGORY_NAME"
          :title="$t('AndonCallContentConfig._6')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="180"
          field="CALL_TYPE_NAME"
          :title="$t('AndonCallContentConfig._7')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />

        <vxe-table-column
          min-width="180"
          field="CALL_TITLE"
          :title="$t('AndonCallContentConfig._8')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="200"
          field="CHINESE"
          :title="$t('AndonCallContentConfig._9')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="100"
          field="CREATOR"
          :title="$t('AndonCallContentConfig._10')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="CREATE_TIME"
          :title="$t('AndonCallContentConfig._11')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ENABLED"
          fixed="right"
          min-width="140"
          :title="$t('MesPartTempWarehouse._13')"
        >
          <template v-slot="{ row }">
            <el-switch
              v-model="row.ENABLED"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
              @change="change(row)"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column
          :title="$t('cccn._11')"
          width="180"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              v-if="$btnList.indexOf('AndonCallContentConfigEdit') !== -1"
              type="primary"
              @click.prevent="edit_but(row)"
              >{{ $t("cccn._12") }}</el-button
            >
            <el-button
              v-if="$btnList.indexOf('AndonCallContentConfigRemove') !== -1"
              type="danger"
              @click.prevent="remove_but(row)"
              >{{ $t("cccn._13") }}</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
        :current-page="listQuery.Page"
        :page-size="listQuery.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <el-dialog
      v-dialogDrag
      width="40%"
      :title="addorediText"
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      append-to-body
      class="call-dialog"
    >
      <el-form
        ref="callVal"
        label-position="top"
        :show-message="false"
        :model="callVal"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item :label="$t('AndonCallContentConfig._5')" prop="CALL_CODE">
          <el-input v-model="callVal.CALL_CODE" disabled placeholder=" " />
        </el-form-item>
        <el-form-item
          :label="$t('AndonCallContentConfig._6')"
          prop="CALL_CATEGORY_CODE"
        >
          <el-select
            v-model="callVal.CALL_CATEGORY_CODE"
            style="width: 100%"
            placeholder=" "
            @change="changeCALL_CATEGORY_CODE"
          >
            <el-option
              v-for="item in CALL_CATEGORY_CODEList"
              :key="item.LOOKUP_CODE"
              :label="item.DESCRIPTION"
              :value="item.LOOKUP_CODE"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('AndonCallContentConfig._7')"
          prop="CALL_TYPE_CODE"
        >
          <el-select
            v-model="callVal.CALL_TYPE_CODE"
            style="width: 100%"
            placeholder=" "
            @change="changeCALL_TYPE_CODE"
          >
            <el-option
              v-for="item in CALL_TYPE_CODEList"
              :key="item.LOOKUP_CODE"
              :label="item.DESCRIPTION"
              :value="item.LOOKUP_CODE"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          :label="$t('AndonCallContentConfig._8')"
          prop="CALL_TITLE"
        >
          <el-input v-model="callVal.CALL_TITLE" :placeholder="$t('')" />
        </el-form-item>

        <el-form-item :label="$t('AndonCallContentConfig._9')" prop="CHINESE">
          <el-input v-model="callVal.CHINESE" type="textarea" placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('AndonCallContentConfig._12')">
          <el-switch
            v-model="callVal.ENABLED"
            :active-text="$t('publics.btn.yes')"
            :inactive-text="$t('publics.btn.no')"
            active-color="#13ce66"
            inactive-color="#cccccc"
            active-value="Y"
            inactive-value="N"
          />
        </el-form-item>
        <div style="text-align: center">
          <el-button type="success" @click="shout_but('callVal')"
            >&nbsp;{{ $t("publics.btn.makeSure") }}&nbsp;</el-button
          >
          <el-button @click="innerVisible = false"
            >&nbsp;{{ $t("publics.btn.cancel") }}&nbsp;</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  ChangeEnabled,
  DeleteOneById,
  SaveData,
  GetParamsOfCallCode
} from '@/api/AndonCallContentConfig'
import { mapGetters } from 'vuex'
export default {
  name: 'AndonCallContentConfig',
  components: {
    customContainerHeader
  },
  data () {
    return {
      CALL_CATEGORY_CODEList: [],
      CALL_CATEGORY_CODEbox: [],
      CALL_TYPE_CODEList: [],
      CALL_TYPE_CODEbox: [],
      listLoading: true,
      listQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        CALL_TYPE_CODE: '', // 异常类型
        CALL_CATEGORY_CODE: '', // 异常种类
        CALL_TITLE: '', // 异常标题
        ENABLED: '' // 是否激活
      },
      totalCount: 0,
      mainTable: [],
      innerVisible: false,
      addorediText: '',

      callVal: {
        ID: 0,
        CALL_TYPE_CODE: 0, // 呼叫类型代码
        DESCRIPTION: '', // 呼叫内容（EN）
        CHINESE: '', // 呼叫内容（CN）
        ENABLED: 'Y', // 是否激活
        CALL_CODE: '', // 呼叫内容代码
        CALL_TITLE: '', // 异常标题
        CALL_CATEGORY_CODE: 0, // 异常种类代码
        CREATOR: '', // 创建人
        CREATE_TIME: '' // 创建时间
      },
      rules: {
        CALL_CATEGORY_CODE: [
          {
            required: true,
            message: this.$t('AndonCallContentConfig._2'),
            trigger: 'change'
          }
        ],
        CALL_TYPE_CODE: [
          {
            required: true,
            message: this.$t('AndonCallContentConfig._1'),
            trigger: 'change'
          }
        ],
        CALL_TITLE: [
          {
            required: true,
            message: this.$t('AndonCallContentConfig._3'),
            trigger: 'blur'
          }
        ],
        CHINESE: [
          {
            required: true,
            message: this.$t('AndonCallContentConfig._13'),
            trigger: 'blur'
          }
        ]
      },
      effect: {
        Id: 0,
        Status: false,
        Operator: ''
        // OperatorDatetime: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  getTime () {
    var date = new Date() // 年
    var year = date.getFullYear() // 月
    var month = date.getMonth() + 1 // 日
    var day = date.getDate() // 时
    var hh = date.getHours() // 分
    var mm = date.getMinutes() // 秒
    var ss = date.getSeconds()
    if (ss <= 9) {
      ss = '0' + ss
    }
    return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
  },
  created () {
    this.getIndex()
    this.effect.Operator = this.userinfo.USER_NAME
  },
  methods: {
    // 获取下拉列表
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.CALL_CATEGORY_CODEList = res.Result.CALL_CATEGORY_CODE

        this.CALL_CATEGORY_CODEbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.CALL_CATEGORY_CODEList.map((item) => {
          this.CALL_CATEGORY_CODEbox.push({
            label: item.DESCRIPTION,
            value: item.LOOKUP_CODE,
            disabled: false
          })
        })
        this.CALL_TYPE_CODEbox.push({
          label: '',
          value: '',
          disabled: false
        })
        res.Result.CALL_TYPE_CODE.map((item) => {
          this.CALL_TYPE_CODEbox.push({
            label: item.DESCRIPTION,
            value: item.LOOKUP_CODE,
            disabled: false
          })
        })
        this.getList()
        console.log(res.Result, 'res.Result')
      }
    },
    // 获取表格列表
    async getList () {
      const res = await LoadData(this.listQuery)
      console.log(res, '获取表格列表')
      this.mainTable = res.Result || []
      this.totalCount = res.TotalCount || 0
      this.listLoading = false
    },
    // 搜索
    SearchBut () {
      this.listQuery.Page = 1
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getList()
    },
    async AddBut () {
      this.Eliminate()
      this.addorediText = this.$t('publics.btn.add')
      this.innerVisible = true
      var date = new Date() // 年
      // var year = date.getFullYear() // 月
      var month = date.getMonth() + 1 // 日
      var day = date.getDate() // 时
      var hh = date.getHours() // 分
      var mm = date.getMinutes() // 秒
      var ss = date.getSeconds()
      var YearZui = date.getYear()
      YearZui = YearZui < 2000 ? YearZui + 1900 : YearZui
      var yy = YearZui.toString().substr(2, 2)
      // var yy = year.toString().substr(2, 2);
      if (month <= 9) {
        month = '0' + month
      }
      if (ss <= 9) {
        ss = '0' + ss
      }
      this.callVal.CALL_CODE = 'HJA' + yy + month + day + hh + mm + ss
      this.callVal.DESCRIPTION = 'EN'
      this.callVal.DESCRIPTION = 'CN'
    },
    // 编辑
    edit_but (row) {
      console.log(row)
      this.addorediText = this.$t('publics.btn.edit')
      this.callVal = row
      this.callVal.ID = row.ID
      this.callVal.CALL_TYPE_CODE = Number(row.CALL_TYPE_CODE)
      this.callVal.DESCRIPTION = row.DESCRIPTION
      this.callVal.CHINESE = row.CHINESE
      this.callVal.ENABLED = row.ENABLED
      this.callVal.CALL_CODE = row.CALL_CODE
      this.callVal.CALL_TITLE = row.CALL_TITLE
      this.callVal.CALL_CATEGORY_CODE = Number(row.CALL_CATEGORY_CODE)
      this.callVal.CREATOR = row.CREATOR
      this.callVal.CREATE_TIME = row.CREATE_TIME
      this.getParamsOfCallCode(Number(row.CALL_TYPE_CODE))
      this.innerVisible = true
    },
    async changeCALL_CATEGORY_CODE (e) {
      console.log('111', e)
      this.callVal.CALL_TYPE_CODE = null
      this.listQuery.CALL_TYPE_CODE = null
      this.getParamsOfCallCode(e)
    },

    async getParamsOfCallCode (e) {
      const res = await GetParamsOfCallCode()
      if (res.Result) {
        this.CALL_TYPE_CODEList = []

        if (e === 0) {
          this.CALL_TYPE_CODEList = res.Result.ANDON_ERROR.TYPE_CODE_List
        } else {
          this.CALL_TYPE_CODEList = res.Result.STOP_LINE_ERROR.TYPE_CODE_List
        }
      }
      console.log('大萨达撒', this.CALL_TYPE_CODEList)
    },
    changeCALL_TYPE_CODE (e) {
      console.log('bbbbbb', e)
      // this.$set(this.callVal, 'CALL_TYPE_CODE', e)
      this.callVal.CALL_TYPE_CODE = e
      this.$forceUpdate()
    },
    // 确定
    shout_but (formName) {
      var date = new Date() // 年
      var year = date.getFullYear() // 月
      var month = date.getMonth() + 1 // 日
      var day = date.getDate() // 时
      var hh = date.getHours() // 分
      var mm = date.getMinutes() // 秒
      var ss = date.getSeconds()
      if (ss <= 9) {
        ss = '0' + ss
      }
      var gettime =
        year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
      this.$refs.callVal.validate(async (valid, errInfo) => {
        if (valid) {
          var obj = {
            InsertRecords: [], // 新
            UpdateRecords: [],
            RemoveRecords: []
          }
          if (this.callVal.ID === 0) {
            this.callVal.CREATOR = this.userinfo.USER_NAME
            this.callVal.CREATE_TIME = gettime
            obj.InsertRecords.push(this.callVal)
          } else {
            obj.UpdateRecords.push(this.callVal)
          }
          const res = await SaveData(obj)
          if (res.Result) {
            this.innerVisible = false
            this.getList()
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch {}
        }
      })
    },
    // 删除
    remove_but (row) {
      console.log(row)
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then((response) => {
        DeleteOneById(row.ID).then((response) => {
          if (response.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getList()
          } else {
            this.getList()
          }
        })
      })
    },
    // 是否激活
    change (row) {
      if (row.ENABLED === 'Y') {
        this.effect.Status = true
      } else {
        this.effect.Status = false
      }
      this.effect.Id = row.ID
      this.$confirm(this.$t('cccn._20'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.effect).then((res) => {
            if (res.Result) {
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            }
            this.getList()
          })
        })
        .catch(() => {
          this.getList()
        })
    },
    // 清空
    Eliminate () {
      this.callVal = {
        ID: 0,
        ENABLED: 'Y'
      }
    }
  }
}
</script>
<style lang="scss">
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.el-form-item--small .el-form-item__content,
.el-form-item--small .el-form-item__label {
  line-height: 24px;
}
</style>
