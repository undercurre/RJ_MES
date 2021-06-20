<template>
  <el-select
    clearable
    :multiple = "multiple"
    @change="changeModel"
    v-model="localData"
    :disabled="disabled"
    style="width: 100%"
    :placeholder="placeholderStr"
    @visible-change="focusKey"
  >
    <div
      style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
    ></div>
    <div
      style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
    ></div>
    <div
      style="
                          width: 600px;
                          display: flex;
                          padding: 0 20px 0 10px;
                          position: sticky;
                          top: 6px;
                          background: #fff;
                          z-index: 90;
                        "
    >
      <el-input
        v-model="pagination.Key"
        @input="searchClick"
        placeholder="请输入料号关键字"
        @keyup.enter.native="searchClick"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click.prevent="searchClick"
      >{{ $t("publics.btn.search") }}</el-button>
    </div>
    <!--      :disabled="item.STATUS" 禁用-->
    <el-option
      v-for="item in list"
      :key="item.ID"
      :label="item.NAME"
      :value="item.NAME || item.PART_NO"
      :disabled="item.disabled"
    >
      <span style="float: left">{{ item.NAME || item.PART_NO }}</span>
      <span style="float: right">{{ item.DESCRIPTION }}</span>
    </el-option>
    <div
      style="
                          width: 600px;
                          position: sticky;
                          bottom: 6px;
                          background: #fff;
                          z-index: 90;
                          padding-left: 15px;
                        "
    >
      <el-pagination
        :pager-count="5"
        :current-page="pagination.Page"
        :page-size="pagination.Limit"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="paginationSizeChange"
        @current-change="paginationCurrentChange"
      />
    </div>
  </el-select>
</template>

<script>
import { GetSiteStatisticsConditionList } from '@/api/SiteStatisticsReport'

export default {
  name: 'PnNoSelect',
  data () {
    return {
      localData: this.bindData,
      list: [],
      pagination: {
        Limit: 10,
        Page: 1,
        TYPE: 2,
        Key: '',
        PART_NO: ''
      },
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    changeModel (e) {
      console.log(e)
      this.$emit('doWork', this.localData)
    },
    focusKey () {
      this.pagination.Key = ''
      this.getList()
    },
    searchClick () {
      this.pagination.Page = 1
      this.getList()
    },
    async getList () {
      const res = await this.requestData(this.pagination)
      // 接口分为多种，目前看到两种，一种是数据在res.Result 中的需要JSON处理
      // 另一种在data中
      if (res.Result.data) {
        if (res.Result.data.length === 0) {
          this.list = [{ ID: '', PART_NO: '暂无数据', disabled: true }]
          this.total = 0
          // this.getListAgain()
        } else {
          this.list = res.Result.data
          this.total = res.Result.count
        }
      } else {
        if (JSON.parse(res.Result).length === 0) {
          this.list = [{ ID: '', PART_NO: '暂无数据', disabled: true }]
          this.total = 0
          // this.getListAgain()
        } else {
          this.list = JSON.parse(res.Result)
          this.total = res.TotalCount
        }
      }
    },
    async getListAgain () {
      const res = await this.requestData({
        Limit: 10,
        Page: 1,
        TYPE: 2,
        Key: '',
        PART_NO: ''
      })
      this.list = res.Result.data ? res.Result.data : JSON.parse(res.Result)
      this.total = res.Result.count ? res.Result.count : res.TotalCount
    },
    paginationSizeChange (Limit) {
      this.pagination.Limit = Limit
      this.getList()
    },
    paginationCurrentChange (Page) {
      this.pagination.page = Page
      this.getList()
    }
  },
  props: {
    bindData: {
      type: [String, Array]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholderStr: {
      type: String,
      default: '请选择料号'
    },
    requestData: {
      type: Function,
      default: GetSiteStatisticsConditionList
    }
  },
  watch: {
    localData: {
      handler (val) {
        this.$emit('getData', val)
        this.getList()
      }
    },
    bindData: {
      handler (val) {
        this.localData = val
      }
    },
    pagination: {
      handler (val) {
        val.PART_NO = val.Key
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
