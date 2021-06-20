<template>
  <div class="HiMaterial">
    <div class="container-fluid"
         :class="{
      huise: !lineId || dialogVisible
    }">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="16"
                :offset="4">
          <div class="kanban-title-panel">{{ $t('_kanban._16') }}</div>
        </el-col>
        <el-col :span="4"
                style="display: flex;align-items: center;height: 100%">
          <a id="liang"
             href="javascript:void(0)"
             class="tit-btn"
             style="margin-right: 20px"
             @click="dialogVisible = true">{{ $t("_kanban._1") }}</a>
          <a href="javascript:void(0)"
             class="tit-btn"
             @click="$options.fs.fullScreen.handleFullScreen(this)">{{ $t("smt.fs") }}</a>
        </el-col>
      </el-row>
      <!-- 头部 end -->

      <!-- 工单信息 start -->
      <div class="kanban-wo-info">
        <div class="kanban-wo-info-panel">
          <el-row>
            <el-col :span="1">
              <div class="div-title">{{ $t("smt.tb") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="LineName"
                   class="text-overflow div-value">{{ info.OPERATION_LINE_NAME || " " }}</div>
            </el-col>
            <el-col :span="1"
                    :offset="info.WO_NO ? 0 : 5">
              <div class="div-title">{{ $t("smt.wo") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoNo"
                   class="text-overflow div-value">{{ info.WO_NO || " " }}</div>
            </el-col>
            <el-col :span="1"
                    :offset="info.PART_NO ? 0 : 5">
              <div class="div-title">{{ $t("smt.po") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="PartNo"
                   class="text-overflow div-value">{{ info.PART_NO || " " }}</div>
            </el-col>
            <el-col :span="1"
                    :offset="info.MODEL ? 0 : 5">
              <div class="div-title">{{ $t("smt.wl") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoModel"
                   class="text-overflow div-value">{{ info.MODEL || " " }}</div>
            </el-col>
            <span class="top-left border-span-m" />
            <span class="top-right border-span-m" />
            <span class="bottom-left border-span-m" />
            <span class="bottom-right border-span-m" />
          </el-row>
        </div>
      </div>
      <!-- 工单信息 end -->

      <!-- 主体 start -->
      <div style="height: calc(100vh - 70px - 67px);">
        <el-row>
          <el-col :span="6"
                  style="padding-right: 7.5px;box-sizing: border-box">
            <div class="block-center">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="height:50px;">{{ $t("smt.wc") }}</div>
                <div id="WoYieldPie" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="18"
                  style="padding-left: 7.5px;box-sizing: border-box">
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg">
                <div id="HiMaterialBar"
                     style="height:100%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="block-center">
              <div id="materPabel"
                   class="kanban-andon-call-panel kanban-panel-bg"
                   style="height:100%;">
                <el-tabs v-model="activeName"
                         @tab-click="handleClick"
                         style="height: 100%"
                         class="custom-tabs">
                  <el-tab-pane :label="$t('HiMaterial._37')"
                               name="charging"
                               style="height: calc(100% - 55px)">
                    <div class="overflowDiv1"
                         style="width:100%;height: 100%;overflow: auto">
                      <div>
                        <table class="ListTable table table-striped">
                          <thead>
                            <tr>
                              <!-- <th style="width:9%;">{{ $t('HiMaterial._1') }}</th> -->
                              <th style="width:10%;">{{ $t('HiMaterial._2') }}</th>
                              <th style="width:10%;">{{ $t('HiMaterial._3') }}</th>
                              <th style="width:16%;">{{ $t('HiMaterial._4') }}</th>
                              <th style="width:4%;">{{ $t('HiMaterial._5') }}</th>
                              <th style="width:4%;">{{ $t('HiMaterial._6') }}</th>
                              <th style="width:4%;">{{ $t('HiMaterial._7') }}</th>
                              <th style="width:3%;">{{ $t('HiMaterial._8') }}</th>
                              <th style="width:10%;">{{ $t('HiMaterial._9') }}</th>
                              <th style="width:6%;">{{ $t('HiMaterial._10') }}</th>
                              <!-- <th style="width:6%;">{{ $t('HiMaterial._11') }}</th> -->
                              <th style="width:6%;">{{ $t('HiMaterial._12') }}</th>
                              <th style="width:6%;">{{ $t('HiMaterial._36') }}</th>
                              <th style="width:6%;">{{ $t('HiMaterial._13') }}</th>
                              <th style="width:5%;">{{ $t('HiMaterial._14') }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in listTwo"
                                :key="index">
                              <!-- <th style="width:9%;"
                                  l="OPERATION_SITE_NAME">{{ item.OPERATION_SITE_NAME }}</th> -->
                              <th style="width:10%;"
                                  l="PART_NAME">{{ item.PART_NAME }}</th>
                              <th style="width:10%;"
                                  l="PART_NO">{{ item.PART_NO }}</th>
                              <th style="width:16%;"
                                  l="REEL_ID">{{ item.REEL_ID }}</th>
                              <th style="width:4%;"
                                  l="QTY">{{ item.QTY || 0 }}</th>
                              <th style="width:4%;"
                                  l="ORG_QTY">{{ item.ORG_QTY || 0 }}</th>
                              <th style="width:4%;"
                                  l="USED_QTY">{{ item.USED_QTY || 0 }}</th>
                              <th style="width:3%;"
                                  l="STATUS">{{ item.STATUS }}</th>
                              <th style="width:10%;"
                                  l="CREATE_TIME">{{ item.CREATE_TIME }}</th>
                              <th style="width:6%;"
                                  l="OPERTOR">{{ item.OPERTOR }}</th>
                              <!-- <th style="width:6%;"
                                  l="MES_USER">{{ item.MES_USER }}</th> -->
                              <th style="width:6%;"
                                  l="LOT_CODE">{{ item.LOT_CODE }}</th>
                              <th style="width:6%;"
                                  l="DATE_CODE">{{ item.DATE_CODE }}</th>
                              <th style="width:6%;"
                                  l="V_NAME">{{ item.V_NAME }}</th>
                              <th style="width:5%;"
                                  l="值都是ok">OK</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- <div
                      id="materTableDiv"
                      class="materTableDiv"
                      style="overflow-y:auto;height:100px;"
                    >
                      <table
                        id="HiAddMaterialList"
                        class="ListTable table table-striped"
                        style="color:white;border-top:0"
                      />
                    </div>-->
                  </el-tab-pane>
                  <el-tab-pane :label="$t('HiMaterial._38')"
                               name="water"
                               style="height: calc(100% - 55px)">
                    <div class="overflowDiv2"
                         style="width:100%;height: 100%;overflow: auto">
                      <div>
                        <table class="ListTable table table-striped">
                          <thead>
                            <tr>
                              <!-- <th style="width:6%;">{{ $t('HiMaterial._15') }}</th> -->
                              <th style="width:8%;">{{ $t('HiMaterial._16') }}</th>
                              <th style="width:8%;">{{ $t('HiMaterial._17') }}</th>
                              <th style="width:4%;">{{ $t('HiMaterial._18') }}</th>
                              <th style="width:9%;">{{ $t('HiMaterial._19') }}</th>
                              <th style="width:8%;">{{ $t('HiMaterial._20') }}</th>
                              <th style="width:8%;">{{ $t('HiMaterial._21') }}</th>
                              <!-- <th style="width:5%;">{{ $t('HiMaterial._22') }}</th> -->
                              <th style="width:5%;">{{ $t('HiMaterial._36') }}</th>
                              <th style="width:6%;">{{ $t('HiMaterial._23') }}</th>
                              <th style="width:5%;">{{ $t('HiMaterial._24') }}</th>
                              <th style="width:5%;">{{ $t('HiMaterial._25') }}</th>
                              <th style="width:9%;">{{ $t('HiMaterial._26') }}</th>
                              <th style="width:4%;">{{ $t('HiMaterial._27') }}</th>
                              <th style="width:4%;">{{ $t('HiMaterial._28') }}</th>
                              <th style="width:5%;">{{ $t('HiMaterial._29') }}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in listOne"
                                :key="index">
                              <!-- <th style="width:6%;"
                                  l="OPERATION_NAME">{{ item.OPERATION_NAME }}</th> -->
                              <th style="width:8%;"
                                  l="PART_NO">{{ item.PART_NO }}</th>
                              <th style="width:8%;"
                                  l="PN_NAME">{{ item.PN_NAME }}</th>
                              <th style="width:4%;"
                                  l="UNITY_QTY">{{ item.UNITY_QTY }}</th>
                              <th style="width:9%;"
                                  l="CURR_REEL_ID">{{ item.CURR_REEL_ID }}</th>
                              <th style="width:8%;"
                                  l="REEL_PN">{{ item.REEL_PN }}</th>
                              <!-- <th style="width:8%;"
                                  l="QTY">{{ item.QTY }}</th> -->
                              <th style="width:5%;"
                                  l="MES_USER">{{ item.MES_USER }}</th>
                              <th style="width:5%;"
                                  l="DATE_CODE">{{ item.DATE_CODE }}</th>
                              <th style="width:6%;"
                                  l="LOT_CODE">{{ item.LOT_CODE }}</th>
                              <th style="width:5%;"
                                  l="NAME">{{ item.NAME }}</th>
                              <th style="width:5%;"
                                  l="OPERTOR">{{ item.OPERTOR }}</th>
                              <th style="width:9%;"
                                  l="CREATE_TIME">{{ item.CREATE_TIME }}</th>
                              <th style="width:4%;"
                                  l="PRE_QTY">{{ item.PRE_QTY }}</th>
                              <th style="width:4%;"
                                  l="USED_QTY">{{ item.USED_QTY }}</th>
                              <th style="width:5%;"
                                  l="PCB_QTY">{{ item.PCB_QTY }}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <!-- <div
                      id="materTableDiv2"
                      class="materTableDiv"
                      style="overflow-y:auto;height:100px;"
                    >
                      <table
                        id="HiMaterialList"
                        class="ListTable table table-striped"
                        style="color:white;text-align:center;"
                      />
                    </div>-->
                  </el-tab-pane>
                </el-tabs>

                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 主体 end -->
    </div>
    <el-dialog :title="$t('_kanban._1')"
               :visible.sync="dialogVisible"
               width="30%"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form label-position="top"
               label-width="80px"
               ref="form">
        <el-form-item :label="$t('_kanban._2')">
          <el-select filterable
                     v-model="lineId"
                     clearable
                     :placeholder="$t('_kanban._3')"
                     style="width: 100%"
                     @change="lineChange">
            <el-option v-for="(item,index) in list"
                       :key="index"
                       :label="item.OPERATION_LINE_NAME"
                       :value="item.ID"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('_kanban._4') }}</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">{{ $t('_kanban._5') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./HiMaterial/index.js"></script>

<style scoped>
@import './HiMaterial/index.css';
.huise {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale' x='0' y='0' width='100%' height='100%'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  filter: gray;
}
.container-fluid {
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
}
.HiMaterial .div-title {
  vertical-align: bottom;
  border-bottom: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.div-title,
.div-value {
  box-sizing: border-box;
  vertical-align: bottom;
  border-bottom: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
tbody tr th {
  vertical-align: bottom;
  border-bottom: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style>
.custom-tabs .el-tabs__content {
  height: 100%;
}
.el-tabs__item {
  color: #fff;
}
</style>
