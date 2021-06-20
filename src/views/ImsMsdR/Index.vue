<template>
  <d2-container class="ImsMsdR">
    <template slot="header">
      <custom-container-header>
        <el-input v-model="formData.PART_CODE"
                  :placeholder="$t('ImsMsdR._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.LEVEL_CODE"
                   clearable
                   :placeholder="$t('ImsMsdR._2')">
          <el-option v-for="item in LevelCode"
                     :key="item.CN_DESC"
                     :label="item.CN_DESC"
                     :value="item.VALUE" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('ImsMsdRAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('ImsMsdRSave') !== -1">{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
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
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">

        <vxe-table-column min-width="100"
                          field="PART_CODE"
                          :title="$t('ImsMsdR._3')"
                          :edit-render="{name: 'input'}" />

        <vxe-table-column min-width="120"
                          field="DESCRIPTION"
                          :title="$t('ImsMsdR._4')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="100"
                          field="LEVEL_CODE"
                          :title="$t('ImsMsdR._5')"
                          :edit-render="{name: 'select', options: LevelCodebox}" />
        <vxe-table-column min-width="100"
                          field="PART_THICKNESS"
                          :title="$t('ImsMsdR._6')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="100"
                          field="ENABLED"
                          :title="$t('ImsMsdR._7')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('ImsMsdR._10')"
                         :inactive-text="$t('ImsMsdR._11')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('publics.field.operate')"
                          width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </d2-container>
</template>
<script>
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
const API = helper('ImsMsdR12')
export default {
  name: 'ImsMsdR',
  components: {
    customContainerHeader
  },
  mixins: [
    CURD({
      defaultSaveAPI: e => API.SaveData(e)
    })
  ],
  data () {
    return {
      LevelCodebox: [],
      LevelCode: [],
      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        PART_CODE: '',
        LEVEL_CODE: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        PART_CODE: [
          {
            required: true,
            message: this.$t('ImsMsdR._1')
          }
        ],
        LEVEL_CODE: [
          {
            required: true,
            message: this.$t('ImsMsdR._2')
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      }
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.LevelCode = res.Result.LevelCode
        console.log(res, 'resresres')
        this.getLoadData()
        this.LevelCodebox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.LevelCode.map(item => {
          this.LevelCodebox.push({
            label: item.CN_DESC,
            value: item.VALUE,
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        // console.log(this.mainTable, '获取表格')
        this.total = res.TotalCount
      }
      this.loading = false
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
    //  保存
    preserveClick () {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.xTable.validate(valid => {
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            this.form.removeRecords = postdata.removeRecords
            API.SaveData(this.form).then(response => {
              if (response.Result) {
                this.form = {}
                that.getLoadData()
                that.$notify({
                  title: this.$t('publics.tips.success'),
                  message: this.$t('publics.tips.submitSuccess'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('publics.tips.noUpdateData'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        PART_CODE: '',
        DESCRIPTION: '',
        LEVEL_CODE: '',
        PART_THICKNESS: '',
        ENABLED: 'N'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
    // removeClick (row) {
    //   var postdata = this.$refs.xTable.getRecordset()
    //   this.$confirm(this.$t('publics.tips.makeSureDelete'), this.$t('publics.tips.tips'), {
    //     type: 'warning'
    //   }).then(async () => {
    //     this.$refs.xTable.remove(row)
    //     this.form.removeRecords = postdata.removeRecords
    //     const response = await API.SaveData(this.form)
    //     if (response.Result) {
    //       this.getLoadData()
    //       this.$notify({
    //         title: this.$t('as_src.su'),
    //         message: this.$t('as_src.su_rm'),
    //         type: 'success',
    //         duration: 2000
    //       })
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
</style>
