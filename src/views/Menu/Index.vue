<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <!-- BS菜单的按钮组 -->
        <div v-if="activeName === 'first'">
          <el-button
            v-if="$btnList.indexOf('MenuAdd') !== -1"
            type="success"
            icon="el-icon-plus"
            @click="handlerAdd"
            :disabled="addOrModifyFlag"
            >{{ $t("publics.btn.add") }}</el-button
          >
          <el-button
            v-if="$btnList.indexOf('MenuEdit') !== -1"
            type="primary"
            icon="el-icon-edit"
            @click="handlerEdit"
            :disabled="addOrModifyFlag"
            >{{ $t("publics.btn.edit") }}</el-button
          >
          <el-button
            v-if="$btnList.indexOf('MenuDelete') !== -1"
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteTreeNode"
            :disabled="addOrModifyFlag"
            >{{ $t("publics.btn.delete") }}</el-button
          >
          <el-button
            v-if="$btnList.indexOf('MenuSave') !== -1"
            type="primary"
            icon="el-icon-check"
            @click="handleSave"
            :disabled="!addOrModifyFlag"
            >{{ $t("publics.btn.save") }}</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-close"
            @click="handleCancel"
            :disabled="!addOrModifyFlag"
            >{{ $t("publics.btn.cancel") }}</el-button
          >
        </div>
        <!-- PAD端菜单的按钮组 -->
        <div v-if="activeName === 'second'">
          <el-button
            type="success"
            icon="el-icon-plus"
            @click="handlerAdd"
            :disabled="addOrModifyFlag"
            >{{ $t("publics.btn.add") }}</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="handlerEditPAD"
            :disabled="addOrModifyFlag"
            >{{ $t("publics.btn.edit") }}</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteTreeNodePAD"
            :disabled="addOrModifyFlag"
            >{{ $t("publics.btn.delete") }}</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-check"
            @click="handleSavePAD"
            :disabled="!addOrModifyFlag"
            >{{ $t("publics.btn.save") }}</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-close"
            @click="handleCancel"
            :disabled="!addOrModifyFlag"
            >{{ $t("publics.btn.cancel") }}</el-button
          >
        </div>
      </custom-container-header>
    </template>
    <!-- 菜单tabs -->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="网页端菜单" name="first">
        <el-row>
          <el-col :span="6">
            <div
              class="grid-content bg-purple"
              style="height: calc(100vh - 60px - 41px - 54px - 22px)"
            >
              <el-input
                v-model="filterText"
                :placeholder="$t('Menu.Enkeyfilter')"
                class="myFilterInput"
              />
              <el-tree
                v-if="fleshTree"
                :draggable="false"
                highlight-current
                :expand-on-click-node="false"
                ref="menuTree"
                class="filter-tree Menu-table-dev"
                :data="treeData"
                node-key="Id"
                check-on-click-node
                :props="defaultProps"
                :filter-node-method="filterNode"
                default-expand-all
                @node-click="getNodeData"
              />
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light" style="margin-left: 20px">
              <el-card
                ref="card1"
                class="box-card"
                :body-style="{
                  padding: '10px 10px',
                }"
              >
                <el-form
                  ref="form"
                  :disabled="!addOrModifyFlag"
                  :show-message="false"
                  label-width="150px"
                  label-position="right"
                  :rules="rules"
                  :model="form"
                >
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item
                        :label="$t('Menu.CallAlias')"
                        prop="Menu_Code"
                      >
                        <el-input
                          v-model="form.Menu_Code"
                          :placeholder="$t('Menu.askCallAlias')"
                        />
                      </el-form-item>
                      <el-form-item
                        :label="$t('Menu.ShowName')"
                        prop="Menu_Name"
                      >
                        <el-input
                          v-model="form.Menu_Name"
                          :placeholder="$t('Menu.askname')"
                        />
                      </el-form-item>
                      <el-form-item :label="$t('Menu.en_name')" prop="MENU_EN">
                        <el-input
                          v-model="form.MENU_EN"
                          :placeholder="$t('Menu.en_name_tips')"
                        />
                      </el-form-item>
                      <el-form-item
                        :label="$t('Menu.Superior')"
                        prop="Parent_Id"
                      >
                        <el-cascader
                          v-if="fleshTree"
                          v-model="form.Parent_Id"
                          :options="superior"
                          style="width: 100%"
                          :show-all-levels="false"
                          :props="casProps"
                          @change="handleChange"
                        ></el-cascader>
                      </el-form-item>
                      <el-form-item
                        :label="$t('Menu.menuiocn')"
                        prop="Icon_Url"
                      >
                        <el-input
                          v-model="form.Icon_Url"
                          :placeholder="$t('Menu.askmenuiocn')"
                        />
                      </el-form-item>
                      <el-form-item
                        :label="$t('Menu.linkaddress')"
                        prop="Link_Url"
                      >
                        <el-input
                          v-model="form.Link_Url"
                          :placeholder="$t('Menu.asklinkaddress')"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('Menu.Target')" prop="Target">
                        <el-select
                          v-model="form.Target"
                          class="filter-item"
                          :placeholder="$t('Menu.askTarget')"
                          style="width: 100%"
                        >
                          <el-option key="_self" label="_self" value="_self" />
                          <el-option
                            key="_blank"
                            label="_blank"
                            value="_blank"
                          />
                        </el-select>
                      </el-form-item>
                      <el-form-item :label="$t('Menu.Sorting')" prop="Sort">
                        <el-input
                          v-model="form.Sort"
                          :placeholder="$t('Menu.askSorting')"
                        />
                      </el-form-item>
                      <el-form-item label="列数" prop="COLUMNS">
                        <el-input
                          v-model="form.COLUMNS"
                          type="number"
                          placeholder=" "
                        ></el-input>
                      </el-form-item>
                      <el-form-item
                        :label="$t('Menu.systemDefault')"
                        prop="Is_System"
                      >
                        <el-radio
                          v-model="form.Is_System"
                          :value="form.Is_System"
                          label="N"
                          >{{ $t("Menu.no") }}</el-radio
                        >
                        <el-radio
                          v-model="form.Is_System"
                          :value="form.Is_System"
                          label="Y"
                          >{{ $t("Menu.yes") }}</el-radio
                        >
                      </el-form-item>
                      <el-form-item
                        :label="$t('Menu.WhetherExpand')"
                        prop="Spread"
                      >
                        <el-radio
                          v-model="form.Spread"
                          :value="form.Spread"
                          label="N"
                          >{{ $t("Menu.no") }}</el-radio
                        >
                        <el-radio
                          v-model="form.Spread"
                          :value="form.Spread"
                          label="Y"
                          >{{ $t("Menu.yes") }}</el-radio
                        >
                      </el-form-item>
                      <el-form-item
                        :label="$t('Menu.Whethershow')"
                        prop="ENABLED"
                      >
                        <el-radio
                          v-model="form.ENABLED"
                          :value="form.ENABLED"
                          label="N"
                          >{{ $t("Menu.no") }}</el-radio
                        >
                        <el-radio
                          v-model="form.ENABLED"
                          :value="form.ENABLED"
                          label="Y"
                          >{{ $t("Menu.yes") }}</el-radio
                        >
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
              <el-card
                style="margin-top: 10px"
                :style="{
                  height: `calc(100vh - ${card2Height}px)`,
                }"
                :body-style="{
                  padding: '10px 10px',
                }"
              >
                <div>
                  <span
                    class="demonstration"
                    style="
                      display: block;
                      color: #606266;
                      font-size: 14px;
                      margin: 0 0 10px;
                    "
                    >{{ $t("Menu.Button") }}</span
                  >
                  <el-button
                    icon="el-icon-circle-plus"
                    type="primary"
                    :disabled="
                      addOrMidifyStatus !== 'edit' && !otherForm.Parent_Id
                    "
                    @click="handleAddBtn"
                    >{{ $t("Menu.addBtn") }}</el-button
                  >
                </div>
                <div
                  :style="{
                    height: `calc(100vh - ${card2Height}px - 31px - 32px - 30px)`,
                    marginTop: '10px',
                  }"
                >
                  <vxe-table
                    ref="xTable"
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
                  >
                    <vxe-table-column
                      field="Menu_Name"
                      :title="$t('Menu.Buttonalready')"
                    />
                    <vxe-table-column :title="$t('Menu.actions')">
                      <template slot-scope="scope">
                        <el-button
                          v-if="$btnList.indexOf('MenubtnEdit') !== -1"
                          size="small"
                          type="success"
                          :disabled="!addOrModifyFlag"
                          @click="handleUpdate(scope.row)"
                          >{{ $t("Menu.Editbutton") }}</el-button
                        >
                        <el-button
                          v-if="$btnList.indexOf('MenubtnDeleteSub') !== -1"
                          size="small"
                          type="danger"
                          :disabled="!addOrModifyFlag"
                          @click="handleDelete(scope.row)"
                          >{{ $t("Menu.Deletebutton") }}</el-button
                        >
                      </template>
                    </vxe-table-column>
                  </vxe-table>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="平板端菜单" name="second">
        <el-row>
          <el-col :span="6">
            <div
              class="grid-content bg-purple"
              style="height: calc(100vh - 60px - 41px - 54px - 22px)"
            >
              <el-input
                v-model="filterTextPAD"
                :placeholder="$t('Menu.Enkeyfilter')"
                class="myFilterInput"
              />
              <el-tree
                v-if="fleshTree"
                :draggable="false"
                highlight-current
                :expand-on-click-node="false"
                ref="menuTreePAD"
                class="filter-tree Menu-table-dev"
                :data="treeDataPAD"
                node-key="Id"
                check-on-click-node
                :props="defaultPropsPAD"
                :filter-node-method="filterNodePAD"
                default-expand-all
                @node-click="getNodeDataPAD"
              />
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light" style="margin-left: 20px">
              <el-card
                ref="card1"
                class="box-card"
                :body-style="{
                  padding: '10px 10px',
                }"
              >
                <el-form
                  ref="formPAD"
                  :disabled="!addOrModifyFlag"
                  :show-message="false"
                  label-width="150px"
                  label-position="right"
                  :rules="rulesPAD"
                  :model="formPAD"
                >
                  <el-row :gutter="24">
                    <el-col :span="12">
                      <el-form-item :label="'调用别名'" prop="MENU_CODE">
                        <el-input v-model="formPAD.MENU_CODE"></el-input>
                      </el-form-item>
                      <el-form-item :label="'中文名称'" prop="MENU_NAME">
                        <el-input v-model="formPAD.MENU_NAME"></el-input>
                      </el-form-item>
                      <el-form-item :label="'英文名称'" prop="MENU_EN">
                        <el-input v-model="formPAD.MENU_EN"></el-input>
                      </el-form-item>
                      <el-form-item :label="'上级菜单'" prop="P_ID">
                        <el-cascader
                          v-if="fleshTree"
                          v-model="formPAD.P_ID"
                          :options="superiorPAD"
                          style="width: 100%"
                          :show-all-levels="false"
                          :props="casPropsPAD"
                          @change="handleChangePAD"
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="'链接地址'" prop="LINK_URL">
                        <el-input v-model="formPAD.LINK_URL"></el-input>
                      </el-form-item>
                      <el-form-item :label="'排序'" prop="SORT">
                        <el-input
                          v-model="formPAD.SORT"
                          type="number"
                        ></el-input>
                      </el-form-item>
                      <el-form-item :label="'是否启用'" prop="IS_ENABLED">
                        <el-radio v-model="formPAD.IS_ENABLED" label="N">{{
                          $t("Menu.no")
                        }}</el-radio>
                        <el-radio v-model="formPAD.IS_ENABLED" label="Y">{{
                          $t("Menu.yes")
                        }}</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-card>
              <el-card
                style="margin-top: 10px"
                :style="{
                  height: `calc(100vh - ${card2Height}px)`,
                }"
                :body-style="{
                  padding: '10px 10px',
                }"
              >
                <div>
                  <span
                    class="demonstration"
                    style="
                      display: block;
                      color: #606266;
                      font-size: 14px;
                      margin: 0 0 10px;
                    "
                    >按钮</span
                  >
                  <el-button
                    icon="el-icon-circle-plus"
                    type="primary"
                    :disabled="
                      addOrMidifyStatus !== 'edit' && !otherFormPAD.P_ID
                    "
                    @click="handleAddBtnPAD"
                    >添加按钮</el-button
                  >
                </div>
                <div
                  :style="{
                    height: `calc(100vh - ${card2Height}px - 31px - 32px - 30px)`,
                    marginTop: '10px',
                  }"
                >
                  <vxe-table
                    ref="xTablePAD"
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
                    :data="mainTablePAD"
                  >
                    <vxe-table-column
                      :field="$i18n.locale === 'en' ? 'MENU_EN' : 'MENU_NAME'"
                      :title="'已有按钮'"
                    >
                    </vxe-table-column>
                    <vxe-table-column :title="'操作'">
                      <template slot-scope="scope">
                        <div>
                          <el-button
                            size="small"
                            type="success"
                            :disabled="!addOrModifyFlag"
                            @click="handleUpdatePAD(scope.row)"
                            >编辑</el-button
                          >
                          <el-button
                            size="small"
                            type="danger"
                            :disabled="!addOrModifyFlag"
                            @click="handleDeletePAD(scope.row)"
                            >删除</el-button
                          >
                        </div>
                      </template>
                    </vxe-table-column>
                  </vxe-table>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- 按钮 Add or Modify -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="titleText"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="otherForm"
        :show-message="false"
        :model="otherForm"
        :rules="otherRules"
        label-width="120px"
        :close-on-click-modal="false"
      >
        <el-form-item :label="$t('Menu.Menucode')" prop="Menu_Code">
          <el-input
            v-model="otherForm.Menu_Code"
            :placeholder="$t('Menu.askMenucode')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.ShowName')" prop="Menu_Name">
          <el-input
            v-model="otherForm.Menu_Name"
            :placeholder="$t('Menu.askname')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.en_name')" prop="MENU_EN">
          <el-input
            v-model="otherForm.MENU_EN"
            :placeholder="$t('Menu.en_name_tips')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.linkaddress')" prop="Link_Url">
          <el-input
            v-model="otherForm.Link_Url"
            :placeholder="$t('Menu.asklinkaddress')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.Whethershow')" prop="ENABLED">
          <el-radio
            v-model="otherForm.ENABLED"
            :value="otherForm.ENABLED"
            label="N"
            >{{ $t("Menu.no") }}</el-radio
          >
          <el-radio
            v-model="otherForm.ENABLED"
            :value="otherForm.ENABLED"
            label="Y"
            >{{ $t("Menu.yes") }}</el-radio
          >
        </el-form-item>
        <el-form-item :label="$t('Menu.Sorting')" prop="Sort">
          <el-input
            v-model="otherForm.Sort"
            :placeholder="$t('Menu.askSorting')"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" icon="el-icon-minus" type="danger">{{
          $t("Menu.cancel")
        }}</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="create">{{
          $t("Menu.confirm")
        }}</el-button>
      </div>
    </el-dialog>

    <!-- 平板端按钮 新增或修改 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="titleTextPAD"
      :visible.sync="dialogFormVisiblePAD"
    >
      <el-form
        ref="otherFormPAD"
        :show-message="false"
        :model="otherFormPAD"
        :rules="otherRulesPAD"
        label-width="120px"
        :close-on-click-modal="false"
      >
        <el-form-item :label="$t('Menu.Menucode')" prop="MENU_CODE">
          <el-input
            v-model="otherFormPAD.MENU_CODE"
            :placeholder="$t('Menu.askMenucode')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.ShowName')" prop="MENU_NAME">
          <el-input
            v-model="otherFormPAD.MENU_NAME"
            :placeholder="$t('Menu.askname')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.en_name')" prop="MENU_EN">
          <el-input
            v-model="otherFormPAD.MENU_EN"
            :placeholder="$t('Menu.en_name_tips')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.linkaddress')" prop="LINK_URL">
          <el-input
            v-model="otherFormPAD.LINK_URL"
            :placeholder="$t('Menu.asklinkaddress')"
          />
        </el-form-item>
        <el-form-item :label="$t('Menu.Whethershow')" prop="ENABLED">
          <el-radio
            v-model="otherFormPAD.ENABLED"
            :value="otherFormPAD.ENABLED"
            label="N"
            >{{ $t("Menu.no") }}</el-radio
          >
          <el-radio
            v-model="otherFormPAD.ENABLED"
            :value="otherFormPAD.ENABLED"
            label="Y"
            >{{ $t("Menu.yes") }}</el-radio
          >
        </el-form-item>
        <el-form-item :label="$t('Menu.Sorting')" prop="SORT">
          <el-input
            v-model="otherFormPAD.SORT"
            :placeholder="$t('Menu.askSorting')"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelPAD" icon="el-icon-minus" type="danger">{{
          $t("Menu.cancel")
        }}</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="createPAD">{{
          $t("Menu.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import customContainerHeader from '@/components/custom-container-header'
import {
  getmenu,
  AddOrModifySave,
  MenuDelete,
  IsExistsLinkUrl,
  getLoadDataSub,
  DeleteSub,
  AddOrModifySubSave
} from '@/api/sys.menu'
import {
  // eslint-disable-next-line
  LoadData as _LoadData,
  // eslint-disable-next-line
  SaveData as _SaveData,
} from '@/api/MesPadClientMenus'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
export default {
  name: 'menuIndex',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['username'])
  },
  data () {
    const checkPid = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error('请选择上级菜单'))
      }
      callback()
    }
    return {
      fleshTree: true,
      defaultProps: {
        children: 'children',
        label: this.$i18n.locale === 'en' ? 'MENU_EN' : 'Menu_Name'
      },
      defaultPropsPAD: {
        children: 'children',
        label: this.$i18n.locale === 'en' ? 'MENU_EN' : 'MENU_NAME'
      },
      casProps: {
        label: this.$i18n.locale === 'en' ? 'MENU_EN' : 'Menu_Name',
        value: 'Id',
        children: 'children',
        checkStrictly: true
      },
      casPropsPAD: {
        label: this.$i18n.locale === 'en' ? 'MENU_EN' : 'MENU_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      dialogFormVisible: false,
      dialogFormVisiblePAD: false,
      titleTextPAD: '',
      titleText: '',
      mainTable: [],
      loading: false,
      superior: [],
      superiorPAD: [],
      treeData: [],
      filterText: '',
      filterTextPAD: '',
      form: {},
      rules: {
        Menu_Code: [
          {
            required: true,
            message: this.$t('Menu.askCallAlias'),
            trigger: 'blur'
          }
        ],
        Menu_Name: [
          {
            required: true,
            message: this.$t('Menu.askname'),
            trigger: 'blur'
          }
        ],
        MENU_EN: [
          {
            required: true,
            message: this.$t('Menu.en_name_tips'),
            trigger: 'blur'
          }
        ],
        Parent_Id: [
          {
            required: true,
            message: this.$t('Menu.askupper'),
            trigger: 'blur'
          }
        ],
        Link_Url: [
          {
            required: true,
            message: this.$t('Menu.asklinkaddress'),
            trigger: 'blur'
          }
        ],
        Target: [
          {
            required: true,
            message: this.$t('Menu.sakwindow'),
            trigger: 'blur'
          }
        ]
      },
      card2Height: 0,
      addOrModifyFlag: false,
      addOrMidifyStatus: '',
      // 按钮相关
      otherForm: {},
      otherFormPAD: {},
      otherRules: {
        Menu_Code: [
          {
            required: true,
            message: this.$t('Menu.askMenucode'),
            trigger: 'blur'
          }
        ],
        Menu_Name: [
          {
            required: true,
            message: this.$t('Menu.askname'),
            trigger: 'blur'
          }
        ],
        MENU_EN: [
          {
            required: true,
            message: this.$t('Menu.en_name_tips'),
            trigger: 'blur'
          }
        ],
        Link_Url: [
          {
            required: true,
            message: this.$t('Menu.asklinkaddress'),
            trigger: 'blur'
          }
        ]
      },
      otherRulesPAD: {
        MENU_CODE: [
          {
            required: true,
            message: this.$t('Menu.askMenucode'),
            trigger: 'blur'
          }
        ],
        MENU_NAME: [
          {
            required: true,
            message: this.$t('Menu.askname'),
            trigger: 'blur'
          }
        ],
        MENU_EN: [
          {
            required: true,
            message: this.$t('Menu.en_name_tips'),
            trigger: 'blur'
          }
        ],
        LINK_URL: [
          {
            required: true,
            message: this.$t('Menu.asklinkaddress'),
            trigger: 'blur'
          }
        ]
      },
      activeName: 'first',
      treeDataPAD: [],
      rulesPAD: {
        MENU_CODE: [
          {
            required: true,
            message: '请输入调用别名',
            trigger: 'blur'
          }
        ],
        MENU_NAME: [
          {
            required: true,
            message: '请输入中文名称',
            trigger: 'blur'
          }
        ],
        MENU_EN: [
          {
            required: true,
            message: '请输入英文名称',
            trigger: 'blur'
          }
        ],
        P_ID: [
          {
            required: true,
            validator: checkPid,
            trigger: 'blur'
          }
        ],
        LINK_URL: [
          {
            required: true,
            message: '请输入链接地址',
            trigger: 'blur'
          }
        ]
      },
      formPAD: {},
      mainTablePAD: []
    }
  },
  methods: {
    getCardHeight () {
      const card1 = this.$refs.card1.$el.offsetHeight
      this.card2Height = 60 + 44 + 53 + 30 + card1
    },
    // 获取菜单列表
    async getList () {
      const response = await getmenu()
      if (response.Result) {
        this.treeData = JSON.parse(response.Result)
        const data = JSON.parse(response.Result)
        // eslint-disable-next-line no-inner-declarations
        function getTree (data) {
          return data.map((item) => {
            if (item.children && item.children.length > 0) {
              item.children = getTree(item.children)
            } else {
              item.children = null
            }
            return item
          })
        }
        this.superior = getTree(data)
        this.superior.unshift({
          children: null,
          Parent_Id: 0,
          Id: 0,
          Menu_Name: '顶级菜单',
          MENU_EN: 'Top menu'
        })
      } else {
        this.treeData = []
      }
    },
    // 获取PAD端菜单列表
    async getListforPAD () {
      const res = await _LoadData({
        Page: 1,
        Limit: 1000,
        MENU_TYPE: 0,
        IS_ENABLED: 'Y'
      })
      // TODO 需要手动组装成tree状结构的数据
      const data = res.Result || []
      function getTree (arr, id = 0, level = 0) {
        let x = []
        for (let i = 0; i < arr.length; i++) {
          let item = cloneDeep(arr[i])
          item.children = null
          item.level = level
          if (item.P_ID === id) {
            item.children = getTree(arr, item.ID, level + 1)
            x.push(item)
          }
        }
        return x && x.length ? x : null
      }
      this.superiorPAD = getTree(data) || []
      this.treeDataPAD = cloneDeep(this.superiorPAD)
      this.superiorPAD.unshift({
        children: null,
        P_ID: 0,
        ID: 0,
        MENU_NAME: '顶级菜单',
        MENU_EN: 'Top Menu'
      })
    },
    // 菜单管理搜索
    filterNode (value, data) {
      if (!value) return true
      if (this.$i18n.locale === 'en') {
        return data.MENU_EN.indexOf(value) !== -1
      } else {
        return data.Menu_Name.indexOf(value) !== -1
      }
    },
    filterNodePAD (value, data) {
      if (!value) return true
      if (this.$i18n.locale === 'en') {
        return data.MENU_EN.indexOf(value) !== -1
      } else {
        return data.MENU_NAME.indexOf(value) !== -1
      }
    },
    // 菜单选中的列表
    getNodeData (data) {
      this.addOrMidifyStatus = ''
      this.addOrModifyFlag = false
      this.form = data
      this.getLoadDataSub()
    },
    getNodeDataPAD (data) {
      this.addOrMidifyStatus = ''
      this.addOrModifyFlag = false
      this.formPAD = data
      this.getLoadDataSubPAD()
    },
    handleChange (e) {
      if (e && e.length) {
        this.form.Parent_Id = e[e.length - 1]
      }
    },
    handleChangePAD (e) {
      this.formPAD.P_ID_ARR = e
      if (e && e.length) {
        this.formPAD.P_ID = e[e.length - 1]
      }
    },
    // 添加
    handlerAdd () {
      this.resetForm()
      this.addOrModifyFlag = true
      this.mainTable = []
      this.mainTablePAD = []
      this.addOrMidifyStatus = 'add'
    },
    resetForm () {
      this.otherForm = {
        ENABLED: 'Y'
      }
      this.form = {
        Is_System: 'Y',
        Spread: 'Y',
        ENABLED: 'Y'
      }
      this.otherFormPAD = {
        ENABLED: 'Y'
      }
      this.formPAD = {
        ENABLED: 'Y'
      }
    },
    handlerEdit () {
      if (this.form.Id) {
        this.addOrModifyFlag = true
        this.addOrMidifyStatus = 'edit'
      } else {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('Menu.sakmenu')
        })
      }
    },
    handlerEditPAD () {
      if (this.formPAD.ID) {
        this.addOrModifyFlag = true
        this.addOrMidifyStatus = 'edit'
      } else {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('Menu.sakmenu')
        })
      }
    },
    handleCancel () {
      if (this.addOrMidifyStatus === 'edit') {
        this.addOrModifyFlag = false
      } else {
        this.resetForm()
        this.addOrModifyFlag = false
      }
      this.addOrMidifyStatus = ''
    },
    // 获取按钮列表
    async getLoadDataSub () {
      this.loading = true
      const response = await getLoadDataSub({
        parentid: this.form.Id || 0
      })
      this.loading = false
      if (response.data) {
        this.mainTable = response.data
      } else {
        this.mainTable = []
      }
    },
    // 获取平板端菜单按钮
    async getLoadDataSubPAD () {
      this.loading = true
      const res = await _LoadData({
        MENU_TYPE: 1,
        Page: 1,
        Limit: 10000,
        P_ID: this.formPAD.ID || 0
      }).catch(_ => { this.loading = false })
      this.loading = false
      if (res.Result) {
        this.mainTablePAD = res.Result || []
      } else {
        this.mainTablePAD = []
      }
    },
    handleDeleteTreeNode () {
      if (!this.form.Id) {
        this.$message({
          type: 'warning',
          message: this.$t('Menu.sakDeletedMenu')
        })
        return
      }
      this.$confirm(this.$t('Menu.DeletedMenu'), this.$t('Menu.prompt'), {
        confirmButtonText: this.$t('Menu.confirm'),
        cancelButtonText: this.$t('Menu.cancel'),
        type: 'warning'
      }).then(async () => {
        const response = await MenuDelete(this.form.Id)
        if (response.Result) {
          this.getList()
          this.mainTable = []
          this.loading = false
          this.resetForm()
          this.$notify({
            title: this.$t('Menu.success'),
            message: this.$t('Menu.sudeleted'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // PAD菜单删除
    handleDeleteTreeNodePAD () {
      if (!this.formPAD.ID) {
        this.$message({
          type: 'warning',
          message: this.$t('Menu.sakDeletedMenu')
        })
        return false
      }
      this.$confirm(this.$t('Menu.DeletedMenu'), this.$t('Menu.prompt'), {
        confirmButtonText: this.$t('Menu.confirm'),
        cancelButtonText: this.$t('Menu.cancel'),
        type: 'warning'
      }).then(async _ => {
        const res = await _SaveData({
          RemoveRecords: [
            {
              P_ID: this.formPAD.P_ID,
              P_ID_ARR: this.formPAD.P_ID_ARR ? JSON.stringify(this.formPAD.P_ID_ARR) : '',
              PAGE_URL: this.formPAD.PAGE_URL || '',
              LINK_URL: this.formPAD.LINK_URL || '',
              ICON_URL: this.formPAD.ICON_URL || '',
              MENU_CODE: this.formPAD.MENU_CODE || '',
              MENU_NAME: this.formPAD.MENU_NAME || '',
              MENU_EN: this.formPAD.MENU_EN || '',
              ENABLED: this.formPAD.ENABLED || 'Y',
              SORT: this.formPAD.SORT || 0,
              ID: this.formPAD.ID || 0,
              MENU_TYPE: 0,
              CREATE_USER: this.username,
              CREATE_TIME: dayjs().format('YYYY-MM-DD'),
              UPDATE_USER: this.username,
              UPDATE_TIME: dayjs().format('YYYY-MM-DD')
            }
          ]
        })
        if (res.Result) {
          this.getListforPAD()
          this.mainTablePAD = []
          this.loading = false
          this.resetForm()
          this.$notify({
            title: this.$t('Menu.success'),
            message: this.$t('Menu.sudeleted'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 保存
    handleSave () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.children = []
          const response = await IsExistsLinkUrl(this.form)
          if (response.Result !== void 0) {
            if (response.Result && this.form.Id === 0) {
              this.$message({
                type: 'error',
                message: this.$t('Menu.tips_one')
              })
              return false
            } else {
              if (this.form.Id && this.form.Id === this.form.Parent_Id) {
                this.$message.error(this.$t('Menu._3'))
                return false
              }
              const res = await AddOrModifySave(this.form)
              if (res.Result) {
                this.addOrModifyFlag = false
                this.addOrMidifyStatus = ''
                this.getList()
                this.resetForm()
                this.$notify({
                  title: this.$t('Menu.success'),
                  message: this.$t('Menu.updatesucc'),
                  type: 'success',
                  duration: 2000
                })
              }
            }
          }
        } else {
          return false
        }
      })
    },
    // PAD端菜单保存
    handleSavePAD () {
      this.$refs.formPAD.validate(async valid => {
        if (valid) {
          if (this.formPAD.ID === this.formPAD.P_ID) {
            this.$message.error(this.$t('Menu._3'))
            return false
          }
          let form = {}
          if (this.formPAD.ID) { // 保存
            form.UpdateRecords = [{
              P_ID: this.formPAD.P_ID,
              P_ID_ARR: JSON.stringify(this.formPAD.P_ID_ARR),
              PAGE_URL: this.formPAD.PAGE_URL || '',
              LINK_URL: this.formPAD.LINK_URL || '',
              ICON_URL: this.formPAD.ICON_URL || '',
              MENU_CODE: this.formPAD.MENU_CODE || '',
              MENU_NAME: this.formPAD.MENU_NAME || '',
              MENU_EN: this.formPAD.MENU_EN || '',
              ENABLED: this.formPAD.ENABLED || 'Y',
              SORT: this.formPAD.SORT || 0,
              ID: this.formPAD.ID || 0,
              MENU_TYPE: 0,
              CREATE_USER: this.username,
              CREATE_TIME: dayjs().format('YYYY-MM-DD'),
              UPDATE_USER: this.username,
              UPDATE_TIME: dayjs().format('YYYY-MM-DD')
            }]
          } else { // 新增
            form.InsertRecords = [{
              P_ID: this.formPAD.P_ID,
              P_ID_ARR: JSON.stringify(this.formPAD.P_ID_ARR),
              PAGE_URL: this.formPAD.PAGE_URL || '',
              LINK_URL: this.formPAD.LINK_URL || '',
              ICON_URL: this.formPAD.ICON_URL || '',
              MENU_CODE: this.formPAD.MENU_CODE || '',
              MENU_NAME: this.formPAD.MENU_NAME || '',
              MENU_EN: this.formPAD.MENU_EN || '',
              ENABLED: this.formPAD.ENABLED || 'Y',
              SORT: this.formPAD.SORT || 0,
              ID: this.formPAD.ID || 0,
              MENU_TYPE: 0,
              CREATE_USER: this.username,
              CREATE_TIME: dayjs().format('YYYY-MM-DD'),
              UPDATE_USER: this.username,
              UPDATE_TIME: dayjs().format('YYYY-MM-DD')
            }]
          }
          const res = await _SaveData(form)
          if (res.Result) {
            this.addOrModifyFlag = false
            this.addOrMidifyStatus = ''
            this.getListforPAD()
            this.resetForm()
            this.$notify({
              title: '提示',
              message: form.ID ? '修改' : '新增' + '菜单成功',
              type: 'success'
            })
          }
        }
      })
    },

    // 按钮修改
    handleUpdate (row) {
      this.otherForm = row
      this.dialogFormVisible = true
      this.titleText = this.$t('Menu._1')
    },
    // 平板端按钮修改
    handleUpdatePAD (row) {
      this.otherFormPAD = row
      this.dialogFormVisiblePAD = true
      this.titleTextPAD = this.$t('Menu._1')
    },
    // 按钮删除
    handleDelete (row) {
      this.$confirm(this.$t('Menu.detDeletebutton'), this.$t('Menu.prompt'), {
        confirmButtonText: this.$t('Menu.confirm'),
        cancelButtonText: this.$t('Menu.cancel'),
        type: 'warning'
      }).then(async () => {
        const response = await DeleteSub(row.Id)
        if (response.Result) {
          this.$notify({
            title: this.$t('Menu.success'),
            message: this.$t('Menu.sudeleted'),
            type: 'success',
            duration: 2000
          })
          const index = this.mainTable.indexOf(row)
          this.mainTable.splice(index, 1)
        }
      })
    },
    handleDeletePAD (row) {
      this.$confirm(this.$t('Menu.detDeletebutton'), this.$t('Menu.prompt'), {
        confirmButtonText: this.$t('Menu.confirm'),
        cancelButtonText: this.$t('Menu.cancel'),
        type: 'warning'
      }).then(async _ => {
        const res = await _SaveData({
          RemoveRecords: [row]
        })
        if (res.Result) {
          this.$notify({
            title: this.$t('Menu.success'),
            message: this.$t('Menu.sudeleted'),
            type: 'success',
            duration: 2000
          })
          const index = this.mainTablePAD.indexOf(row)
          this.mainTablePAD.splice(index, 1)
        }
      })
    },
    // 新增按钮
    handleAddBtn () {
      this.dialogFormVisible = true
      this.otherForm = {
        Parent_Id: this.form.Id || 0,
        Is_System: 'N',
        ENABLED: 'Y'
      }
      this.titleText = this.$t('Menu._2')
    },
    handleAddBtnPAD () {
      this.dialogFormVisiblePAD = true
      this.otherFormPAD = {
        P_ID: this.formPAD.ID || 0,
        ENABLED: 'Y'
      }
      this.titleTextPAD = this.$t('Menu._2')
    },
    cancel () {
      this.otherForm = {}
      this.dialogFormVisible = false
    },
    cancelPAD () {
      this.otherFormPAD = {}
      this.dialogFormVisiblePAD = false
    },
    // 新增或修改编辑按钮保存
    create () {
      this.$refs.otherForm.validate(async (valid) => {
        if (valid) {
          // if (!this.otherForm.Id) {
          //   this.otherForm.Id = 0
          //   this.otherForm.MENU_TYPE = 2
          //   this.otherForm.Modify_Manager_Id = null
          //   this.otherForm.Modify_Time = null
          //   this.otherForm.Spread = 'N'
          //   this.otherForm.Icon_Url = null
          // }
          const response = await AddOrModifySubSave(this.otherForm)
          if (response.Result) {
            this.dialogFormVisible = false
            this.getLoadDataSub()
            this.$notify({
              title: this.$t('Menu.success'),
              message: this.$t('Menu.addsuccess'),
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    },
    createPAD () {
      this.$refs.otherFormPAD.validate(async valid => {
        if (valid) {
          const items = {
            P_ID: this.otherFormPAD.P_ID,
            P_ID_ARR: '',
            PAGE_URL: this.otherFormPAD.PAGE_URL || '',
            LINK_URL: this.otherFormPAD.LINK_URL || '',
            ICON_URL: this.otherFormPAD.ICON_URL || '',
            MENU_CODE: this.otherFormPAD.MENU_CODE || '',
            MENU_NAME: this.otherFormPAD.MENU_NAME || '',
            MENU_EN: this.otherFormPAD.MENU_EN || '',
            ENABLED: this.otherFormPAD.ENABLED || 'Y',
            SORT: this.otherFormPAD.SORT || 0,
            ID: this.otherFormPAD.ID || 0,
            MENU_TYPE: 1,
            CREATE_USER: this.username,
            CREATE_TIME: dayjs().format('YYYY-MM-DD'),
            UPDATE_USER: this.username,
            UPDATE_TIME: dayjs().format('YYYY-MM-DD')
          }
          const form = {}
          if (items.ID) { // 修改
            form.UpdateRecords = [items]
          } else { // 新增
            form.InsertRecords = [items]
          }
          const res = await _SaveData(form)
          if (res.Result) {
            this.dialogFormVisiblePAD = false
            this.getLoadDataSubPAD()
            this.$notify({
              title: this.$t('Menu.success'),
              message: this.$t('Menu.addsuccess'),
              type: 'success',
              duration: 2000
            })
          }
        }
      })
    }
  },
  created () {
    this.getList()
    this.getListforPAD()
    this.$nextTick(() => {
      this.getCardHeight()
    })
    window.addEventListener('load', this.getCardHeight)
    window.addEventListener('resize', this.getCardHeight)
  },
  beforeDestroy () {
    // 取消监听
    window.removeEventListener('resize', this.getCardHeight)
    window.removeEventListener('load', this.getCardHeight)
  },
  watch: {
    filterText (val) {
      this.$refs.menuTree.filter(val)
    },
    filterTextPAD (val) {
      this.$refs.menuTreePAD.filter(val)
    },
    activeName (val, oldVal) {
      if (val !== oldVal) {
        this.addOrModifyFlag = false
      }
    },
    '$i18n.locale' (val, oldVal) {
      this.fleshTree = false
      this.$nextTick(() => {
        // 重新渲染 tree （代价挺大的）
        this.fleshTree = true
      })
      this.defaultProps = {
        children: 'children',
        label: val === 'en' ? 'MENU_EN' : 'Menu_Name'
      }
      this.casProps = {
        label: val === 'en' ? 'MENU_EN' : 'Menu_Name',
        value: 'Id',
        children: 'children',
        checkStrictly: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-content {
  overflow: auto;
}
.myFilterInput {
  position: sticky;
  top: 0;
  z-index: 999;
}
.x_height {
  height: calc(100% - 32px - 31px);
}
</style>
