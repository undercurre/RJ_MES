<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="eliminateClick"
        >{{ $t('publics.btn.clear') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SmtStencilChangeSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div class="myform">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        size="small"
        :show-message="false"
      >
        <el-form-item :label="$t('SmtStencilChange2._1')" prop="STENCIL_NO">
          <el-input v-model="form.STENCIL_NO" @change="getLoadScraperData" />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilChange2._3')" prop="LOCATION">
          <el-input v-model="form.LOCATION" readonly />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilChange2._5')" prop="NewLocation">
          <el-input v-model="form.NewLocation"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtStencilChange2._7') }}</span>
    </div>
    <div class="content-block">
      <div
        class="item"
        v-for="item in mainTable"
        :key="item.id"
        :style="{
        background: item.type === 1 ? '#67C23A' : '#F56C6C'
      }"
      >{{ ` &lt; ${item.time} &lt; ${item.info} &lt; ${item.status}` }}</div>
    </div>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  ChangeLocationIndex,
  ChangeLocationLoadData,
  ChangeLocationSave
} from '@/api/SmtStencilChange'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtStencilChange',
  computed: {
    ...mapGetters(['userinfo'])
  },
  components: {
    customContainerHeader
  },
  data () {
    return {
      form: {
        STENCIL_NO: '',
        LOCATION: '',
        NewLocation: '',
        UserName: ''
      },
      mainTable: [],
      rules: {
        STENCIL_NO: [
          {
            required: true,
            message: this.$t('SmtStencilChange2._2'),
            trigger: 'blur'
          }
        ],
        NewLocation: [
          {
            required: true,
            message: this.$t('SmtStencilChange2._6'),
            trigger: 'blur'
          }
        ],
        LOCATION: [
          {
            required: true,
            message: this.$t('SmtStencilChange2._4'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getChangeLocationIndex () {
      await ChangeLocationIndex()
    },
    async getLoadScraperData () {
      if (this.form.STENCIL_NO) {
        const res = await ChangeLocationLoadData(this.form.STENCIL_NO)
        if (res.Result) {
          this.form.LOCATION = res.Result
          this.form.UserName = this.userinfo.USER_NAME
        } else {
          this.form.STENCIL_NO = ''
          this.form.Location = ''
        }
      }
    },
    eliminateClick () {
      this.form = {
        STENCIL_NO: '',
        LOCATION: '',
        NewLocation: '',
        UserName: ''
      }
      this.mainTable = []
    },
    preserveClick () {
      this.$refs.form.validate(async (res, obj) => {
        if (!res) {
          try {
            Object.keys(obj).forEach(item => {
              this.$message.error(obj[item][0].message)
              throw new Error(obj[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        } else {
          if (this.form.NewLocation === this.form.LOCATION) {
            this.$message.error('当前填写的新储位与旧储位一致，请重新填写新储位')
            return
          }
          const result = await ChangeLocationSave({
            STENCIL_NO: this.form.STENCIL_NO,
            NewLocation: this.form.NewLocation,
            UserName: this.form.UserName
          })
          if (result.Result) {
            this.mainTable.push({
              id: this.mainTable.length + 1,
              time: new Date().toLocaleString(),
              info: this.$t('SmtStencilChange2._14')
                .replace('%STENCIL_NO%', this.form.STENCIL_NO)
                .replace('%LOCATION%', this.form.LOCATION)
                .replace('%NewLocation%', this.form.NewLocation)
                .replace('%UserName%', this.form.UserName),
              status: this.$t('publics.tips.handleSuccess'),
              type: 1
            })
            this.$message.success(this.$t('publics.tips.handleSuccess'))
            this.form = {
              STENCIL_NO: '',
              LOCATION: '',
              NewLocation: '',
              UserName: ''
            }
          } else {
            this.mainTable.push({
              id: this.mainTable.length + 1,
              time: new Date().toLocaleString(),
              info: this.$t('SmtStencilChange2._14')
                .replace('%STENCIL_NO%', this.form.STENCIL_NO)
                .replace('%LOCATION%', this.form.LOCATION)
                .replace('%NewLocation%', this.form.NewLocation)
                .replace('%UserName%', this.form.UserName),
              status: this.$t('publics.tips.handleFail'),
              type: -1
            })
          }
        }
      })
    }
  },
  created () {
    console.log(this.userinfo)
    this.getChangeLocationIndex()
  }
}
</script>

<style lang="scss" scoped>
.content-block {
  border: 1px solid rgb(233, 234, 236);
  box-sizing: border-box;
  height: calc(100vh - 60px - 21px - 21px - 73px - 41px - 119px);
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
