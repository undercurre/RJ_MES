<template>
  <d2-container class="MesQualityItems">
    <template slot="header">
      <custom-container-header :isExport="false">
        <el-select
          v-model="listQuery.CHECK_TYPE"
          style="width:200px"
          :placeholder="$t('MesQualityItems._1')"
        >
          <el-option :label="$t('MesQualityItems._2')" :value="0" />
          <el-option
            v-for="item in NameList"
            :key="item.LOOKUP_CODE"
            :label="item.MEANING"
            :value="item.LOOKUP_CODE"
          />
        </el-select>
        <el-input
          v-model="listQuery.CHECK_ITEM"
          style="width:220px"
          :placeholder="this.$t('MesQualityItems._3')"
          clearable
        />
        <el-input
          v-model="listQuery.CHECK_DESC"
          style="width:250px"
          :placeholder="this.$t('MesQualityItems._4')"
          clearable
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('MesQualityItems._5') }}</el-button>
        <el-button
          type="success"
          @click="insertEvent"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('MesQualityItemsSaveData') !== -1"
        >{{ $t('MesQualityItems._6') }}</el-button>
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
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <vxe-table-column
          field="EN_DESC"
          min-width="140"
          :title="$t('MesQualityItems._7')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row, $rowIndex  }">{{$rowIndex+1}}</template>
        </vxe-table-column>
        <!-- <vxe-table-column
          field="ORDER_NO"
          min-width="80"
          :title="$t('MesQualityItems._11')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        /> -->
        <vxe-table-column
          field="CHECK_TYPE_NAME"
          min-width="140"
          :title="$t('MesQualityItems._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="CHECK_ITEM"
          :title="$t('MesQualityItems._9')"
          min-width="150"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="CHECK_DESC"
          min-width="200"
          :title="$t('MesQualityItems._10')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column field="QUANTIZE_TYPE" :title="$t('MesQualityItems._12')" min-width="200">
          <template v-slot="{ row }">
            <span v-if="row.QUANTIZE_TYPE === '1'" style="color:blue">{{$t('MesQualityItems._13')}}</span>
            <span v-else style="color:green">{{$t('MesQualityItems._14')}}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="ISEMPTY" :title="$t('MesQualityItems._15')" min-width="120">
          <template v-slot="{ row }">
            <span v-if="row.ISEMPTY === 'Y'" style="color:green">{{$t('MesQualityItems._16')}}</span>
            <span v-else style="color:blue">{{$t('MesQualityItems._17')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="CREATE_USER"
          min-width="140"
          :title="$t('MesQualityItems._18')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="CREATE_TIME"
          min-width="160"
          :title="$t('MesQualityItems._19')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="UPDATE_USER"
          min-width="200"
          :title="$t('MesQualityItems._20')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="UPDATE_TIME"
          min-width="160"
          :title="$t('MesQualityItems._21')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="REMARK"
          min-width="140"
          :title="$t('MesQualityItems._22')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="ORGANIZE_NAME"
          :title="$t('MesQualityItems._23')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="ENABLED"
          fixed="right"
          min-width="120"
          :title="$t('MesQualityItems._24')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row }">
            <el-switch
              v-model="row.ENABLED"
              :active-text="$t('MesQualityItems._25')"
              :inactive-text="$t('MesQualityItems._26')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              disabled
              inactive-value="N"
            ></el-switch>
          </template>
        </vxe-table-column>
        <vxe-table-column
          :title="$t('MesQualityItems._27')"
          min-width="180"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="editRow(row, row.$index)"
              v-if="$btnList.indexOf('MesQualityItemsSaveData') !== -1"
            >{{ $t('MesQualityItems._28') }}</el-button>
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
              v-if="$btnList.indexOf('MesQualityItemsDelete') !== -1"
            >{{ $t('MesQualityItems._29') }}</el-button>
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
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <!-- modal -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="dialogTxt"
      :visible.sync="dialogVisible"
      width="40%"
      class="MesQualityItems-dialog"
    >
      <el-form
        class="MesQualityItems-form"
        label-position="top"
        label-width="80px"
        ref="modifyForm"
        :model="modifyForm"
        :show-message="false"
        :rules="validRules"
        size="small"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('MesQualityItems._8')" prop="CHECK_TYPE">
              <el-select style="width: 100%" v-model="modifyForm.CHECK_TYPE">
                <!-- <el-option :label="$t('MesQualityItems._2')"
                :value="-1" />-->
                <el-option
                  v-for="item in NameList"
                  :key="item.LOOKUP_CODE"
                  :label="item.MEANING"
                  :value="item.LOOKUP_CODE"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesQualityItems._9')" prop="CHECK_ITEM">
              <el-input v-model="modifyForm.CHECK_ITEM" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesQualityItems._10')" prop="CHECK_DESC">
              <el-input v-model="modifyForm.CHECK_DESC" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesQualityItems._11')" prop="ORDER_NO">
              <el-input v-model="modifyForm.ORDER_NO" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesQualityItems._12')" prop="QUANTIZE_TYPE">
              <el-select style="width: 100%" clearable v-model="modifyForm.QUANTIZE_TYPE">
                <el-option value="1" :label="$t('MesQualityItems._13')"></el-option>
                <el-option value="2" :label="$t('MesQualityItems._14')"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesQualityItems._22')" prop="REMARK">
              <el-input v-model="modifyForm.REMARK" type="textarea" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesQualityItems._23')" prop="ORGANIZE_ID">
              <el-cascader
                v-model="modifyForm.ORGANIZE_ID"
                :options="organizeList"
                style="width: 100%"
                :show-all-levels="false"
                placeholder=" "
                :props="casProps"
                @change="handleChangeCascader"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesQualityItems._24')">
              <el-switch
                v-model="modifyForm.ENABLED"
                :active-text="$t('MesQualityItems._25')"
                :inactive-text="$t('MesQualityItems._26')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesQualityItems._15')">
              <el-switch
                v-model="modifyForm.ISEMPTY"
                :active-text="$t('MesQualityItems._25')"
                :inactive-text="$t('MesQualityItems._26')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('MesQualityItems._30') }}</el-button>
        <el-button type="primary" @click="submitForm">{{$t('MesQualityItems._31') }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  Index,
  LoadData,
  SaveData,
  DeleteOneById,
  GetTypeList
} from '@/api/MesQualityItems'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import { cloneDeep } from 'lodash' // 直接抄
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'

export default {
  name: 'MesQualityItems',
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      listQuery: {
        CHECK_TYPE: 0,
        CHECK_ITEM: '',
        CHECK_DESC: '',
        Page: 1,
        Limit: 15
      },
      totalPage: 0,
      validRules: {
        CHECK_TYPE: [
          {
            required: true,
            message: this.$t('MesQualityItems._1'),
            trigger: 'change'
          }
        ],
        CHECK_ITEM: [
          {
            required: true,
            message: this.$t('MesQualityItems._3'),
            trigger: 'blur'
          }
        ],
        CHECK_DESC: [
          {
            required: true,
            message: this.$t('MesQualityItems._4'),
            trigger: 'blur'
          }
        ],
        ORDER_NO: [
          {
            required: true,
            message: this.$t('MesQualityItems._32'),
            trigger: 'blur'
          }
        ],
        QUANTIZE_TYPE: [
          {
            required: true,
            message: this.$t('MesQualityItems._33'),
            trigger: 'change'
          }
        ],
        ORGANIZE_ID: [
          {
            required: true,
            message: this.$t('MesQualityItems._34'),
            trigger: 'change'
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      NameList: [],
      dialogVisible: false,
      dialogTxt: '',
      modifyForm: {
        ID: 0,
        CHECK_TYPE: '',
        CHECK_ITEM: '',
        CHECK_GIST: '',
        ORDER_NO: '',
        QUANTIZE_TYPE: '',
        REMARK: '',
        ENABLED: 'N',
        ISEMPTY: 'N',
        ORGANIZE_ID: '',
        CREATE_USER: '',
        CREATE_TIME: '',
        UPDATE_USER: '',
        CHECK_DESC: ''
      },
      organizeList: [],
      planData: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.modifyForm.CREATE_USER = this.userinfo.USER_NAME
    this.modifyForm.UPDATE_USER = this.userinfo.USER_NAME
    this.getIndex()
    this.getOrganize()
  },
  methods: {
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.modifyForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await _LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager.map(item => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map(item => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        const data = await GetTypeList()
        console.log(data, 'data')
        this.NameList = data.Result
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.listQuery)
      this.loading = false
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.listQuery.Page = 1
      this.getLoadData()
    },
    handleSizeChange (Limit) {
      this.listQuery.Limit = Limit
      this.getLoadData()
    },
    handleCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getLoadData()
    },
    // 新增
    insertEvent (row) {
      this.modifyForm = {
        ID: 0,
        CHECK_TYPE: '',
        CHECK_ITEM: '',
        CHECK_GIST: '',
        ORDER_NO: '',
        QUANTIZE_TYPE: '',
        REMARK: '',
        ENABLED: 'N',
        ISEMPTY: 'N',
        ORGANIZE_ID: '',
        CREATE_USER: this.userinfo.USER_NAME,
        UPDATE_USER: this.userinfo.USER_NAME,
        CHECK_DESC: ''
      }
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.add')
    },
    editRow (row) {
      // this.modifyForm = JSON.parse(JSON.stringify(row))
      let form = cloneDeep(row)
      let stop = this.organizeList.map(item => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      const O_ID = form.O_ID || form.ORGANIZE_ID
      if (!O_ID) {
        return false
      }
      form.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.modifyForm = form
      console.log(this.modifyForm, 'this.modifyForm')

      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.edit')
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map(item => {
        if (item.ID === id) {
          if (item.PARENT_ORGANIZE_ID && item.ID !== stop) {
            arr.push(
              ...this.reverseGetTree(data, item.PARENT_ORGANIZE_ID, stop)
            )
          }
          arr.push(item.ID)
        }
      })
      return arr
    },
    // 删除
    removeClick (row) {
      if (row) {
        this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        )
          .then(async () => {
            const response = await DeleteOneById(row.ID)
            if (response.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('publics.tips.tips'),
                message: this.$t('publics.tips.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
          .catch(() => {})
      }
    },
    // 保存
    submitForm () {
      this.modifyForm.UPDATE_TIME = undefined
      if (
        Object.prototype.toString.call(this.modifyForm.ORGANIZE_ID) ===
        '[object Array]'
      ) {
        this.modifyForm.ORGANIZE_ID = this.modifyForm.ORGANIZE_ID[this.modifyForm.ORGANIZE_ID.length - 1]
      }
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await SaveData(this.modifyForm)
          if (res.Result) {
            this.formData = {
              CATEGORY_ID: '',
              OBJECT_ID: '',
              Page: 1,
              Limit: 15,
              Key: ''
            }
            this.form = {}
            this.getLoadData()
            this.dialogVisible = false
            this.$notify({
              title: this.$t('publics.tips.tips'),
              message: this.$t('publics.tips.saveSuccess'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    }
  }
}
</script>
<style>
.MesQualityItems-dialog .el-dialog__body {
  padding: 15px;
}
.MesQualityItems-form .el-form-item--small .el-form-item__label {
  line-height: 0px;
}
</style>
