<template>
  <custom-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-button icon="el-icon-back"
                   @click="goBack(true)">{{ $t('SmtPlacementHeader._37') }}</el-button>
        <el-button icon="el-icon-check"
                   type="primary"
                   @click="saveData">{{ $t('publics.btn.save') }}</el-button>
        <el-button icon="el-icon-plus"
                   type="success"
                   @click="addClick(null)">{{ $t('publics.btn.add') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form"
               :model="updatePlacementHeader"
               label-width="120px"
               :show-message="false"
               :rules="rules"
               size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('SmtPlacementHeader._38')"
                          prop="PLACEMENT">
              <el-input v-model="updatePlacementHeader.PLACEMENT"
                        readonly></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._39')"
                          prop="STATION_ID">
              <el-select v-model="updatePlacementHeader.STATION_ID"
                         placeholder=" "
                         style="width: 100%">
                <el-option v-for="item in SmtStation"
                           :key="item.ID"
                           :label="item.SMT_NAME"
                           :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._40')"
                          prop="PART_NO">
              <el-input v-model="updatePlacementHeader.PART_NO"></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._41')"
                          prop="PCB_SIDE">
              <el-select v-model="updatePlacementHeader.PCB_SIDE"
                         placeholder=" "
                         style="width: 100%">
                <el-option v-for="item in PCBSide"
                           :key="item.ID"
                           :label="item.CN_DESC"
                           :value="item.CODE"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('SmtPlacementHeader._42')"
                          prop="HI_OUTPUT_TIME">
              <el-input v-model="updatePlacementHeader.HI_OUTPUT_TIME"></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._43')"
                          prop="STANDARD_CAPACITY">
              <el-input type="number"
                        v-model="updatePlacementHeader.STANDARD_CAPACITY"></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._44')">
              <el-switch v-model="updatePlacementHeader.CHECKED"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         active-value="Y"
                         inactive-value="N" />
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._45')">
              <el-input v-model="updatePlacementHeader.CHECKED_BY"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('SmtPlacementHeader._46')">
              <el-input v-model="updatePlacementHeader.CHECKED_TIME"></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._47')">
              <el-input v-model="updatePlacementHeader.DESCRIPTION"></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._48')">
              <el-switch v-model="updatePlacementHeader.ENABLED"
                         active-color="#13ce66"
                         inactive-color="#ff4949"
                         active-value="Y"
                         inactive-value="N" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <div style="border-top: 1px solid rgb(229, 231, 237)">
        <span style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0;">{{ $t('SmtPlacementHeader._49') }}</span>
      </div>
      <div>
        <vxe-table ref="__xTable"
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
                   :data="PlacementDetail"
                   :edit-rules="validRules"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}">
          <vxe-table-column field="STAGE"
                            min-width="150"
                            :title="$t('SmtPlacementHeader._51')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="SLOT"
                            width="180"
                            :title="$t('SmtPlacementHeader._73')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="SUB_SLOT"
                            min-width="180"
                            :title="$t('SmtPlacementHeader._52')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="PART_NO"
                            width="180"
                            :title="$t('SmtPlacementHeader._53')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="UNITQTY"
                            width="150"
                            :title="$t('SmtPlacementHeader._54')"
                            :edit-render="{name: '$input', props: {type: 'number'}}" />
          <vxe-table-column field="REFDESIGNATOR"
                            width="180"
                            :title="$t('SmtPlacementHeader._57')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="PNDESC"
                            width="180"
                            :title="$t('SmtPlacementHeader._55')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="FEEDERTYPE"
                            width="150"
                            :title="$t('SmtPlacementHeader._56')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="MST_ID"
                            min-width="150"
                            :title="$t('SmtPlacementHeader._50')"
                            :formatter="formatterMSTID"
                            :edit-render="{name: '$input', props: {readonly: true, value: PlacementHeader.PLACEMENT}}" />
          <vxe-table-column field="ENABLED"
                            fixed="right"
                            width="150"
                            :title="$t('as_src.tb_an')"
                            :edit-render="{autofocus: '.custom-input', type: 'visible'}">
            <template v-slot:edit="{ row }">
              <div>
                <el-switch v-model="row.ENABLED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="SKIP"
                            fixed="right"
                            width="150"
                            :title="$t('SmtPlacementHeader._58')"
                            :edit-render="{autofocus: '.custom-input', type: 'visible'}">
            <template v-slot:edit="{ row }">
              <div>
                <el-switch v-model="row.SKIP"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column :title="$t('as_src.tb_og')"
                            width="120"
                            align="center"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="danger"
                         @click="removeClick(row, row.$index)">{{ $t('as_src.tb_rm') }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </custom-container>
</template>

<script>
import { EditView, SaveData } from '@/api/SmtPlacementHeader'
import { mapState, mapMutations, mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'Modify',
  components: {
    customContainer: () => import('@/components/custom-container'),
    customContainerHeader: () => import('@/components/custom-container-header')
  },
  computed: {
    ...mapState({
      mstId: (state) => state.custom.materials.mstId
    }),
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      SmtStation: [],
      PCBSide: [],
      PlacementHeader: {},
      updatePlacementHeader: {},
      PlacementDetail: [],
      loading: false,
      validRules: {
        MST_ID: [
          { required: true, message: this.$t('SmtPlacementHeader._59') }
        ],
        STAGE: [{ required: true, message: this.$t('SmtPlacementHeader._60') }],
        SLOT: [{ required: true, message: this.$t('SmtPlacementHeader._61') }],
        // SUB_SLOT: [{ required: true, message: this.$t('SmtPlacementHeader._62') }],
        PART_NO: [
          { required: true, message: this.$t('SmtPlacementHeader._63') }
        ],
        UNITQTY: [
          { required: true, message: this.$t('SmtPlacementHeader._64') }
        ]
        // REFDESIGNATOR: [{ required: true, message: this.$t('SmtPlacementHeader._65') }]
      },
      rules: {
        PLACEMENT: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._66'),
            trigger: 'blur'
          }
        ],
        STATION_ID: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._67'),
            trigger: 'blur'
          }
        ],
        PART_NO: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._68'),
            trigger: 'blur'
          }
        ],
        PCB_SID: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._69'),
            trigger: 'blur'
          }
        ],
        // HI_OUTPUT_TIME: [
        //   { required: true, message: this.$t('SmtPlacementHeader._70'), trigger: 'blur' }
        // ],
        STANDARD_CAPACITY: [
          { required: true, message: this.$t('SmtPlacementHeader._71'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations({
      SET_MST_ID: 'custom/materials/SET_MST_ID'
    }),
    goBack (isPopState = false) {
      this.SET_MST_ID(0)
      if (isPopState) {
        window.history.go(-1)
      }
    },
    // 添加监听页面返回事件
    addEventListener () {
      window.history.pushState(null, null, window.location.href)
      window.addEventListener(
        'popstate',
        (e) => {
          this.goBack(false)
        },
        false
      )
    },
    async getEditView (isNeedUpDateForm = true) {
      this.loading = true
      const res = await EditView(this.mstId)
      this.loading = false
      if (res.Result) {
        const data = res.Result
        Object.keys(data).forEach((item) => {
          if (data[item]) this[item] = data[item]
        })
        if (isNeedUpDateForm) this.updatePlacementHeader = this.PlacementHeader
      } else {
        Object.assign(this.$data, this.$options.data()) // 快速重置表单
        this.$message.error(this.$t('SmtPlacementHeader._72'))
        this.goBack(true)
      }
    },
    formatterMSTID () {
      return this.PlacementHeader.PLACEMENT
    },
    addClick (row) {
      const record = {
        ID: 0,
        MST_ID: this.PlacementHeader.ID,
        TABLENO: null,
        STAGE: null,
        SLOT: null,
        SUB_SLOT: null,
        LOCATION: null,
        PART_NO: null,
        UNITQTY: null,
        PNDESC: null,
        FEEDERTYPE: null,
        REFDESIGNATOR: null,
        ENABLED: 'N',
        SKIP: 'N',
        LOCATION_KEY: null
      }
      this.$refs.__xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.__xTable.setActiveRow(row)
      })
    },
    // 保存数据
    saveData () {
      this.$refs.form.validate((valid, errInfo) => {
        if (valid) {
          this.$refs.__xTable.validate(async (_valid) => {
            if (_valid) {
              const postData = this.$refs.__xTable.getRecordset()
              this.updatePlacementHeader.UPDATE_BY = this.userinfo.USER_NAME
              this.updatePlacementHeader.UPDATE_TIME = dayjs().format(
                'YYYY-MM-DD HH:mm:ss'
              )
              let form = {
                PlacementHeader: this.updatePlacementHeader,
                PlacementDetail: {
                  RemoveRecords: postData.removeRecords || [],
                  InsertRecords: postData.insertRecords || [],
                  UpdateRecords: postData.updateRecords || []
                }
              }
              const res = await SaveData(form)
              if (res.Result) {
                form = {}
                this.getEditView()
                this.$notify({
                  title: this.$t('ssc._12'),
                  message: this.$t('ssc._13'),
                  type: 'success',
                  duration: 2000
                })
              }
            }
          })
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
    // 删除
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
        ).catch())
      ) {
        this.$refs.__xTable.remove(row)
        if (!row.ID) {
          return false
        }
        const postData = this.$refs.__xTable.getRecordset()
        if (postData.removeRecords.length) {
          let form = {
            PlacementHeader: this.PlacementHeader,
            PlacementDetail: {
              RemoveRecords: postData.removeRecords
            }
          }
          const res = await SaveData(form)
          if (res.Result) {
            form = {}
            this.getEditView(false)
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._19'),
              type: 'success',
              duration: 2000
            })
          }
        }
      }
    }
  },
  created () {
    this.addEventListener()
    if (!this.mstId) {
      this.$message.error(this.$t('SmtPlacementHeader._72'))
      this.goBack(true)
      return false
    }
    this.getEditView()
  },
  beforeDestroy () {
    this.SET_MST_ID(0)
    window.removeEventListener('popstate', () => { })
  }
}
</script>

<style lang="scss" scoped>
.table-container2 {
  height: calc(100vh - 54px - 20px - 156px - 41px);
}
</style>
