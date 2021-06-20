<template>
  <d2-container class="SmtStencilPart">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SmtStencilPartImport"
                               exportBtnName="SmtStencilPartExport"
                               exportTplName="SmtStencilPartExportTPL">
        <el-input v-model="formData.STENCIL_NO"
                  :placeholder="$t('SmtStencilPart._6')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <!-- <el-select clearable
                   v-model="formData.PART_NO"
                   filterable
                   :placeholder="$t('SmtStencilPart._7')">
          <el-option v-for="item in PartList"
                     :key="item.value"
                     :label="item.value"
                     :value="item.value" />
        </el-select>&nbsp; -->
        <el-select v-model="formData.PART_NO"
                   filterable
                   clearable
                   style="width:200px"
                   :placeholder="$t('SmtStencilPart._22')">
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
          <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
            <el-input v-model="ProductForm.CODE"
                      @input="Productsearch"
                      @keyup.enter.native="Productsearch"
                      :placeholder="$t('SmtStencilPart._16')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="Productsearch">{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option v-for="item in ProductList"
                     :key="item.CODE"
                     :label="item.CODE"
                     :value="item.CODE">
            <span style="float: left">{{ item.CODE }}</span>
            <span style="float: right;">{{ item.NAME}}</span>
          </el-option>
          <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
            <el-pagination :pager-count="5"
                           :current-page="ProductForm.Page"
                           :page-size="ProductForm.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="ProductPage"
                           @size-change="ProductSizeChange"
                           @current-change="ProductCurrentChange" />
          </div>
        </el-select>
        <el-select clearable
                   v-model="formData.PCB_SIDE"
                   filterable
                   :placeholder="$t('SmtStencilPart._8')">
          <el-option v-for="item in PCBSideList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <!-- <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="resetSearch"
        >{{ $t('publics.btn.clear') }}</el-button>-->
        <el-button type="success"
                   @click="insertEvent"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtStencilPartAdd') !== -1">&nbsp;{{ $t('publics.btn.add') }}</el-button>
        <!-- <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="preservsaeClick()"
          v-if="$btnList.indexOf('SmtStencilPartEdit') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>-->
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 highlight-current-row
                 auto-resize
                 show-overflow
                 keep-source
                 :loading="loading"
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="STENCIL_NO"
                          min-width="160"
                          :title="$t('SmtStencilPart._1')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="PART_NO"
                          min-width="150"
                          :title="$t('SmtStencilPart._2')"
                          :edit-render="{name: '$input', events: {blur: getPNModel},props: {readonly: true}}" />
        <vxe-table-column field="PN_MODEL"
                          width="250px"
                          :title="$t('SmtStencilPart._3')"
                          :edit-render="{name: '$input', props: {readonly: true}}">
          <!-- <template v-slot:edit="{row}">
            <div>
              <vxe-input v-model="row.PN_MODEL"></vxe-input>
            </div>
          </template>-->
        </vxe-table-column>
        <vxe-table-column field="PCB_SIDE"
                          width="150px"
                          :title="$t('SmtStencilPart._4')"
                          :edit-render="{name: '$select', options: PCBSideList, props: {disabled: true}}" />
        <vxe-table-column field="CREATE_BY"
                          min-width="150"
                          :title="$t('SmtStencilPart._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />

        <vxe-table-column field="DESCRIPTION"
                          min-width="150"
                          :title="$t('SmtStencilPart._17')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />

        <vxe-table-column :title="$t('publics.field.operate')"
                          min-width="160"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtStencilPartRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 编辑框 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible"
               :title="$t('SfcsPn._43')"
               width="60%"
               :close-on-click-modal="false">
      <el-form ref="editForm"
               :model="editForm"
               label-width="120px"
               :rules="validRules"
               :show-message="false">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._1')"
                          prop="STENCIL_NO">
              <el-input @change="StencilChange"
                        v-model="editForm.STENCIL_NO" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._2')"
                          prop="PART_NO">
              <el-select v-model="editForm.PART_NO"
                         style="width:100%"
                         @change="PartChang"
                         placeholder=" ">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="ProductForm.CODE"
                            @input="Productsearch"
                            @keyup.enter.native="Productsearch"
                            :placeholder="$t('SmtStencilPart._16')"></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="Productsearch">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option v-for="(item,index) in ProductList"
                           :key="index"
                           :label="item.CODE"
                           :value="item.CODE">
                  <span style="float: left">{{ item.CODE }}</span>
                  <span style="float: right;">{{ item.NAME}}</span>
                </el-option>
                <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="ProductForm.Page"
                                 :page-size="ProductForm.Limit"
                                 :page-sizes="[15, 25, 35, 45]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="ProductPage"
                                 @size-change="ProductSizeChange"
                                 @current-change="ProductCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._4')"
                          prop="PCB_SIDE">
              <el-select clearable
                         v-model="editForm.PCB_SIDE"
                         filterable
                         style="width:100%">
                <el-option v-for="item in PCBSideList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._5')"
                          prop="CREATE_BY">
              <el-input v-model="editForm.CREATE_BY" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('SmtStencilPart._3')">
          <el-input v-model="editForm.PN_MODEL" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._17')"
                          class="tagitem">
              <el-input type="textarea"
                        v-model="editForm.DESCRIPTION" />
              <!-- <el-select v-model="editForm.DESCRIPTION"
                         multiple
                         ref="selsect"
                         allow-create
                         style="width:100%"
                         default-first-option
                         placeholder=" "
                         @focus="tagfocus">
              </el-select>
              <span></span> -->
            </el-form-item>

          </el-col>
          <!-- <el-col :span="12">
            <el-button type="primary"
                       style="margin-left: 15px;"
                       @click="TagClick">{{$t('SmtStencilPart._18')}}</el-button>
          </el-col> -->
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
    <!--
      选择位号
     -->
    <el-dialog width="40%"
               :close-on-click-modal="false"
               :title="$t('SmtStencilPart._18')"
               :visible.sync="TaginnerVisible"
               append-to-body>
      <div>
        <el-input v-model="tagform.LOC"
                  :placeholder="$t('SmtStencilPart._20')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="getGetStencilLOC" />
        <el-button type="primary"
                   @click="getGetStencilLOC">{{$t('publics.btn.search')}}</el-button>
      </div>
      <div class="tagTable">
        <el-table ref="procesrefs"
                  :data="tagTable"
                  style="width: 100%;"
                  height="100%"
                  border
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  @selection-change="tagSelection">
          <el-table-column type="selection"
                           align="center"
                           :label="$t('SmtStencilPart._19')"
                           width="55" />
          <el-table-column prop="VALUE"
                           align="center"
                           :label="$t('SmtStencilPart._17')" />
        </el-table>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="TaginnerVisible = false">{{$t('publics.btn.cancel')}}</el-button>
        <el-button type="primary"
                   @click="Tagmacke">{{$t('publics.btn.makeSure')}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import { mapGetters } from 'vuex'
import CURD from '@/views/mixin/CURD'
import customContainerHeader from '@/components/custom-container-header'
import { GetPNModel, SaveData, PartNoLoadData, GetStencilLOC } from '@/api/SmtStencilPart'
const API = helper('SmtStencilPart')
const ConAPI = helper('SmtStencilConfig') // 直接抄
export default {
  name: 'SmtStencilPart',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: (e) => API.SaveData(e)
    })
  ],
  computed: {
    ...mapGetters(['userId', 'userinfo'])
  },
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        STENCIL_NO: '',
        PART_NO: '',
        PCB_SIDE: '',

        ...this.formData
      },
      validRules: {
        STENCIL_NO: [
          {
            required: true,
            message: this.$t('SmtStencilPart._9')
          }
        ],
        PART_NO: [
          {
            required: true,
            message: this.$t('SmtStencilPart._22')
          }
        ],
        PCB_SIDE: [
          {
            required: true,
            message: this.$t('SmtStencilPart._11')
          }
        ],
        CREATE_BY: [
          {
            required: true,
            message: this.$t('SmtStencilPart._12')
          }
        ]
      },
      PCBSideList: [],
      PartList: [],
      dialogVisible: false,
      editForm: {},
      isNew: undefined,
      form: {},
      ProductForm: {
        NAME: '', // 产品名称
        Page: 1,
        Limit: 15,
        CODE: '' // CODE
      },
      ProductList: [],
      ProductPage: 0,
      // 选择位号
      TaginnerVisible: false,
      tagform: {
        LOC: ''
      },
      tagTable: [],
      lqcjo: []
    }
  },
  methods: {
    async StencilChange (e) {
      if (e) {
        this.formData.Key = e
        this.formData.USER_ID = this.userId
        const res = await ConAPI.LoadData(this.formData)
        if (res.Result) {
          const data = res.Result || []
          if (data.length === 0) {
            this.$message({
              showClose: true,
              message: this.$t('SmtStencilPart._23'),
              type: 'warning'
            })
            this.editForm.STENCIL_NO = ''
          }
        }
      }
    },
    PartChang (e) {
      var obj = {}
      obj = this.ProductList.find(v => { return v.CODE === e })
      this.editForm.PN_MODEL = obj.DESCRIPTION || ''
    },
    tagfocus () {
      this.$refs.selsect.blur()
    },
    TagClick () {
      this.TaginnerVisible = true
      this.getGetStencilLOC()
    },

    async getGetStencilLOC () {
      console.log(this.tagform, 'this.tagform')
      const res = await GetStencilLOC(this.tagform)
      if (res.Result) {
        this.tagTable = res.Result ? res.Result : []
        console.log(res.Result, '位号')
      }
    },
    tagSelection (row) {
      // console.log(row)
      var data = row
      var str = []
      data.map(v => { str.push(v.VALUE) })
      this.lqcjo = str
    },
    Tagmacke () {
      if (this.lqcjo === '') {
        this.$message({
          showClose: true,
          message: this.$t('SmtStencilPart._21'),
          type: 'warning'
        })
      } else {
        if (this.editForm.DESCRIPTION) {
          var arr1 = this.editForm.DESCRIPTION
          var arr2 = this.lqcjo
          var arr3 = [...arr1, ...arr2]
          console.log(arr3, 'arr3arr3')
          var arr4 = new Set(arr3)
          this.editForm.DESCRIPTION = Array.from(arr4)
        } else {
          this.editForm.DESCRIPTION = this.lqcjo
        }

        this.TaginnerVisible = false
      }
    },
    async getPartNoLoadData () {
      const res = await PartNoLoadData(this.ProductForm)
      if (res.Result) {
        this.ProductList = res.Result || []
        this.ProductPage = res.TotalCount || 0
        if (!this.ProductList.length) {
          this.ProductList.push({
            CODE: '',
            NAME: '',
            DESCRIPTION: ''
          })
        }
      }
    },
    Productsearch () {
      this.ProductForm.Page = 1
      this.getPartNoLoadData()
    },
    ProductSizeChange (Limit) {
      this.ProductForm.Limit = Limit
      this.getPartNoLoadData()
    },
    ProductCurrentChange (Page) {
      this.ProductForm.Page = Page
      this.getPartNoLoadData()
    },
    async getIndex () {
      const res = await API.Index()
      if (!res.Result) return false
      const { PCBSideList, PartList } = res.Result
      this.getLoadData()
      this.PCBSideList.push({
        label: '',
        value: '',
        disabled: false
      })
      PCBSideList.map((item) => {
        this.PCBSideList.push({
          label: item.NAME,
          value: item.CODE,
          disabled: false
        })
      })
      this.PartList.push({
        label: '',
        value: '',
        disabled: false
      })
      PartList.map((item) => {
        this.PartList.push({
          label: item.NAME,
          value: item.CODE,
          disabled: false
        })
      })
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 新增
    async insertEvent () {
      this.editForm = {
        ID: 0,
        STENCIL_NO: null,
        PART_NO: null,
        PCB_SIDE: null,
        CREATE_TIME: null,
        CREATE_BY: this.userinfo.USER_NAME,
        PN_MODEL: null
      }
      this.isNew = true
      this.dialogVisible = true
    },
    // 编辑
    editClick (row) {
      console.log(row)
      this.editForm = { ...row }
      this.isNew = false
      // if (this.editForm.DESCRIPTION) {
      //   this.editForm.DESCRIPTION = this.editForm.DESCRIPTION.split(',')
      // }

      this.dialogVisible = true
    },
    // 保存
    submitModifyForm () {
      this.$refs.editForm.validate(async (valid, errInfo) => {
        if (valid) {
          // if (this.editForm.DESCRIPTION) {
          //   this.editForm.DESCRIPTION = this.editForm.DESCRIPTION.join(',')
          // } else {
          //   this.editForm.DESCRIPTION = ''
          // }
          this.form = { insertRecords: [], updateRecords: [], removeRecords: [] }
          if (this.isNew) {
            this.form.insertRecords.push(this.editForm)
          } else {
            this.form.updateRecords.push(this.editForm)
          }

          SaveData(this.form).then((res) => {
            if (res.Result) {
              this.form = {}
              this.dialogVisible = false
              this.getLoadData()
              this.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
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
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // resetSearch () {
    //   this.formData = {
    //     STENCIL_NO: '',
    //     PART_NO: '',
    //     PCB_SIDE: '',
    //     Key: '',
    //     Page: 1,
    //     Limit: 10
    //   }
    //   this.getLoadData()
    // },
    async getPNModel (e) {
      const PART_NO = e.row.PART_NO
      const PN_MODEL = e.row.PN_MODEL
      if (!PART_NO) return false
      // this.$refs.xTable.updateData(e.row)
      if (PN_MODEL) {
        return false
      }
      if (!PN_MODEL) {
        const res = await GetPNModel(PART_NO)
        if (res.Result) {
          e.row.PN_MODEL = res.Result
        }
      }
    },
    // 删除
    removeClick (row) {
      let postdata = this.$refs.xTable.getRecordset()
      if (row) {
        this.$confirm(this.$t('sld.fidelete'), this.$t('sld.prompt'), {
          confirmButtonText: this.$t('sld.confirm'),
          cancelButtonText: this.$t('sld.cancel'),
          type: 'warning'
        }).then(() => {
          this.$refs.xTable.remove(row)
          this.form.updateRecords = []
          this.form.insertRecords = []
          this.form.removeRecords = postdata.removeRecords
          console.log(this.form, 'this.formthis.form')
          SaveData(this.form).then((response) => {
            if (response.Result) {
              this.form = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('sld.success'),
                message: this.$t('sld.subsu'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    }
  },
  created () {
    this.getIndex()
    this.getPartNoLoadData()
  }
}
</script>
<style lang="scss">
.tagTable {
  margin-top: 15px;
  height: calc(100vh - 60px - 21px - 210px - 73px - 41px - 31px - 107px);
}
.SmtStencilPart {
  .tagitem {
    .el-popper,
    .el-input__suffix {
      display: none !important;
    }
  }
}
// .el-popper {
//   display: none !important;
// }
</style>
