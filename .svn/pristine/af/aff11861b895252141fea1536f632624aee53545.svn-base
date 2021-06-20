<template>
  <d2-container class="BoardEntry">
    <el-tabs v-model="activeText"
             @tab-click="handTopClick">
      <el-tab-pane v-for="(i,index) in tabList"
                   :key="index"
                   :label="i.ORGANIZE_NAME"
                   :name="i.ORGANIZE_ID"
                   @click="tabClick(i)">
        <el-collapse v-model="activeNames">
          <el-collapse-item :title="$t('BoardEntry._1')"
                            name="1">
            <div v-for="(itme,index) in List"
                 :key="index">
              <div class="enterDiv automation"
                   v-if="itme.LINE_TYPE === 'SMT' && itme.LINE_TYPE.indexOf('SMT') > -1"
                   @click="goNewPage1(itme)">
                {{itme.LINE_NAME}}
                <!-- <router-link tag="a"
                             :to="{ path: '/Kanban/SmtLine', query: { lineId: itme.ID }}"
                target="_blank">{{itme.LINE_NAME}}</router-link>-->
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="$t('BoardEntry._2')"
                            name="2">
            <div v-for="(itme,index) in List"
                 :key="index">
              <div class="enterDiv production"
                   v-if="itme.LINE_TYPE === 'SFCS'"
                   @click="ProductClick(itme)">
                {{itme.LINE_NAME}}
                <!-- <router-link
                  tag="a"
                  :to="{ path: '/Kanban/ProductLine', query: { lineId: itme.ID }}"
                  target="_blank"
                >{{itme.LINE_NAME}}</router-link> -->
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="$t('BoardEntry._3')"
                            name="3">
            <div v-for="(itme,index) in List"
                 :key="index">
              <div class="enterDiv material"
                   v-if="itme.LINE_TYPE === 'SFCS'"
                   @click="HiMaterialClick(itme)">
                <!-- /Kanban/HiMaterial -->
                {{itme.LINE_NAME}}
                <!-- <router-link tag="a"
                             :to="{ path: '/Kanban/HiMaterial', query: { lineId: itme.ID }}"
                             target="_blank">{{itme.LINE_NAME}}</router-link> -->
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="$t('BoardEntry._4')"
                            name="4">
            <div v-for="(itme,index) in List"
                 :key="index">
              <div class="enterDiv equipment"
                   v-if="itme.LINE_TYPE.indexOf('AI') !== -1 || itme.LINE_TYPE.indexOf('RI') !== -1">
                <!-- {{itme.LINE_NAME}} -->
                <router-link tag="a"
                             :to="{ path: '/Kanban/EquipCheck', query: { lineId: itme.ID }}"
                             target="_blank">{{itme.LINE_NAME}}</router-link>
              </div>
            </div>
            <div style="clear: both;">
              <div v-for="(itme,index) in List"
                   :key="index">
                <div class="enterDiv equipment"
                     v-if="itme.LINE_TYPE.indexOf('AI') !== -1 || itme.LINE_TYPE.indexOf('RI') !== -1">
                  <!-- {{itme.LINE_NAME}} -->
                  <router-link tag="a"
                               :to="{ path: '/Kanban/EquipCheck', query: { lineId: itme.ID }}"
                               target="_blank">{{itme.LINE_NAME}}</router-link>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item :title="$t('BoardEntry._5')"
                            name="5">
            <div class="enterDiv"
                 @click="aoiClick">{{$t('BoardEntry._6')}}</div>
            <div class="enterDiv"
                 @click="airlClick">{{$t('BoardEntry._7')}}</div>
            <div class="enterDiv">{{$t('BoardEntry._8')}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </d2-container>
</template>
<script>
import { GetOrganizeList, GetorganizeLines } from '@/api/Kanban'
import { mapGetters } from 'vuex'
export default {
  name: 'BoardEntry',
  data () {
    return {
      List: [],
      // cause1: [
      //   {
      //     'ID': 9,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 64033,
      //     'ATTRIBUTE4': 'R2',
      //     'LINE_NAME': '一部2楼 RoHS Line R2',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 207265,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 207209,
      //     'ATTRIBUTE4': 'R6',
      //     'LINE_NAME': '一部2楼 RoHS Line R6',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 207266,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 207210,
      //     'ATTRIBUTE4': 'R7',
      //     'LINE_NAME': '一部2楼 RoHS Line R7',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 8,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 64032,
      //     'ATTRIBUTE4': 'R8',
      //     'LINE_NAME': '一部2楼 RoHS Line R8',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 10,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 126513,
      //     'ATTRIBUTE4': 'R9',
      //     'LINE_NAME': '一部2楼 RoHS Line R9',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 192459,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 192446,
      //     'ATTRIBUTE4': 'R10',
      //     'LINE_NAME': '一部2楼 RoHS Line R10',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 11,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 126911,
      //     'ATTRIBUTE4': 'R11',
      //     'LINE_NAME': '一部2楼 RoHS Line R11',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 197958,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 197933,
      //     'ATTRIBUTE4': 'R12',
      //     'LINE_NAME': '一部2楼 RoHS Line R12',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 198756,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 198679,
      //     'ATTRIBUTE4': 'R20',
      //     'LINE_NAME': '一部2楼 RoHS Line R20',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 16,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 5591,
      //     'ATTRIBUTE4': 'AI_1',
      //     'LINE_NAME': '一部2楼 卧式1号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 2,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 83,
      //     'ATTRIBUTE4': 'AI_2',
      //     'LINE_NAME': '一部2楼 卧式2号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 3,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 84,
      //     'ATTRIBUTE4': 'RI_1',
      //     'LINE_NAME': '一部2楼 立式1号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 14,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 5589,
      //     'ATTRIBUTE4': 'RI_2',
      //     'LINE_NAME': '一部2楼 立式2号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 15,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 5590,
      //     'ATTRIBUTE4': 'RI_3',
      //     'LINE_NAME': '一部2楼 立式3号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 1,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 82,
      //     'ATTRIBUTE4': 'SMT1',
      //     'LINE_NAME': '一部2楼 SMT1号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 12,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 5587,
      //     'ATTRIBUTE4': 'SMT2',
      //     'LINE_NAME': '一部2楼 SMT2号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 13,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 5588,
      //     'ATTRIBUTE4': 'SMT3',
      //     'LINE_NAME': '一部2楼 SMT3号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 4,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 85,
      //     'ATTRIBUTE4': 'SMT4',
      //     'LINE_NAME': '一部2楼 SMT4号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 5,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 4876,
      //     'ATTRIBUTE4': 'SMT5',
      //     'LINE_NAME': '一部2楼 SMT5号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 6,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 5092,
      //     'ATTRIBUTE4': 'SMT6',
      //     'LINE_NAME': '一部2楼 SMT6号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   },
      //   {
      //     'ID': 207208,
      //     'ORGANIZE_ID': '3',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 13404,
      //     'ATTRIBUTE4': 'SMT7',
      //     'LINE_NAME': '一部4楼 SMT7号线',
      //     'ORGANIZE_NAME': '事业一部'
      //   }
      // ],
      // cause2: [
      //   {
      //     'ID': 202725,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 202225,
      //     'ATTRIBUTE4': 'D22',
      //     'LINE_NAME': '二部4楼 ROHS Line D16',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193720,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7288,
      //     'ATTRIBUTE4': 'AI_1',
      //     'LINE_NAME': '二部4楼 卧式1号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193710,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7289,
      //     'ATTRIBUTE4': 'AI_2',
      //     'LINE_NAME': '二部3楼 卧式2号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193712,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7290,
      //     'ATTRIBUTE4': 'AI_3',
      //     'LINE_NAME': '二部3楼 卧式3号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193721,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7291,
      //     'ATTRIBUTE4': 'AI_4',
      //     'LINE_NAME': '二部3楼 卧式4号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 192955,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7147,
      //     'ATTRIBUTE4': 'RI_1',
      //     'LINE_NAME': '二部3楼 立式1号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193711,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7278,
      //     'ATTRIBUTE4': 'RI_2',
      //     'LINE_NAME': '二部3楼 立式2号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193718,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7279,
      //     'ATTRIBUTE4': 'RI_3',
      //     'LINE_NAME': '二部3楼 立式3号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193719,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7281,
      //     'ATTRIBUTE4': 'RI_4',
      //     'LINE_NAME': '二部3楼 立式4号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193716,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7283,
      //     'ATTRIBUTE4': 'RI_5',
      //     'LINE_NAME': '二部3楼 立式5号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193717,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7284,
      //     'ATTRIBUTE4': 'RI_6',
      //     'LINE_NAME': '二部3楼立式6号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193713,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7285,
      //     'ATTRIBUTE4': 'RI_7',
      //     'LINE_NAME': '二部4楼 立式7号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193714,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7286,
      //     'ATTRIBUTE4': 'RI_8',
      //     'LINE_NAME': '二部4楼 立式8号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 193715,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7287,
      //     'ATTRIBUTE4': 'RI_9',
      //     'LINE_NAME': '二部4楼 立式9号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195234,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7692,
      //     'ATTRIBUTE4': 'SMT1',
      //     'LINE_NAME': '二部3楼 SMT1号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195235,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7697,
      //     'ATTRIBUTE4': 'SMT10',
      //     'LINE_NAME': '二部3楼 SMT10号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195233,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7693,
      //     'ATTRIBUTE4': 'SMT2',
      //     'LINE_NAME': '二部3楼 SMT2号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195232,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7694,
      //     'ATTRIBUTE4': 'SMT3',
      //     'LINE_NAME': '二部3楼 SMT3号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195231,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7695,
      //     'ATTRIBUTE4': 'SMT4',
      //     'LINE_NAME': '二部3楼 SMT4号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195230,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7696,
      //     'ATTRIBUTE4': 'SMT5',
      //     'LINE_NAME': '二部3楼 SMT5号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195225,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7698,
      //     'ATTRIBUTE4': 'SMT6',
      //     'LINE_NAME': '二部4楼 SMT6号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195226,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7699,
      //     'ATTRIBUTE4': 'SMT7',
      //     'LINE_NAME': '二部4楼 SMT7号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195228,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7700,
      //     'ATTRIBUTE4': 'SMT8',
      //     'LINE_NAME': '二部4楼 SMT8号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   },
      //   {
      //     'ID': 195229,
      //     'ORGANIZE_ID': '4',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7701,
      //     'ATTRIBUTE4': 'SMT9',
      //     'LINE_NAME': '二部4楼 SMT9号线',
      //     'ORGANIZE_NAME': '事业二部'
      //   }
      // ],
      // cause3: [
      //   {
      //     'ID': 200840,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SFCS',
      //     'LINE_ID': 200479,
      //     'ATTRIBUTE4': 'P6',
      //     'LINE_NAME': '三部5楼 RoHS Line P6',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 192445,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7110,
      //     'ATTRIBUTE4': 'AI_3',
      //     'LINE_NAME': '三部5楼 卧式3号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 192950,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7162,
      //     'ATTRIBUTE4': 'AI_4',
      //     'LINE_NAME': '三部5楼 卧式4号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 192951,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7175,
      //     'ATTRIBUTE4': 'RI_1',
      //     'LINE_NAME': '三部5楼 立式1号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 192952,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7188,
      //     'ATTRIBUTE4': 'RI_2',
      //     'LINE_NAME': '三部5楼 立式2号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 192953,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7203,
      //     'ATTRIBUTE4': 'RI_5',
      //     'LINE_NAME': '三部5楼 立式5号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 192954,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7216,
      //     'ATTRIBUTE4': 'RI_6',
      //     'LINE_NAME': '三部5楼 立式6号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 195507,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7557,
      //     'ATTRIBUTE4': 'SMT1',
      //     'LINE_NAME': '三部5楼 SMT1号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 195508,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7584,
      //     'ATTRIBUTE4': 'SMT3',
      //     'LINE_NAME': '三部5楼 SMT3号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 195510,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7608,
      //     'ATTRIBUTE4': 'SMT4',
      //     'LINE_NAME': '三部5楼 SMT4号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 195511,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7632,
      //     'ATTRIBUTE4': 'SMT5',
      //     'LINE_NAME': '三部5楼 SMT5号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   },
      //   {
      //     'ID': 195512,
      //     'ORGANIZE_ID': '5',
      //     'LINE_TYPE': 'SMT',
      //     'LINE_ID': 7657,
      //     'ATTRIBUTE4': 'SMT6',
      //     'LINE_NAME': '三部5楼 SMT6号线',
      //     'ORGANIZE_NAME': '事业三部'
      //   }
      // ],
      tabList: [],
      activeNames: ['1', '2', '3', '4', '5'],
      activeText: ''
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      // console.log(this.userId)
      const res = await GetOrganizeList(this.userId)
      const data = JSON.parse(res.Result)
      this.tabList = data
      console.log(data, ' 4545')
      this.tabList.forEach((v, i) => {
        if (i === 0) {
          this.activeText = v.ORGANIZE_ID
          // this.Getbox(1)
          this.Getbox(v.ORGANIZE_ID)
        }
      })
    },
    async Getbox (id) {
      const res = await GetorganizeLines(id)
      console.log(JSON.parse(res.Result), 'res')
      this.List = JSON.parse(res.Result)
    },
    handTopClick (tab, row) {
      console.log(tab)
      this.Getbox(tab.name)

      // if (tab.index === '0') {
      //   this.List = this.cause1
      // } else if (tab.index === '1') {
      //   this.List = this.cause2
      // } else {
      //   this.List = this.cause3
      // }
    },
    goNewPage1 (e) {
      let routeUrl = this.$router.resolve({
        path: '/Kanban/SmtLine'
        // query: { lineId: e.ID }
      })
      localStorage.setItem('lineId', e.ID)
      window.open(routeUrl.href, '_blank')
    },
    ProductClick (e) {
      let routeUrl = this.$router.resolve({
        path: '/Kanban/ProductLine'
      })
      localStorage.setItem('lineId', e.ID)
      window.open(routeUrl.href, '_blank')
    },
    HiMaterialClick (e) {
      let routeUrl = this.$router.resolve({
        path: '/Kanban/HiMaterial'
      })
      localStorage.setItem('lineId', e.ID)
      window.open(routeUrl.href, '_blank')
    },
    aoiClick () {
      let routeUrl = this.$router.resolve({ path: '/Kanban/AoiAndSpiReport' })
      // localStorage.setItem('lineId', e.ID)
      window.open(routeUrl.href, '_blank')
    },
    airlClick () {
      // this.$router.push({
      //   path: '/Kanban/AiAndRiReport',
      //   query: { ORGANIZE_ID: '3' }
      // })
      let routeUrl = this.$router.resolve({ path: '/Kanban/AiAndRiReport' })
      // localStorage.setItem('lineId', e.ID)
      window.open(routeUrl.href, '_blank')
    }
  }
}
</script>
<style>
.BoardEntry .enterDiv {
  background: -webkit-linear-gradient(top, #a437e6, #5460e2);
  width: 120px;
  height: 70px;
  line-height: 70px;
  color: white;
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
}
.BoardEntry .enterDiv a {
  width: 100%;
  height: 100%;
  color: white;
  display: inline-block;
}
.BoardEntry .automation {
  font-size: 20px;
  background: -webkit-linear-gradient(top, #a437e6, #3860bf);
}
.BoardEntry .production {
  font-size: 20px;
  background: -webkit-linear-gradient(top, #a437e6, #40dff7);
}
.BoardEntry .material {
  font-size: 20px;
  background: -webkit-linear-gradient(top, rgb(164, 55, 230), rgb(0, 144, 241));
}
.BoardEntry .equipment {
  font-size: 20px;
  background: -webkit-linear-gradient(
    top,
    rgb(164, 55, 230),
    rgb(12, 188, 181)
  );
}
.BoardEntry .el-collapse-item__header {
  font-size: 20px;
  font-weight: 600;
}
</style>
