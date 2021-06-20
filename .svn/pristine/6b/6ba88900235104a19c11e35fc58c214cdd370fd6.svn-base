<template>
  <d2-container>
    <!-- <template slot="header">
      <custom-container-header :isFull="true" :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="insertEvent"
        >{{ $t('publics.btn.add') }}</el-button>
      </custom-container-header>
    </template>-->
    <div class="main-oriz-content">
      <el-row>
        <el-col :span="8">
          <div class="tree-block">
            <div
              style="
                display: flex;
                position: sticky;
                top: 0;
                padding-bottom: 10px;
                background: #fff;
                z-index: 99;
              "
            >
              <el-input
                :placeholder="$t('SysOrganize._1')"
                v-model="filterText"
                size="mini"
                class="filter-text"
              ></el-input>
              <el-button
                v-if="$btnList.indexOf('SysOrganizeAdd') !== -1"
                type="text"
                size="mini"
                icon="el-icon-plus"
                @click="insertEvent"
                style="margin-right: 10px"
                >{{ $t("publics.btn.add") }}</el-button
              >
            </div>

            <el-tree
              ref="tree"
              v-loading="treeLoading"
              :data="treeData"
              node-key="ID"
              icon-class="fa fa-pagelines"
              @node-click="getNodeData"
              :props="{
                label: 'ORGANIZE_NAME',
                children: 'children',
              }"
              :filter-node-method="filterNode"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    v-if="$btnList.indexOf('LoadUserOrganizeEdit') !== -1"
                    type="text"
                    size="mini"
                    @click="modify(data)"
                    >{{ $t("SysOrganize._2") }}</el-button
                  >
                  <el-popover
                    v-if="$btnList.indexOf('organizationdelete') !== -1"
                    style="margin-left: 10px"
                    placement="top"
                    width="160"
                    trigger="click"
                    v-model="visible[`remove-${data.ID}`]"
                  >
                    <p>{{ $t("SysOrganize._3") }}</p>
                    <div style="text-align: right; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="visible[`remove-${data.ID}`] = false"
                        >{{ $t("SysOrganize._4") }}</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="
                          () => {
                            visible[`remove-${data.ID}`] = false;
                            makeSureRemoveNode(node, data);
                          }
                        "
                        >{{ $t("SysOrganize._5") }}</el-button
                      >
                    </div>
                    <el-button
                      slot="reference"
                      type="text"
                      size="mini"
                      @click="remove(node, data)"
                      >{{ $t("SysOrganize._6") }}</el-button
                    >
                  </el-popover>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="people-block">
            <vxe-toolbar custom>
              <template v-slot:buttons>
                <custom-container-header
                  :isFull="true"
                  :isExport="false"
                  :isExportTpl="false"
                  :isImport="false"
                >
                  <el-input
                    :disabled="!peopleForm.ORGANIZE_ID"
                    v-model="formData.USER_NAME"
                    :placeholder="$t('SysOrganize._7')"
                    clearable
                  ></el-input>
                  <el-button
                    type="primary"
                    :disabled="!peopleForm.ORGANIZE_ID"
                    icon="el-icon-search"
                    @click.prevent="searchClick"
                    >{{ $t("publics.btn.search") }}</el-button
                  >
                  <el-button
                    v-if="$btnList.indexOf('SaveUserOrganizeAdd') !== -1"
                    type="success"
                    :disabled="!peopleForm.ORGANIZE_ID"
                    icon="el-icon-plus"
                    @click="AddPeople"
                    >{{ $t("publics.btn.add") }}</el-button
                  >
                </custom-container-header>
              </template>
            </vxe-toolbar>
            <div class="table-contax">
              <vxe-table
                ref="xTable"
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
                :loading="loading"
                :data="mainTable"
                :mouse-config="{ selected: true }"
                :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
                :radio-config="{ labelField: 'name', trigger: 'row' }"
                :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
              >
                <vxe-table-column
                  field="USER_NAME"
                  min-width="150"
                  :title="$t('SysOrganize._8')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  field="NICK_NAME"
                  min-width="150"
                  :title="$t('SysOrganize._9')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  field="ORGANIZE_NAME"
                  min-width="250"
                  :title="$t('SysOrganize._10')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  field="STATUS"
                  min-width="150"
                  :title="$t('SysOrganize._11')"
                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
                >
                  <template v-slot:edit="{ row }">
                    <div>
                      <el-switch
                        v-model="row.STATUS"
                        disabled
                        :active-text="$t('publics.btn.yes')"
                        :inactive-text="$t('publics.btn.no')"
                        active-color="#13ce66"
                        inactive-color="#cccccc"
                        active-value="Y"
                        inactive-value="N"
                      />
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  field="CREATOR"
                  min-width="150"
                  :title="$t('SysOrganize._12')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  :title="$t('publics.field.operate')"
                  width="180"
                  align="center"
                  fixed="right"
                >
                  <template v-slot="{ row }">
                    <el-button
                      v-if="$btnList.indexOf('LoadUserOrganizeedit') !== -1"
                      type="primary"
                      @click="editClick(row)"
                      >{{ $t("SysOrganize._2") }}</el-button
                    >
                    <el-button
                      v-if="$btnList.indexOf('PersonnelDelete') !== -1"
                      type="danger"
                      @click="removeClick(row)"
                      >{{ $t("publics.btn.delete") }}</el-button
                    >
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
            <div class="page">
              <el-pagination
                size="mini"
                :current-page="formData.Page"
                :page-size="formData.Limit"
                :page-sizes="[15, 25, 35, 45]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 新增、修改 tree -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="dialogText"
      :visible.sync="dialogVisible1"
      width="30%"
    >
      <div>
        <el-form
          size="mini"
          ref="modifyForm"
          label-position="top"
          :show-message="false"
          :rules="modifyRules"
          :model="modifyForm"
          class="custom-form"
        >
          <el-form-item :label="$t('SysOrganize._13')" prop="ORGANIZE_NAME">
            <el-input
              placeholder=" "
              clearable
              v-model="modifyForm.ORGANIZE_NAME"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('SysOrganize._14')"
            prop="PARENT_ORGANIZE_ID"
          >
            <el-cascader
              v-model="modifyForm.PARENT_ORGANIZE_ID"
              :options="parentTreeList"
              style="width: 100%"
              :show-all-levels="false"
              :props="casProps"
              @change="handleChangeCascader"
            ></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('SysOrganize._15')" prop="ORGANIZE_TYPE_ID">
            <el-select
              :disabled="modifyForm.PARENT_ORGANIZE_ID === void 0"
              v-model="modifyForm.ORGANIZE_TYPE_ID"
              clearable
              filterable
              placeholder=" "
              style="width: 100%"
            >
              <el-option
                v-for="item in typeList"
                :label="item.ORGANIZE_TYPE_NAME"
                :key="item.ID"
                :value="item.ID"
                :disabled="item.ENABLED === 'N'"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('SysOrganize._16')" prop="ENABLED">
            <el-switch
              v-model="modifyForm.ENABLED"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
            />
          </el-form-item>
          <el-form-item :label="$t('SysOrganize._17')" prop="REMARK">
            <el-input
              v-model="modifyForm.REMARK"
              placeholder=" "
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">{{
          $t("SysOrganize._18")
        }}</el-button>
        <el-button type="primary" @click="makeSureModify">{{
          $t("SysOrganize._19")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 人员 新增、修改 modal -->
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="dialogText"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>
        <el-form
          size="mini"
          ref="peopleForm"
          label-position="top"
          :show-message="false"
          :rules="peopleRules"
          :model="peopleForm"
          class="custom-form"
        >
          <el-form-item
            :label="$t('SysOrganize._20')"
            :prop="isModify ? 'MANAGER_ID' : ''"
          >
            <div v-if="!isModify" class="add-peo">
              <div>
                <el-button
                  type="warning"
                  size="mini"
                  @click="openUserChooseList"
                  >{{ $t("SysOrganize._21") }}</el-button
                >
              </div>
              <el-tag
                :key="tag.Id"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
                >{{ tag.User_Name }}</el-tag
              >
            </div>
            <el-select
              v-if="isModify"
              clearable
              style="width: 100%"
              v-model="peopleForm.USER_NAME"
              @change="handleCustomer"
              placeholder=" "
            >
              <!-- 占位元素 -->
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
                  v-model="listQuery.Key"
                  :placeholder="$t('publics.tips.enterKeyWord')"
                ></el-input>
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click.prevent="searchQueryList"
                  >{{ $t("publics.btn.search") }}</el-button
                >
              </div>
              <el-option
                style="width: 600px"
                v-for="item in peopleList"
                :key="item.Id"
                :label="item.User_Name"
                :value="item.Id"
              >
                <span style="float: left">{{ item.User_Name }}</span>
                <span style="float: right">{{ item.Nick_Name }}</span>
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
                  :current-page="listQuery.Page"
                  :page-size="listQuery.Limit"
                  :page-sizes="[10, 20, 30, 40]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="listQuery.totalPage"
                  @size-change="listQuerySizeChange"
                  @current-change="listQueryCurrentChange"
                />
              </div>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('SysOrganize._11')" prop="STATUS">
            <el-switch
              v-model="peopleForm.STATUS"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
            />
          </el-form-item>
          <el-form-item :label="$t('SysOrganize._12')" prop="CREATOR">
            <el-input readonly v-model="peopleForm.CREATOR"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("SysOrganize._18")
        }}</el-button>
        <el-button type="primary" @click="submitPeopleForm">{{
          $t("SysOrganize._19")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 用户多选列表 新增 -->
    <el-dialog
      :title="$t('SysOrganize._21')"
      :close-on-click-modal="false"
      :visible.sync="dialogVisibleUser"
      width="80%"
      center
      style="min-width: 1200px"
      class="custom-dioag-x"
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <div>
          <div>
            <vxe-toolbar>
              <template v-slot:buttons>
                <custom-container-header
                  :isFull="false"
                  :isExport="false"
                  :isExportTpl="false"
                  :isImport="false"
                >
                  <el-input
                    v-model="listQuery.Key"
                    :placeholder="$t('SysOrganize._7')"
                    clearable
                  ></el-input>
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="searchQueryList"
                    >{{ $t("publics.btn.search") }}</el-button
                  >
                </custom-container-header>
              </template>
            </vxe-toolbar>
          </div>
          <div style="height: calc(0.5 * 100vh)">
            <vxe-table
              ref="_xTable"
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
              :data="peopleList"
              :checkbox-config="{ checkMethod: checkMethod }"
            >
              <vxe-table-column
                type="checkbox"
                min-width="60"
              ></vxe-table-column>
              <vxe-table-column
                field="User_Name"
                min-width="150"
                :title="$t('SysOrganize._8')"
              />
              <vxe-table-column
                field="Nick_Name"
                min-width="150"
                :title="$t('SysOrganize._22')"
              />
              <vxe-table-column
                field="Role_Name"
                min-width="150"
                :title="$t('SysOrganize._23')"
              />
            </vxe-table>
          </div>
          <div style="margin-top: 10px">
            <el-pagination
              :pager-count="5"
              :current-page="listQuery.Page"
              :page-size="listQuery.Limit"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listQuery.totalPage"
              @size-change="listQuerySizeChange"
              @current-change="listQueryCurrentChange"
            />
          </div>
        </div>
        <div
          style="
            min-width: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <el-button
            type="primary"
            icon="el-icon-arrow-left"
            @click="removeChecked"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-arrow-right"
            @click="makeSureChecked"
          ></el-button>
        </div>
        <div
          style="
            width: 400px;
            height: calc(100vh * 0.5 + 42px);
            border-radius: 4px;
            border: 1px solid #e5e5e5;
            overflow-y: auto;
          "
        >
          <div
            style="
              padding: 10px;
              background: #fff;
              position: sticky;
              top: 0;
              z-index: 99;
            "
          >
            <el-input
              style="width: 100%"
              v-model="filterCheckedUserText"
              @input="filterCheckedUser"
              :placeholder="$t('SysOrganize._24')"
            ></el-input>
            <el-checkbox
              style="margin-top: 5px"
              label="1"
              @change="checkAll"
              v-model="isAll"
              >{{ $t("SysOrganize._25") }}</el-checkbox
            >
          </div>
          <el-checkbox-group
            v-model="havdCheckUsersList"
            @change="
              () => {
                isAll = isCheckedAll;
              }
            "
          >
            <div
              v-for="tag in checkedUserList"
              :key="tag.Id"
              style="padding: 5px 10px; border-bottom: 1px dashed #e5e5e5"
            >
              <el-checkbox
                style="width: 100%"
                :label="tag"
                class="custom-checkbox"
              >
                <div>
                  <span>{{ tag.User_Name }}</span>
                  <span>{{ tag.Nick_Name }}</span>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUser = false">{{
          $t("SysOrganize._18")
        }}</el-button>
        <el-button type="primary" @click="handleMakeSureCheckUser">{{
          $t("SysOrganize._19")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { cloneDeep } from 'lodash'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  LoadTreeData,
  ItemIsByUsed,
  SaveData,
  TypeLoadData,
  LoadUserOrganize,
  SaveUserOrganize,
  ManagerLoadData
} from '@/api/SysOrganize'
import { mapGetters } from 'vuex'
export default {
  name: 'SysOrganize',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo']),
    isCheckedAll () {
      return !!(
        this.defaultCheckedUserList.length &&
        this.havdCheckUsersList.length === this.defaultCheckedUserList.length
      )
    }
  },
  data () {
    return {
      treeLoading: false,
      treeData: [],
      filterText: '',
      visible: {},
      dialogVisible: false,
      dialogVisible1: false,
      dialogText: '',
      modifyForm: {},
      typeList: [],
      defaultTypeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      parentTreeList: [],
      planData: [],
      modifyRules: {
        ORGANIZE_NAME: [
          {
            required: true,
            message: this.$t('SysOrganize._26'),
            trigger: 'blur'
          }
        ],
        ORGANIZE_TYPE_ID: [
          {
            required: true,
            message: this.$t('SysOrganize._27'),
            trigger: 'change'
          }
        ],
        PARENT_ORGANIZE_ID: [
          {
            required: true,
            message: this.$t('SysOrganize._28'),
            trigger: 'change'
          }
        ]
      },
      formData: {
        USER_NAME: '',
        Page: 1,
        Limit: 15,
        Key: ''
      },
      loading: false,
      mainTable: [],
      totalPage: 0,
      peopleForm: {},
      peopleRules: {
        MANAGER_ID: [
          {
            required: true,
            message: this.$t('SysOrganize._29'),
            trigger: 'blur'
          }
        ],
        CREATOR: [
          {
            required: true,
            message: this.$t('SysOrganize._30'),
            trigger: 'blur'
          }
        ],
        ORGANIZE_ID: [
          {
            required: true,
            message: this.$t('SysOrganize._31'),
            trigger: 'blur'
          }
        ]
      },
      listQuery: {
        Page: 1,
        Limit: 10,
        Key: '',
        totalPage: 0
      },
      peopleList: [],
      isModify: false,
      dynamicTags: [],
      dialogVisibleUser: false,
      checkedUserList: [],
      defaultCheckedUserList: [],
      checkedIds: [],
      havdCheckUsersList: [],
      filterCheckedUserText: '',
      isAll: ''
    }
  },
  methods: {
    // 正反选全选
    checkAll (e) {
      if (e) {
        this.havdCheckUsersList = this.defaultCheckedUserList
      } else {
        this.havdCheckUsersList = []
      }
    },
    // 确定方法
    handleMakeSureCheckUser () {
      this.dynamicTags = this.checkedUserList
      this.dialogVisibleUser = false
    },
    filterCheckedUser (e) {
      this.checkedUserList = []
      this.defaultCheckedUserList.map((item) => {
        if (item.User_Name.indexOf(e) !== -1) {
          this.checkedUserList.push(item)
        } else if (item.Nick_Name.indexOf(e) !== -1) {
          this.checkedUserList.push(item)
        }
      })
    },
    checkMethod ({ row }) {
      return row.ENABLED === 'Y'
    },
    makeSureChecked () {
      // 获取选中的数据
      const arr = this.$refs._xTable.getCheckboxRecords()
      arr.map((item) => {
        if (this.checkedIds.indexOf(item.Id) === -1) {
          this.checkedIds.push(item.Id)
          this.defaultCheckedUserList.push(item)
        }
      })
      if (!this.filterCheckedUserText) {
        this.checkedUserList = this.defaultCheckedUserList
      }
      // 清空所有行的选中状态
      this.$refs._xTable.setAllCheckboxRow(false)
      this.isAll = this.isCheckedAll
    },
    openUserChooseList () {
      this.dialogVisibleUser = true
    },
    removeChecked () {
      const arr = []
      this.defaultCheckedUserList.map((_item, index) => {
        this.havdCheckUsersList.map((item) => {
          if (_item.Id === item.Id) {
            arr.push(_item.Id)
          }
        })
      })
      let res = []
      this.checkedIds = []
      this.defaultCheckedUserList.map((item) => {
        if (arr.indexOf(item.Id) === -1) {
          res.push(item)
          this.checkedIds.push(item.Id)
        }
      })
      this.havdCheckUsersList = []
      this.defaultCheckedUserList = res
      this.filterCheckedUserText = ''
      this.checkedUserList = res
      this.isAll = this.isCheckedAll
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.havdCheckUsersList = []
      this.havdCheckUsersList.push(tag)
      this.removeChecked()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.ORGANIZE_NAME.indexOf(value) !== -1
    },
    resetPageData () {
      this.treeData = []
      this.dialogText = ''
      this.parentTreeList = []
      this.planData = []
      this.dialogVisible1 = false
      this.dialogVisible = false
      this.visible = {}
      this.getLoadTreeData()
      this.getLoadData()
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadTreeData()
        this.getLoadData()
        this.getTypeLoadData()
        this.getPeopleLoadData()
      }
    },
    async getLoadData () {
      const res = await LoadData({
        Page: 1,
        Limit: 100000000
      })
      this.planData = res.Result || []
      this.parentTreeList = [
        {
          ENABLED: 'Y',
          ID: 0,
          ORGANIZE_NAME: this.$t('SysOrganize._32'),
          PARENT_ORGANIZE_ID: 0
        }
      ].concat(res.Result ? this.getTree(res.Result) : [])
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      let arr = []
      data.map((item) => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    async getTypeLoadData () {
      const res = await TypeLoadData({
        Page: 1,
        Limit: 1000000
      })
      this.typeList = res.Result || []
      this.defaultTypeList = res.Result || []
    },
    async getLoadTreeData () {
      this.treeLoading = true
      const res = await LoadTreeData()
      this.treeLoading = false
      this.treeData = res.Result || []
    },
    // 新增树状节点
    insertEvent () {
      this.dialogVisible1 = true
      this.modifyForm = {
        ENABLED: 'N'
      }
      this.dialogText = this.$t('SysOrganize._33')
    },
    // 删除树状节点
    remove (node, data) {
      Object.keys(this.visible).forEach((item) => {
        this.visible[item] = false
      })
    },
    async makeSureRemoveNode (node, data) {
      const res = await ItemIsByUsed(data.ID)
      if (res.Result === void 0) {
        return false
      }
      if (res.Result) {
        this.$message.error(this.$t('publics.tips.isInUsed'))
        return false
      }
      const _res = await SaveData({
        RemoveRecords: [data]
      })
      if (_res.Result) {
        this.$notify({
          title: this.$t('ssc._12'),
          message: this.$t('ssc._19'),
          type: 'success',
          duration: 2000
        })
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex((d) => d.ID === data.ID)
        children.splice(index, 1)
        this.getLoadData()
      }
    },
    // 修改树状节点
    modify (data) {
      Object.keys(this.visible).forEach((item) => {
        this.visible[item] = false
      })
      this.dialogVisible1 = true
      const _data = this.planData.filter((item) => item.ID === data.ID)
      this.modifyForm = cloneDeep(_data?.[0] || {})
      this.dialogText = this.$t('SysOrganize._34')
    },
    handleChangeCascader (e) {
      if (e && e.length) {
        this.modifyForm.PARENT_ORGANIZE_ID = e[e.length - 1]
      }
    },
    makeSureModify () {
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          let form = {}
          if (this.modifyForm.ID) {
            if (
              parseInt(this.modifyForm.PARENT_ORGANIZE_ID) ===
              parseInt(this.modifyForm.ID)
            ) {
              this.$message.error(this.$t('SysOrganize._36'))
              return false
            }
            form.UpdateRecords = [
              {
                ID: this.modifyForm.ID,
                ORGANIZE_NAME: this.modifyForm.ORGANIZE_NAME,
                ORGANIZE_TYPE_ID: this.modifyForm.ORGANIZE_TYPE_ID,
                PARENT_ORGANIZE_ID: this.modifyForm.PARENT_ORGANIZE_ID,
                ENABLED: this.modifyForm.ENABLED,
                REMARK: this.modifyForm.REMARK,
                User_Name: this.userinfo.USER_NAME
              }
            ]
          } else {
            form.InsertRecords = [
              {
                ID: 0,
                ORGANIZE_NAME: this.modifyForm.ORGANIZE_NAME,
                ORGANIZE_TYPE_ID: this.modifyForm.ORGANIZE_TYPE_ID,
                PARENT_ORGANIZE_ID: this.modifyForm.PARENT_ORGANIZE_ID,
                ENABLED: this.modifyForm.ENABLED,
                REMARK: this.modifyForm.REMARK,
                User_Name: this.userinfo.USER_NAME
              }
            ]
          }
          const res = await SaveData(form)
          if (res.Result) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
            this.resetPageData()
          }
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
    async getPeopleList () {
      this.loading = true
      const res = await LoadUserOrganize(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    searchClick () {
      this.formData.Page = 1
      this.getPeopleList()
    },
    AddPeople () {
      this.dialogVisible = true
      this.dialogText = this.$t('SysOrganize._33')
      this.peopleForm = {}
      this.peopleForm.ORGANIZE_ID = this.formData.ORGANIZE_ID
      this.peopleForm.CREATOR = this.userinfo.USER_NAME
      this.listQuery.Page = 1
      this.listQuery.Key = ''
      this.isModify = false
      this.dynamicTags = []
      this.dialogVisibleUser = false
      this.checkedUserList = []
      this.defaultCheckedUserList = []
      this.checkedIds = []
      this.havdCheckUsersList = []
      this.filterCheckedUserText = ''
      this.isAll = ''
      this.getPeopleLoadData()
    },
    editClick (row) {
      this.dialogVisible = true
      this.dialogText = this.$t('SysOrganize._2')
      this.peopleForm = cloneDeep(row)
      this.listQuery.Page = 1
      this.listQuery.Key = ''
      this.isModify = true
      this.getPeopleLoadData()
    },
    async removeClick (row) {
      if (
        row &&
        (await this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).catch((_) => {
          /** 取消 */
        }))
      ) {
        let form = {
          RemoveRecords: [row]
        }
        const res = await SaveUserOrganize(form)
        if (res.Result) {
          this.$notify({
            title: this.$t('ssc._12'),
            message: this.$t('ssc._19'),
            type: 'success',
            duration: 2000
          })
          this.resetRight()
        }
      }
    },
    getNodeData (data) {
      this.formData.ORGANIZE_ID = data.ID
      this.formData.Page = 1
      this.USER_NAME = ''
      this.peopleForm = {}
      this.peopleForm.ORGANIZE_ID = data.ID
      this.getPeopleList()
    },
    // 获取人员列表方法
    async getPeopleLoadData () {
      const res = await ManagerLoadData(this.listQuery)
      this.peopleList = res.Result || []
      this.listQuery.totalPage = res.TotalCount || 0
      if (!this.peopleList.length) {
        this.peopleList.push({})
      }
    },
    searchQueryList () {
      this.listQuery.Page = 1
      this.getPeopleLoadData()
    },
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getPeopleLoadData()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getPeopleLoadData()
    },
    handleCustomer (e) {
      this.peopleList.map((item) => {
        if (item.Id === e) {
          this.peopleForm.USER_NAME = item.User_Name
          this.peopleForm.NICK_NAME = item.Nick_Name
          this.peopleForm.MANAGER_ID = item.Id
        }
      })
    },
    async submitPeopleForm () {
      if (!this.isModify) {
        this.peopleForm.MANAGER_ID = []
        this.peopleForm.MANAGER_ID = this.dynamicTags.map((item) => {
          return item.Id
        })
        if (!this.peopleForm.MANAGER_ID.length) {
          this.$message.error(this.$t('SysOrganize._35'))
          return false
        }
      }
      this.$refs.peopleForm.validate(async (valid, errInfo) => {
        if (valid) {
          let form = {}
          if (this.peopleForm.ID) {
            form.UpdateRecords = [
              {
                ID: this.peopleForm.ID,
                MANAGER_ID: this.peopleForm.MANAGER_ID,
                ORGANIZE_ID: this.peopleForm.ORGANIZE_ID,
                CREATOR: this.peopleForm.CREATOR,
                END_DATE: this.peopleForm.END_DATE,
                STATUS: this.peopleForm.STATUS || 'N'
              }
            ]
          } else {
            form.InsertRecords = [
              ...this.peopleForm.MANAGER_ID.map((item) => {
                return {
                  ID: 0,
                  MANAGER_ID: item,
                  ORGANIZE_ID: this.peopleForm.ORGANIZE_ID,
                  CREATOR: this.peopleForm.CREATOR,
                  END_DATE: this.peopleForm.END_DATE,
                  STATUS: this.peopleForm.STATUS || 'N'
                }
              })
            ]
          }
          const res = await SaveUserOrganize(form)
          if (res.Result) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
            this.resetRight()
          }
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
    resetRight () {
      this.dialogVisible = false
      this.mainTable = []
      this.getPeopleList()
    },
    handleSizeChange (Limit) {
      this.formData.Limit = Limit
      // this.listQuery.Page = 1
      this.getPeopleList()
    },
    handleCurrentChange (Page) {
      this.formData.Page = Page
      this.getPeopleList()
    }
  },
  created () {
    this.getIndex()
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    'modifyForm.PARENT_ORGANIZE_ID' (val) {
      let ORDER_ID = 0
      this.defaultTypeList.map((item) => {
        if (item.ID === val) {
          ORDER_ID = item.ORDER_ID
        }
      })
      this.typeList = this.defaultTypeList.filter(
        (item) => item.ORDER_ID > ORDER_ID
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.tree-block {
  position: relative;
  padding: 5px;
  border: 1px solid rgb(221, 223, 230);
  border-radius: 4px;
  height: calc(100vh - 60px - 41px - 20px);
  box-sizing: border-box;
  overflow-y: auto;
}

.main-oriz-content {
  height: calc(100vh - 60px - 41px - 20px);
}

.people-block {
  height: calc(100vh - 60px - 41px - 20px);
  margin: 0 0 0 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid rgb(221, 223, 230);
  box-sizing: border-box;
  .table-contax {
    height: calc(100% - 52px - 37px);
  }
  .page {
    padding: 5px 0 0 0;
  }
}
</style>
<style>
/* .filter-text {
  margin-right: 0 !important;
} */
.x-inpt {
  margin-right: 0 !important;
}

.add-peo .el-tag {
  margin-right: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.custom-dioag-x .el-dialog {
  margin-top: 5vh !important;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  width: 100%;
}
.custom-checkbox .el-checkbox__label {
  flex: 1;
}
.custom-checkbox .el-checkbox__label > div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
