<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <el-input
          clearable
          style="width: 200px"
          class="filter-item"
          v-model="formData.Key"
          placeholder="请输入查询关键字"
        />&nbsp;
        <el-button type="primary"
        icon="el-icon-search"
        @click="searchClick">{{
          $t("publics.btn.search")
        }}</el-button>

        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="success"
          icon="el-icon-plus"
          @click="mesControllAdd"
          >{{ $t("Manager.add") }}</el-button
        >

        <el-button
          type="primary"
          @click="mesControllSave"
          icon="el-icon-check"
          >{{ $t("as_src.save") }}</el-button
        >
      </custom-container-header>
    </template>

    <el-tabs tab-position="right" v-model="activeName" @tab-click="handelTabClick" style="height: calc(100vh - 228px)">
      <el-tab-pane label="产能信息" name="capatcity">
        <capatcity
          ref="capatcity"
          :LineList="LineList"
          :OperationList="OperationList"
          @parentVal="parentVal"
        />
      </el-tab-pane>
      <el-tab-pane label="品质信息" name="quality">
        <quality
          ref="quality"
          :LineList="LineList"
          :OperationList="OperationList"
          @parentVal="parentVal" />
      </el-tab-pane>
      <el-tab-pane label="效率信息" name="efficiency">
        <efficiency
         ref="efficiency"
          :LineList="LineList"
          @parentVal="parentVal"/>
      </el-tab-pane>
      <el-tab-pane label="设备信息" name="equipment">
        <equipment
        ref="equipment"
        :LineList="LineList"
          :OperationList="OperationList"
          @parentVal="parentVal" />
      </el-tab-pane>
      <el-tab-pane label="人员信息" name="personnel">
        <personnel
          ref="personnel"
          :LineList="LineList"
          :OperationList="OperationList"
          @parentVal="parentVal" />
      </el-tab-pane>
    </el-tabs>

    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import capatcity from './Capacity/Index' // 产能信息
import quality from './Quality/Index' // 品质信息
import efficiency from './Efficiency/Index' // 效率信息
import equipment from './Equipment/Index' // 设备信息
import personnel from './Personnel/Index' // 人员信息
import { AddOrModify } from '@/api/SfcsOperationSites'
export default {
  name: 'MesKanbanController',
  components: {
    customContainerHeader,
    capatcity,
    quality,
    efficiency,
    equipment,
    personnel
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      LineList: [], // 线体
      OperationList: [], // 工序
      curentRefs: 'capatcity',
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      formData: {
        Page: 1,
        Limit: 15,
        Key: ''
      },
      totalPage: 0,
      activeName: 'capatcity'
    }
  },
  created () {
    this.getAddOrModify()
  },
  methods: {
    handelTabClick (e) {
      this.$refs[e.name].LoadData()
    },
    // 点击搜索
    searchClick () {
      this.$refs[this.curentRefs].formData.Key = this.formData.Key
      this.$refs[this.curentRefs].LoadData()
    },
    handleSizeChange (Limit) {
      this.$refs[this.curentRefs].handleSizeChange(Limit)
    },
    handleCurrentChange (Page) {
      this.$refs[this.curentRefs].handleCurrentChange(Page)
    },
    parentVal (e) {
      if (e.parentRefs) {
        this.curentRefs = e.parentRefs
      }
      this.formData.Page = e.Page
      this.formData.Limit = e.Limit
      this.totalPage = e.totalPage
    },
    async getAddOrModify () {
      const res = await AddOrModify()
      if (res.Result) {
        this.LineList = res.Result.LineList
        this.OperationList = res.Result.OperationList
      }
      // else {
      //   this.LineList = this.OperationList = []
      // }
    },
    handleDelete (row) {},
    // 点击新增按钮
    async mesControllAdd () {
      const $table = this.$refs[this.curentRefs].$refs[this.$refs[this.curentRefs].activeName]
      var arr = []
      $table.tableFullColumn.map((item) => {
        if (item.params) {
          var obj = {}
          obj[item.params.field] = item.params.defaultVal
          arr.push(obj)
        }
      })
      const record = arr.reduce(function (result, currentObject) {
        for (var key in currentObject) {
          if (currentObject.hasOwnProperty(key)) {
            result[key] = currentObject[key]
          }
        }
        return result
      }, {})
      await $table.insertAt(record)
    },
    // 点击保存按钮
    async  mesControllSave () {
      // 获取子组件表格
      // console.log(this.$refs[this.curentRefs].formData.Page)
      const $table = this.$refs[this.curentRefs].$refs[this.$refs[this.curentRefs].activeName]
      const errMap = await $table.validate().catch(errMap => errMap)
      if (!errMap) {
        // 校验成功
        var record = $table.getRecordset()
        this.form.InsertRecords = record.insertRecords
        this.form.UpdateRecords = record.updateRecords
        this.form.RemoveRecords = record.removeRecords
        this.$refs[this.curentRefs].SaveInfor(this.form)
      }
    }
  }
}
</script>

<style lang="scss">
.controller {
  height: calc(100vh - 230px);
}
.table-controller {
  height: calc(100vh - 286px);
}
</style>
