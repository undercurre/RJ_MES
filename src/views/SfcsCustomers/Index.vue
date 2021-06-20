 <template>
  <d2-container class="SfcsCustomers">
    <template slot="header">
      <custom-container-header
        exportMehodsName="exportData"
        importBtnName="SfcsCustomersImport"
        exportBtnName="SfcsCustomersExport"
        exportTplName="SfcsCustomersExportTPL"
      >
        <el-input
          v-model="formData.Key"
          :placeholder="$t('crss._1')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <!-- <el-select v-model="formData.PARENT_ID" clearable filterable :placeholder="$t('crss._5')">
          <el-option
            v-for="item in ParentCustom"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID"
          />
        </el-select>&nbsp;-->
        <el-select
          clearable
          style="width:200px"
          v-model="formData.PARENT_ID"
          :placeholder="$t('crss._5')"
        >
          <div
            style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"
          ></div>
          <div
            style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"
          ></div>
          <div
            style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90"
          >
            <el-input v-model="clientForm.NAME" clearable @input="searchClientList"></el-input>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.prevent="searchClientList"
            >{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option
            style="width: 400px"
            v-for="item in CustomerList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
          <div
            style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
          >
            <el-pagination
              :pager-count="5"
              :current-page="clientForm.Page"
              :page-size="clientForm.Limit"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="clientTotalPage"
              @size-change="clientFormSizeChange"
              @current-change="clientFormCurrentChange"
            />
          </div>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('crss._2') }}</el-button>
        <el-button
          type="success"
          @click="addClick"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SfcsCustomersAdd') !== -1"
        >{{ $t('crss._3') }}</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SfcsCustomersEdit') !== -1"
        >{{ $t('crss._4') }}</el-button>-->
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
        stripe
        :loading="loading"
        :data="mainTable"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      >
        <vxe-table-column
          field="CUSTOMERNAME"
          :title="$t('crss._6')"
          :edit-render="{name: '$input', props: {readonly: true}}"
          min-width="160"
        />

        <vxe-table-column
          field="CUSTOMER"
          min-width="150"
          :title="$t('crss._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="NATIONALITY"
          :title="$t('crss._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
          min-width="150"
        />
        <vxe-table-column
          field="TEL"
          min-width="150"
          :title="$t('crss._9')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="MOBILE"
          min-width="190"
          :title="$t('crss._10')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="FAX"
          width="150"
          :title="$t('crss._11')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="CONTACT"
          width="150"
          :title="$t('crss._12')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="POSTAL_CODE"
          :title="$t('crss._13')"
          :edit-render="{name: '$input', props: {readonly: true}}"
          width="150"
        />
        <vxe-table-column
          field="CITY"
          :title="$t('crss._14')"
          width="150"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="STATE"
          :title="$t('crss._15')"
          width="150"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="ADDRESS"
          :title="$t('crss._16')"
          width="150"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="ENABLED"
          :title="$t('crss._17')"
          :edit-render="{autofocus: '.custom-input', type: 'visible',}"
          width="150"
        >
          <template v-slot:edit="{ row}">
            <span v-if="row.ENABLED === 'Y'">{{$t('publics.btn.yes')}}</span>
            <span v-if="row.ENABLED === 'N'">{{$t('publics.btn.no')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          v-if="$btnList.indexOf('SfcsCustomersEdit') !== -1"
          :title="$t('plbd.tb_og')"
          min-width="120"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button type="primary" @click="editClick(row, row.$index)">{{$t('publics.btn.edit')}}</el-button>
          </template>
        </vxe-table-column>
        <!-- <vxe-table-column :title="$t('publics.field.operate')" width="100" align="center">
          <template v-slot="{ row }">
            <el-button type="danger" @click="removeClick(row)">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>-->
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <!-- 编辑 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="editTitle"
      width="60%"
      :visible.sync="editVisible"
    >
      <el-form
        ref="editForm"
        label-width="100px"
        :model="editForm"
        :rules="validRules"
        :show-message="false"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('crss._6')">
              <el-select
                clearable
                style="width:100%"
                v-model="editForm.PARENT_ID"
                :placeholder="$t('crss._5')"
              >
                <div
                  style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"
                ></div>
                <div
                  style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"
                ></div>
                <div
                  style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90"
                >
                  <el-input v-model="clientForm2.NAME" clearable @input="searchClientList2" />
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="searchClientList2"
                  >{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option
                  style="width: 400px"
                  v-for="item in CustomerList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
                <div
                  style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
                >
                  <el-pagination
                    :pager-count="5"
                    :current-page="clientForm.Page"
                    :page-size="clientForm.Limit"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="clientTotalPage2"
                    @size-change="clientFormSizeChange2"
                    @current-change="clientFormCurrentChange2"
                  />
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('crss._7')" prop="CUSTOMER">
              <el-input v-model="editForm.CUSTOMER" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('crss._8')">
              <el-input v-model="editForm.NATIONALITY" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('crss._9')">
              <el-input v-model="editForm.TEL" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('crss._10')">
              <el-input v-model="editForm.MOBILE" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('crss._11')">
              <el-input v-model="editForm.FAX" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('crss._12')">
              <el-input v-model="editForm.CONTACT" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('crss._13')">
              <el-input v-model="editForm.POSTAL_CODE" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('crss._14')">
              <el-input v-model="editForm.CITY" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('crss._15')">
              <el-input v-model="editForm.STATE" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('crss._16')">
              <el-input v-model="editForm.ADDRESS" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('crss._17')">
              <el-switch
                v-model="editForm.ENABLED"
                :active-text="$t('crss._18')"
                :inactive-text="$t('crss._19')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="preserveClick">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsCustomers'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsCustomers')
export default {
  name: 'SfcsCustomers',
  components: {
    customContainerHeader
  },
  data () {
    return {
      ParentCustom: [],
      ParentCustombox: [],
      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        PARENT_ID: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        CUSTOMER: [
          {
            required: true,
            message: this.$t('crss._24')
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      clientForm: {
        NAME: '',
        Page: 1,
        Limit: 10
      },
      clientForm2: {
        NAME: '',
        Page: 1,
        Limit: 10
      },
      CustomerList: [],
      clientTotalPage: 0,
      clientTotalPage2: 0,
      editVisible: false,
      editForm: {},
      editTitle: ''
    }
  },
  created () {
    this.getIndex()
    this.getParentCustom()
  },
  methods: {
    // 获取客户下拉数据
    async getParentCustom (num) {
      var form = {}
      if (num === 2) {
        form = this.clientForm2
      } else {
        form = this.clientForm
      }
      const res = await API.GetParentCustom(form)
      console.log(res.Result, '11111111111111')
      if (res.Result) {
        this.CustomerList = []
        // this.ParentCustombox = []
        // this.ParentCustombox.push({
        //   label: '',
        //   value: '',
        //   disabled: false
        // })
        res.Result.map((item) => {
          this.CustomerList.push({
            label: item.NAME,
            value: item.ID,
            disabled: item.ENABLED === 'N'
          })
          // this.ParentCustombox.push({
          //   label: item.NAME,
          //   value: Number(item.ID),
          //   disabled: false
          // })
        })
        if (!this.CustomerList.length) {
          this.CustomerList.push({
            label: '',
            value: ''
          })
        }
        this.clientTotalPage = res.TotalCount
        this.clientTotalPage2 = res.TotalCount
      }
    },
    // 客户下拉查询
    searchClientList () {
      this.clientForm.Page = 1
      this.getParentCustom()
    },
    clientFormSizeChange (val) {
      this.clientForm.Limit = val
      this.getParentCustom()
    },
    clientFormCurrentChange (val) {
      this.clientForm.Page = val
      this.getParentCustom()
    },
    searchClientList2 () {
      this.clientForm2.Page = 1
      this.getParentCustom(2)
    },
    clientFormSizeChange2 (val) {
      this.clientForm2.Limit = val
      this.getParentCustom(2)
    },
    clientFormCurrentChange2 (val) {
      this.clientForm2.Page = val
      this.getParentCustom(2)
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
        this.ParentCustom = res.Result.ParentCustom
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        console.log(this.mainTable, '获取表格')
        this.total = res.TotalCount
      }
      this.loading = false
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    addClick () {
      this.editTitle = this.$t('crss._3')
      this.editForm = {}
      this.editVisible = true
    },
    editClick (row) {
      this.getParentCustom(2)
      this.editTitle = this.$t('publics.btn.edit')
      this.editForm = row
      this.editVisible = true
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    // 删除
    // async removeClick (row) {
    //   if (
    //     row &&
    //     (await this.$confirm(
    //       this.$t('publics.tips.makeSureDelete'),
    //       this.$t('publics.tips.tips'),
    //       {
    //         confirmButtonText: this.$t('publics.tips.confirm'),
    //         cancelButtonText: this.$t('publics.tips.cancel'),
    //         type: 'warning'
    //       }
    //     ).catch((_) => {
    //       /** 取消 */
    //     }))
    //   ) {
    //     this.$refs.xTable.remove(row)
    //     this.preserveClick()
    //   }
    // },
    //  保存
    preserveClick () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          var that = this
          this.form = {
            insertRecords: [],
            updateRecords: [],
            removeRecords: []
          }
          if (this.editTitle === this.$t('crss._3')) {
            this.form.insertRecords.push(this.editForm)
          } else {
            this.form.updateRecords.push(this.editForm)
          }
          this.$refs.xTable.validate((valid) => {
            if (valid) {
              API.SaveData(this.form).then((response) => {
                if (response.Result) {
                  that.editVisible = false
                  that.getLoadData()
                  that.$notify({
                    title: this.$t('crss._20'),
                    message: this.$t('crss._21'),
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            }
          })
        }
      })
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        PARENT_ID: 0,
        CUSTOMER: '',
        NATIONALITY: '',
        TEL: '',
        MOBILE: '',
        FAX: '',
        CONTACT: '',
        POSTAL_CODE: '',
        CITY: '',
        STATE: '',
        ADDRESS: '',
        ENABLED: 'N'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
