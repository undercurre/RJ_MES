<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select
          clearable
          style="width: 150px"
          v-model="formData.TONGS_TYPE"
          :placeholder="$t('MesTongsApply._1')"
        >
          <el-option
            v-for="item in FixtureCategoryList"
            :key="item.LOOKUP_CODE"
            :label="item.DESCRIPTION"
            :value="item.LOOKUP_CODE"
          />
        </el-select>
        <el-select
          clearable
          style="width: 180px"
          v-model="formData.DEPARTMENT"
          :placeholder="$t('MesTongsApply._2')"
        >
          <el-option
            v-for="item in DepartmentList"
            :key="item.ID"
            :label="item.CHINESE"
            :value="item.ID"
          />
        </el-select>
        <el-select
          clearable
          style="width: 150px"
          v-model="formData.SOURCES"
          :placeholder="$t('MesTongsApply._3')"
        >
          <el-option
            v-for="item in SourcetList"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID"
          />
        </el-select>
        <el-select
          clearable
          style="width: 150px"
          v-model="formData.STATUS"
          :placeholder="$t('MesTongsApply._4')"
        >
          <el-option
            v-for="item in STATUSList"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID"
          />
        </el-select>
        <el-date-picker
          style="width: 280px; margin-right: 10px"
          v-model="without"
          value-format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="至"
          :start-placeholder="$t('MesTongsApply._5')"
          :end-placeholder="$t('MesTongsApply._6')"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >&nbsp;
        <el-button
          type="success"
          icon="el-icon-plus"
          @click.prevent="addClick"
          >{{ $t("MesTongsApply._7") }}</el-button
        >&nbsp;
        <el-button
          type="warning"
          icon="el-icon-check"
          @click.prevent="AuditClick"
          >{{ $t("MesTongsApply._8") }}</el-button
        >&nbsp;
      </custom-container-header>
    </template>
    <div class="MesTongsApplyTable-container">
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
        show-footer
        :footer-method="footerMethod"
        :loading="loading"
        :data="mainTable"
        :mouse-config="{ selected: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        @cell-click="cellClick"
      >
        <vxe-table-column
          show-overflow
          :title="$t('ukas._27')"
          type="radio"
          min-width="80"
          align="center"
          fixed="left"
        />
        <vxe-table-column
          min-width="180"
          field="ID"
          :title="$t('MesTongsApply._9')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="200"
          field="QTY"
          :title="$t('MesTongsApply._10')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="190"
          field="SURPLUS_QTY"
          :title="$t('MesTongsApply._11')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="TONGS_TYPE"
          :title="$t('MesTongsApply._12')"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.TONGS_TYPE === 1">{{
              $t("MesTongsApply._13")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 2">{{
              $t("MesTongsApply._14")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 3">{{
              $t("MesTongsApply._15a")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 4">{{
              $t("MesTongsApply._15b")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 5">{{
              $t("MesTongsApply._15c")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 6">{{
              $t("MesTongsApply._15d")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 7">{{
              $t("MesTongsApply._15e")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 8">{{
              $t("MesTongsApply._15f")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 9">{{
              $t("MesTongsApply._15g")
            }}</span>
            <span v-else>{{ $t("MesTongsApply._16") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="DEPARTMENT_NAME"
          :title="$t('MesTongsApply._17')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="SOURCES"
          :title="$t('MesTongsApply._18')"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.SOURCES === 0">{{
              $t("MesTongsApply._19")
            }}</span>
            <span v-else-if="scope.row.SOURCES === 1">{{
              $t("MesTongsApply._20")
            }}</span>
            <span v-else-if="scope.row.SOURCES === 2">{{
              $t("MesTongsApply._21")
            }}</span>
            <span v-else>{{ $t("MesTongsApply._22") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="130"
          field="STATUS"
          :title="$t('MesTongsApply._23')"
          fixed="right"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS === 0" class="red-txt">{{
              $t("MesTongsApply._24")
            }}</span>
            <span v-else-if="scope.row.STATUS === 1" style="color: orange">{{
              $t("MesTongsApply._25")
            }}</span>
            <span v-else-if="scope.row.STATUS === 2" class="green-txt">{{
              $t("MesTongsApply._26")
            }}</span>
            <span v-else>{{ $t("MesTongsApply._27") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="CREATE_USER"
          :title="$t('MesTongsApply._28')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="180"
          field="CREATE_DATE"
          :title="$t('MesTongsApply._29')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="NEED_DATE"
          :title="$t('MesTongsApply._30')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.NEED_DATE.split(" ")[0] }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="AUDIT_USER"
          :title="$t('MesTongsApply._31')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="AUDIT_DATE"
          :title="$t('MesTongsApply._32')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="UPDATE_USER"
          :title="$t('MesTongsApply._33')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="170"
          field="UPDATE_DATE"
          :title="$t('MesTongsApply._34')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="200"
          field="REMARK"
          :title="$t('MesTongsApply._35')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          :title="$t('plbd.tb_og')"
          min-width="180"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button type="primary" @click="editClick(row, row.$index)">{{
              $t("publics.btn.edit")
            }}</el-button>
            <el-button type="danger" @click="removeClick(row, row.$index)">{{
              $t("publics.btn.delete")
            }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="MesTongsApply-pagination">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-tabs type="card" class="MesTongsApply-tab">
      <el-tab-pane :label="$t('MesTongsApply._36')">
        <div class="bottomTable">
          <vxe-table
            ref="LBTable"
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
            :loading="LBloading"
            :data="mainTable2"
            :mouse-config="{ selected: true }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
          >
            <vxe-table-column
              min-width="100"
              :title="$t('se_cc.sn')"
              fixed="left"
            >
              <template v-slot="{ $rowIndex }">{{ $rowIndex + 1 }}</template>
            </vxe-table-column>
            <vxe-table-column
              field="PART_NO"
              :title="$t('MesTongsApply._37')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              field="PART_NAME"
              :title="$t('MesTongsApply._38')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              field="PART_DESC"
              :title="$t('MesTongsApply._39')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              field="VERSION"
              :title="$t('MesTongsApply._40')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('MesTongsApply._41')">
        <div class="bottomTable">
          <vxe-table
            ref="RBTable"
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
            :loading="RBloading"
            :data="mainTable3"
            :mouse-config="{ selected: true }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
          >
            <vxe-table-column
              min-width="100"
              :title="$t('se_cc.sn')"
              fixed="left"
            >
              <template v-slot="{ $rowIndex }">{{ $rowIndex + 1 }}</template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="CODE"
              :title="$t('MesTongsApply._42')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="150"
              field="STATUS"
              :title="$t('MesTongsApply._43')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            >
              <template slot-scope="scope">
                <!-- <span>{{getStatusName(scope.row.STATUS)}}</span> -->
                <span v-if="scope.row.STATUS === -1" style="color: gray">{{
                  $t("MesTongsApply._44")
                }}</span>
                <span v-else-if="scope.row.STATUS === 0" style="color: gray">{{
                  $t("MesTongsApply._45")
                }}</span>
                <span v-else-if="scope.row.STATUS === 1" class="green-txt">{{
                  $t("MesTongsApply._46")
                }}</span>
                <span
                  v-else-if="scope.row.STATUS === 2"
                  style="color: purple"
                  >{{ $t("MesTongsApply._47") }}</span
                >
                <span v-else-if="scope.row.STATUS === 3" class="green-txt">{{
                  $t("MesTongsApply._48")
                }}</span>
                <span
                  v-else-if="scope.row.STATUS === 4"
                  style="color: #409EFF"
                  >{{ $t("MesTongsApply._49") }}</span
                >
                <span
                  v-else-if="scope.row.STATUS === 5"
                  style="color: orange"
                  >{{ $t("MesTongsApply._50") }}</span
                >
                <span v-else-if="scope.row.STATUS === 6" class="red-txt">{{
                  $t("MesTongsApply._51")
                }}</span>
                <span
                  v-else-if="scope.row.STATUS === 7"
                  style="color: #a15151"
                  >{{ $t("MesTongsApply._52") }}</span
                >
                <span v-else>{{ $t("MesTongsApply._53") }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="STORE_CODE"
              :title="$t('MesTongsApply._54')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="150"
              field="ACTIVE"
              :title="$t('MesTongsApply._55')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.ACTIVE === 'Y'" class="green-txt">{{
                  $t("MesTongsApply._56")
                }}</span>
                <span v-else-if="scope.row.ACTIVE === 'N'" class="red-txt">{{
                  $t("MesTongsApply._57")
                }}</span>
                <span v-else>{{ $t("MesTongsApply._58") }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="CREATE_USER"
              :title="$t('MesTongsApply._59')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="150"
              field="CREATE_DATE"
              :title="$t('MesTongsApply._60')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :title="MesTongsApplyTitle"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="100px"
        :rules="validRules"
        :show-message="false"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._61')" prop="QTY">
              <el-input
                v-model="editForm.QTY"
                :placeholder="$t('MesTongsApply._62')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._63')" prop="TONGS_TYPE">
              <el-select
                v-model="editForm.TONGS_TYPE"
                filterable
                :placeholder="$t('MesTongsApply._64')"
                style="width: 100%"
              >
                <el-option
                  v-for="item in FixtureCategoryList"
                  :key="item.LOOKUP_CODE"
                  :label="item.DESCRIPTION"
                  :value="item.LOOKUP_CODE"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._65')" prop="DEPARTMENT">
              <el-select
                v-model="editForm.DEPARTMENT"
                :placeholder="$t('MesTongsApply._66')"
                filterable
                style="width: 100%"
              >
                <el-option
                  v-for="item in DepartmentList"
                  :key="item.ID"
                  :label="item.CHINESE"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._67')" prop="SOURCES">
              <el-select
                v-model="editForm.SOURCES"
                :placeholder="$t('MesTongsApply._68')"
                filterable
                style="width: 100%"
              >
                <el-option
                  v-for="item in SourcetList"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._69')" prop="NEED_DATE">
              <el-date-picker
                style="width: 100%"
                v-model="editForm.NEED_DATE"
                type="date"
                :placeholder="$t('MesTongsApply._70')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('plbd._2')" prop="ORGANIZE_ID">
              <el-cascader
                v-model="editForm.ORGANIZE_ID"
                :options="organizeList"
                style="width: 100%"
                :show-all-levels="false"
                :placeholder="$t('plbd._1')"
                :props="casProps"
                @change="handleChangeCascader"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item :label="$t('MesTongsApply._71')">
              <el-input
                type="textarea"
                :rows="4"
                :placeholder="$t('MesTongsApply._72')"
                v-model="editForm.REMARK"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="con">
          <i></i>
          <p>{{ $t("MesTongsApply._73") }}</p>
        </div>
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._74')" prop="PART_NO">
              <el-input
                v-model="editForm.PART_NO"
                :placeholder="$t('MesTongsApply._75')"
                @keyup.enter.native="searchClick2"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._76')">
              <el-input
                v-model="editForm.PART_NAME"
                :placeholder="$t('MesTongsApply._77')"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._78')">
              <el-input
                v-model="editForm.PART_DESC"
                :placeholder="$t('MesTongsApply._79')"
                :readonly="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('MesTongsApply._80')" prop="VERSION">
              <el-input
                v-model="editForm.VERSION"
                :placeholder="$t('MesTongsApply._81')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="success"
              icon="el-icon-plus"
              style="margin-left: 10px"
              @click.prevent="insertEvent(0)"
              >{{ $t("publics.btn.add") }}</el-button
            >&nbsp;
          </el-col>
        </el-row>
        <div class="Application-Table">
          <vxe-table
            ref="ApplicationTable"
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
            :loading="LBloading"
            :data="mainTable2"
            :mouse-config="{ selected: true }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
          >
            <vxe-table-column width="80" :title="$t('se_cc.sn')" fixed="left">
              <template v-slot="{ $rowIndex }">{{ $rowIndex + 1 }}</template>
            </vxe-table-column>
            <vxe-table-column
              field="PART_NO"
              :title="$t('MesTongsApply._74')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              field="PART_NAME"
              :title="$t('MesTongsApply._76')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              field="PART_DESC"
              :title="$t('MesTongsApply._78')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              field="VERSION"
              :title="$t('MesTongsApply._80')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column :title="$t('plbd.tb_og')">
              <template v-slot="{ row }">
                <el-button
                  type="danger"
                  @click="removeClick2(row, row.$index)"
                  >{{ $t("publics.btn.delete") }}</el-button
                >
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click.prevent="saveClick('editForm')">{{
            $t("ssc_rd.sure")
          }}</el-button
          >&nbsp;
          <el-button @click.prevent="resetClick">{{
            $t("publics.btn.reset")
          }}</el-button
          >&nbsp;
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import XEUtils from 'xe-utils'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as OrganizeL
} from '@/api/SysOrganize'
// import { cloneDeep } from 'lodash'
import { LoadMESLineType } from '@/api/SfcsOperationLines' // 直接抄
import { mapGetters } from 'vuex'
import {
  Index,
  GetTongsTypeList,
  LoadData,
  GetTongsApplyPartData,
  GetTongsDataByApplyId,
  AuditData,
  DeleteOneById,
  GetPartByPartNo,
  AddOrModifySave
} from '@/api/MesTongsApply'
export default {
  name: 'MesTongsApply',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      formData: {},
      FixtureCategoryList: [], // 夹具类别
      DepartmentList: [], // 部门
      SourcetList: [
        { ID: 0, NAME: '自制' },
        { ID: 1, NAME: '外购' },
        { ID: 2, NAME: '转移' }
      ], // 来源
      STATUSList: [
        { ID: 0, NAME: '待入库' },
        { ID: 1, NAME: '存储中' },
        { ID: 2, NAME: '借出' },
        { ID: 3, NAME: '使用者' },
        { ID: 4, NAME: '保养中' },
        { ID: 5, NAME: '维修中' },
        { ID: 6, NAME: '已报废' }
      ], // 状态
      loading: false,
      mainTable: [],
      LBloading: false,
      mainTable2: [],
      RBloading: false,
      mainTable3: [],
      editForm: {},
      dialogVisible: false,
      validRules: {
        // PART_NO: [{ required: true, message: '请添加产品信息！' }],
        QTY: [{ required: true, message: this.$t('MesTongsApply._1a') }],
        TONGS_TYPE: [
          {
            required: true,
            message: this.$t('MesTongsApply._1'),
            trigger: 'change'
          }
        ],
        DEPARTMENT: [{ required: true, message: this.$t('MesTongsApply._2') }],
        SOURCES: [{ required: true, message: this.$t('MesTongsApply._3') }],
        NEED_DATE: [{ required: true, message: this.$t('MesTongsApply._1b') }]
        // VERSION: [{ required: true, message: '请添加产品信息！' }]
      },
      MesTongsApplyTitle: '',
      rowID: null,
      rowSTATUS: null,
      without: '',
      organizeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      planData: [],
      LineTypeList: []
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
    this.getTongsTypeList()
  },
  methods: {
    async getLineTypeList () {
      const res = await LoadMESLineType()
      const data = res.Result || []
      this.LineTypeList = []
      data.map((item) => {
        this.LineTypeList.push({
          label: item.CHINESE,
          value: item.LOOKUP_CODE
        })
      })
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.editForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await OrganizeL({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager.map((item) => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(
          ...[tmp[tmp.length - 1]].filter((_i) => _i && _i)
        )
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map((item) => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.DepartmentList = res.Result ? res.Result : []
        this.getOrganize()
        this.getLineTypeList()
      }
    },
    // 获取夹具类别
    async getTongsTypeList () {
      const res = await GetTongsTypeList()
      this.FixtureCategoryList = res.Result ? res.Result : []
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = JSON.parse(res.Result).data
        console.log(this.mainTable, '获取表格')
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      if (this.without) {
        this.formData.BEGIN_DATE = this.without[0]
        this.formData.END_DATE = this.without[1]
      } else {
        this.formData.BEGIN_DATE = ''
        this.formData.END_DATE = ''
      }
      this.getLoadData()
    },
    // 料号搜索
    async searchClick2 () {
      const res = await GetPartByPartNo({ partNo: this.editForm.PART_NO })
      console.log(JSON.parse(res.Result))
      const data = JSON.parse(res.Result)
      this.editForm.PART_NAME = data ? data.NAME : ''
      this.editForm.PART_DESC = data ? data.DESCRIPTION : ''
      this.$forceUpdate()
    },
    // 表尾
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return this.$t('MesTongsApply._82')
          }
          if (['QTY', 'SURPLUS_QTY'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
    },
    // 申请夹具
    addClick () {
      this.MesTongsApplyTitle = this.$t('MesTongsApply._83')
      this.editForm = {}
      this.editForm.CREATE_USER = this.userinfo.USER_NAME
      this.editForm.ID = 0
      this.mainTable2 = []
      this.dialogVisible = true
    },
    // 编辑
    editClick (row) {
      if (row.STATUS !== 0) {
        return this.$message.error(this.$t('MesTongsApply._84'))
      }
      this.MesTongsApplyTitle = this.$t('MesTongsApply._85')
      this.editForm = { ...row }
      if (this.editForm.TONGS_TYPE === 0) {
      }
      this.editForm.UPDATE_USER = this.userinfo.USER_NAME
      this.dialogVisible = true
      // this.getTongsApplyById(row.ID)
      console.log('mainTable2:', this.mainTable2)
    },
    // async getTongsApplyById (ID) {
    //   const res = await GetTongsApplyById({ id: ID })
    //   console.log(res.Result)
    // },
    //
    insertEvent (row) {
      console.log('------------', this.editForm.PART_NO)
      if (this.editForm.VERSION === undefined || this.editForm.VERSION === '') {
        return this.$message.error(this.$t('MesTongsApply._86'))
      }
      if (
        this.editForm.PART_NO === '' ||
        this.editForm.PART_NO === null ||
        this.editForm.PART_NO === undefined ||
        this.editForm.PART_NAME === null ||
        this.editForm.PART_DESC === null
      ) {
        return this.$message.error(this.$t('MesTongsApply._87'))
      }
      const record = {
        TONGS_APPLY_ID: 0,
        TONGS_ID: 0,
        PART_NO: this.editForm.PART_NO,
        PART_NAME: this.editForm.PART_NAME,
        PART_DESC: this.editForm.PART_DESC,
        VERSION: this.editForm.VERSION,
        CREATE_USER: this.userinfo.USER_NAME,
        CREATE_DATE: this.getNowDate(new Date())
      }
      this.$refs.ApplicationTable.insertAt(record, row).then(({ row }) => {
        this.$refs.ApplicationTable.setActiveRow(row)
      })
    },
    async saveClick (record) {
      console.log(
        'this.$refs.editForm:',
        this.$refs.ApplicationTable.getTableData()
      )
      this.$refs.editForm.validate((valid, errInfo) => {
        if (valid) {
          this.editForm.PartList = this.$refs.ApplicationTable.getTableData().fullData
          if (this.editForm.PartList.length === 0) {
            this.$message.error(this.$t('MesTongsApply._1c'))
            return false
          }
          const nowDate = this.getNowDate(new Date())
          // 判断是否新增
          if (this.editForm.ID === 0) {
            this.editForm.CREATE_DATE = nowDate
          } else {
            this.editForm.UPDATE_DATE = nowDate
          }
          console.log('修改后的产品信息', this.editForm)
          this.editForm.ORGANIZE_ID = this.editForm.ORGANIZE_ID
            ? this.editForm.ORGANIZE_ID.toString()
            : ''
          console.log(JSON.stringify(this.editForm))
          AddOrModifySave(this.editForm).then((res) => {
            if (JSON.parse(res.Result).ResultCode === 0) {
              this.getLoadData()
              this.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
            }
            this.dialogVisible = false
          })
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {}
        }
      })
    },
    // 获取当前时间
    getNowDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    // 产品信息删除
    removeClick2 (row) {
      this.$refs.ApplicationTable.remove(row)
      console.log('删除后', this.editForm)
    },
    // 删除
    removeClick (row) {
      if (row.STATUS !== 0) {
        return this.$message.error(this.$t('MesTongsApply._88'))
      }
      this.$confirm(
        `${this.$t('MesTongsApply._89')}${row.ID}${this.$t(
          'MesTongsApply._90'
        )}`,
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await DeleteOneById(row.ID)
          if (JSON.parse(res.Result).ResultCode === 0) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getLoadData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    cellClick (row, column, event) {
      console.log(row)
      this.getTongsApplyPartData(row.row.ID)
      this.getTongsDataByApplyId(row.row.ID, row.row.ORGANIZE_ID)
      this.rowID = row.row.ID
      this.rowSTATUS = row.row.STATUS
    },
    // 获取产品信息
    async getTongsApplyPartData (ID) {
      this.LBloading = true
      const res = await GetTongsApplyPartData({ id: ID })
      this.LBloading = false
      this.mainTable2 = res.Result ? JSON.parse(res.Result) : []
    },
    // 获取已入库夹具信息
    async getTongsDataByApplyId (ID, ORGANIZE_ID) {
      this.RBloading = true
      const res = await GetTongsDataByApplyId({
        applyId: ID,
        organizeId: ORGANIZE_ID
      })
      this.RBloading = false
      this.mainTable3 = res.Result ? JSON.parse(res.Result) : []
    },
    //
    changeDate (e) {
      console.log('============', e)
    },
    // 重置
    resetClick () {
      this.editForm = {}
    },
    // 审核
    AuditClick () {
      if (this.rowSTATUS === null) {
        return this.$message.error(this.$t('MesTongsApply._96'))
      }
      if (this.rowSTATUS !== 0) {
        return this.$message.error(this.$t('MesTongsApply._97'))
      }
      this.$confirm(
        `${this.$t('MesTongsApply._98')}${this.rowID}${this.$t(
          'MesTongsApply._99'
        )}`,
        this.$t('MesTongsApply._92'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await AuditData(this.rowID, this.userinfo.USER_NAME)
          if (JSON.parse(res.Result).ResultCode === 0) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._100')
            })
            this.getLoadData()
          } else {
            this.$message.error(JSON.parse(res.Result).ResultMsg)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._101')
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.MesTongsApplyTable-container {
  height: calc(100vh - 60px - 41px - 53px - 320px);
}
.MesTongsApply-pagination {
  margin: 10px 0;
}
.MesTongsApply-tab {
  height: calc(100vh - 60px - 41px - 53px - 320px - 35px);
}
.bottomTable {
  height: calc(100vh - 60px - 41px - 53px - 320px - 35px - 40px - 30px);
}
.con {
  position: relative;
  text-align: left;
  height: 40px;
}
.con i {
  display: block;
  height: 1px;
  background: #eee;
  position: absolute;
  top: 0.9rem;
  width: 100%;
}
.con p {
  display: inline-block;
  background-color: #fff;
  padding: 0 1.875rem;
  text-align: left;
  margin: 0 auto;
  position: absolute;
  left: 50px;
  z-index: 2;
}
.Application-Table {
  height: 180px;
}
</style>
