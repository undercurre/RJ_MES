<!--
 * @Author: your name
 * @Date: 2020-04-17 10:43:42
 * @LastEditTime: 2020-04-18 09:47:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\SfcsPrintFilesMapping\Index.vue
 -->
<template>
  <d2-container class="SfcsPrintFilesMapping">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select style="width:200px"
                   v-model="formData.CUSTOMER_ID"
                   filterable
                   clearable
                   :placeholder="$t('spf._1')">
          <el-option v-for="item in CustomerList"
                     :key="item.ID"
                     :value="item.ID"
                     :label="item.CUSTOMER" />
        </el-select>&nbsp;
        <el-select style="width:200px"
                   v-model="formData.MODEL_ID"
                   clearable
                   :placeholder="$t('spf._2')">
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
          <div style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
            <el-input v-model="ModelData.MODELName"
                      :placeholder="$t('spf._32')"
                      clearable
                      style="width:100%"
                      @input="ModelSearch"
                      @keyup.enter.native="ModelSearch" />
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent=" ModelSearch">{{ $t('spf._4') }}</el-button>
          </div>
          <el-option v-for="item in ModelList"
                     :key="item.ID"
                     :value="item.ID"
                     :label="item.MODEL"></el-option>
          <div style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
            <el-pagination class="ModelDataClass"
                           small
                           :current-page="ModelData.Page"
                           :page-size="ModelData.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="Modeltotal"
                           @size-change="ModelSizeChange"
                           @current-change="ModelCurrentChange" />
          </div>
        </el-select>
        <el-input v-model="formData.PART_NO"
                  :placeholder="$t('spf._3')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('spf._4') }}</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="eliminateClick">{{ $t('spf._5') }}</el-button>
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="preserveClick">{{ $t('spf._6') }}</el-button>
      </custom-container-header>
    </template>
    <el-form ref="form"
             :show-message="false"
             :model="form"
             label-width="160px"
             :rules="rules">
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('spf._7')"
                        prop="PRINT_FILE_ID">
            <el-select style="width:100%"
                       :disabled="fileShow"
                       filterable
                       v-model="form.PRINT_FILE_ID"
                       :placeholder="$t('spf._18')"
                       @change="fileClick">
              <el-option v-for="item in PrintFileList"
                         :key="item.ID"
                         :label="item.FILE_NAME"
                         :value="item.ID" />
              <!-- <el-option disabled
                         style="position: sticky;bottom: 0;left: 0;right: 0;z-index: 999;background: #fff;text-align: center;"
                         value="9999"
                         :label="$t('spf._39')+PrintFileList.length"></el-option> -->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('spf._8')">
            <el-radio-group v-model="form.selected"
                            class="group"
                            @change="groupClick">
              <el-radio label="1">{{$t('spf._9')}}</el-radio>
              <!-- <el-radio label="2"
                        disabled>{{$t('spf._10')}}</el-radio>
              <el-radio label="3"
                        disabled>{{$t('spf._11')}}</el-radio> -->
              <el-radio label="4">{{$t('spf._12')}}</el-radio>
              <el-radio label="5">{{$t('spf._13')}}</el-radio>
              <el-radio label="6">{{$t('spf._40')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('spf._9')"
                        prop="CUSTOMER_ID">
            <el-select style="width:100%"
                       v-model="form.CUSTOMER_ID"
                       :disabled="CustDisab">
              <el-option v-for="item in CustomerList"
                         :key="item.ID"
                         :label="item.CUSTOMER"
                         :value="item.ID" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item :label="$t('spf._11')">
            <el-select style="width:100%"
                       v-model="form.disabled"
                       disabled>
              <el-option value
                         label></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="$t('spf._12')"
                        prop="MODEL_ID">
            <el-select style="width:100%"
                       v-model="form.MODEL"
                       :disabled="ModelDisab"
                       @change="modelClick">
              <!-- 占位元素 -->
              <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
              <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
              <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                <el-input v-model="ModelData.MODELName"
                          :placeholder="$t('spf._32')"
                          clearable
                          style="width:100%"
                          @input="ModelSearch"
                          @keyup.enter.native="ModelSearch" />
                <el-button type="primary"
                           icon="el-icon-search"
                           @click.prevent=" ModelSearch">{{ $t('spf._4') }}</el-button>
              </div>
              <el-option v-for="item in ModelList"
                         :key="item.ID"
                         :value="item.ID"
                         :label="item.MODEL" />
              <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                <el-pagination class="ModelDataClass"
                               small
                               :current-page="ModelData.Page"
                               :page-size="ModelData.Limit"
                               :page-sizes="[15, 25, 35, 45]"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="Modeltotal"
                               @size-change="ModelSizeChange"
                               @current-change="ModelCurrentChange" />
              </div>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('spf._15')"
                        prop="SITE_OPERATION_ID">
            <el-select :disabled="process"
                       style="width:100%"
                       v-model="form.SITE_OPERATION_ID"
                       clearable>
              <el-option v-for="item in OperationsList"
                         :key="item.ID"
                         :value="item.ID"
                         :label="item.DESCRIPTION" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item :label="$t('spf._10')">
            <el-select style="width:100%"
                       v-model="form.disabled"
                       disabled>
              <el-option value
                         label></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="$t('spf._13')"
                        prop="PART_NO">
            <el-input v-model="form.PART_NO"
                      :disabled="PartDisab"
                      :placeholder="$t('spf._3')" />
          </el-form-item>
          <el-form-item :label="$t('spf._40')">
            <el-select style="width:100%"
                       v-model="form.PRODUCT_FAMILY_ID"
                       :disabled="ProdDisab">
              <!-- 占位元素 -->
              <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
              <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
              <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                <el-input v-model="ProductForm.FAMILY_NAME"
                          :placeholder="$t('spf._32')"
                          clearable
                          style="width:100%"
                          @input="ProdSearch"
                          @keyup.enter.native="ProdSearch" />
                <el-button type="primary"
                           icon="el-icon-search"
                           @click.prevent="ProdSearch">{{ $t('spf._4') }}</el-button>
              </div>
              <el-option v-for="(item,index) in ProdList"
                         :key="index"
                         :value="item.ID"
                         :label="item.FAMILY_NAME" />
              <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                <el-pagination class="ModelDataClass"
                               small
                               :current-page="ProductForm.Page"
                               :page-size="ProductForm.Limit"
                               :page-sizes="[15, 25, 35, 45]"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="Prodtotal"
                               @size-change="ProdSizeChange"
                               @current-change="ProdCurrentChange" />
              </div>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('spf._14')"
                        prop="AUTO_PRINT_FLAG">
            <el-select style="width:100%"
                       v-model="form.AUTO_PRINT_FLAG"
                       :disabled="iniDisab">
              <el-option value="Y"
                         :label="$t('spf._25')"></el-option>
              <el-option value="N"
                         :label="$t('spf._26')"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('spf._16')"
                        prop="ENABLED">
            <el-select style="width:100%"
                       v-model="form.ENABLED"
                       :disabled="iniDisab">
              <el-option value="Y"
                         :label="$t('spf._25')"></el-option>
              <el-option value="N"
                         :label="$t('spf._26')"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('spf._29')"
                        style="height: 100px;">
            <!-- <img
              :src="getPhoto_url+form.img"
              :alt="$t('spf._30')"
              v-if="form.img"
              style="height: 100px;"
            />-->
            <el-image :alt="$t('spf._30')"
                      style="width: 100px;height: 100px"
                      :src="form.img"
                      :preview-src-list="srcList"
                      v-if="form.img"></el-image>
            <span v-else>{{$t('spf._31')}}</span>
          </el-form-item>
        </el-col>

        <!-- -->
      </el-row>
    </el-form>
    <div class="SfcsPrintFilesMapping-table">
      <vxe-table v-loading="loading"
                 ref="xTable"
                 border
                 stripe
                 keep-source
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 width="100%"
                 height="100%"
                 :edit-config="{ mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :data="annalTable"
                 @cell-click="obtain_but"
                 @radio-change="radioChangeEvent">
        <vxe-table-column show-overflow
                          :title="$t('spf._38')"
                          type="radio"
                          min-width="80"
                          align="center" />

        <vxe-table-column show-overflow
                          field="PRINT_FILE_ID"
                          :edit-render="{name: 'select', options: PrintFileListBox}"
                          :title="$t('spf._7')"
                          align="center"
                          min-width="130" />

        <vxe-table-column show-overflow
                          field="CUSTOMER_ID"
                          :title="$t('spf._9')"
                          :edit-render="{name: 'select', options: CustomerListBox}"
                          align="center"
                          min-width="130" />
        <vxe-table-column show-overflow
                          field="MODEL"
                          :title="$t('spf._12')"
                          :edit-render="{name: 'input'}"
                          align="center"
                          min-width="130" />
        <vxe-table-column show-overflow
                          field="PART_NO"
                          :title="$t('spf._13')"
                          :edit-render="{name: 'input'}"
                          align="center"
                          min-width="130" />
        <vxe-table-column show-overflow
                          field="FAMILY_NAME"
                          :title="$t('spf._40')"
                          :edit-render="{name: 'input'}"
                          align="center"
                          min-width="130" />

        <vxe-table-column show-overflow
                          field="SITE_OPERATION_ID"
                          :title="$t('spf._15')"
                          :edit-render="{name: 'select', options: OperationsListBox}"
                          align="center"
                          min-width="150" />
        <vxe-table-column field="AUTO_PRINT_FLAG"
                          :title="$t('spf._14')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
                          min-width="120"
                          align="center">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch disabled
                         v-model="row.AUTO_PRINT_FLAG"
                         :active-text="$t('spf._25')"
                         :inactive-text="$t('spf._26')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ENABLED"
                          :title="$t('spf._16')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
                          min-width="100"
                          align="center">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch disabled
                         v-model="row.ENABLED"
                         :active-text="$t('spf._25')"
                         :inactive-text="$t('spf._26')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column show-overflow
                          field="MEANING"
                          :title="$t('spf._27')"
                          :edit-render="{name: 'input'}"
                          align="center"
                          min-width="150" />
        <vxe-table-column min-width="160"
                          show-overflow
                          field="LABEL_DESCRIPTION"
                          :title="$t('spf._28')"
                          :edit-render="{name: 'input'}"
                          align="center" />
      </vxe-table>
    </div>
    <el-pagination class="SfcsPrintFilesMapping-pagination"
                   :current-page="formData.Page"
                   :page-size="formData.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
  </d2-container>
</template>
<script>
import {
  GetProduct
} from '@/api/SfcsPn'
import helper from '@/api/SfcsPrintFilesMapping'
import { GetPathByType } from '@/api/SfcsPrintFiles'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsPrintFilesMapping')
export default {
  name: 'SfcsPrintFilesMapping',
  components: {
    customContainerHeader
  },
  data () {
    return {
      getPhoto_url: process.env.VUE_APP_BASE_IMG,
      rules: {
        PRINT_FILE_ID: [
          {
            required: true,
            message: this.$t('spf._18'),
            trigger: 'change'
          }
        ]
      },
      CustomerList: [],
      EnableList: [],
      ModelList: [],
      OperationsList: [],
      PrintFileList: [],
      PrintFileListBox: [],
      CustomerListBox: [],
      ModelListBox: [],
      OperationsListBox: [],
      activeName: 'annal',
      radio: '',
      loading: false,
      annalTable: [],
      total: 0,
      ModelData: {
        MODELName: '',
        Page: 1,
        Limit: 15
      },
      Modeltotal: 0,
      formData: {
        CUSTOMER_ID: '',
        MODEL_ID: '',
        PART_NO: '',
        Page: 1,
        Limit: 15
      },
      Double: {
        type: 'Photo',
        id: 0
      },
      form: {
        ID: 0,
        selected: '0',
        MODEL: '',
        MODEL_ID: '', // 机种
        PART_NO: '', // 料号
        CUSTOMER_ID: '', // 客户
        PRINT_FILE_ID: '', // 文件名
        SITE_OPERATION_ID: '', // 打印工序
        AUTO_PRINT_FLAG: 'Y', // 自动打印
        ENABLED: 'Y', // 是否激活
        LABEL_DESCRIPTION: '', // 描述备注
        PRODUCT_FAMILY_ID: '',
        img: ''
      },
      fileShow: false,
      CustDisab: true,
      ModelDisab: true,
      PartDisab: true,
      ProdDisab: true,
      iniDisab: true,
      route: {
        wo_no: ''
      },
      selectRow: null,
      srcList: [],
      process: true,
      // 产品系列
      ProductForm: {
        FAMILY_NAME: '',
        Page: 1,
        Limit: 15
      },
      ProdList: [],
      Prodtotal: 0
    }
  },
  created () {
    this.getIndex()
    this.getLoadModelData()
    this.GetProduct()
  },
  methods: {
    async getLoadModelData () {
      const res = await API.LoadModelData(this.ModelData)
      console.log(res)
      this.ModelList = res.Result
      this.Modeltotal = res.TotalCount
      if (!this.ModelList.length) {
        this.ModelList.push({
          MODEL: '',
          ID: ''
        })
      }
    },
    ModelSearch () {
      this.ModelData.Page = 1
      this.getLoadModelData()
    },
    // 分页
    async ModelSizeChange (val) {
      this.ModelData.Limit = val
      this.getLoadModelData()
    },
    async ModelCurrentChange (val) {
      this.ModelData.Page = val
      this.getLoadModelData()
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        var data = res.Result
        this.CustomerList = data.CustomerList
        this.EnableList = data.EnableList

        this.OperationsList = data.OperationsList
        this.PrintFileList = data.PrintFileList
        console.log(res)
        this.PrintFileListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.PrintFileList.map(item => {
          this.PrintFileListBox.push({
            label: item.FILE_NAME,
            value: Number(item.ID) ? Number(item.ID) : '',
            disabled: false
          })
        })
        this.CustomerListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.CustomerList.map(item => {
          this.CustomerListBox.push({
            label: item.CUSTOMER,
            value: Number(item.ID) ? Number(item.ID) : '',
            disabled: false
          })
        })

        this.OperationsListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.OperationsList.map(item => {
          this.OperationsListBox.push({
            label: item.DESCRIPTION,
            value: Number(item.ID) ? Number(item.ID) : '',
            disabled: false
          })
        })

        this.getLoadData()
      }
    },
    // 文件名
    fileClick (e) {
      this.iniDisab = false
      console.log(e, '115454545455555555')
      this.PrintFileList.forEach(v => {
        // console.log(v.LABEL_TYPE, 'v.LABEL_TYPE')
        if (v.ID === e) {
          if (v.LABEL_TYPE === 1 || v.LABEL_TYPE === 4) {
            this.process = true
          } else {
            this.process = false
          }
          console.log(v)
        }
      })

      this.CustDisab = false
      this.form.selected = '1'
      this.getDoubleClickData(e)
    },
    optionClick (e) {
      console.log(e)
    },
    // 选项
    groupClick (e) {
      if (e === '4' || e === '5' || e === '6') {
        this.form.MODEL_ID = '' // 机种
        this.form.PART_NO = '' // 料号
        this.form.PRODUCT_FAMILY_ID = '' // 产品系列
        this.CustDisab = true
      } else {
        this.CustDisab = false
      }
      if (e === '1' || e === '5') {
        this.form.CUSTOMER_ID = '' // 客户
        this.form.PART_NO = '' // 料号
        this.form.PRODUCT_FAMILY_ID = '' // 产品系列
        this.ModelDisab = true
      } else {
        this.ModelDisab = false
      }
      if (e === '1' || e === '4') {
        this.form.CUSTOMER_ID = '' // 客户
        this.form.MODEL_ID = '' // 机种
        this.form.PRODUCT_FAMILY_ID = '' // 产品系列
        this.PartDisab = true
      } else {
        this.PartDisab = false
      }
      if (e === '1' || e === '6') {
        this.form.CUSTOMER_ID = '' // 客户
        this.form.MODEL_ID = '' // 机种
        this.form.PART_NO = '' // 料号
        this.ProdDisab = false
        this.PartDisab = true
        this.ModelDisab = true
      } else {
        this.ProdDisab = true
      }
      this.iniDisab = false
    },
    // 机种
    modelClick (e) {
      this.form.MODEL_ID = e
    },
    // 单号查询
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.annalTable = res.Result
        console.log(this.annalTable, '获取表格')
        this.total = res.TotalCount
      }
    },
    // 搜索
    async searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 分页
    async handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    async handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    // 点击获取表格一行数据
    async obtain_but (e) {
      this.getDoubleClickData(e.row.PRINT_FILE_ID)
      var data = e.row
      console.log(data, 'data')
      if (data.CUSTOMER_ID) {
        this.form.selected = '1'
      } else if (data.MODEL_ID) {
        this.form.selected = '4'
      } else if (data.PART_NO) {
        this.form.selected = '5'
      } else if (data.PRODUCT_FAMILY_ID) {
        this.form.selected = '6'
      }
      this.form.ID = data.ID
      this.form.MODEL = data.MODEL
      this.form.MODEL_ID = data.MODEL_ID
      this.form.PART_NO = data.PART_NO
      this.form.CUSTOMER_ID = data.CUSTOMER_ID ? data.CUSTOMER_ID : ''
      this.form.PRINT_FILE_ID = data.PRINT_FILE_ID ? data.PRINT_FILE_ID : ''
      this.form.SITE_OPERATION_ID = data.SITE_OPERATION_ID
        ? data.SITE_OPERATION_ID
        : ''
      this.form.AUTO_PRINT_FLAG = data.AUTO_PRINT_FLAG
      this.form.ENABLED = data.ENABLED
      this.form.LABEL_DESCRIPTION = data.LABEL_DESCRIPTION
      this.form.PRODUCT_FAMILY_ID = data.PRODUCT_FAMILY_ID

      if (data.LABEL_TYPE === 1 || data.LABEL_TYPE === 4) {
        this.process = true
      } else {
        this.process = false
      }
      if (this.form.selected === '4' || this.form.selected === '5') {
        this.CustDisab = true
      } else {
        this.CustDisab = false
      }
      if (this.form.selected === '1' || this.form.selected === '5') {
        this.ModelDisab = true
      } else {
        this.ModelDisab = false
      }
      if (this.form.selected === '1' || this.form.selected === '4') {
        this.PartDisab = true
      } else {
        this.PartDisab = false
      }
      if (this.form.selected === '6') {
        this.ProdDisab = false
        this.PartDisab = true
        this.CustDisab = true
        this.ModelDisab = true
      } else {
        this.ProdDisab = true
      }
      this.iniDisab = false
      this.fileShow = true
    },
    async getDoubleClickData (e) {
      this.Double.id = e
      const res = await GetPathByType(this.Double)
      if (res.Result) {
        this.srcList = []
        // this.getPhoto_url +
        // this.srcList.push(this.getPhoto_url + res.Result)
        this.srcList.push(res.Result.Base64)
        this.form.img = res.Result.Base64
      } else {
        this.srcList = []
        this.form.img = ''
      }
    },
    radioChangeEvent ({ row }) {
      this.selectRow = row
    },

    // 清空
    async eliminateClick () {
      this.form = {
        ID: 0,
        selected: '0',
        MODEL: '',
        MODEL_ID: '', // 机种
        PART_NO: '', // 料号
        CUSTOMER_ID: '', // 客户
        PRINT_FILE_ID: '', // 文件名
        SITE_OPERATION_ID: '', // 打印工序
        AUTO_PRINT_FLAG: 'Y', // 自动打印
        ENABLED: 'Y', // 是否激活
        LABEL_DESCRIPTION: '', // 描述备注
        PRODUCT_FAMILY_ID: '',
        img: ''
      }
      this.fileShow = false
      this.CustDisab = true
      this.CustDisab = true
      this.ModelDisab = true
      this.PartDisab = true
      this.ProdDisab = true
      this.iniDisab = true
      this.selectRow = null
      this.$refs.form.resetFields()
      this.$refs.xTable.clearRadioRow()
    },

    //  保存
    async preserveClick () {
      this.$refs.form.validate((valid, errInfo) => {
        if (valid) {
          if (this.form.selected === '1') {
            if (
              this.form.CUSTOMER_ID === '' ||
              this.form.CUSTOMER_ID === null
            ) {
              this.$message.error(this.$t('spf._1'))
              return
            }
          }
          if (this.form.selected === '4') {
            if (this.form.MODEL === '' || this.form.MODEL === null) {
              this.$message.error(this.$t('spf._2'))
              return
            }
          }
          if (this.form.selected === '5') {
            if (this.form.PART_NO === '' || this.form.PART_NO === null) {
              this.$message.error(this.$t('spf._3'))
              return
            }
          }
          if (this.form.selected === '6') {
            if (!this.form.PRODUCT_FAMILY_ID) {
              this.$message.error(this.$t('spf._41'))
              return
            }
          }
          this.saveData()
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    async saveData () {
      var date = {}
      if (this.form.ID === 0) {
        date = {
          InsertRecords: []
        }
        console.log(date)
        date.InsertRecords.push(this.form)
      } else {
        date = {
          UpdateRecords: []
        }
        console.log(date)
        date.UpdateRecords.push(this.form)
      }

      await API.SaveData(date).then(response => {
        if (response.Result) {
          this.$notify({
            title: this.$t('spf._36'),
            message: this.$t('spf._37'),
            type: 'success',
            duration: 2000
          })
          this.eliminateClick()
          this.getLoadData()
        }
      })
    },
    // 产品系列
    async GetProduct () {
      const res = await GetProduct(this.ProductForm)
      if (res.Result) {
        const data = res.Result || []
        this.Prodtotal = res.TotalCount
        data.map(v => {
          if (v.ENABLED === 'Y') {
            console.log(v, 'v=======')
            this.ProdList.push(v)
          }
        })

        if (!this.ProdList.length) {
          this.ProdList.push({
            MODEL: '',
            ID: ''
          })
        }
      }
    },
    // 搜索
    async ProdSearch () {
      this.ProductForm.Page = 1
      this.GetProduct()
    },
    // 分页
    async ProdSizeChange (val) {
      this.ProductForm.Limit = val
      this.GetProduct()
    },
    async ProdCurrentChange (val) {
      this.ProductForm.Page = val
      this.GetProduct()
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsPrintFilesMapping {
  .form-title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }

  .SfcsPrintFilesMapping-table {
    height: calc(100vh - 575px);
  }
}
</style>
<style>
.SfcsPrintFilesMapping .el-tabs__header {
  margin: 0;
}

.SfcsPrintFilesMapping .radio .el-radio__label {
  display: none;
}

.SfcsPrintFilesMapping .SfcsPrintFilesMapping-pagination {
  /* border: 1px solid #e6ebf5; */
  margin-top: 5px;
}

.ModelHeader {
  display: flex;
  position: sticky;
  top: 0;
  background: #fff;
  left: 0;
  right: 0;
  z-index: 9;
}
.ModelDataClass {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
</style>
