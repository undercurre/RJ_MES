<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="save"
          v-if="$btnList.indexOf('SmtStencilReturnSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="clearAll"
        >{{ $t('publics.btn.clear') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 0 0 10px;"
      >{{ $t('SmtStencilReturn._1') }}</span>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="90px" size="mini">
        <el-form-item :label="$t('SmtStencilReturn._2')">
          <el-input v-model="form.STENCIL_NO" @change="getLoadData" />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilReturn._3')">
          <el-input v-model="form.LOCATION" />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilReturn._4')">
          <el-input v-model="form.WorkNo" />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtStencilReturn._5') }}</span>
    </div>
    <div class="content-block">
      <div
        class="item"
        v-for="item in mainTable"
        :key="item.id"
        :style="{
        background: item.type === 1 ? '#67C23A' : '#F56C6C'
      }"
      >{{ item.info }}</div>
    </div>
  </d2-container>
</template>

<script>
import {
  ReturnIndex,
  ReturnLoadData,
  ReturnSaveData
} from '@/api/SmtStencilReturn'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtStencilReturn',
  data () {
    return {
      form: {
        STENCIL_NO: '',
        LOCATION: '',
        WorkNo: '',
        UserName: ''
      },
      mainTable: [],
      indexFlag: false
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  components: {
    customContainerHeader
  },
  methods: {
    async save () {
      const result = await ReturnSaveData(this.form)
      if (result.Result) {
        this.$message.success(this.$t('SmtStencilReturn._6'))
        this.mainTable.push({
          type: 1,
          info: `< ${(new Date()).toLocaleString()} < ${this.$t('publics.tips.processSuccess')}`
        })
      } else {
        this.$message.error(this.$t('SmtStencilReturn._7'))
        this.mainTable.push({
          type: -1,
          info: `< ${(new Date()).toLocaleString()} < ${this.$t('publics.tips.processFail')}`
        })
      }
    },
    clearAll () {
      this.form = {
        STENCIL_NO: '',
        LOCATION: '',
        WorkNo: '',
        UserName: ''
      }
    },
    async getReturnIndex () {
      const result = await ReturnIndex()
      if (result.Result) {
        this.indexFlag = true
      } else {
        this.indexFlag = false
      }
    },
    async getLoadData () {
      if (!this.indexFlag) return false
      if (!this.form.STENCIL_NO) {
        this.$message.error(this.$t('SmtStencilClean._1'))
        return false
      }
      const result = await ReturnLoadData(this.form.STENCIL_NO)
      if (result) {
        this.form.LOCATION = result.Result
        this.form.WorkNo = this.form.UserName = this.userinfo.USER_NAME
      } else {
        this.form = {
          STENCIL_NO: this.form.STENCIL_NO,
          LOCATION: '',
          WorkNo: '',
          UserName: ''
        }
      }
    }
  },
  created () {
    this.getReturnIndex()
    this.form.WorkNo = this.userinfo.USER_NAME
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  display: block;
}
.content-block {
  border: 1px solid rgb(233, 234, 236);
  box-sizing: border-box;
  height: calc(100vh - 60px - 21px - 21px - 73px - 41px - 31px - 107px);
  overflow: auto;
  background: rgb(249, 219, 189);
}
.item {
  padding: 5px 5px;
  color: #fff;
  font-size: 14px;
  border-bottom: 1px dashed #fff;
}
</style>
