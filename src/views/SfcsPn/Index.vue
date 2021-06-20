<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SfcsPnImport"
                               exportBtnName="SfcsPnExport"
                               exportTplName="SfcsPnExportTPL">
        <el-input clearable
                  v-model="formData.PART_NO"
                  :placeholder="$t('SfcsPn._9')"
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('spc._3') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-finished"
                   @click="drawer = true">{{ $t('SfcsPn._48') }}</el-button>
        <el-button type="warning"
                   icon="el-icon-refresh"
                   @click.prevent="cleanClick">{{$t('publics.btn.reset')}}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="insertEvent(-1)"
                   v-if="$btnList.indexOf('SfcsPnAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>&nbsp;-->
      </custom-container-header>
    </template>
    <!-- 表格 -->
    <div class="table-container">
      <vxe-table ref="xTable"
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
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        <vxe-table-column width="150"
                          field="PART_NO"
                          :title="$t('SfcsPn._30')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="CUSTOMER"
                          :title="$t('SfcsPn._10')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="FAMILY_NAME"
                          :title="$t('SfcsPn._11')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="160"
                          field="MODEL"
                          :title="$t('SfcsPn._12')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="200"
                          field="CUSTOMER_PN"
                          :title="$t('SfcsPn._13')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <!-- <vxe-table-column width="180"
                          field="BU_MEANING"
                          :title="$t('SfcsPn._14')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="110"
                          field="PLANTCODE"
                          :title="$t('SfcsPn._15')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="160"
                          field="PRODUCT_KIND_MEANING"
                          :title="$t('SfcsPn._16')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="170"
                          field="STAGE_CODE_MEANING"
                          :title="$t('SfcsPn._17')"
                          :edit-render="{name: '$input', props: {readonly: true}}" /> -->
        <vxe-table-column width="130"
                          field="DOUBLE_SIDE"
                          :title="$t('SfcsPn._18')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-show="row.DOUBLE_SIDE==='Y'"
                  class="green-txt">{{$t('SfcsPn._41')}}</span>
            <span v-show="row.DOUBLE_SIDE==='N'"
                  class="red-txt">{{$t('SfcsPn._42')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="100"
                          field="LEAD_FLAG"
                          :title="$t('SfcsPn._19')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-show="row.LEAD_FLAG==='Y'"
                  class="green-txt">{{$t('SfcsPn._41')}}</span>
            <span v-show="row.LEAD_FLAG==='N'"
                  class="red-txt">{{$t('SfcsPn._42')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="100"
                          field="SHIP_FLAG"
                          :title="$t('SfcsPn._20')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-show="row.SHIP_FLAG==='Y'"
                  class="green-txt">{{$t('SfcsPn._41')}}</span>
            <span v-show="row.SHIP_FLAG==='N'"
                  class="red-txt">{{$t('SfcsPn._42')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="160"
                          field="EDI_FLAG"
                          :title="$t('SfcsPn._21')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-show="row.EDI_FLAG==='Y'"
                  class="green-txt">{{$t('SfcsPn._41')}}</span>
            <span v-show="row.EDI_FLAG==='N'"
                  class="red-txt">{{$t('SfcsPn._42')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="150"
                          field="WARRANTY_LIMIT"
                          :title="$t('SfcsPn._22')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="240"
                          field="PHASE_IN_DATE"
                          :title="$t('SfcsPn._23')"
                          :edit-render="{name: '$input', props: {readonly: true}}"></vxe-table-column>
        <vxe-table-column width="240"
                          field="PHASE_OUT_DATE"
                          :title="$t('SfcsPn._25')"
                          :edit-render="{name: '$input', props: {readonly: true}}"></vxe-table-column>
        <vxe-table-column width="190"
                          field="TURNIN_TYPE"
                          :title="$t('SfcsPn._27')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="DESCRIPTION"
                          :title="$t('SfcsPn._28')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="CATEGORY_MEANING"
                          :title="$t('SfcsPn._29')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column :title="$t('plbd.tb_og')"
                          width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)"
                       v-if="$btnList.indexOf('SfcsPnEdit') !== -1">{{ $t('publics.btn.edit') }}</el-button>
            <!-- <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
            >{{ $t('publics.btn.delete') }}</el-button>-->
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 抽屉 -->
    <el-drawer :title="$t('SfcsPn._48')"
               :visible.sync="drawer"
               direction="ltr">
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{ $t('MesProductionPreMst._19') }}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="searchClick">{{ $t('MesProductionPreMst._20') }}</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right: 20px"
                       type="text"
                       @click="resetListQuery">{{ $t('MesProductionPreMst._21') }}</el-button>
          </div>
          <el-form class="custom-form"
                   ref="formData"
                   label-position="top"
                   label-width="80px"
                   :model="formData"
                   size="mini">
            <el-form-item :label="$t('SfcsPn._30')">
              <el-input v-model="formData.PART_NO"
                        :placeholder="$t('SfcsPn._9')" />&nbsp;
            </el-form-item>
            <el-form-item :label="$t('SfcsPn._10')">
              <el-select style="width:100%"
                         v-model="formData.CUSTOMER_ID"
                         :placeholder="$t('SfcsProductFamily._2')">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="clientForm.Key"
                            :placeholder="$t('SfcsPn._49')"
                            @input="searchClientList"
                            clearable></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="searchClientList">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option style="width: 400px"
                           v-for="item in CustomerList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
                <div style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="clientForm.Page"
                                 :page-size="clientForm.Limit"
                                 :page-sizes="[10, 20, 30, 40]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="clientTotalPage"
                                 @size-change="clientFormSizeChange"
                                 @current-change="clientFormCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPn._11')">
              <el-select style="width:100%"
                         v-model="formData.FAMILY_ID"
                         :placeholder="$t('SfcsPn._2')">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="productForm.FAMILY_NAME"
                            :placeholder="$t('SfcsPn._49')"
                            clearable></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="searchProductList">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option style="width: 400px"
                           v-for="item in ProductList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
                <div style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="productForm.Page"
                                 :page-size="productForm.Limit"
                                 :page-sizes="[10, 20, 30, 40]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="productTotalPage"
                                 @size-change="productFormSizeChange"
                                 @current-change="productFormCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPn._12')">
              <!-- 机种下拉 -->
              <el-select style="width:100%"
                         v-model="formData.MODEL_ID"
                         :placeholder="$t('SfcsPn._3')">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="modelForm.key"
                            @input="searchModelList"
                            :placeholder="$t('SfcsPn._49')"
                            clearable></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="searchModelList">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option style="width: 400px"
                           v-for="item in ModelList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
                <div style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="modelForm.Page"
                                 :page-size="modelForm.Limit"
                                 :page-sizes="[10, 20, 30, 40]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="modelTotalPage"
                                 @size-change="modelFormSizeChange"
                                 @current-change="modelFormCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPn._14')">
              <el-select filterable
                         v-model="formData.BU_CODE"
                         style="width:100%"
                         :placeholder="$t('SfcsPn._4')">
                <el-option v-for="item in ParametersList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPn._15')">
              <el-select filterable
                         v-model="formData.CLASSIFICATION"
                         style="width:100%"
                         :placeholder="$t('SfcsPn._5')">
                <el-option v-for="item in PlantcodeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPn._16')">
              <el-select filterable
                         v-model="formData.PRODUCT_KIND"
                         style="width:100%"
                         :placeholder="$t('SfcsPn._6')">
                <el-option v-for="item in ProductKindList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPn._17')">
              <el-select filterable
                         v-model="formData.STAGE_CODE"
                         style="width:100%"
                         :placeholder="$t('SfcsPn._7')">
                <el-option v-for="item in ProductStageList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>&nbsp;
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
    <!-- 编辑框 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible"
               :title="$t('SfcsPn._43')"
               width="80%"
               :close-on-click-modal="false">
      <el-form ref="editForm"
               :model="editForm"
               label-width="160px"
               :rules="validRules"
               :show-message="false">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._30')"
                          prop="PART_NO">
              <el-input v-model="editForm.PART_NO"
                        :placeholder="$t('SfcsPn._9')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._10')">
              <!-- 客户下拉 -->
              <el-select style="width:100%"
                         v-model="editForm.CUSTOMER"
                         @change="changeModel"
                         :placeholder="$t('SfcsProductFamily._2')">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="clientForm.Key"
                            :placeholder="$t('SfcsPn._49')"
                            clearable
                            @input="searchClientList"
                            @keyup.enter.native="searchClientList" />
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="searchClientList">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option :disabled="item.disabled"
                           style="width: 400px"
                           v-for="item in CustomerList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
                <div style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="clientForm.Page"
                                 :page-size="clientForm.Limit"
                                 :page-sizes="[10, 20, 30, 40]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="clientTotalPage"
                                 @size-change="clientFormSizeChange"
                                 @current-change="clientFormCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._11')">
              <!-- 产品系列下拉 -->
              <el-select style="width:100%"
                         v-model="editForm.FAMILY_NAME"
                         @change="changeProduct"
                         :placeholder="$t('SfcsPn._2')">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="productForm.FAMILY_NAME"
                            :placeholder="$t('SfcsPn._49')"
                            clearable
                            @input="searchProductList"
                            @keyup.enter.native="searchProductList"></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="searchProductList">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option :disabled="item.disabled"
                           style="width: 400px"
                           v-for="item in ProductList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
                <div style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="productForm.Page"
                                 :page-size="productForm.Limit"
                                 :page-sizes="[10, 20, 30, 40]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="productTotalPage"
                                 @size-change="productFormSizeChange"
                                 @current-change="productFormCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._12')"
                          prop="MODEL">
              <!-- 机种下拉 -->
              <el-select style="width:100%"
                         v-model="editForm.MODEL"
                         @change="handleChangeSelectModel"
                         :placeholder="$t('SfcsPn._3')">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 400px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="modelForm.key"
                            :placeholder="$t('SfcsPn._49')"
                            clearable
                            @input="searchModelList"
                            @keyup.enter.native="searchModelList"></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="searchModelList">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option :disabled="item.disabled"
                           style="width: 400px"
                           v-for="item in ModelList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
                <div style="width: 400px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="modelForm.Page"
                                 :page-size="modelForm.Limit"
                                 :page-sizes="[10, 20, 30, 40]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="modelTotalPage"
                                 @size-change="modelFormSizeChange"
                                 @current-change="modelFormCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._15')"
                          prop="PLANTCODE">
              <el-select v-model="editForm.PLANTCODE"
                         @change="changePlant"
                         filterable
                         style="width:100%">
                <el-option v-for="item in PlantcodeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._16')">
              <el-select v-model="editForm.PRODUCT_KIND_MEANING"
                         @change="changeProductNature"
                         filterable
                         style="width:100%">
                <el-option v-for="item in ProductKindList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._18')">
              <el-select v-model="editForm.DOUBLE_SIDE"
                         filterable
                         style="width:100%">
                <el-option v-for="item in DoubleSided"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._19')">
              <el-select v-model="editForm.LEAD_FLAG"
                         filterable
                         style="width:100%">
                <el-option v-for="item in DoubleSided"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._20')">
              <el-select v-model="editForm.SHIP_FLAG"
                         filterable
                         style="width:100%">
                <el-option v-for="item in DoubleSided"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._21')">
              <el-select v-model="editForm.EDI_FLAG"
                         filterable
                         style="width:100%">
                <el-option v-for="item in DoubleSided"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._22')">
              <el-input v-model="editForm.WARRANTY_LIMIT"
                        :placeholder="$t('SfcsPn._45')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._27')">
              <el-select v-model="editForm.TURNIN_TYPE"
                         filterable
                         style="width:100%">
                <el-option v-for="item in DoubleSided"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
              <!-- <el-input v-model="editForm.TURNIN_TYPE" :placeholder="$t('SfcsPn._46')" /> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._23')">
              <el-date-picker style="width:100%"
                              v-model="editForm.PHASE_IN_DATE"
                              type="date"
                              :placeholder="$t('SfcsPn._26')"
                              :picker-options="starttime" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._25')">
              <el-date-picker style="width:100%"
                              v-model="editForm.PHASE_OUT_DATE"
                              type="date"
                              :placeholder="$t('SfcsPn._26')"
                              :picker-options="endTime" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._28')">
              <el-input v-model="editForm.DESCRIPTION"
                        :placeholder="$t('SfcsPn._47')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._29')">
              <el-select v-model="editForm.CATEGORY_MEANING"
                         @change="changeCategory"
                         filterable
                         style="width:100%">
                <el-option v-for="item in LookupList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._17')">
              <el-select v-model="editForm.STAGE_CODE_MEANING"
                         filterable
                         @change="changeStage"
                         style="width:100%">
                <el-option v-for="item in ProductStageList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._13')">
              <el-input v-model="editForm.CUSTOMER_PN"
                        :placeholder="$t('SfcsPn._44')" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item :label="$t('SfcsPn._14')">
              <el-select v-model="editForm.BU_MEANING"
                         @change="changeManufacturingUnit"
                         filterable
                         style="width:100%">
                <el-option v-for="item in ParametersList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
      <div class="editFooter">
        <el-button style="float:right"
                   type="success"
                   icon="el-icon-check"
                   @click.prevent="save_btn">{{$t('publics.btn.save')}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  SaveData,
  GetClient,
  GetProduct,
  GetModel,
  ExportData
} from '@/api/SfcsPn'
import pagination from '@/views/mixin/page'
export default {
  name: 'SfcsPn',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        PART_NO: '', // 料号
        CUSTOMER_ID: null, // 客户
        FAMILY_ID: null, // 产品系列
        MODEL_ID: null, // 机种
        CUSTOMER_PN: '', // 客户料号
        BU_CODE: undefined, // 制造单位
        CLASSIFICATIONL: null, // 厂部
        PRODUCT_KIND: null, // 产品性质
        STAGE_CODE: null, // 生产阶段
        DOUBLE_SIDE: '', // 是否双面
        Key: '',
        ...this.formData
      },
      CustomerList: [], // 客户名称
      ProductList: [],
      ModelList: [], // 机种
      ParametersList: [], // 制作单位
      PlantcodeList: [], // 厂部
      ProductKindList: [], // 产品性质
      ProductStageList: [], // 生产阶段
      LookupList: [], // 类别
      loading: false,
      mainTable: [],
      total: 0,
      form: {
        insertRecords: [],
        updateRecords: []
      },
      validRules: {
        PART_NO: [{ required: true, message: this.$t('SfcsPn._31') }],
        CUSTOMER_ID: [{ required: true, message: this.$t('SfcsPn._32') }],
        FAMILY_ID: [{ required: true, message: this.$t('SfcsPn._33') }],
        MODEL_ID: [{ required: true, message: this.$t('SfcsPn._34') }],
        BU_CODE: [{ required: true, message: this.$t('SfcsPn._35') }],
        CLASSIFICATION: [{ required: true, message: this.$t('SfcsPn._36') }],
        PRODUCT_KIND: [{ required: true, message: this.$t('SfcsPn._37') }],
        STAGE_CODE: [{ required: true, message: this.$t('SfcsPn._38') }],
        PLANTCODE: [{ required: true, message: this.$t('SfcsPn._388') }]
      },
      dialogVisible: false,
      editForm: {}, // 编辑
      searchloading: false,
      DoubleSided: [
        {
          value: 'Y',
          label: this.$t('SfcsPn._41')
        },
        {
          value: 'N',
          label: this.$t('SfcsPn._42')
        }
      ],
      newAdd: false,
      isEdit: false,
      clientForm: {
        Page: 1,
        Limit: 10
      },
      clientTotalPage: 0, // 客户总页数
      productForm: {
        Page: 1,
        Limit: 10
      },
      productTotalPage: 0, // 产品总页数
      modelForm: {
        Page: 1,
        Limit: 10
      },
      modelTotalPage: 0, // 产品总页数
      drawer: false,
      starttime: {
        disabledDate: (time) => {
          if (this.editForm.PHASE_IN_DATE) {
            return (
              time.getTime() > new Date(this.editForm.PHASE_OUT_DATE).getTime()
            )
          } else {
            // 不能大于当前日期
            return time.getTime() > Date.now()
          }
        }
      },
      // 结束时间
      endTime: {
        disabledDate: (time) => {
          if (this.editForm.PHASE_OUT_DATE) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() <
              new Date(this.editForm.PHASE_IN_DATE).getTime() - 8.64e7 // 加- 8.64e7则表示包当天
            )
          } else {
            return time.getTime() < Date.now()
          }
        }
      }
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
    this.getClient()
    this.getProduct()
    this.getModel()
  },
  methods: {
    // 重置
    resetListQuery () {
      this.formData = {}
      this.formData.Limit = 15
      // this.formData.Key = ''
      // this.formData.PART_NO = null
      // this.formData.CUSTOMER_PN = null
      // this.formData.DOUBLE_SIDE = null
    },
    // 获取机种下拉数
    async getModel () {
      const res = await GetModel(this.modelForm)
      if (res.Result) {
        this.ModelList = []
        this.ModelList = res.Result.map((item) => {
          return {
            value: item.ID,
            label: item.MODEL,
            disabled: item.ENABLED === 'N'
          }
        })
        if (!this.ModelList.length) {
          this.ModelList.push({
            label: '',
            value: ''
          })
        }
        this.modelTotalPage = res.TotalCount
      }
    },
    // 获取产品下拉数据
    async getProduct () {
      const res = await GetProduct(this.productForm)
      if (res.Result) {
        this.ProductList = []
        res.Result.map((item) => {
          this.ProductList.push({
            value: item.ID,
            label: item.FAMILY_NAME,
            disabled: item.ENABLED === 'N'
          })
        })
        if (!this.ProductList.length) {
          this.ProductList.push({
            label: '',
            value: ''
          })
        }
        this.productTotalPage = res.TotalCount
      }
    },
    // 获取客户下拉数据
    async getClient () {
      const res = await GetClient(this.clientForm)
      if (res.Result) {
        this.CustomerList = []
        res.Result.map((item) => {
          this.CustomerList.push({
            label: item.CUSTOMER,
            value: item.ID,
            disabled: item.ENABLED === 'N'
          })
        })
        if (!this.CustomerList.length) {
          this.CustomerList.push({
            label: '',
            value: ''
          })
        }
        this.clientTotalPage = res.TotalCount
      }
    },
    changeModel (e) {
      this.editForm.CUSTOMER_ID = e
      this.CustomerList.map((item) => {
        if (e === item.value) {
          this.editForm.CUSTOMER = item.label
        }
      })
    },
    changeProduct (e) {
      this.editForm.FAMILY_ID = e
      this.ProductList.map((item) => {
        if (e === item.value) {
          this.editForm.FAMILY_NAME = item.label
        }
      })
    },
    handleChangeSelectModel (e) {
      this.editForm.MODEL_ID = e
      this.ModelList.map((item) => {
        if (e === item.value) {
          this.editForm.MODEL = item.label
        }
      })
    },
    changeManufacturingUnit (e) {
      this.editForm.BU_CODE = e
      this.ParametersList.map((item) => {
        if (e === item.value) {
          this.editForm.BU_MEANING = item.label
        }
      })
    },
    changePlant (e) {
      this.editForm.CLASSIFICATION = e
      this.PlantcodeList.map((item) => {
        if (e === item.value) {
          this.editForm.PLANTCODE = item.label
        }
      })
    },
    changeProductNature (e) {
      this.editForm.PRODUCT_KIND = e
      this.ProductKindList.map((item) => {
        if (e === item.value) {
          this.editForm.PRODUCT_KIND_MEANING = item.label
        }
      })
    },
    changeStage (e) {
      this.editForm.STAGE_CODE = e
      this.ProductStageList.map((item) => {
        if (e === item.value) {
          this.editForm.STAGE_CODE_MEANING = item.label
        }
      })
    },
    changeCategory (e) {
      this.editForm.CATEGORY = e
      this.LookupList.map((item) => {
        if (e === item.value) {
          this.editForm.CATEGORY_MEANING = item.label
        }
      })
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        const {
          LookupList,
          ParametersList,
          PlantcodeList,
          ProductKindList,
          ProductStageList
        } = res.Result
        this.LookupList = (LookupList || []).map((item) => {
          return {
            label: item.MEANING,
            value: item.LOOKUP_CODE
          }
        })
        this.ParametersList = (ParametersList || []).map((item) => {
          return {
            label: item.MEANING,
            value: item.LOOKUP_CODE
          }
        })
        this.PlantcodeList = (PlantcodeList || []).map((item) => {
          return {
            label: item.MEANING,
            value: item.LOOKUP_CODE
          }
        })
        this.ProductKindList = (ProductKindList || []).map((item) => {
          return {
            label: item.MEANING,
            value: item.LOOKUP_CODE
          }
        })
        this.ProductStageList = (ProductStageList || []).map((item) => {
          return {
            label: item.MEANING,
            value: item.LOOKUP_CODE
          }
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
    },
    async exportData () {
      this.loading = true
      const res = await ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick (num) {
      this.drawer = false
      this.formData.Page = 1
      this.getLoadData()
    },
    cleanClick () {
      this.formData = {}
      this.formData.Limit = 15
      // this.formData.Key = ''
      // this.formData.PART_NO = null
      // this.formData.CUSTOMER_PN = null
      // this.formData.DOUBLE_SIDE = null
      this.getLoadData()
    },
    // 保存
    saveClick () {
      var that = this
      this.$refs.editForm.validate((valid) => {
        if (!valid) {
          var postdata = this.$refs.xTable.getRecordset()
          this.form.insertRecords = postdata.insertRecords
          this.form.updateRecords = postdata.updateRecords
          SaveData(this.form).then((res) => {
            if (res.Result) {
              this.form = {}
              this.getLoadData()
              that.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    // 新增
    async insertEvent (row) {
      this.dialogVisible = true
      this.editForm = {}
      this.newAdd = true
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    clientFormSizeChange (val) {
      this.clientForm.Limit = val
      this.getClient()
    },
    clientFormCurrentChange (val) {
      this.clientForm.Page = val
      this.getClient()
    },
    productFormSizeChange (val) {
      this.productForm.Limit = val
      this.getProduct()
    },
    productFormCurrentChange (val) {
      this.productForm.Page = val
      this.getProduct()
    },
    modelFormSizeChange (val) {
      this.modelForm.Limit = val
      this.getModel()
    },
    modelFormCurrentChange (val) {
      this.modelForm.Page = val
      this.getModel()
    },
    // 客户下拉查询
    searchClientList () {
      this.clientForm.Page = 1
      this.getClient()
    },
    // 产品下拉查询
    searchProductList () {
      this.productForm.Page = 1
      this.getProduct()
    },
    // 机种下拉搜索
    searchModelList () {
      this.modelForm.Page = 1
      this.getModel()
    },
    // 编辑
    editClick (row) {
      this.editForm = row
      this.dialogVisible = true
      this.isEdit = true
      this.editForm.TURNIN_TYPE =
        row.TURNIN_TYPE === '0' ? 'N' : row.TURNIN_TYPE
    },
    // 删除
    removeClick (row) {
      let postdata = this.$refs.xTable.getRecordset()
      if (row) {
        this.$confirm(this.$t('sld.fidelete'), this.$t('sld.prompt'), {
          confirmButtonText: this.$t('sld.confirm'),
          cancelButtonText: this.$t('sld.cancel'),
          type: 'warning'
        }).then(() => {
          this.$refs.xTable.remove(row)
          if (row.ID === 0) {
            this.$notify({
              title: this.$t('sld.success'),
              message: this.$t('sld.sudeleted'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.form.removeRecords = postdata.removeRecords
            SaveData(this.form).then((response) => {
              if (response.Result) {
                this.form = {}
                this.getLoadData()
                this.$notify({
                  title: this.$t('sld.success'),
                  message: this.$t('sld.subsu'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    },
    // 保存
    save_btn () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          if (this.newAdd === true) {
            this.form.insertRecords[0] = this.editForm
            this.form.updateRecords = []
          } else {
            this.form.updateRecords[0] = this.editForm
            this.form.insertRecords = []
          }
          console.log(this.form)
          SaveData(this.form).then((res) => {
            if (res.Result) {
              this.dialogVisible = false
              this.newAdd = false
              this.getLoadData()
              this.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.editFooter {
  height: 20px;
  padding-top: 10px;
}
</style>
