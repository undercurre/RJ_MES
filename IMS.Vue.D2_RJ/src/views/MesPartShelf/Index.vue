<template>
  <d2-container>
    <template slot="header">
      <custom-container-header>
        <el-input v-model="formData.CODE"
                  :placeholder="$t('MesPartShelf._1')"
                  clearable
                  style="width: 200px"
                  @input="searchClick"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.SHELF_ID"
                   filterable
                   clearable
                   @clear="formData.SHELF_ID =undefined"
                   :placeholder="$t('MesPartShelf._2')"
                   style="width: 200px">
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
          <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
            <el-input v-model="listQuery.SHELF_NAME"
                      @input="ConfigSearch"
                      @keyup.enter.native="ConfigSearch"
                      :placeholder="$t('MesPartShelf._3')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="getLoadConfigData">{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option v-for="(item,index) in StatusList"
                     :key="index"
                     :label="item.SHELF_NAME"
                     :value="item.ID">
          </el-option>
          <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
            <el-pagination :pager-count="5"
                           :current-page="listQuery.Page"
                           :page-size="listQuery.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="StatustotalPage"
                           @size-change="listQuerySizeChange"
                           @current-change="listQueryCurrentChange" />
          </div>
        </el-select>

        <!-- <el-input v-model="formData.PUT_SHELVES_USER"
                  :placeholder="$t('MesPartShelf._4')"
                  clearable
                  style="width: 200px"
                  @input="searchClick"
                  @keyup.enter.native="searchClick" />&nbsp; -->
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('plbd.hd_sf') }}</el-button>
        <el-button type="success"
                   @click="addClick"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('MesPartShelfSaveData') !== -1">{{ $t('plbd.add') }}</el-button>
        <el-button type="primary"
                   v-if="$btnList.indexOf('MesPartShelfSaveConfigData') !== -1"
                   @click="dialogRackVisible =true">{{ $t('MesPartShelf._19') }}</el-button>
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
                 show-overflow
                 auto-resize
                 keep-source
                 stripe
                 :loading="loading"
                 :data="mainTable"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column min-width="150"
                          field="CODE"
                          :title="$t('MesPartShelf._5')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="PUT_SHELVES_USER"
                          :title="$t('MesPartShelf._6')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="PUT_SHELVES_TIME"
                          :title="$t('MesPartShelf._7')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="SHELF_NAME"
                          :title="$t('MesPartShelf._8')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="SHELF_CODE"
                          :title="$t('MesPartShelf._9')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="$t('MesPartShelf._10')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_USER"
                          :title="$t('MesPartShelf._11')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="UPDATE_TIME"
                          :title="$t('MesPartShelf._12')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="UPDATE_USER"
                          :title="$t('MesPartShelf._13')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="90"
                          field="STATUS"
                          fixed="right"
                          :title="$t('MesPartShelf._14')">
          <template v-slot="{ row }">
            <span v-if="row.STATUS === 0">{{$t('MesPartShelf._15')}}</span>
            <span v-else-if="row.STATUS === 1">{{$t('MesPartShelf._16')}}</span>
            <span v-else></span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="FALL_SHELVES_USER"
                          :title="$t('MesPartShelf._17')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="FALL_SHELVES_TIME"
                          :title="$t('MesPartShelf._18')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column :title="$t('sdr_le.tb_og')"
                          min-width="160"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       v-if="$btnList.indexOf('MesPartShelfeditSaveData') !== -1"
                       @click="editClick(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       v-if="$btnList.indexOf('MesPartShelfdeleteSaveData') !== -1"
                       @click="removeClick(row, row.$index)">{{ $t('sdr_le.tb_rm') }}</el-button>
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
    <!-- 新增 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('BurnFile._9')"
               width="40%"
               :visible.sync="dialogTableVisible">
      <el-form ref="modifyForm"
               label-width="120px"
               :model="addForm"
               :rules="validRules"
               :show-message="false">
        <el-form-item :label="$t('MesPartShelf._8')"
                      prop="SHELF_ID">
          <el-select v-model="addForm.SHELF_ID"
                     filterable
                     clearable
                     @change="ShelfChange"
                     :disabled="addForm.ID !== 0"
                     :placeholder="$t('MesPartShelf._2')"
                     style="width: 100%">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="listQuery.SHELF_NAME"
                        @input="ConfigSearch"
                        @keyup.enter.native="ConfigSearch"
                        :placeholder="$t('MesPartShelf._3')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getLoadConfigData">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option v-for="(item,index) in StatusList"
                       :key="index"
                       :label="item.SHELF_NAME"
                       :value="item.ID">
            </el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="listQuery.Page"
                             :page-size="listQuery.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="StatustotalPage"
                             @size-change="listQuerySizeChange"
                             @current-change="listQueryCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('MesPartShelf._9')">
          <el-input v-model="addForm.SHELF_CODE"
                    disabled />
        </el-form-item>
        <el-form-item :label="$t('MesPartShelf._5')"
                      prop="CODE">
          <!-- <el-input v-model="addForm.CODE" /> -->
          <el-select v-model="addForm.CODE"
                     style="width:100%"
                     placeholder=" ">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="ProductForm.CODE"
                        @input="Productsearch"
                        @keyup.enter.native="Productsearch"
                        :placeholder="$t('MesPartShelf._1')"></el-input>
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

        <el-form-item :label="$t('MesPartShelf._14')"
                      prop="STATUS">
          <el-select v-model="addForm.STATUS"
                     style="width:100%"
                     placeholder=" ">
            <el-option label="下架"
                       :disabled="addForm.ID === 0"
                       :value="0" />
            <el-option label="上架"
                       :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           style="text-align: center;">
        <el-button @click="dialogTableVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="saveClick">{{$t('ssc_rd.sure')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               top="0"
               :title="$t('MesPartShelf._19')"
               width="100%"
               style="width: 100%;height: 100%;"
               :visible.sync="dialogRackVisible">
      <Rack @Variety="getLoadConfigData"
            style="width: 100%;height: 100%;" />
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  LoadData,
  SaveData,
  LoadConfigData
} from '@/api/MesPartShelf'
import { mapGetters } from 'vuex'
import { PartNoLoadData } from '@/api/SmtStencilPart'
export default {
  name: 'MesPartShelf',
  components: {
    customContainerHeader,
    Rack: () => import('./Rack.vue')
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      loading: false,
      mainTable: [],
      ListParams: [],
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      validRules: {
        SHELF_ID: [
          {
            required: true,
            message: this.$t('MesPartShelf._2')
          }
        ],
        CODE: [
          {
            required: true,
            message: this.$t('MesPartShelf._28')
          }
        ],
        STATUS: [
          {
            required: true,
            message: this.$t('MesPartShelf._20')
          }
        ]
      },
      dialogTableVisible: false,
      addForm: {},
      dialogRackVisible: false,
      listQuery: {
        Key: '',
        Page: 1,
        Limit: 15
      },
      StatustotalPage: 0,
      StatusList: [],
      ProductForm: {
        NAME: '', // 产品名称
        Page: 1,
        Limit: 15,
        CODE: '' // CODE
      },
      ProductList: [],
      ProductPage: 0
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getLoadConfigData()
    this.getLoadData()
    this.getPartNoLoadData()
  },
  methods: {
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
    ShelfChange (e) {
      this.StatusList.map(res => {
        if (e === res.ID) {
          console.log(res)
          this.addForm.SHELF_CODE = res.SHELF_CODE
        }
      })
    },
    ConfigSearch () {
      this.listQuery.Page = 1
      this.getLoadConfigData()
    },
    async getLoadConfigData () {
      const res = await LoadConfigData(this.listQuery)
      this.StatustotalPage = res.TotalCount
      this.StatusList = res.Result || []
      if (!this.StatusList.length) {
        this.StatusList.push({
          ID: '',
          SHELF_NAME: ''
        })
      }
    },
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getLoadConfigData()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getLoadConfigData()
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      console.log(res.Result, 'res.Result')
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
      }
      this.loading = false
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    async addClick () {
      this.addForm = {}
      this.addForm.ID = 0
      this.addForm.CREATE_TIME = this.getNowDate(new Date()) // 创建时间((创建必传))
      this.addForm.CREATE_USER = this.userinfo.USER_NAME// string创建人(创建必传)
      this.addForm.UPDATE_TIME = this.getNowDate(new Date()) // 修改时间(修改必传)
      this.addForm.UPDATE_USER = this.userinfo.USER_NAME// string更新人(修改必传)
      this.dialogTableVisible = true
    },
    // 编辑
    editClick (row) {
      console.log(row)
      var obj = this.StatusList.find(v => { return v.ID === row.SHELF_ID })
      if (!obj) {
        this.StatusList.push({
          ID: row.SHELF_ID,
          SHELF_NAME: row.SHELF_NAME
        })
      }
      this.addForm = { ...row }
      console.log(obj)
      this.dialogTableVisible = true
    },
    // 上传成功
    handleAvatarSuccess (response) {
      console.log(response)
      this.dialogTableVisible = false
      this.getLoadData()
      this.$notify({
        title: this.$t('crss._20'),
        message: this.$t('crss._21'),
        type: 'success',
        duration: 2000
      })
    },
    // 保存
    saveClick () {
      var that = this
      this.form = {
        InsertRecords: [],
        UpdateRecords: []
      }
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          if (this.addForm.ID === 0) {
            this.form.InsertRecords.push(this.addForm)
          } else {
            this.form.UpdateRecords.push(this.addForm)
          }
          SaveData(this.form).then((res) => {
            if (res.Result) {
              this.form = {}
              this.dialogTableVisible = false
              that.getLoadData()
              that.$notify({
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
    // 删除
    removeClick (row) {
      this.form = {
        RemoveRecords: []
      }
      this.form.RemoveRecords.push(row)
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
          const res = await SaveData(this.form)
          if (res.Result) {
            this.form = {}
            this.getLoadData()
            this.$notify({
              title: this.$t('crss._20'),
              message: this.$t('crss._21'),
              type: 'success',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
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
