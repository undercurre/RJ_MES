<template>
  <div>
    <div
      style="text-align:center;box-shadow: 0 0 4px #e5e5e5;height: 44px;background: #fff;position: fixed;top: 0;width: 100%"
    >
      <!-- <el-button icon="el-icon-back" @click="goback">返回</el-button> -->
      <h1 style="font-size: 18px;line-height: 44px;color: #333;margin: 0;">
        <i class="el-icon-tickets" style="margin-right:5px"></i>
        {{$t('homePage._47')}}
      </h1>
      <!-- <el-button style="visibility: hidden">&nbsp;</el-button> -->
    </div>
    <div class="content" style="padding-top: 44px">
      <div class="ul">
        <div class="li" v-for="item in list" :key="item.ID" @click="toInfo(item)">
          <div class="left">
            <el-tag
              effect="dark"
              type="danger"
              size="mini"
              style="margin-right: 5px;"
              v-if="item.STATUS === 0"
            >{{ $t('homePage._9') }}</el-tag>
            <el-tag
              effect="dark"
              type="warning"
              size="mini"
              style="margin-right: 5px"
              v-if="item.STATUS === 1"
            >{{ $t('homePage._10') }}</el-tag>
            <el-tag
              effect="dark"
              type="success"
              size="mini"
              style="margin-right: 5px"
              v-if="item.STATUS === 2"
            >{{ $t('homePage._11') }}</el-tag>
            <el-tag
              effect="dark"
              type="info"
              size="mini"
              style="margin-right: 5px"
              v-if="item.STATUS === 3"
            >{{ $t('homePage._12') }}</el-tag>
            <!-- <el-tag effect="dark" v-if="item.IS_TOP" type="danger" size="mini" style="margin-right: 10px">置顶</el-tag> -->
            <!--            <el-tag v-if="item.TAG" type="primary" size="mini" style="margin-right: 5px">{{ item.TAG }}</el-tag>-->
            <span>{{ item.CALL_CONTENT }}</span>
          </div>
          <div class="right">{{item.CREATE_TIME}}</div>
        </div>
      </div>
      <el-divider class="mydivider" style="background: transparent">
        <span style="color: #e5e5e5;background: transparent">{{$t('homePage._25')}}</span>
      </el-divider>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { LoadWaitTakeData } from '@/api/AndonCallRecord'
import { mapGetters } from 'vuex'
export default {
  name: 'ToDoList',
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      loading: false,
      list: [],
      totalCount: 0
    }
  },
  methods: {
    async getPageList () {
      this.loading = true
      const res = await LoadWaitTakeData({ User_ID: this.userinfo.ID })
      this.loading = false
      this.list = res.Result || []
      this.totalCount = res.TotalCount || 0
    },
    toInfo (item) {
      this.$router.push({
        path: '/ToDo/index',
        query: { ID: item.ID, STATUS: item.STATUS }
      })
    },
    goback () {
      this.$router.back(-1)
    }
  },
  created () {
    this.getPageList()
  },
  mounted () {
    this.$nextTick((_) => {
      document.getElementById('app').style.background = '#fafafa'
    })
  }
}
</script>

<style scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  padding: 0 20px;
}
.zuozhe {
  padding: 10px 0;
  font-size: 14px;
}
.neirong {
  padding-bottom: 10px;
}

.ul {
}

.ul .li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  border-bottom: 1px dashed #e5e5e5;
  padding: 0 10px;
}
.left {
  font-size: 14px;
  color: #333;
  font-weight: normal;
}
.li:hover {
  background: #fafafa;
  cursor: pointer;
}
.li:hover span {
  color: #409eff;
}
.right {
  font-size: 14px;
  color: #999;
}
.li:hover .right {
  color: #409eff;
}
</style>
