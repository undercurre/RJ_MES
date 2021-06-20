<template>
  <div class="equipment">
    <div style="display: flex;justify-content: space-between;">
      <div style="color: green;"
           v-if="SetSTATUS">
        <i class="el-icon-warning"
           :class="{'LightClass':Light}"></i>
        {{$t("DockingStation._3")}}
      </div>
      <div style="color: red;"
           v-else>
        <i class="el-icon-warning"></i>
        {{$t("DockingStation._4")}}
      </div>

      <el-button @click="SettingClick"
                 type="primary">{{$t('DockingStation._5')}}</el-button>
      <el-button @click="websocketclose2"
                 type="primary">{{$t('DockingStation._6')}}</el-button>
    </div>
    <!-- 链接设置 -->
    <el-dialog :title="$t('链接设置')"
               :visible.sync="SettingoShow"
               width="70%"
               ref="SetDialog"
               :close-on-click-modal="false">
      <el-form ref="SetRef"
               label-width="120px"
               :model="SetForm"
               :show-message="false"
               :rules="Setrules"
               class="setform">
        <el-form-item :label="$t('设备类型：')"
                      style="flex: 0 0 50%;"
                      prop="MachineDevType">
          <el-select v-model="SetForm.MachineDevType"
                     style="width:100%"
                     @change="MachineDevChange"
                     placeholder=" ">
            <el-option v-for="(item, index) in MachineDevType"
                       :key="index"
                       :label="item.MEANING"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('连接方式：')"
                      style="flex: 0 0 50%;"
                      prop="LinkeType">
          <el-select v-model="SetForm.LinkeType"
                     style="width:100%"
                     @change="ConnCtion"
                     placeholder=" ">
            <el-option v-for="(itme,index) in LinkeType"
                       :label="itme.MEANING"
                       :value="itme.LOOKUP_CODE"
                       :key="index" />
          </el-select>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane v-for="(itme,index) in LinkeType"
                     :label="itme.MEANING"
                     :name="String(itme.LOOKUP_CODE)"
                     :key="index">
          <el-form ref="SetModl"
                   label-width="120px"
                   :model="SetForm2"
                   :rules="Setrules2"
                   :show-message="false"
                   class="setform">
            <el-form-item :label="$t('数据库：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 1"
                          prop="key11">
              <el-select v-model="SetForm2.key11"
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in databaseList"
                           :key="index"
                           :label="item.name"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('URL：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 1"
                          prop="key12">
              <el-input v-model="SetForm2.key12"
                        clearable
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('用户名：')"
                          style="flex: 0 0 50%;"
                          v-if="activeName == 1"
                          prop="key13">
              <el-input v-model="SetForm2.key13"
                        clearable
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('密码：')"
                          style="flex: 0 0 50%;"
                          v-if="activeName == 1"
                          prop="key14">
              <el-input v-model="SetForm2.key14"
                        clearable
                        type="password"
                        placeholder=" " />
            </el-form-item>
            <!-- 文件 -->
            <el-form-item :label="$t('文件路径：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 2"
                          prop="key21">
              <el-input v-model="SetForm2.key21"
                        clearable
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <!-- web api -->
            <el-form-item style="flex: 0 0 100%;"
                          :label="$t('标准接口：')"
                          v-if="activeName == 4">
              <el-checkbox-group @change="NormintChan"
                                 v-model="SetForm2.key41">
                <el-checkbox true-label="Y"
                             false-label="N"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="$t('URL1：')"
                          style="flex: 0 0 75%;"
                          v-if="activeName == 4">
              <el-input v-model="SetForm2.key42"
                        clearable
                        type="text"
                        :disabled="NormalStart"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('请求方式1：')"
                          style="flex: 0 0 25%;"
                          v-if="activeName == 4">
              <el-select v-model="SetForm2.key43"
                         style="width:100%"
                         clearable
                         placeholder=" ">
                <el-option v-for="(item, index) in RequestMethod"
                           :disabled="NormalStart"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('URL2：')"
                          style="flex: 0 0 75%;"
                          v-if="activeName == 4">
              <el-input v-model="SetForm2.key44"
                        :disabled="NormalStart"
                        clearable
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('请求方式2：')"
                          style="flex: 0 0 25%;"
                          v-if="activeName == 4">
              <el-select v-model="SetForm2.key45"
                         clearable
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in RequestMethod"
                           :disabled="NormalStart"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('URL3：')"
                          style="flex: 0 0 75%;"
                          v-if="activeName == 4">
              <el-input v-model="SetForm2.key46"
                        clearable
                        :disabled="NormalStart"
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('请求方式3：')"
                          style="flex: 0 0 25%;"
                          v-if="activeName == 4">
              <el-select v-model="SetForm2.key47"
                         clearable
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in RequestMethod"
                           :disabled="NormalStart"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('URL4：')"
                          style="flex: 0 0 75%;"
                          v-if="activeName == 4">
              <el-input v-model="SetForm2.key48"
                        clearable
                        :disabled="NormalStart"
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('请求方式4：')"
                          style="flex: 0 0 25%;"
                          v-if="activeName == 4">
              <el-select v-model="SetForm2.key49"
                         clearable
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in RequestMethod"
                           :disabled="NormalStart"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('URL5：')"
                          style="flex: 0 0 75%;"
                          v-if="activeName == 4">
              <el-input v-model="SetForm2.key50"
                        clearable
                        :disabled="NormalStart"
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('请求方式5：')"
                          style="flex: 0 0 25%;"
                          v-if="activeName == 4">
              <el-select v-model="SetForm2.key51"
                         clearable
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in RequestMethod"
                           :disabled="NormalStart"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <!-- COM接口 -->
            <el-form-item :label="$t('端口：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 3"
                          prop="key31">
              <el-select v-model="SetForm2.key31"
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in PortList"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('波特率：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 3"
                          prop="key32">
              <el-input v-model="SetForm2.key32"
                        clearable
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('校验位：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 3"
                          prop="key33">
              <el-select v-model="SetForm2.key33"
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in CheckList"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('数据位：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 3"
                          prop="key34">
              <el-input v-model="SetForm2.key34"
                        clearable
                        type="text"
                        placeholder=" " />
            </el-form-item>
            <el-form-item :label="$t('停止位：')"
                          style="flex: 0 0 100%;"
                          v-if="activeName == 3"
                          prop="key35">
              <el-select v-model="SetForm2.key35"
                         style="width:100%"
                         placeholder=" ">
                <el-option v-for="(item, index) in StopbitList"
                           :key="index"
                           :label="item.value"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer"
           style="text-align: center;">
        <el-button @click="SetTest">
          {{
          $t("DockingStation._9")
          }}
        </el-button>
        <el-button type="primary"
                   @click="SetOKClick">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetMachineType,
  GetMachineDetailInfo,
  GetPrintTasksData
} from '@/api/SfcsParameters'
import Voice from '@/libs/voice'
import { mapGetters } from 'vuex'
const voice = Voice()
export default {
  name: 'equipment',
  data () {
    return {
      LinkeType: [],
      MachineDevType: [],
      SetInfo: {
        MachineDevType: '', // 设备
        LinkeType: '' // 连接类型
      },
      SetForm: {
        MachineDevType: '', // 设备
        LinkeType: '', // 连接类型
        DATA: '', // 文件地址
        DATA_TYPE: 1, // 类型
        USERNAME: '', // 用户名
        SITE_ID: 0, // 工位
        WO_NO: '',
        SN: '',
        MSTID: 0
      },
      SetForm2: {
        key11: '',
        key12: '',
        key13: '',
        key14: '',
        key21: '',
        key41: 'N',
        key42: '',
        key43: '',
        key44: '',
        key45: '',
        key46: '',
        key47: '',
        key48: '',
        key49: '',
        key50: '',
        key51: '',
        key31: '',
        key32: '',
        key33: '',
        key34: '',
        key35: '',
      },
      activeName: '',
      SettingoShow: false,
      SetSTATUS: false,
      databaseList: [
        {
          value: 1,
          name: 'MySQL'
        },
        {
          value: 2,
          name: 'Oracle'
        },
        {
          value: 3,
          name: 'Sql server'
        }
      ],
      Setrules: {
        MachineDevType: [
          { required: true, message: '请选择设备类型', trigger: 'change' }
        ],
        LinkeType: [
          { required: true, message: '请选择连接方式', trigger: 'change' }
        ]
      },
      Setrules2: {
        key11: [
          { required: true, message: '请选择数据库', trigger: 'change' }
        ],
        key12: [
          { required: true, message: '请输入URL', trigger: 'blur' }
        ],
        key13: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        key14: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        key21: [
          { required: true, message: '请输入输文件路径', trigger: 'blur' }
        ],
        key31: [
          { required: true, message: '请选择端口', trigger: 'change' }
        ],
        key32: [
          { required: true, message: '请输入波特率', trigger: 'blur' }
        ],
        key33: [
          { required: true, message: '请选择校验位', trigger: 'change' }
        ],
        key34: [
          { required: true, message: '请输入数据位', trigger: 'blur' }
        ],
        key35: [
          { required: true, message: '请选择停止位', trigger: 'change' }
        ]
      },
      RequestMethod: [
        {
          value: 'GET'
        }, {
          value: 'POST'
        }
      ],
      PortList: [
        {
          value: 'COM1'
        }, {
          value: 'COM2'
        }, {
          value: 'COM3'
        }, {
          value: 'COM4'
        }, {
          value: 'COM5'
        }, {
          value: 'COM6'
        }, {
          value: 'COM7'
        }, {
          value: 'COM8'
        }, {
          value: 'COM9'
        }, {
          value: 'COM10'
        }, {
          value: 'COM11'
        }, {
          value: 'COM12'
        }, {
          value: 'COM13'
        }, {
          value: 'COM14'
        }
      ],
      CheckList: [
        {
          value: 'None'
        },
        {
          value: 'Odd'
        }, {
          value: 'Even'
        }, {
          value: 'Mark'
        }, {
          value: 'Space'
        }
      ],
      StopbitList: [
        {
          value: 1
        }, {
          value: 1.5
        }, {
          value: 2
        }
      ],
      NormalStart: false,
      itemList: [],
      WebsockTime: null,
      Light: false,
      SiteId: 0,
      websock: null,
      StoreSiteId: 0
    }
  },
  computed: {
    ...mapGetters([
      'userinfo',
      'userId'
    ])
  },
  methods: {
    FatherClick (row) {
      this.SiteId = row.SITE_ID
      this.SetForm.DATA = row.DATA || ''
      this.SetForm.SITE_ID = row.SITE_ID
      this.SetForm.SN = row.SN || ''
      this.SetForm.DATA_TYPE = row.DATA_TYPE
      console.log(row, '从父接收数据')
      if (row.Entity) {
        this.SetForm.Entity = true
      } else {
        this.SetForm.Entity = false
      }
      if (this.SetForm.DATA_TYPE === 3) {
        this.websocketonopen()
      } else {
        this.GetMachineDetailInfo(row.SITE_ID)
      }
    },
    // 链接设置
    async SettingClick () {
      debugger;
      this.SettingoShow = true
      const res = await GetMachineDetailInfo({ 'SiteID': this.SiteId })
      const data = res.Result
      if (data.length) {
        this.activeName = String(data[0].LinkeType) || ''
        this.SetForm.LinkeType = data[0].LinkeType
        this.SetForm.MachineDevType = data[0].MachineDevType
        this.SetForm.SITE_ID = data[0].SiteID
        this.SetForm.MSTID = data[0].MSTID
        this.itemList = data[0].itemList
        if (this.SetForm.LinkeType === 1) {
          this.SetForm2.key11 = Number(this.itemList[0].VALUE)
          this.SetForm2.key12 = this.itemList[1].VALUE
          this.SetForm2.key13 = this.itemList[2].VALUE
          this.SetForm2.key14 = this.itemList[3].VALUE
        }
        if (this.SetForm.LinkeType === 2) {
          this.SetForm2.key21 = this.itemList[0].VALUE
        }
        if (this.SetForm.LinkeType === 3) {
          this.SetForm2.key31 = this.itemList[0].VALUE
          this.SetForm2.key32 = this.itemList[1].VALUE
          this.SetForm2.key33 = this.itemList[2].VALUE
          this.SetForm2.key34 = this.itemList[3].VALUE
          this.SetForm2.key35 = this.itemList[4].VALUE
        }
        if (this.SetForm.LinkeType === 4) {
          if (this.itemList[0].VALUE === 'Y') {
            this.NormalStart = true
          } else {
            this.NormalStart = false
          }
          this.SetForm2.key41 = this.itemList[0].VALUE
          this.SetForm2.key42 = this.itemList[1].VALUE
          this.SetForm2.key43 = this.itemList[2].VALUE
          this.SetForm2.key44 = this.itemList[3].VALUE
          this.SetForm2.key45 = this.itemList[4].VALUE
          this.SetForm2.key46 = this.itemList[5].VALUE
          this.SetForm2.key47 = this.itemList[6].VALUE
          this.SetForm2.key48 = this.itemList[7].VALUE
          this.SetForm2.key49 = this.itemList[8].VALUE
          this.SetForm2.key50 = this.itemList[9].VALUE
          this.SetForm2.key51 = this.itemList[10].VALUE
        }
        
      } else {
        this.Empty()
      }
    },
    // 获取设备、连接方式
    async GetMachineType () {
      const res = await GetMachineType()
      const data = res.Result
      if (res.Result) {
        this.LinkeType = data.LinkeType
        this.MachineDevType = data.MachineDevType
      }
    },
    // 链接方式tab
    handleClick (row) {
      this.SetForm.LinkeType = Number(row.name)
    },
    // 设备类型
    MachineDevChange (e) {
      this.SetInfo.MachineDevType = e
    },
    // 链接方式
    ConnCtion (row) {
      this.activeName = String(row)
    },
    // 标准接口
    NormintChan (row) {
      if (row === 'Y') {
        this.NormalStart = true
        this.SetForm2.key42 = ''
        this.SetForm2.key43 = ''
        this.SetForm2.key44 = ''
        this.SetForm2.key45 = ''
        this.SetForm2.key46 = ''
        this.SetForm2.key47 = ''
        this.SetForm2.key48 = ''
        this.SetForm2.key49 = ''
        this.SetForm2.key50 = ''
        this.SetForm2.key51 = ''
      } else {
        this.NormalStart = false
      }
    },
    // 选择工位获取设备信息
    async GetMachineDetailInfo (SiteId) {
      debugger;
      const res = await GetMachineDetailInfo({ 'SiteID': SiteId })
      const data = res.Result
      if (data.length) {
        this.activeName = String(data[0].LinkeType)
        this.SetForm.DATA_TYPE = 1
        this.SetForm.LinkeType = data[0].LinkeType
        this.SetForm.MachineDevType = data[0].MachineDevType
        this.SetForm.SITE_ID = data[0].SiteID
        this.SetForm.MSTID = data[0].MSTID
        this.itemList = data[0].ItemList
        this.websocketonopen()
      } else {
        this.activeName = ''
        this.SetForm.DATA_TYPE = 1
        this.SetForm.LinkeType = ''
        this.SetForm.MachineDevType = ''
        this.SetForm.DATA = ''
        this.SetForm.WO_NO = ''
        this.SetForm.SN = ''
        this.websocketonopen()
        this.SetForm.MSTID = 0
        this.itemList = []
        this.Empty()
        this.$message.error(this.$t('DockingStation._12'))
        voice.error()
      }
    },
    // 测试连接
    SetTest () {
      this.$refs.SetRef.validate(
        async (valid, errInfo) => {
          if (valid) {
            this.$refs.SetModl[0].validate(
              async (val, err) => {
                if (val) {
                  this.SetForm.DATA_TYPE = 1
                  this.websocketonopen()
                } else {
                  try {
                    Object.keys(err).forEach(item => {
                      this.$message.error(err[item][0].message)
                      throw new Error(new Date().toLocaleString())
                    })
                  } catch { }
                }
              })
          } else {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw new Error(new Date().toLocaleString())
              })
            } catch { }
          }
        })
    },
    // 确定提交
    async SetOKClick () {
      var STATUS = false
      this.$refs.SetRef.validate(
        async (valid, errInfo) => {
          if (valid) {
            STATUS = false
          } else {
            STATUS = true
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw new Error(new Date().toLocaleString())
              })
            } catch { }
          }
        })
      if (STATUS) {
        return
      }
      var Itembox = []
      if (this.SetForm.LinkeType === 1) {
        Itembox = [
          {
            Key: 11,
            Value: this.SetForm2.key11,
            Description: '数据库'
          },
          {
            Key: 12,
            Value: this.SetForm2.key12,
            Description: 'URL'
          },
          {
            Key: 13,
            Value: this.SetForm2.key13,
            Description: '用户名'
          },
          {
            Key: 14,
            Value: this.SetForm2.key14,
            Description: '密码'
          }
        ]
      } else if (this.SetForm.LinkeType === 2) {
        Itembox = [
          {
            Key: 21,
            Value: this.SetForm2.key21,
            Description: '文件路径'
          }
        ]
      } else if (this.SetForm.LinkeType === 3) {
        Itembox = [
          {
            Key: 41,
            Value: this.SetForm2.key41,
            Description: '标准接口'
          },
          {
            Key: 42,
            Value: this.SetForm2.key42,
            Description: 'URL1'
          },
          {
            Key: 43,
            Value: this.SetForm2.key43,
            Description: '请求方式1'
          },
          {
            Key: 44,
            Value: this.SetForm2.key44,
            Description: 'URL2'
          },
          {
            Key: 45,
            Value: this.SetForm2.key45,
            Description: '请求方式2'
          },
          {
            Key: 46,
            Value: this.SetForm2.key46,
            Description: 'URL3'
          },
          {
            Key: 47,
            Value: this.SetForm2.key47,
            Description: '请求方式3'
          },
          {
            Key: 48,
            Value: this.SetForm2.key48,
            Description: 'URL4'
          },
          {
            Key: 49,
            Value: this.SetForm2.key49,
            Description: '请求方式4'
          },
          {
            Key: 50,
            Value: this.SetForm2.key50,
            Description: 'URL5'
          },
          {
            Key: 51,
            Value: this.SetForm2.key51,
            Description: '请求方式5'
          }
        ]
      } else {
        Itembox = [
          {
            Key: 31,
            Value: this.SetForm2.key31,
            Description: '端口'
          },
          {
            Key: 32,
            Value: this.SetForm2.key32,
            Description: '波特率'
          },
          {
            Key: 33,
            Value: this.SetForm2.key33,
            Description: '校验位'
          },
          {
            Key: 34,
            Value: this.SetForm2.key34,
            Description: '数据位'
          },
          {
            Key: 35,
            Value: this.SetForm2.key35,
            Description: '停止位'
          }
        ]
      }
      var obj = {
        SiteID: this.SetForm.SITE_ID,
        MachineDevType: this.SetForm.MachineDevType,
        LinkeType: this.SetForm.LinkeType,
        UserName: this.SetForm.USERNAME,
        ItemList: Itembox
      }
      this.$refs.SetModl[0].validate(
        async (valid, errInfo) => {
          if (valid) {
            const res = await GetPrintTasksData(obj)
            if (res.Result) {
              this.SetForm.DATA_TYPE = 1
              this.websocketonopen()
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
              this.Empty()
              this.SettingoShow = false
            }
          } else {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw new Error(new Date().toLocaleString())
              })
            } catch { }
          }
        })
    },
    // 初始wbesockte
    initWebSocket () {
      if (typeof (WebSocket) === 'undefined') {
        this.websock = new WebSocket('ws://localhost:42738')
      } else {
        this.$message.error('请安装或启动WebSocket插件！')
      }
    },
    // 连接建立之后执行send方法发送数据
    websocketonopen: function () {
      debugger;
      var that = this
      // 站点不相等换了站点重新断开连接
      // && this.StoreSiteId !== that.SetForm.SITE_ID
      if (this.websock) {
        this.websock.close()
      }
      this.websock = new WebSocket('ws://localhost:42738')
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = function (evt) {
        if (evt.type === 'open') {
          var actions = {
            'DATA': that.SetForm.DATA,
            'DATA_TYPE': that.SetForm.DATA_TYPE,
            'LinkeType': that.SetForm.LinkeType,
            'MACHINE_TYPE': that.SetForm.MachineDevType,
            'SITE_ID': that.SetForm.SITE_ID,
            'SN': that.SetForm.SN,
            'USERNAME': that.SetForm.USERNAME,
            'WO_NO': that.SetForm.WO_NO
          }
          // 数据发送
          console.log(actions, '发送数据')
          var Data = JSON.stringify(actions)
          this.StoreSiteId = that.SetForm.SITE_ID
          that.websock.send(Data)
        }
      }
      this.websock.onerror = function (evt) {
        if (evt.type === 'error') {
          that.$message.error(that.$t('DockingStation._10'))
        }
      }
      this.websock.onclose = this.websocketclose
    },
    // 连接建立失败重连
    websocketonerror (evt) {
      if (evt.type === 'error') {
        this.$message.error(this.$t('DockingStation._10'))
      }
    },
    // 数据接收
    websocketonmessage (e) {
      const redata = JSON.parse(e.data)
      console.log(redata, '接受数据')
      this.SetSTATUS = redata.STATUS
      var data = redata.DATA
      redata.DATA = ''
      // 声音设置
      // if (redata.DATA_TYPE === 2) {
      if (redata.RESULT === 0) {
        if (this.SetForm.DATA_TYPE === 1) {
          this.$message({
            showClose: true,
            message: redata.RESULT_MSG,
            type: 'success'
          })
          voice.success()
        }
      } else if (redata.RESULT === 1) {
        if (this.SetForm.DATA_TYPE === 1) {
          this.$message({
            showClose: true,
            message: redata.RESULT_MSG,
            type: 'warning'
          })
          voice.warning()
        }
      } else if (redata.RESULT === 2) {
        if (this.SetForm.DATA_TYPE === 1) {
          this.$message({
            showClose: true,
            message: redata.RESULT_MSG,
            type: 'error'
          })
          voice.error()
        }
      }
      // }
      if (redata.DATA_TYPE === 3) {
        // 实体设备对接页面不需要，其它页面需要
        redata.DATA = data
      }
      this.$emit('SubcultureVal', redata)
      this.Light = true
    },
    // 关闭断开连接
    websocketclose (e) {
    },
    // 按钮断开连接
    websocketclose2 () {
      if (!this.SetSTATUS) {
        this.$message({
          showClose: true,
          message: this.$t('DockingStation._13'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('DockingStation._14'), this.$t('publics.tips.tips'), {
        confirmButtonText: this.$t('publics.tips.confirm'),
        cancelButtonText: this.$t('publics.tips.cancel'),
        type: 'warning'
      })
        .then(() => {
          this.SetForm.DATA_TYPE = 0
          this.websocketonopen()
          this.websocketclose()
        })
        .catch(() => {
        })
    },
    Empty () {
      this.SetForm2 = {
        key11: '',
        key12: '',
        key13: '',
        key14: '',
        key21: '',
        key41: 'N',
        key42: '',
        key43: '',
        key44: '',
        key45: '',
        key46: '',
        key47: '',
        key48: '',
        key49: '',
        key50: '',
        key51: '',
        key31: '',
        key32: '',
        key33: '',
        key34: '',
        key35: ''
      }
      this.SetForm.MachineDevType = ''// 设备
      this.SetForm.LinkeType = '' // 连接类型
    }
  },
  created () {
    this.SetForm.USERNAME = this.userinfo.USER_NAME
    this.GetMachineType()
  }
}
</script>
<style lang="scss">
.equipment {
  .setform {
    display: flex;
    flex-wrap: wrap;
  }
  .setform .el-form-item__label {
    color: #606266 !important;
    font-size: 14px !important;
    padding: 0 0 0px;
  }
}
</style>
