<template>
  <div class="SMT1 ProductLine">
    <div class="container-fluid"
         :class="{
        huise: !lineId || dialogVisible
      }">
      <!-- 头 -->
      <el-row class="kanban-title">
        <el-col :span="16"
                :offset="4">
          <div class="kanban-title-panel">{{ $t("pdl.tit") }}</div>
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
      <!-- 头 -->
      <!-- 工单信息 -->
      <div class="kanban-wo-info">
        <div class="kanban-wo-info-panel">
          <el-row>
            <el-col :span="1">
              <div class="div-title">{{ $t("smt.tb") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="LineName"
                   class="text-overflow div-value">
                {{ LineName || " " }}
              </div>
            </el-col>
            <el-col :span="1"
                    :offset="WoNo ? 0 : 5">
              <div class="div-title">{{ $t("smt.wo") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoNo"
                   class="text-overflow div-value">
                {{ WoNo || " " }}
              </div>
            </el-col>
            <el-col :span="1"
                    :offset="PartNo ? 0 : 5">
              <div class="div-title">{{ $t("smt.po") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="PartNo"
                   class="text-overflow div-value">
                {{ PartNo || " " }}
              </div>
            </el-col>
            <el-col :span="1"
                    :offset="WoModel ? 0 : 5">
              <div class="div-title">{{ $t("smt.wl") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoModel"
                   class="text-overflow div-value">
                {{ WoModel || " " }}
              </div>
            </el-col>
            <span class="top-left border-span-m" />
            <span class="top-right border-span-m" />
            <span class="bottom-left border-span-m" />
            <span class="bottom-right border-span-m" />
          </el-row>
        </div>
      </div>
      <!-- 工单信息 -->
      <!-- 主体 -->
      <div style="height: calc(100vh - 70px - 67px);">
        <el-row>
          <el-col :span="6">
            <div class="block-center">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("pdl.wc") }}
                </div>
                <div id="WoYieldPie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block-center">
              <div class="kanban-andon-call-panel kanban-panel-bg"
                   style="height:100%;">
                <div id="mapswp"
                     class="col-md-12 col-row img-pn"
                     style="height:100%;padding:0px;">
                  <div class="kanban-panel-title">
                    {{ $t("pdl.ac") }}
                  </div>
                  <div style="height: calc(100% - 50px);overflow-y: auto">
                    <table id="AndonCallTable"
                           class="ListTable table table-striped"
                           style="color:white;"
                           v-html="AndonCallTable" />
                  </div>

                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="12"
                  style="padding: 0 15px;box-sizing: border-box">
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg">
                <div id="WoSiteBar" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block-center">
              <div class="kanban-hour-yield-panel kanban-panel-bg">
                <div id="swiper1"
                     class="swiper-container"
                     style="height:100%;padding:0px;">
                  <div id="mapswp-swiper1"
                       class="swiper-wrapper">
                    <div class="swiper-slide">
                      <div id="HourYieldBar" />
                    </div>
                    <div class="swiper-slide">
                      <div id="ExLineDateBar" />
                    </div>
                  </div>
                  <div id="swiper_p1"
                       class="swiper-pagination" />
                </div>

                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="block">
              <div class="kanban-wo-site-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("pdl.sa") }}
                </div>
                <div id="WorkingPassRatePie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block">
              <div class="kanban-wo-site-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("pdl.tr") }}
                </div>
                <div id="WoPassRatePie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block">
              <div class="kanban-top-defect-panel kanban-panel-bg">
                <div id="TopDefectBar"
                     style="height: 100%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 主体 -->
    </div>
    <el-dialog class="my-dialog"
               :title="$t('_kanban._1')"
               :visible.sync="dialogVisible"
               width="30%"
               ref="myDialog"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('_kanban._2')">
          <el-select v-model="lineId"
                     :placeholder="$t('_kanban._3')"
                     style="width: 100%"
                     filterable
                     clearable
                     @change="lineChange">
            <el-option v-for="item in lineLists"
                       :key="item.ID"
                       :label="item.OPERATION_LINE_NAME"
                       :value="item.ID">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("_kanban._4")
        }}</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">{{
          $t("_kanban._5")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./ProductLine/index.js"></script>
<style scoped>
@import './SmtLine/index.css';

.ProductLine {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  color: white;
  font-family: 'Microsoft YaHei';
  background-color: #040f3c;
  background-size: 100% 100%;
}

.huise:not(#liang) {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url('data:image/svg+xml;utf8,#grayscale');
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}

#TopDefectBar {
  box-sizing: border-box;
}
</style>
