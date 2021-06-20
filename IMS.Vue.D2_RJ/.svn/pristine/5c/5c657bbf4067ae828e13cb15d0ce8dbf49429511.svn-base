<template>
  <d2-container class="MesQualityInfo">
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <el-input
          v-model="formData.WO_NO"
          :placeholder="$t('WorkWarehous._1')"
          clearable
          style="width: 120px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <pn-no-select
          :bind-data="formData.PART_NO"
          style="width:120px"
          @getData = "setBindData"
          :multiple = false
          :placeholder="$t('WorkWarehous._2')"
        ></pn-no-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >
        <!-- 清空 -->
        <el-button
          type="danger"
          icon="el-icon-delete"
          class="common-top"
          @click="remove_but()"
          >{{ $t("WorkWarehous._5") }}</el-button
        >
      </custom-container-header>
    </template>

    <div class="block-one">
      <div>
        <vxe-table
          ref="xTable"
          border
          class="table-container1"
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
          :sort-config="{ trigger: 'cell' }"
          :loading="mainLoading"
          :data="mainTable"
          @cell-click="cellClick"
        >
          <vxe-table-column
            type="seq"
            sortable
            title="序号"
            width="80"
          ></vxe-table-column>
          <vxe-table-column
            sortable
            field="WO_NO"
            title="工单号"
            min-width="180"
          />
          <vxe-table-column
            sortable
            field="PART_NO"
            title="料号"
            min-width="180"
          />
          <vxe-table-column
            sortable
            field="OEM_PN"
            title="OEM料号"
            min-width="150"
          />
          <vxe-table-column
            sortable
            field="MODEL"
            title="机种"
            min-width="150"
          />
          <vxe-table-column
            sortable
            field="ROUTE_NAME"
            title="制程"
            align="center"
            min-width="150"
          />
          <vxe-table-column
            sortable
            show-overflow
            field="TARGET_QTY"
            title="目标产量"
            :edit-render="{ name: 'input' }"
            align="center"
            min-width="140"
          />
          <vxe-table-column
            sortable
            show-overflow
            field="INPUT_QTY"
            title="投入量"
            :edit-render="{ name: 'input' }"
            align="center"
            min-width="130"
          />
          <vxe-table-column
            sortable
            min-width="120"
            field="OUTPUT_QTY"
            title="产出量"
          />
          <vxe-table-column
            sortable
            min-width="120"
            field="INBOUND_QTY"
            title="入库数量"
          />
          <vxe-table-column
            sortable
            min-width="180"
            field="ACTUAL_START_DATE"
            title="生产日期"
          />
          <vxe-table-column
            :title="$t('publics.field.operate')"
            width="120"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="primary" :disabled="scope.row.INBOUND_QTY>=scope.row.OUTPUT_QTY" @click.prevent="warehous_but(scope.row)"
                >完工入库</el-button
              >
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="foot-page">
        <el-pagination
          :current-page="formData.Page"
          :page-size="formData.Limit"
          :page-sizes="[15, 25, 35, 45]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="mainTotal"
          @size-change="handleMainSizeChange"
          @current-change="handleMainCurrentChange"
        />
      </div>
    </div>
    <div class="block-two">
      <div style="border-top: 1px solid rgb(229, 231, 237)">
        <span
          style="
            display: block;
            color: #8492a6;
            font-size: 14px;
            margin: 10px 0;
          "
          >完工入库记录详情</span
        >
      </div>
      <div>
        <vxe-table
          ref="xTable"
          border
          class="table-container2"
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
          :sort-config="{ trigger: 'cell' }"
          :loading="detailsLoading"
          :data="detailsTabel"
        >
          <vxe-table-column
            type="seq"
            title="序号"
            width="80"
          ></vxe-table-column>
          <vxe-table-column
            sortable
            field="WO_NO"
            min-width="120"
            title="工单号"
          />
          <vxe-table-column
            sortable
            field="INBOUND_NO"
            min-width="120"
            title="MES入库单号"
          />
          <vxe-table-column
            sortable
            field="FINISHED_NO"
            min-width="120"
            title="ERP完工单号"
          />
          <vxe-table-column
            sortable
            field="INBOUND_QTY"
            min-width="60"
            title="入库数量"
          />
          <vxe-table-column
            sortable
            field="CREATE_TIME"
            min-width="120"
            title="入库时间"
          />
          <vxe-table-column
            sortable
            field="CREATE_BY"
            min-width="100"
            title="入库人员"
          />
          <vxe-table-column
            sortable
            field="STATUS"
            min-width="60"
            title="入库状态"
          >
            <template slot-scope="scope">
              <el-tag v-if="parseInt(scope.row.STATUS) === 0" type="danger"
                >未处理</el-tag
              >
              <el-tag v-else-if="parseInt(scope.row.STATUS) === 1" type="success"
                >处理中</el-tag
              >
              <el-tag v-else type="info">已处理</el-tag>
            </template>
          </vxe-table-column>
          <vxe-table-column
            sortable
            field="INBOUND_INFO"
            min-width="100"
            title="入库信息"
          />
          <vxe-table-column
            :title="$t('publics.field.operate')"
            width="180"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="success" :disabled="scope.row.STATUS>0" @click="detailsEdit(scope.row)">{{
                $t("publics.btn.edit")
              }}</el-button>
              <el-button type="danger" :disabled="scope.row.STATUS>0" @click="skillDetailsDelete(scope.row)">{{
                $t("publics.btn.delete")
              }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="foot-page">
        <el-pagination
          :current-page="detailsData.Page"
          :page-size="detailsData.Limit"
          :page-sizes="[15, 25, 35, 45]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="detailsTotal"
          @size-change="handleSkillSizeChange"
          @current-change="handleSkillCurrentChange"
        />
      </div>
    </div>
    <!-- 完工入库 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialogskill"
      title="完工入库"
      width="20%"
      :visible.sync="dialogOverWarehous"
    >
      <el-form
        class="custom-form"
        ref="detailsForm"
        label-position="top"
        label-width="80px"
        :show-message="false"
        :rules="detaislRules"
        size="small"
        :model="detailsForm"
      >
        <el-form-item>
          <el-row>
            <el-col :span="24">
              <el-form-item
                :label="'入库数量(MAX:' + ACTUAL_QTY + ')'"
                prop="INBOUND_QTY"
              >
                <el-input
                  type="number"
                  min="1"
                  @keyup.enter.native="submit_but"
                  placeholder="请输入入库数量"
                  v-model.number="detailsForm.INBOUND_QTY"
                  onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOverWarehous = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary" @click="submit_but">
          入库
        </el-button>
      </span>
    </el-dialog>

    <!-- 入库/编辑 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      class="dialogskill"
      title="入库/编辑"
      width="40%"
      :visible.sync="dialogWarehous"
    >
      <el-form
        class="custom-form"
        ref="detailsForm"
        label-position="top"
        label-width="80px"
        :show-message="false"
        :rules="detaislRules"
        size="small"
        :model="detailsForm"
      >
        <el-form-item>
          <el-row>
            <el-col :span="11">
              <el-form-item label="工单号" prop="WO_NO">
                <el-input
                  placeholder="请输入工单号"
                  disabled
                  v-model="detailsForm.WO_NO"
                ></el-input>
              </el-form-item>
              <el-form-item label="ERP完工单号" prop="FINISHED_NO">
                <el-input
                  disabled
                  v-model="detailsForm.FINISHED_NO"
                ></el-input>
              </el-form-item>
              <el-form-item label="入库状态" prop="STATUS">
                <el-select
                  v-model="detailsForm.STATUS"
                  style="width: 100%"
                  disabled
                  placeholder="请选择入库状态"
                >
                  <el-option
                    v-for="(item, index) in Status"
                    :key="index"
                    :label="item.lable"
                    :value="item.value.toString()"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间" prop="name">
                <el-input v-model="detailsForm.CREATE_TIME" disabled></el-input>
              </el-form-item>
              <el-form-item label="修改时间" prop="name">
                <el-input v-model="detailsForm.UPDATE_TIME" disabled></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="11" :offset="1">
              <el-form-item label="MES入库单号" prop="name">
                <el-input v-model="detailsForm.INBOUND_NO" disabled></el-input>
              </el-form-item>
              <el-form-item
                :label="'入库数量(MAX:' + ACTUAL_QTY + ')'"
                prop="INBOUND_QTY"
              >
                <el-input
                  v-model.number="detailsForm.INBOUND_QTY"
                  onkeyup="this.value=this.value.replace(/[^\d\.]/g,'')"
                ></el-input>
              </el-form-item>
              <el-form-item label="入库信息">
                <el-input disabled v-model="detailsForm.INBOUND_INFO"></el-input>
              </el-form-item>
              <el-form-item label="入库人员">
                <el-input v-model="detailsForm.CREATE_BY" disabled></el-input>
              </el-form-item>
              <el-form-item label="修改人员" prop="name">
                <el-input v-model="detailsForm.UPDATE_BY" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWarehous = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary" @click="submit_but">{{
          $t("ssc_rd.se")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  SaveData,
  LoadInboundWoList,
  LoadInboundInfoListByWo
} from '@/api/SfcsInboundRecordInfo'
import PnNoSelect from '@/components/PnNoSelect'
import { mapGetters } from 'vuex'
export default {
  name: 'WorkWarehous',
  components: {
    PnNoSelect,
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入入库数量'))
      } else {
        if (this.detailsForm.INBOUND_QTY > this.ACTUAL_QTY) {
          callback(new Error('请输入正确的入库数量'))
        } else if (this.detailsForm.INBOUND_QTY === 0) {
          callback(new Error('暂无入库数量'))
        }
        callback()
      }
    }
    return {
      formData: {
        WO_NO: '',
        PART_NO: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      RoutesListBox: [],
      mainTable: [],
      mainTotal: 0,
      mainLoading: false,
      detailsData: {
        WO_ID: '',
        Page: 1,
        Limit: 15
      },
      dialogOverWarehous: false,
      detailsLoading: false,
      detailsTabel: [],
      detailsTotal: 0,
      dialogWarehous: false, // 入库弹框
      detailsForm: {
        ID: 0,
        WO_ID: 0,
        WO_NO: '',
        INBOUND_NO: '',
        FINISHED_NO: '',
        INBOUND_QTY: '',
        STATUS: 0,
        INBOUND_INFO: '',
        CREATE_TIME: null,
        CREATE_BY: '',
        UPDATE_TIME: null,
        UPDATE_BY: ''
      },
      detaislRules: {
        // WO_NO: [{ required: true, message: '请输入工单号', trigger: 'blur' }],
        // FINISHED_NO: [
        //   { required: true, message: '请输入ERP完工单号', trigger: 'blur' }
        // ],
        // STATUS: [
        //   { required: true, message: '请选择入库状态', trigger: 'change' }
        // ],
        INBOUND_QTY: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ]
      },
      Status: [
        { lable: '未处理', value: 0 },
        { lable: '已处理', value: 1 }
      ],
      ControlSave: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      ACTUAL_QTY: 0 // 入库数量
    }
  },
  methods: {
    // PnNoSelect 数据交互
    setBindData (val) {
      this.formData.PART_NO = val
      this.searchClick()
    },
    // 提交信息
    submit_but () {
      this.$refs.detailsForm.validate((valid, errInfo) => {
        if (valid) {
          if (this.detailsForm.ID > 0) {
            this.ControlSave.UpdateRecords = Array.isArray(this.detailsForm) ? this.detailsForm : [this.detailsForm]
          } else {
            this.ControlSave.InsertRecords = Array.isArray(this.detailsForm) ? this.detailsForm : [this.detailsForm]
          }
          console.log(this.ControlSave)
          this.AddOrModifySave()
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {}
        }
      })
    },
    // 格式化提交保存数据
    ResetControlSave () {
      this.ControlSave.InsertRecords = []
      this.ControlSave.UpdateRecords = []
      this.ControlSave.RemoveRecords = []

      this.detailsForm = {
        ID: 0,
        WO_ID: 0,
        WO_NO: '',
        INBOUND_NO: '',
        FINISHED_NO: '',
        INBOUND_QTY: '',
        STATUS: 0,
        INBOUND_INFO: '',
        CREATE_TIME: null,
        CREATE_BY: this.userinfo.USER_NAME,
        UPDATE_TIME: null,
        UPDATE_BY: this.userinfo.USER_NAME
      }
    },
    async AddOrModifySave () {
      const res = await SaveData(this.ControlSave)
      if (res.Result) {
        this.$notify({
          title: this.$t('publics.tips.tips'),
          message: this.$t('publics.tips.saveSuccess'),
          type: 'success',
          duration: 2000
        })
        this.LoadInboundWoList()
        this.LoadInboundInfoListByWo()
      }
      this.dialogWarehous = false
      this.dialogOverWarehous = false// 关闭完工入库弹框
      this.ResetControlSave() // 格式化
    },
    // 编辑入库明细
    detailsEdit (row) {
      if (row) {
        this.dialogWarehous = true
        this.detailsForm.ID = row.ID
        this.detailsForm.WO_ID = row.WO_ID
        this.detailsForm.WO_NO = row.WO_NO
        this.detailsForm.INBOUND_NO = row.INBOUND_NO
        this.detailsForm.FINISHED_NO = row.FINISHED_NO
        this.detailsForm.INBOUND_QTY = row.INBOUND_QTY
        this.detailsForm.STATUS = row.STATUS
        this.detailsForm.INBOUND_INFO = row.INBOUND_INFO
        this.detailsForm.CREATE_TIME = row.CREATE_TIME
        this.detailsForm.CREATE_BY = row.CREATE_BY

        this.ACTUAL_QTY = this.detailsForm.INBOUND_QTY + row.MAX_QTY
      } else {
        this.$notify.error({
          title: '错误',
          message: '完工入库记录详情加载失败'
        })
      }
    },
    // 删除入库明细
    skillDetailsDelete (row) {
      if (row.STATUS > 0) return
      this.$confirm(this.$t('CallConfig._21'), this.$t('CallConfig._16'), {
        confirmButtonText: this.$t('CallConfig._17'),
        cancelButtonText: this.$t('CallConfig._18'),
        type: 'warning'
      })
        .then(async () => {
          this.ControlSave.RemoveRecords = [row]
          const res = await SaveData(this.ControlSave)
          if (res.Result) {
            this.$notify({
              title: this.$t('CallConfig._19'),
              message: this.$t('CallConfig._20'),
              type: 'success',
              duration: 2000
            })
            this.LoadInboundWoList()
            this.LoadInboundInfoListByWo()
          }
          this.ControlSave.RemoveRecords = []
        })
    },
    // 入库操作
    warehous_but (row) {
      this.dialogOverWarehous = true
      this.detailsForm.WO_NO = row.WO_NO
      console.log(row)
    },
    searchClick () {
      this.formData.Page = 1
      this.LoadInboundWoList()
    },
    // 获取主表数据
    async LoadInboundWoList () {
      this.mainLoading = true
      const res = await LoadInboundWoList(this.formData)
      this.mainLoading = false
      if (res.Result) {
        this.mainTable = res.Result.data || []
        this.mainTotal = res.Result.count || 0
      }
    },
    cellClick ({ row }) {
      this.detailsData.WO_ID = row.ID
      this.ACTUAL_QTY = row.OUTPUT_QTY - row.INBOUND_QTY
      this.detailsForm.INBOUND_QTY = this.ACTUAL_QTY
      this.LoadInboundInfoListByWo()
    },
    // 获取明细数据
    async LoadInboundInfoListByWo () {
      this.detailsLoading = true
      const res = await LoadInboundInfoListByWo(this.detailsData)
      this.detailsLoading = false
      if (res.Result) {
        this.detailsTabel = res.Result.data || []
        this.detailsTotal = res.Result.count || 0
      }
    },
    handleSkillSizeChange (Limit) {
      this.detailsData.Limit = Limit
      this.LoadInboundInfoListByWo()
    },
    handleSkillCurrentChange (Page) {
      this.detailsData.Page = Page
      this.LoadInboundInfoListByWo()
    },
    handleMainSizeChange (Limit) {
      this.formData.Limit = Limit
      this.LoadInboundWoList()
    },
    handleMainCurrentChange (Page) {
      this.formData.Page = Page
      this.LoadInboundWoList()
    }
  },
  created () {
    this.LoadInboundWoList()
    this.detailsForm.CREATE_BY = this.userinfo.USER_NAME
    this.detailsForm.UPDATE_BY = this.userinfo.USER_NAME
  }
}
</script>

<style lang="scss" scoped>
.table-container1 {
  height: 350px;
}
.foot-page {
  padding: 5px 0;
}
.table-container2 {
  height: calc(100vh - 54px - 20px - 350px - 42px - 190px);
}
.dialogskill ::v-deep .el-dialog__body {
  padding-top: 10px;
}
</style>
