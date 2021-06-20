
<template>
  <d2-container class="StopLineControl">
    <template slot="header">
      <custom-container-header defaultTotalPage="total"
                               defaultLoadingFlag="listLoading"
                               defaultFormData="listQuery"
                               exportMehodsName="exportData">
        <el-select style="width: 150px"
                   clearable
                   v-model="MstQuery.STOPLINE_MODE"
                   :placeholder="$t('StopLineControl._1')">
          <el-option v-for="item in STOPLINE_MODE"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-select style="width: 150px"
                   clearable
                   v-model="MstQuery.STOP_OPERATION_ID"
                   :placeholder="$t('StopLineControl._2')">
          <el-option v-for="item in STOP_OPERATION_ID"
                     :key="item.ID"
                     :label="item.OPERATION_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="MstSearch">{{$t('publics.btn.search')}}</el-button>
        <el-button type="success"
                   v-if="$btnList.indexOf('StopLineControlAdd') !== -1"
                   style="margin-right: 30px;"
                   icon="el-icon-plus"
                   @click.prevent="MstAdd">{{$t('publics.btn.add')}}</el-button>

      </custom-container-header>
    </template>
    <div class="msttable">
      <vxe-table ref="xTable"
                 border
                 stripe
                 keep-source
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 width="100%"
                 height="100%"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :data="MstTable"
                 :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}"
                 @cell-click="MSTcellClick">
        <vxe-table-column show-overflow
                          :title="$t('StopLineControl._3')"
                          min-width="80"
                          type="radio"
                          align="center" />
        <vxe-table-column show-overflow
                          field="ROWNO"
                          :title="$t('StopLineControl._4')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          min-width="140"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="200"
                          field="STOPLINE_NAME"
                          :title="$t('StopLineControl._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="210"
                          field="OPERATION_NAME"
                          :title="$t('StopLineControl._6')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="180"
                          field="ALARM_CRITERIA"
                          :title="$t('StopLineControl._7')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="180"
                          field="DIVISION_CRITERIA"
                          :title="$t('StopLineControl._8')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="270"
                          field="DIVISION_START"
                          :title="$t('StopLineControl._9')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="120"
                          field="DIVISION_UNIT"
                          :title="$t('StopLineControl._10')"
                          :edit-render="{name: '$select', options: DivisionUnitBox}"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="200"
                          field="ALARM_INTERVAL"
                          :title="$t('StopLineControl._11')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />

        <vxe-table-column field="ENABLED"
                          min-width="160"
                          fixed="right"
                          align="center"
                          :title="$t('StopLineControl._12')">
          <template v-slot="{ row }">
            <el-switch v-model="row.ENABLED"
                       :active-text="$t('publics.btn.yes')"
                       :inactive-text="$t('publics.btn.no')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N"
                       @change="Mstchange(row)" />
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('StopLineControl._13')"
                          align="center"
                          min-width="200"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       v-if="$btnList.indexOf('StopLineControlEdit') !== -1"
                       @click="MSTeditClick(row)">{{$t('publics.btn.edit')}}</el-button>
            <el-button type="danger"
                       v-if="$btnList.indexOf('StopLineControldelete') !== -1"
                       @click="MSTdeleteClick(row)">{{$t('publics.btn.delete')}}</el-button>

          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination :current-page="MstQuery.Page"
                   style="margin: 10px 0;"
                   :page-size="MstQuery.Limit"
                   :page-sizes="[15,25,35,45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Msttotal"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />

    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane :label="$t('StopLineControl._14')"
                   name="Linetype"
                   class="chidtable">
        <el-form :inline="true"
                 label-position="left"
                 :show-message="false"
                 :model="ControlLineForm">
          <el-form-item>
            <el-select style="width: 150px"
                       clearable
                       v-model="ControlLineForm.LINE_ID"
                       :placeholder="$t('StopLineControl._15')">
              <el-option v-for="item in LINE_ID"
                         :key="item.ID"
                         :label="item.LINE_NAME"
                         :value="item.ID" />
            </el-select>&nbsp;
          </el-form-item>
          <el-form-item>
            <el-select style="width: 150px"
                       clearable
                       v-model="ControlLineForm.LINE_TYPE"
                       :placeholder="$t('StopLineControl._16')">
              <el-option v-for="item in LINE_TYPE"
                         :key="item.CHINESE"
                         :label="item.CHINESE"
                         :value="item.CHINESE" />
            </el-select>&nbsp;
          </el-form-item>
          <el-form-item>
            <el-cascader v-model="ControlLineForm.ORGANIZE_ID"
                         clearable
                         :options="organizeList"
                         style="width: 150px;"
                         :show-all-levels="false"
                         :placeholder="$t('StopLineControl._17')"
                         :props="casProps"
                         @change="Formascader"></el-cascader>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary"
                       icon="el-icon-search"
                       @click="ControlLineSearch">&nbsp;{{$t('publics.btn.search')}}&nbsp;</el-button>
            <el-button type="success"
                       style="margin-right: 30px;"
                       icon="el-icon-plus"
                       v-if="$btnList.indexOf('LinetypeAdd') !== -1"
                       @click="LinetypeAdd()">&nbsp;{{$t('publics.btn.add')}}&nbsp;</el-button>
          </el-form-item>
        </el-form>
        <vxe-table ref="xTable2"
                   border
                   stripe
                   keep-source
                   highlight-hover-row
                   highlight-current-row
                   show-overflow
                   auto-resize
                   width="100%"
                   height="68%"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :data="ControlLineTable"
                   :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}">
          <vxe-table-column show-overflow
                            field="ROWNO"
                            :title="$t('StopLineControl._4')"
                            :edit-render="{name: '$input', props: {readonly: true}}"
                            align="center" />
          <vxe-table-column show-overflow
                            field="LINE_NAME"
                            :title="$t('StopLineControl._18')"
                            :edit-render="{name: '$input', props: {readonly: true}}"
                            align="center" />

          <vxe-table-column show-overflow
                            field="LINE_TYPE"
                            :title="$t('StopLineControl._19')"
                            :edit-render="{name: '$input', props: {readonly: true}}"
                            align="center" />
          <vxe-table-column show-overflow
                            min-width="140"
                            field="ORGANIZE_NAME"
                            :title="$t('StopLineControl._20')"
                            :edit-render="{name: '$input', props: {readonly: true}}"
                            align="center" />
          <vxe-table-column field="ENABLED"
                            fixed="right"
                            align="center"
                            :title="$t('StopLineControl._12')">
            <template v-slot="{ row }">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"
                         @change="LinetypeEabled(row)" />
            </template>
          </vxe-table-column>
          <vxe-table-column :title="$t('MesMessageReceiverGroup._10')"
                            align="center"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="danger"
                         v-if="$btnList.indexOf('LinetypeDelete') !== -1"
                         @click="LinetypedeleteClick(row)">{{$t('publics.btn.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination :current-page="ControlLineForm.Page"
                       style="margin-top: 10px;"
                       :page-size="ControlLineForm.Limit"
                       :page-sizes="[15,25,35,45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="ControlLinetotal"
                       @size-change="ControlLineSizeChange"
                       @current-change="ControlLineCurrentChange" />
      </el-tab-pane>
      <el-tab-pane :label="$t('StopLineControl._45')"
                   name="Product"
                   class="chidtable">
        <el-form :inline="true"
                 label-position="left"
                 :show-message="false"
                 :model="ContProdForm">
          <!-- <el-form-item label="">
            <el-input v-model="ContProdForm.Key"
                      :placeholder="$t('请输入产品规格')"
                      clearable
                      style="width:150px"
                      @input="ContProdSearch"
                      @keyup.enter.native="ContProdSearch" />&nbsp;
          </el-form-item> -->
          <el-form-item label="">

            <el-input v-model="ContProdForm.PART_NO"
                      :placeholder="$t('StopLineControl._21')"
                      clearable
                      style="width:150px"
                      @input="ContProdSearch"
                      @keyup.enter.native="ContProdSearch" />&nbsp;
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary"
                       icon="el-icon-search"
                       @click="ContProdSearch">&nbsp;{{$t('publics.btn.search')}}&nbsp;</el-button>
            <el-button type="success"
                       style="margin-right: 30px;"
                       icon="el-icon-plus"
                       v-if="$btnList.indexOf('ContProdAdd') !== -1"
                       @click="ContProdAdd">&nbsp;{{$t('publics.btn.add')}}&nbsp;</el-button>
          </el-form-item>
        </el-form>
        <vxe-table ref="xTable3"
                   border
                   stripe
                   keep-source
                   highlight-hover-row
                   highlight-current-row
                   show-overflow
                   auto-resize
                   width="100%"
                   height="68%"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :data="ContProdTable"
                   :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}">
          <vxe-table-column show-overflow
                            field="ROWNO"
                            :title="$t('StopLineControl._4')"
                            :edit-render="{name: '$input', props: {readonly: true}}"
                            align="center" />
          <vxe-table-column show-overflow
                            field="PART_NO"
                            :title="$t('StopLineControl._22')"
                            :edit-render="{name: '$input', props: {readonly: true}}"
                            align="center" />

          <vxe-table-column show-overflow
                            min-width="140"
                            field="MODEL"
                            :title="$t('StopLineControl._23')"
                            :edit-render="{name: '$input', props: {readonly: true}}"
                            align="center" />

          <vxe-table-column field="ENABLED"
                            fixed="right"
                            align="center"
                            :title="$t('StopLineControl._12')">
            <template v-slot="{ row }">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"
                         @change="ContProdEnaled(row)" />
            </template>
          </vxe-table-column>
          <vxe-table-column :title="$t('MesMessageReceiverGroup._10')"
                            align="center"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="danger"
                         v-if="$btnList.indexOf('ContProddelete') !== -1"
                         @click="ChilddeleteClick(row)">{{$t('publics.btn.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination :current-page="ContProdForm.Page"
                       style="margin-top: 10px;"
                       :page-size="ContProdForm.Limit"
                       :page-sizes="[15,25,35,45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="ContProdtotal"
                       @size-change="ContProdSizeChange"
                       @current-change="ContProdCurrentChange" />
      </el-tab-pane>
    </el-tabs>
    <!--新增/编辑 -->
    <el-dialog v-dialogDrag
               width="70%"
               :title="addorediText"
               :visible.sync="innerVisible"
               :close-on-click-modal="false"
               append-to-body>
      <div style="padding: 10px 0;width: 100%; text-align: center;margin-bottom: 15px !important;font-size: 16px;margin-left: 0px;background: #F8F8F8;">停线管控规则</div>
      <el-form ref="callVal"
               label-position="right"
               :show-message="false"
               :model="MstForm"
               :rules="rules"
               label-width="220px"
               class="StopLineForm">

        <el-form-item :label="$t('StopLineControl._5')"
                      prop="STOPLINE_MODE"
                      class="StopLineForm-item">
          <el-select style="width: 100%;"
                     @change="handleChangeModel"
                     v-model="MstForm.STOPLINE_MODE"
                     placeholder=" ">
            <el-option v-for="item in STOPLINE_MODE"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._14')"
                      prop="STOP_OPERATION_ID"
                      class="StopLineForm-item">
          <el-select style="width: 100%;"
                     v-model="MstForm.STOP_OPERATION_ID"
                     placeholder=" ">
            <el-option v-for="item in STOP_OPERATION_ID"
                       :key="item.ID"
                       :label="item.OPERATION_NAME"
                       :value="item.ID" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._7')"
                      prop="ALARM_CRITERIA"
                      class="StopLineForm-item">
          <el-input type="number"
                    v-model="MstForm.ALARM_CRITERIA"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._24')"
                      prop="STOP_CRITERIA"
                      class="StopLineForm-item">
          <el-input type="number"
                    v-model="MstForm.STOP_CRITERIA"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._8')"
                      prop="DIVISION_CRITERIA"
                      class="StopLineForm-item">
          <el-input type="number"
                    v-model="MstForm.DIVISION_CRITERIA"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._9')"
                      prop="DIVISION_START"
                      class="StopLineForm-item">
          <el-input type="number"
                    v-model="MstForm.DIVISION_START"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._11')"
                      prop="ALARM_INTERVAL"
                      class="StopLineForm-item">
          <el-input type="number"
                    v-model="MstForm.ALARM_INTERVAL"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._10')"
                      prop="DIVISION_UNIT"
                      class="StopLineForm-item">
          <el-select style="width: 100%;"
                     clearable
                     disabled
                     v-model="MstForm.DIVISION_UNIT"
                     placeholder=" ">
            <el-option v-for="item in DivisionUnitList"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('MesMessageReceiverGroup._9')"
                      class="StopLineForm-item">
          <el-switch v-model="MstForm.ENABLED"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
      </el-form>
      <div style="padding: 10px 0;width: 100%; text-align: center;margin-bottom: 15px !important;font-size: 16px;margin-left: 0px;background: #F8F8F8;">呼叫内容</div>
      <el-form ref="Childref"
               label-position="right"
               :show-message="false"
               :model="ChildForm"
               :rules="Childrules"
               label-width="220px"
               class="StopLineForm">
        <el-form-item :label="$t('StopLineControl._25')"
                      prop="CALL_CATEGORY_CODE"
                      class="StopLineForm-item">
          <el-select style="width: 100%;"
                     clearable
                     @change="categoryClick"
                     v-model="ChildForm.CALL_CATEGORY_CODE"
                     placeholder=" ">
            <el-option v-for="item in CALL_CATEGORY_CODE"
                       :key="item.LOOKUP_CODE"
                       :label="item.DESCRIPTION"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._26')"
                      prop="CALL_TYPE_CODE"
                      class="StopLineForm-item">
          <el-select style="width: 100%;"
                     clearable
                     @change="typeClick"
                     v-model="ChildForm.CALL_TYPE_CODE"
                     placeholder=" ">
            <el-option v-for="item in CALL_TYPE_CODE"
                       :key="item.LOOKUP_CODE"
                       :label="item.DESCRIPTION"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._27')"
                      prop="CALL_TITLE"
                      class="StopLineForm-item">
          <el-select style="width: 100%;"
                     clearable
                     @change="titleClick"
                     v-model="ChildForm.CALL_TITLE"
                     placeholder=" ">
            <el-option v-for="(item,index) in CALL_TITLE"
                       :key="index"
                       :label="item.CALL_TITLE"
                       :value="item.CALL_TITLE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._28')"
                      prop="CALL_CODE"
                      class="StopLineForm-item">
          <el-input v-model="ChildForm.CALL_CODE"
                    disabled
                    type="text"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('StopLineControl._29')"
                      style="flex:0 0 100%"
                      prop="DESCRIPTION">
          <el-input v-model="ChildForm.CHINESE"
                    disabled
                    type="textarea"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('MesMessageReceiverGroup._9')"
                      class="StopLineForm-item">
          <el-switch v-model="ChildForm.ENABLED"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
      </el-form>
      <div style="text-align: center;width:100%">
        <el-button type="success"
                   @click="MSTdefine('callVal')">&nbsp;{{$t('publics.btn.makeSure')}}&nbsp;</el-button>
        <el-button @click="innerVisible=false">&nbsp;{{$t('publics.btn.cancel')}}&nbsp;</el-button>
      </div>
    </el-dialog>
    <!-- 新增线别 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('StopLineControl._30')"
               :visible.sync="LinetypeDialog"
               width="70%"
               class="main-dlalog">
      <div style="margin-bottom: 15px;">
        <el-select style="width: 150px"
                   clearable
                   v-model="LinetypForm.LINE_ID"
                   :placeholder="$t('StopLineControl._15')">
          <el-option v-for="item in LINE_ID"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-select style="width: 150px"
                   clearable
                   v-model="LinetypForm.LINE_TYPE"
                   :placeholder="$t('StopLineControl._16')">
          <el-option v-for="item in LINE_TYPE"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-cascader v-model="LinetypForm.ORGANIZE_ID"
                     :options="organizeList"
                     clearable
                     style="width: 150px;margin-right: 10px;"
                     :show-all-levels="false"
                     :placeholder="$t('MesMessageReceiverGroup._1')"
                     :props="casProps"
                     @change="handleChangeCascader"></el-cascader>&nbsp;&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   @click.native="Linetypesearch">{{$t('publics.btn.search')}}</el-button>
        <el-button type="primary"
                   @click="LinetypedetClick">{{$t('publics.btn.makeSure')}}</el-button>
        <el-button @click="LinetypeDialog = false">{{$t('publics.btn.cancel')}}</el-button>
      </div>
      <div class="usertable">
        <el-table ref="procesrefs"
                  :data="LinetypTable"
                  style="width: 100%;"
                  height="100%"
                  border
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  @selection-change="LinetypeSelection">
          <el-table-column type="selection"
                           align="center"
                           width="55" />
          <el-table-column prop="LINE_NAME"
                           align="center"
                           :label="$t('StopLineControl._18')" />
          <el-table-column prop="CHINESE"
                           align="center"
                           :label="$t('StopLineControl._19')" />
          <el-table-column prop="ORGANIZE_NAME"
                           align="center"
                           :label="$t('StopLineControl._20')" />
          <!-- <el-table-column prop="MOBILE"
                           align="center"
                           :label="$t('MesMessageReceiverGroup._15')" /> -->
        </el-table>
      </div>
      <el-pagination :current-page="LinetypForm.Page"
                     style="margin-top: 10px;"
                     :page-size="LinetypForm.Limit"
                     :page-sizes="[15,25,35,45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="Linetyptotal"
                     @size-change="LinetypetSizeChange"
                     @current-change="LinetypeChange" />
    </el-dialog>
    <!-- 新增产品 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('StopLineControl._31')"
               :visible.sync="dialogVisible"
               width="70%"
               class="main-dlalog">
      <div style="margin-bottom: 15px;">
        <el-input v-model="ProductForm.PART_NO"
                  :placeholder="$t('StopLineControl._21')"
                  clearable
                  style="width:150px" />&nbsp;
        <!-- <el-input v-model="ProductForm.Key"
                  :placeholder="$t('请输入规格描述')"
                  clearable
                  style="width:150px" />&nbsp;&nbsp; -->
        <el-button type="success"
                   icon="el-icon-search"
                   @click.native="ProductSearch">{{$t('publics.btn.search')}}</el-button>
        <el-button type="primary"
                   @click="ProductdetClick">{{$t('publics.btn.makeSure')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('publics.btn.cancel')}}</el-button>
      </div>
      <div class="usertable">
        <el-table ref="procesrefs"
                  :data="ProductTable"
                  style="width: 100%;"
                  height="100%"
                  border
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  @selection-change="ProductSelectionChange">
          <el-table-column type="selection"
                           align="center"
                           width="55" />
          <el-table-column prop="CODE"
                           align="center"
                           :label="$t('StopLineControl._22')" />
          <el-table-column prop="NAME"
                           align="center"
                           :label="$t('StopLineControl._32')" />
        </el-table>
      </div>
      <el-pagination :current-page="ProductForm.Page"
                     style="margin-top: 10px;"
                     :page-size="ProductForm.Limit"
                     :page-sizes="[15,25,35,45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="Producttotal"
                     @size-change="ProductSizeChange"
                     @current-change="ProductChange" />
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import {
  Index,
  CallConfigIndex,
  LoadDataNew,
  ChangeEnabled,
  DeleteOneById,
  GetCallContentConfigByTypeCode,
  GetDivisionUnit,
  GetStopLineAndCallDataByID,
  SaveDataNew,
  LoadDataStopLines,
  ChangeStopLinesEnabled,
  DeleteStopLinesById,
  GetStopLinesToAdd,
  SaveDataStopLines,
  LoadDataLinePN,
  ChangeLinePNEnabled,
  DeleteLinePNById,
  GetLinePNoAdd,
  SaveLinePNData
} from '@/api/SfcsProductStopline'
import { mapGetters } from 'vuex'
import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'StopLineControl',
  components: {
    customContainerHeader
  },
  data () {
    return {
      LINE_ID: [], // 线别ID
      STOPLINE_MODE: [], // 管控模式
      STOPLINE_MODEList: [],
      STOP_OPERATION_ID: [], // 管控工序
      STOP_OPERATION_IDList: [],

      LINE_TYPE: [], // 线体类别
      activeName: 'Linetype',
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      organizeList: [],
      planData: [],
      MstQuery: {
        STOPLINE_MODE: '', // 停线管控模式
        STOP_OPERATION_ID: '', // 工序ID
        LINE_ID: '', //  线别
        Page: 1, // 当前页
        Limit: 15 // 分页大小
      },
      MstLoading: false,
      MstTable: [],
      Msttotal: 0,
      MstActivate: {
        Id: 0,
        Status: false,
        Operator: ''
      },
      innerVisible: false,
      addorediText: '',
      MstForm: {
        ID: 0,
        PART_NO: '',
        STOPLINE_MODE: 0,
        STOP_OPERATION_CODE: 0,
        STOP_OPERATION_ID: 0,
        ALARM_CRITERIA: 0,
        STOP_CRITERIA: 0,
        DIVISION_CRITERIA: 0,
        DIVISION_START: 0,
        DIVISION_UNIT: 0,
        ALARM_INTERVAL: 0,
        INPUT_CONTROL: '',
        INPUT_OPERATION_CODE: 0,
        INPUT_CONTROL_CRITERIA: 0,
        INCLUDE_NDF: '',
        ENABLED: ''
      },
      ChildForm: {
        ID: 0,
        CALL_CATEGORY_CODE: '',
        CALL_TYPE_CODE: '',
        CALL_TITLE: '',
        CHINESE: '',
        CALL_CODE: '',
        PRODUCT_STOPLINE_ID: 0, // 停线管控配置表ID
        ENABLED: 'Y', // 是否启用
        CALL_TONTENT_ID: 0 // 异常内容配置表ID

      },
      Childrules: {},
      abnormalForm: {
        code: '', // 种类
        typecode: '', // 类型
        title: '' // 异常标题
      },
      DivisionUnitList: [],
      DivisionUnitBox: [],
      DivisionUnitListMap: {},
      CALL_CATEGORY_CODE: [], // 异常种类
      CALL_TYPE_CODE: [], // 异常类型
      CALL_TITLE: [], // 异常标题
      rules: {
        STOPLINE_MODE: [{
          required: true,
          message: this.$t('StopLineControl._1'),
          trigger: 'change'
        }],
        STOP_OPERATION_ID: [{
          required: true,
          message: this.$t('StopLineControl._2'),
          trigger: 'change'
        }],
        ALARM_CRITERIA: [{
          required: true,
          message: this.$t('StopLineControl._33'),
          trigger: 'blur'
        }],
        STOP_CRITERIA: [{
          required: true,
          message: this.$t('StopLineControl._34'),
          trigger: 'blur'
        }],
        DIVISION_CRITERIA: [{
          required: true,
          message: this.$t('StopLineControl._35'),
          trigger: 'blur'
        }],
        DIVISION_START: [{
          required: true,
          message: this.$t('StopLineControl._36'),
          trigger: 'blur'
        }],
        ALARM_INTERVAL: [{
          required: true,
          message: this.$t('StopLineControl._37'),
          trigger: 'blur'
        }]
      },

      // 管控线别
      ControlLineTable: [],
      ControlLinetotal: 0,
      ControlLineForm: {
        STOPLINE_ID: 0, // 主表ID(停线管控主表ID、页面下方查询使用)
        LINE_ID: '', // 线体ID
        LINE_TYPE: '', // 线体类别
        ORGANIZE_ID: '', // 组织架构ID
        Page: 1, // 当前页
        Limit: 15 // 分页大小
      },
      LinetypeDialog: false,
      LinetypTable: [],
      Linetyptotal: 0,
      LinetypForm: {
        STOPLINE_ID: 0, // 主表ID(停线管控主表ID、页面下方查询使用)
        LINE_ID: '', // 线体ID
        LINE_TYPE: '', // 线体类别
        ORGANIZE_ID: '', // 组织架构ID
        Page: 1, // 当前页
        Limit: 15 // 分页大小
      },
      ControActivate: {
        Id: 0,
        Status: false,
        Operator: ''
      },
      ControForm: {
        InsertRecords: []
      },

      ContProdTable: [],
      ContProdtotal: 0,
      ContProdForm: {
        STOPLINE_ID: 0, // 主表ID(停线管控主表ID、页面下方查询使用)
        PART_NO: '', // 料号
        Page: 1, // 当前页
        Limit: 15 // 分页大小
      },
      ContPActivate: {
        Id: 0,
        Status: false,
        Operator: ''
      },
      // 新增产品
      dialogVisible: false,
      ProductTable: [],
      Producttotal: 0,
      ProductForm: {
        STOPLINE_ID: 0,
        PART_NO: '',
        Page: 1, // 当前页
        Limit: 15 // 分页大小
      },
      ProductSuib: {
        InsertRecords: []
      },
      MstID: 0
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.getOrganize()
    this.getIndex()
    this.getCallConfigIndex()
    this.MstActivate.Operator = this.userinfo.USER_NAME
    this.ControActivate.Operator = this.userinfo.USER_NAME
    this.ContPActivate.Operator = this.userinfo.USER_NAME
  },
  methods: {
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.LinetypForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    Formascader (e) {
      // 直接抄
      if (e && e.length) {
        this.ControlLineForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await _LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager.map(item => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      let arr = []
      data.map(item => {
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
      console.log(arr, 'arrarrarr')
      return arr
    },
    // 获取下拉框
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.LINE_ID = res.Result.LINE_ID// 线别ID
        this.STOPLINE_MODE = res.Result.STOPLINE_MODE// 管控模式
        this.STOP_OPERATION_ID = res.Result.STOP_OPERATION_ID// 管控工序
        this.LINE_TYPE = res.Result.LINE_TYPE// 线体类别
        this.STOPLINE_MODEList.push({
          label: '',
          value: '',
          disabled: false
        })
        this.STOPLINE_MODE.map(item => {
          this.STOPLINE_MODEList.push({
            label: item.CHINESE,
            value: Number(item.LOOKUP_CODE),
            disabled: false
          })
        })

        this.STOP_OPERATION_IDList.push({
          label: '',
          value: '',
          disabled: false
        })
        this.STOP_OPERATION_ID.map(item => {
          this.STOP_OPERATION_IDList.push({
            label: item.OPERATION_NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.DivisionUnitList = res.Result.UnitList
        this.DivisionUnitBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DivisionUnitList.map(item => {
          this.DivisionUnitBox.push({
            label: item.CHINESE,
            value: Number(item.LOOKUP_CODE),
            disabled: false
          })
        })
        console.log(res.Result, '获取下拉框')
        this.getLoadDataNew()
      }
    },
    // 获取下拉框
    async getCallConfigIndex () {
      const res = await CallConfigIndex()
      if (res.Result) {
        this.CALL_CATEGORY_CODE = res.Result.CALL_CATEGORY_CODE// 异常种类
        this.CALL_TYPE_CODE = res.Result.CALL_TYPE_CODE// 异常类型
        this.CALL_TITLE = res.Result.CALL_TITLE// 异常标题
        console.log(res.Result, '编辑-获取下拉框')
      }
    },
    // 获取数据
    async getLoadDataNew () {
      const res = await LoadDataNew(this.MstQuery)
      console.log(res, '获取主表格列表')
      this.MstTable = res.Result
      this.Msttotal = res.TotalCount
      this.MstLoading = false
    },
    MstSearch () {
      this.MstQuery.Page = 1
      this.getLoadDataNew()
    },
    handleSizeChange (val) {
      this.MstQuery.Limit = val
      this.getLoadDataNew()
    },
    handleCurrentChange (val) {
      this.MstQuery.Page = val
      this.getLoadDataNew()
    },

    // 主表是否激活
    Mstchange (row) {
      if (row.ENABLED === 'Y') {
        this.MstActivate.Status = true
      } else {
        this.MstActivate.Status = false
      }
      this.MstActivate.Id = row.ID
      this.$confirm(this.$t('cccn._20'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.MstActivate).then(res => {
            if (res.Result) {
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            }
            this.getLoadDataNew()
          })
        })
        .catch(() => {
          this.getLoadDataNew()
        })
    },
    handleChangeModel (e) {
      this.getDivisionUnit(e)
    },
    async getDivisionUnit (stoplineMode) {
      const res = await GetDivisionUnit(stoplineMode)
      if (res.Result) {
        const { DivisionUnit } = res.Result
        this.MstForm.INCLUDE_NDF = res.Result.INCLUDE_NDF || 'N'
        console.log(this.DivisionUnitListMap[DivisionUnit], 'this.DivisionUnitListMap[DivisionUnit]')
        this.MstForm.DIVISION_UNIT = res.Result.DivisionUnit
      }
    },
    formatterDivsionUnit ({ cellValue }) {
      return this.DivisionUnitListMap[cellValue]?.label || ''
    },
    MstAdd () {
      this.Eliminate()
      this.MstForm.INCLUDE_NDF = 'N'
      this.addorediText = this.$t('publics.btn.add')
      this.innerVisible = true
    },
    // 编辑
    MSTeditClick (row) {
      this.GetStopLineAndCall(row.ID)
      this.addorediText = this.$t('publics.btn.edit')
      this.MstForm = row
      this.MstForm.INCLUDE_NDF = 'N'
      this.innerVisible = true
    },
    // 获取呼叫内容
    async GetStopLineAndCall (e) {
      const res = await GetStopLineAndCallDataByID({ 'id': e })
      if (res.Result) {
        var data = res.Result[0]
        console.log(this.ChildForm, 'this.ChildFormthis.ChildForm')
        this.ChildForm.ID = data.CALLID ? data.CALLID : 0
        this.ChildForm.CALL_CATEGORY_CODE = Number(data.CALL_CATEGORY_CODE) ? Number(data.CALL_CATEGORY_CODE) : ''
        this.ChildForm.CALL_TYPE_CODE = Number(data.CALL_TYPE_CODE) ? Number(data.CALL_TYPE_CODE) : ''
        this.ChildForm.CALL_TITLE = data.CALL_TITLE
        this.ChildForm.CHINESE = data.CHINESE
        this.ChildForm.CALL_CODE = data.CALL_CODE
        this.ChildForm.ENABLED = data.CALLENABLED
        this.abnormalForm.code = data.CALL_CATEGORY_CODE // 种类
        this.abnormalForm.typecode = data.CALL_TYPE_CODE // 类型
        this.abnormalForm.title = data.CALL_TITLE // 异常标题
        //  停线管控配置表ID
        this.ChildForm.PRODUCT_STOPLINE_ID = e
        this.ChildForm.CALL_TONTENT_ID = data.CONTENTID
      }
      console.log(res, '获取呼叫内容')
    },
    categoryClick (e) {
      this.abnormalForm.code = e // 种类
    },
    typeClick (e) {
      this.abnormalForm.typecode = e // 类型
    },
    titleClick (e) {
      this.abnormalForm.title = e // 异常标题
      this.GetCallContentConfigByType()
    },
    async GetCallContentConfigByType () {
      const res = await GetCallContentConfigByTypeCode(this.abnormalForm)
      if (res.Result) {
        var data = res.Result[0] ? res.Result[0] : []
        console.log(res.Result[0], 'res.Result[0]')
        console.log(data, 'datadata')
        if (data.length !== 0) {
          // this.ChildForm.CALL_CATEGORY_CODE = Number(data.CALL_CATEGORY_CODE) ? data.CALL_CATEGORY_CODE : ''
          // this.ChildForm.CALL_TYPE_CODE = Number(data.CALL_TYPE_CODE) ? data.CALL_TYPE_CODE : ''
          this.ChildForm.CALL_TITLE = data.CALL_TITLE ? data.CALL_TITLE : ''
          this.ChildForm.CHINESE = data.CHINESE ? data.CHINESE : ''
          this.ChildForm.CALL_CODE = data.CHINESE ? data.CALL_CODE : ''
          // this.ChildForm.ENABLED = data.CHINESE ? data.ENABLED : ''
          this.ChildForm.CALL_TONTENT_ID = data.ID // 这条数据的ID
        } else {
          this.$message({
            showClose: true,
            message: this.$t('StopLineControl._38'),
            type: 'warning'
          })
          this.ChildForm.CALL_CODE = ''
          this.ChildForm.CHINESE = ''
          this.ChildForm.CALL_TITLE = ''
        }
      }
      // console.log(res, '获取主表格列表')
    },
    // 确定提交
    MSTdefine () {
      this.$refs.callVal.validate(
        async (valid, errInfo) => {
          if (valid) {
            if (this.ChildForm.CALL_CATEGORY_CODE === '') {
              this.$message({
                showClose: true,
                message: this.$t('StopLineControl._39'),
                type: 'error'
              })
              return
            }
            if (this.ChildForm.CALL_TYPE_CODE === '') {
              this.$message({
                showClose: true,
                message: this.$t('StopLineControl._40'),
                type: 'error'
              })
              return
            }
            if (this.ChildForm.CALL_TITLE === '') {
              this.$message({
                showClose: true,
                message: this.$t('StopLineControl._41'),
                type: 'error'
              })
              return
            }
            var obj = {
              InsertRecords: [], // 增
              UpdateRecords: [], // 更
              InserStoplineCallRecords: [], // 增
              UpdateStoplineCallRecords: [] // 更
            }
            if (this.MstForm.ID === 0) {
              obj.InsertRecords.push(this.MstForm)
              obj.InserStoplineCallRecords.push(this.ChildForm)
            } else {
              obj.UpdateRecords.push(this.MstForm)
              obj.UpdateStoplineCallRecords.push(this.ChildForm)
            }
            console.log(JSON.stringify(obj), 'JSON.stringify(obj)')
            const res = await SaveDataNew(obj)
            if (res.Result) {
              this.innerVisible = false
              this.getLoadDataNew()
              this.$notify({
                title: this.$t('publics.tips.tips'),
                message: this.$t('publics.tips.submitSuccess'),
                type: 'success',
                duration: 2000
              })
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
    // 主表删除
    MSTdeleteClick (row) {
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(response => {
        DeleteOneById(row.ID).then(response => {
          if (response.Result) {
            this.$notify({
              title: this.$t('publics.tips.tips'),
              message: this.$t('publics.tips.submitSuccess'),
              type: 'success',
              duration: 2000
            })
            this.getLoadDataNew()
          } else {
            this.getLoadDataNew()
          }
        })
      })
    },
    // 主表选择
    MSTcellClick (e) {
      this.MstID = e.row.ID
      if (this.activeName === 'Linetype') {
        this.ControlLineForm.STOPLINE_ID = this.MstID
        this.getCLLoadData()
      } else {
        this.ContProdForm.STOPLINE_ID = this.MstID
        this.getContProdLoadData()
      }
    },
    // tab切换
    handleClick (tab, event) {
      this.ControlLineForm.STOPLINE_ID = this.MstID
      this.ContProdForm.STOPLINE_ID = this.MstID
      if (this.activeName === 'Linetype') {
        if (this.ControlLineForm.STOPLINE_ID) {
          this.getCLLoadData()
        }
      } else {
        if (this.ContProdForm.STOPLINE_ID) {
          this.getContProdLoadData()
        }
      }
    },
    // 管控线别
    async getCLLoadData () {
      const res = await LoadDataStopLines(this.ControlLineForm)
      if (res.Result) {
        this.ControlLineTable = res.Result ? res.Result : []
        this.ControlLinetotal = res.TotalCount ? res.TotalCount : 0
      }
    },
    ControlLineSearch () {
      if (this.ControlLineForm.STOPLINE_ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('StopLineControl._42'),
          type: 'warning'
        })
        return
      }
      this.ControlLineForm.Page = 1
      this.getCLLoadData()
    },
    ControlLineSizeChange (val) {
      this.ControlLineForm.Limit = val
      this.getCLLoadData()
    },
    ControlLineCurrentChange (val) {
      this.ControlLineForm.Page = val
      this.getCLLoadData()
    },
    // 管控线别是否激活
    LinetypeEabled (row) {
      this.ControActivate.Id = row.ID
      if (row.ENABLED === 'Y') {
        this.ControActivate.Status = true
      } else {
        this.ControActivate.Status = false
      }
      this.$confirm(this.$t('cccn._20'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      })
        .then(() => {
          ChangeStopLinesEnabled(this.ControActivate).then(res => {
            if (res.Result) {
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            }
            this.getCLLoadData()
          })
        })
        .catch(() => {
          this.getCLLoadData()
        })
    },
    // 删除
    async LinetypedeleteClick (row) {
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(v => {
        DeleteStopLinesById(row.ID).then(res => {
          if (res.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getCLLoadData()
          } else {
            this.getCLLoadData()
          }
        })
      })
    },
    // 新增线别
    LinetypeAdd () {
      if (this.ControlLineForm.STOPLINE_ID === 0) {
        console.log(this.ControlLineForm.STOPLINE_ID, 'this.ControlLineForm.STOPLINE_ID')

        this.$message({
          showClose: true,
          message: this.$t('StopLineControl._42'),
          type: 'warning'
        })
        return
      }
      this.LinetypForm.STOPLINE_ID = this.ControlLineForm.STOPLINE_ID
      this.LinetypeDialog = true
      this.LinetypeLoadData()
    },
    async LinetypeLoadData () {
      const res = await GetStopLinesToAdd(this.LinetypForm)
      if (res.Result) {
        this.LinetypTable = res.Result ? res.Result : []
        this.Linetyptotal = res.TotalCount ? res.TotalCount : 0
      }
    },
    Linetypesearch () {
      this.LinetypForm.Page = 1
      this.LinetypeLoadData()
    },
    LinetypetSizeChange (val) {
      this.LinetypForm.Limit = val
      this.LinetypeLoadData()
    },
    LinetypeChange (val) {
      this.LinetypForm.Page = val
      this.LinetypeLoadData()
    },
    // 选择用户
    LinetypeSelection (row) {
      var PrimaryTable = row
      PrimaryTable.forEach(v => {
        v.ENABLED = 'Y'
        v.PRODUCT_STOPLINE_ID = this.ControlLineForm.STOPLINE_ID
        v.LINE_TYPE = v.CHINESE
      })
      this.ControForm.InsertRecords = PrimaryTable
      console.log(PrimaryTable, 'result')
    },
    // 选中用户确定
    async LinetypedetClick () {
      if (this.ControForm.InsertRecords.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('StopLineControl._43'),
          type: 'warning'
        })
        return
      }
      const res = await SaveDataStopLines(this.ControForm)
      if (res.Result) {
        this.LinetypeDialog = false
        this.$notify({
          title: this.$t('cccn._24'),
          message: this.$t('cccn._25'),
          type: 'success',
          duration: 2000
        })
        this.getCLLoadData()
      }
    },
    // 管控产品
    async getContProdLoadData () {
      const res = await LoadDataLinePN(this.ContProdForm)
      if (res.Result) {
        this.ContProdTable = res.Result ? res.Result : []
        this.ContProdtotal = res.TotalCount ? res.TotalCount : 0
      }
    },
    ContProdSearch () {
      if (this.ContProdForm.STOPLINE_ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('StopLineControl._42'),
          type: 'warning'
        })
        return
      }
      this.ContProdForm.Page = 1
      this.getContProdLoadData()
    },
    ContProdSizeChange (val) {
      this.ContProdForm.Limit = val
      this.getContProdLoadData()
    },
    ContProdCurrentChange (val) {
      this.ContProdForm.Page = val
      this.getContProdLoadData()
    },
    // 管控产品是否激活
    ContProdEnaled (row) {
      if (row.ENABLED === 'Y') {
        this.ContPActivate.Status = true
      } else {
        this.ContPActivate.Status = false
      }
      this.ContPActivate.Id = row.ID
      this.$confirm(this.$t('cccn._20'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      })
        .then(() => {
          ChangeLinePNEnabled(this.ContPActivate).then(res => {
            if (res.Result) {
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            }
            this.getContProdLoadData()
          })
        })
        .catch(() => {
          this.getContProdLoadData()
        })
    },
    // 删除
    async ChilddeleteClick (row) {
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(v => {
        DeleteLinePNById(row.ID).then(res => {
          if (res.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
          }
          this.getContProdLoadData()
        })
      })
    },
    // 新增产品
    ContProdAdd () {
      if (this.ContProdForm.STOPLINE_ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('StopLineControl._42'),
          type: 'warning'
        })
        return
      }
      this.ProductForm.STOPLINE_ID = this.ContProdForm.STOPLINE_ID
      this.dialogVisible = true
      this.getProductLoadData()
    },
    async getProductLoadData () {
      const res = await GetLinePNoAdd(this.ProductForm)
      if (res.Result) {
        this.ProductTable = res.Result ? res.Result : []
        this.Producttotal = res.TotalCount ? res.TotalCount : 0
      }
    },
    ProductSearch () {
      this.ProductForm.Page = 1
      this.getProductLoadData()
    },

    ProductSizeChange (val) {
      this.ProductForm.Limit = val
      this.getProductLoadData()
    },
    ProductChange (val) {
      this.ProductForm.Page = val
      this.getProductLoadData()
    },
    // 选择用户
    ProductSelectionChange (row) {
      var PrimaryTable = row
      PrimaryTable.forEach(v => {
        v.PRODUCT_STOPLINE_ID = this.ContProdForm.STOPLINE_ID
        v.ENABLED = 'Y'
        v.PART_NO = v.CODE
        v.MODEL = v.NAME
      })
      this.ProductSuib.InsertRecords = PrimaryTable
      console.log(PrimaryTable, 'result')
    },
    // 选中用户确定
    async ProductdetClick () {
      if (this.ProductSuib.InsertRecords.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('StopLineControl._44'),
          type: 'warning'
        })
        return
      }
      const res = await SaveLinePNData(this.ProductSuib)
      if (res.Result) {
        this.dialogVisible = false
        this.$notify({
          title: this.$t('cccn._24'),
          message: this.$t('cccn._25'),
          type: 'success',
          duration: 2000
        })
        this.getContProdLoadData()
      }
    },
    // 清空
    Eliminate () {
      this.MstForm = {
        ID: 0,
        PART_NO: '',
        STOPLINE_MODE: '',
        STOP_OPERATION_CODE: '',
        STOP_OPERATION_ID: '',
        ALARM_CRITERIA: '',
        STOP_CRITERIA: '',
        DIVISION_CRITERIA: '',
        DIVISION_START: '',
        DIVISION_UNIT: '',
        ALARM_INTERVAL: '',
        INPUT_CONTROL: '',
        INPUT_OPERATION_CODE: '',
        INPUT_CONTROL_CRITERIA: '',
        INCLUDE_NDF: '',
        ENABLED: 'Y'
      }
      this.ChildForm = {
        ID: 0,
        CALL_CATEGORY_CODE: '',
        CALL_TYPE_CODE: '',
        CALL_TITLE: '',
        CHINESE: '',
        CALL_CODE: '',
        PRODUCT_STOPLINE_ID: 0, // 停线管控配置表ID
        ENABLED: 'Y', // 是否启用
        CALL_TONTENT_ID: 0 // 异常内容配置表ID
      }
    }
  }
}
</script>
<style lang="scss">
.msttable,
.chidtable,
.usertable {
  height: calc(100vh - 535px);
}
.StopLineForm {
  display: flex;
  flex-wrap: wrap;
  .StopLineForm-item {
    flex: 0 0 50%;
  }
}
.el-dialog__body {
  padding: 20px 15px;
}
</style>
