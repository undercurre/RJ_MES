<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <!-- <el-input
          style="width: 200px"
          v-model="formData.part_no"
          :placeholder="$t('SfcsProductStopline._1')"
          clearable
          :disabled="isclock"
        />
        <el-select
          filterable
          clearable
          :disabled="isclock"
          :placeholder="$t('SfcsProductStopline._2')"
          style="width: 200px"
          v-model="formData.route_id"
        >
          <el-option
            v-for="item in routeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          :disabled="isclock"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        > -->
        <el-button type="primary" icon="el-icon-finished" @click="unClock">{{
          $t("SfcsEquipKeep._82")
        }}</el-button>
        <el-button
          v-if="$btnList.indexOf('SfcsProductStoplineSave') !== -1"
          type="success"
          icon="el-icon-plus"
          :disabled="
            !ModeList.length || !formData.part_no || !formData.route_id
          "
          @click="createData"
          >{{ $t("publics.btn.add") }}</el-button
        >
      </custom-container-header>
    </template>
    <div>
      <vxe-table
        ref="xTable"
        class="table-container2"
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
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
      >
        <vxe-table-column
          field="STOPLINE_MODE"
          min-width="170"
          :title="$t('SfcsProductStopline._3')"
          :edit-render="{ name: '$select', options: ModeList, props: {} }"
        />
        <vxe-table-column
          field="STOP_OPERATION_CODE"
          min-width="230"
          :title="$t('SfcsProductStopline._4')"
          :edit-render="{ name: '$select', options: SfcsOperationsList }"
        />
        <vxe-table-column
          field="ALARM_CRITERIA"
          min-width="170"
          :title="$t('SfcsProductStopline._5')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="STOP_CRITERIA"
          min-width="170"
          :title="$t('SfcsProductStopline._6')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DIVISION_CRITERIA"
          min-width="230"
          :title="$t('SfcsProductStopline._7')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DIVISION_START"
          min-width="260"
          :title="$t('SfcsProductStopline._8')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DIVISION_UNIT"
          min-width="100"
          :title="$t('SfcsProductStopline._9')"
          :formatter="formatterDivsionUnit"
          :edit-render="{ autofocus: '.custom-input' }"
        >
          <template v-slot:edit="{ row }">
            <div>
              <vxe-input
                :value="formatterDivsionUnit({ cellValue: row.DIVISION_UNIT })"
                readonly
              ></vxe-input>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="ALARM_INTERVAL"
          min-width="200"
          :title="$t('SfcsProductStopline._10') + '(PCS)'"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ENABLED"
          min-width="120"
          :title="$t('SfcsProductStopline._11')"
          :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
        >
          <template v-slot:edit="{ row }">
            <div>
              <el-switch
                v-model="row.ENABLED"
                disabled
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
          width="240"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              v-if="$btnList.indexOf('SfcsProductStoplineedit') !== -1"
              type="primary"
              icon="el-icon-edit"
              :disabled="
                !ModeList.length || !formData.part_no || !formData.route_id
              "
              @click="editRow(row)"
              >{{ $t("publics.btn.edit") }}</el-button
            >
            <el-button
              v-if="$btnList.indexOf('SfcsProductStoplinedelete') !== -1"
              type="danger"
              icon="el-icon-delete"
              @click="removeClick(row, row.$index)"
              >{{ $t("publics.btn.delete") }}</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 新增修改modal -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="modalTitle"
      :visible.sync="modalVisible"
      width="45%"
    >
      <el-form
        :model="form"
        :rules="rules"
        label-width="160px"
        :show-message="false"
        ref="form"
      >
        <el-form-item
          :label="$t('SfcsProductStopline._12')"
          prop="STOPLINE_MODE"
        >
          <el-select
            style="width: 100%"
            placeholder=" "
            v-model="form.STOPLINE_MODE"
            @change="handleChangeModel"
          >
            <el-option
              v-for="item in ModeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('SfcsProductStopline._13')"
          prop="STOP_OPERATION_CODE"
        >
          <el-select
            v-model="form.STOP_OPERATION_CODE"
            style="width: 100%"
            placeholder=" "
          >
            <div
              style="
                min-width: 360px;
                height: 34px;
                padding: 0 20px;
                display: flex;
                position: sticky;
                top: 0;
                background: #fff;
                z-index: 9;
                border-bottom: 1px solid rgb(229, 231, 237);
              "
            >
              <span
                style="
                  width: 60%;
                  box-size: border-box;
                  padding-right: 10px;
                  color: #606266;
                  line-height: 34px;
                  font-size: 14px;
                "
                >{{ $t("SfcsProductStopline._14") }}</span
              >
              <span
                style="
                  width: 40%;
                  color: #606266;
                  line-height: 34px;
                  font-size: 14px;
                  box-size: border-box;
                  padding-left: 10px;
                  border-left: 1px solid rgb(229, 231, 237);
                "
                >{{ $t("SfcsProductPallet._7") }}</span
              >
            </div>
            <el-option
              style="min-width: 360px; display: flex"
              v-for="item in SfcsOperationsList"
              :key="item.value"
              :value="item.value"
              :label="item.DESCRIPTION"
            >
              <span
                style="
                  width: 60%;
                  box-size: border-box;
                  padding-right: 10px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                "
                >{{ item.DESCRIPTION }}</span
              >
              <span
                style="
                  width: 40%;
                  box-size: border-box;
                  padding-left: 10px;
                  border-left: 1px solid rgb(229, 231, 237);
                "
                >{{ item.label }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('SfcsProductStopline._15')"
          prop="ALARM_CRITERIA"
        >
          <el-input v-model="form.ALARM_CRITERIA"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('SfcsProductStopline._16')"
          prop="STOP_CRITERIA"
        >
          <el-input v-model="form.STOP_CRITERIA"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('SfcsProductStopline._17')"
          prop="DIVISION_CRITERIA"
        >
          <el-input v-model="form.DIVISION_CRITERIA"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('SfcsProductStopline._18')"
          prop="DIVISION_START"
        >
          <el-input v-model="form.DIVISION_START"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('SfcsProductStopline._19')"
          prop="DIVISION_UNIT"
        >
          <el-input
            :value="
              DivisionUnitListMap[form.DIVISION_UNIT]
                ? DivisionUnitListMap[form.DIVISION_UNIT].label
                : ''
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('SfcsProductStopline._20') + '(PCS)'"
          prop="ALARM_INTERVAL"
        >
          <el-input v-model="form.ALARM_INTERVAL"></el-input>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductStopline._11')">
          <el-switch
            v-model="form.ENABLED"
            :active-text="$t('publics.btn.yes')"
            :inactive-text="$t('publics.btn.no')"
            active-color="#13ce66"
            inactive-color="#cccccc"
            active-value="Y"
            inactive-value="N"
          />
        </el-form-item>
        <el-form-item>
          <div style="text-align: right; margin-top: 20px">
            <el-button
              type="danger"
              icon="el-icon-close"
              style="width: 120px"
              @click="cancelCreate"
              >{{ $t("publics.btn.cancel") }}</el-button
            >
            <el-button
              type="success"
              icon="el-icon-check"
              style="width: 120px"
              @click="submitForm"
              >{{ $t("SmtPlacementHeader._76") }}</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="$t('SfcsEquipKeep._82')"
      :visible.sync="firstVisible"
      width="30%"
    >
      <el-form
        :model="formData"
        :rules="formDatarules"
        label-width="80px"
        :show-message="false"
        ref="formData"
      >
        <el-form-item :label="$t('MesQualityInfo._32')" prop="part_no"
          ><el-input
            style="width: 100%"
            v-model="formData.part_no"
            :placeholder="$t('SfcsProductStopline._1')"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('wos._9')" prop="route_id">
          <el-select
            filterable
            clearable
            :placeholder="$t('SfcsProductStopline._2')"
            style="width: 100%"
            v-model="formData.route_id"
          >
            <el-option
              v-for="item in routeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="firstVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary" @click="searchClick">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  Index,
  GetRoutesList,
  LoadData,
  GetDivisionUnit,
  SaveData
} from '@/api/SfcsProductStopline'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
export default {
  name: 'SfcsProductStopline',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        part_no: '',
        route_id: '',
        ...this.formData
      },
      routeList: [
        {
          label: '',
          value: '',
          disabled: false
        }
      ],
      loading: false,
      mainTable: [],
      modalTitle: '',
      modalVisible: false,
      form: {
        STOPLINE_MODE: '',
        STOP_OPERATION_CODE: '',
        ALARM_CRITERIA: 1,
        STOP_CRITERIA: 1,
        DIVISION_CRITERIA: 50,
        DIVISION_START: 0,
        DIVISION_UNIT: '',
        ALARM_INTERVAL: 1,
        INPUT_CONTROL: 'N',
        INPUT_OPERATION_CODE: '',
        INPUT_CONTROL_CRITERIA: 0,
        INCLUDE_NDF: 'N',
        ENABLED: 'Y'
      },
      formDatarules: {
        part_no: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._1'),
            trigger: 'blur'
          }
        ],
        route_id: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._2'),
            trigger: 'blur'
          }
        ]
      },
      rules: {
        STOPLINE_MODE: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._21'),
            trigger: 'change'
          }
        ],
        STOP_OPERATION_CODE: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._22'),
            trigger: 'change'
          }
        ],
        ALARM_CRITERIA: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._23'),
            trigger: 'blur'
          }
        ],
        STOP_CRITERIA: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._24'),
            trigger: 'blur'
          }
        ],
        DIVISION_CRITERIA: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._25'),
            trigger: 'blur'
          }
        ],
        DIVISION_START: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._26'),
            trigger: 'blur'
          }
        ],
        ALARM_INTERVAL: [
          {
            required: true,
            message: this.$t('SfcsProductStopline._27'),
            trigger: 'blur'
          }
        ]
      },
      SfcsOperationsList: [],
      ModeList: [],
      DivisionUnitList: [],
      DivisionUnitListMap: {},
      ProductStoplineList: [],
      validRules: {},
      isclock: false,
      firstVisible: true
    }
  },
  methods: {
    unClock () {
      // this.isclock = false;
      // this.SfcsOperationsList = [];
      // this.ModeList = [];
      // this.mainTable = [];
      // this.loading = false;
      // this.DivisionUnitList = [];
      // this.DivisionUnitListMap = {};
      // this.form = {
      //   STOPLINE_MODE: "",
      //   STOP_OPERATION_CODE: "",
      //   ALARM_CRITERIA: 1,
      //   STOP_CRITERIA: 1,
      //   DIVISION_CRITERIA: 50,
      //   DIVISION_START: 0,
      //   DIVISION_UNIT: "",
      //   ALARM_INTERVAL: 1,
      //   INPUT_CONTROL: "N",
      //   INPUT_OPERATION_CODE: "",
      //   INPUT_CONTROL_CRITERIA: 0,
      //   INCLUDE_NDF: "N",
      //   ENABLED: "Y",
      // };
      // this.formData = {
      //   part_no: "",
      //   route_id: "",
      //   Page: 1,
      //   Limit: 15,
      //   Key: "",
      // };
      this.firstVisible = true
    },
    async getIndex () {
      await Index()
      this.getRoutesList()
    },
    async getRoutesList () {
      const res = await GetRoutesList()
      if (res.Result) {
        const data = res.Result
        this.routeList = [
          {
            label: '',
            value: '',
            disabled: false
          }
        ]
        data.map((item) => {
          this.routeList.push({
            label: item.ROUTE_NAME,
            value: item.ID.toString(),
            disabled: false
          })
        })
      }
    },
    searchClick () {
      if (!this.formData.part_no || !this.formData.route_id) {
        this.$message.error(this.$t('SfcsProductStopline._28'))
        return false
      }
      this.isclock = true
      this.firstVisible = false
      this.formData.Page = 1
      this.getLoadData()
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        const {
          SfcsOperationsList,
          ModeList,
          DivisionUnitList,
          ProductStoplineList
        } = res.Result
        this.mainTable = (ProductStoplineList || []).map((item) => {
          item.STOPLINE_MODE = item.STOPLINE_MODE.toString()
          item.STOP_OPERATION_CODE = item.STOP_OPERATION_CODE.toString()
          return item
        })
        this.SfcsOperationsList = (SfcsOperationsList || []).map((item) => {
          return {
            label: item.OPERATION_NAME,
            value: item.Id.toString(),
            disabled: false,
            DESCRIPTION: item.DESCRIPTION
          }
        })
        this.ModeList = (ModeList || []).map((item) => {
          return {
            label: item.CHINESE,
            value: item.LOOKUP_CODE.toString(),
            disabled: false
          }
        })
        this.DivisionUnitListMap = {}
        this.DivisionUnitList = (DivisionUnitList || []).map((item) => {
          this.DivisionUnitListMap[item.LOOKUP_CODE] = {
            label: item.CHINESE,
            value: item.LOOKUP_CODE
          }
          return {
            label: item.CHINESE,
            value: item.LOOKUP_CODE.toString(),
            disabled: false
          }
        })
      }
    },
    createData () {
      this.modalTitle = this.$t('SfcsProductStopline._29')
      this.modalVisible = true
      this.form = {
        ID: 0,
        PART_NO: this.formData.part_no,
        STOPLINE_MODE: '',
        STOP_OPERATION_CODE: '',
        ALARM_CRITERIA: 1,
        STOP_CRITERIA: 1,
        DIVISION_CRITERIA: 50,
        DIVISION_START: 0,
        DIVISION_UNIT: '',
        ALARM_INTERVAL: 1,
        INPUT_CONTROL: 'N',
        INPUT_OPERATION_CODE: '',
        INPUT_CONTROL_CRITERIA: 0,
        INCLUDE_NDF: 'N',
        ENABLED: 'Y'
      }
    },
    editRow (row) {
      this.form = row
      this.modalTitle = this.$t('SfcsProductStopline._30')
      this.modalVisible = true
    },
    async removeClick (row) {
      if (
        row &&
        (await this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).catch((_) => {
          /** 取消 */
        }))
      ) {
        const dataForm = {
          PART_NO: this.formData.part_no,
          ROUTE_ID: this.formData.route_id,
          RemoveRecords: [row]
        }
        const res = await SaveData(dataForm)
        if (res.Result) {
          this.$refs.xTable.remove(row)
          this.$notify({
            title: this.$t('ssc._12'),
            message: this.$t('ssc._19'),
            type: 'success',
            duration: 2000
          })
        }
      }
    },
    cancelCreate () {
      this.modalVisible = false
    },
    submitForm () {
      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          const dataForm = {
            PART_NO: this.formData.part_no,
            ROUTE_ID: this.formData.route_id
          }
          if (this.form.ID) {
            dataForm.UpdateRecords = [
              {
                ...this.form
              }
            ]
          } else {
            dataForm.InsertRecords = [
              {
                ...this.form
              }
            ]
          }
          const res = await SaveData(dataForm)
          if (res.Result) {
            this.$message.success(this.$t('SfcsProductStopline._31'))
            this.form = {
              STOPLINE_MODE: '',
              STOP_OPERATION_CODE: '',
              ALARM_CRITERIA: 1,
              STOP_CRITERIA: 1,
              DIVISION_CRITERIA: 50,
              DIVISION_START: 0,
              DIVISION_UNIT: '',
              ALARM_INTERVAL: 1,
              INPUT_CONTROL: 'N',
              INPUT_OPERATION_CODE: '',
              INPUT_CONTROL_CRITERIA: 0,
              INCLUDE_NDF: 'N',
              ENABLED: 'Y'
            }
            this.formData.Page = 1
            this.modalVisible = false
            this.getLoadData()
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    },
    handleChangeModel (e) {
      this.getDivisionUnit(e)
    },
    async getDivisionUnit (stoplineMode) {
      const res = await GetDivisionUnit(stoplineMode)
      if (res.Result) {
        const { DivisionUnit } = res.Result
        this.form.INCLUDE_NDF = res.Result.INCLUDE_NDF || 'N'
        this.form.DIVISION_UNIT =
          this.DivisionUnitListMap[DivisionUnit]?.value || ''
      }
    },
    formatterDivsionUnit ({ cellValue }) {
      return this.DivisionUnitListMap[cellValue]?.label || ''
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style lang="scss" scoped>
.table-container2 {
  height: calc(100vh - 60px - 21px - 74px - 73px + 54px);
}
</style>
