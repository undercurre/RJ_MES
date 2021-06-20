<template>
  <div class="SMT1 SmtLine">
    <div class="container-fluid" :class="{
        huise: !lineId || dialogVisible
      }">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="16" :offset="4">
          <div class="kanban-title-panel">{{ $t("smt._6") }}</div>
        </el-col>
        <el-col :span="4" style="display: flex;align-items: center;height: 100%">
          <a
            id="liang"
            href="javascript:void(0)"
            class="tit-btn"
            style="margin-right: 20px"
            @click="dialogVisible = true"
          >{{ $t("_kanban._1") }}</a>
          <a
            href="javascript:void(0)"
            class="tit-btn"
            @click="$options.fs.fullScreen.handleFullScreen(this)"
          >{{ $t("smt.fs") }}</a>
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
              <div id="LineName" class="text-overflow div-value">{{ LineName || " " }}</div>
            </el-col>
            <el-col :span="1" :offset="WoNo ? 0 : 5">
              <div class="div-title">{{ $t("smt.wo") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoNo" class="text-overflow div-value">{{ WoNo || " " }}</div>
            </el-col>
            <el-col :span="1" :offset="PartNo ? 0 : 5">
              <div class="div-title">{{ $t("smt.po") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="PartNo" class="text-overflow div-value">{{ PartNo || " " }}</div>
            </el-col>
            <el-col :span="1" :offset="WoModel ? 0 : 5">
              <div class="div-title">{{ $t("smt.wl") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoModel" class="text-overflow div-value">{{ WoModel || " " }}</div>
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
          <el-col :span="6">
            <!-- 当前工单完成 -->
            <div class="block">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title" style="max-height:50px;height: 15%;">{{$t("smt._7")}}</div>
                <div id="WoYieldPie" style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 不良Top5 -->
            <div class="block">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <!-- <div
                  class="kanban-panel-title"
                  style="max-height:50px;height: 15%;"
                >
                  {{ $t("smt._3") }}
                </div>-->
                <div id="FirstPassRatePie" style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;box-sizing: border-box">
            <!-- 站点统计 -->
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg" style="box-sizing: border-box">
                <div id="RestPcbCountBar" style="height:100%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!--每日生产数量(PCS) -->
            <div class="block-center">
              <div class="kanban-hour-yield-panel kanban-panel-bg" style="box-sizing: border-box">
                <div id="swiper1" class="swiper-container" style="height:100%;padding:0px;">
                  <div id="mapswp-swiper1" class="swiper-wrapper">
                    <div class="swiper-slide">
                      <div id="HourYieldBar" />
                    </div>
                    <!-- <div class="swiper-slide">
                      <div id="ExLineDateBar" />
                    </div>-->
                  </div>
                  <!-- <div id="swiper_p1" class="swiper-pagination" /> -->
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="6" style="padding-left: 15px;box-sizing: border-box">
            <!-- 信息汇总 -->
            <div class="block-center">
              <div
                class="kanban-wo-site-panel kanban-panel-bg"
                style="padding-top: 10px;box-sizing: border-box"
              >
                <div
                  class="kanban-panel-title kanban-content-header"
                  style="border-bottom: 1px dashed cyan;"
                >{{$t("smt._11")}}</div>
                <div id="TodayWorkOrderSummary" style="width:100%;">
                  <table class="ListTable table table-striped" style="font-size:14px">
                    <thead>
                      <tr>
                        <td style="width:46%">{{$t("smt._8")}}</td>
                        <td style="width:27%">{{$t("smt._9")}}</td>
                        <td style="width:27%">{{$t("smt._10")}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in tableData" :key="index">
                        <th>{{item.WOID}}</th>
                        <th>{{item.PASS}}</th>
                        <th>{{item.QTY}}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!--直通率 -->
            <div class="block">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title" style="max-height:50px;height: 15%;">{{$t("smt._12")}}</div>
                <div id="ThroughRate" style="height: 85%;" />
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

    <el-dialog
      class="my-dialog"
      :title="$t('_kanban._1')"
      :visible.sync="dialogVisible"
      width="30%"
      ref="myDialog"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="80px" size="small" label-position="top">
        <el-form-item :label="$t('_kanban._2')">
          <el-select
            v-model="lineId"
            :placeholder="$t('_kanban._3')"
            style="width: 100%"
            filterable
            clearable
          >
            <el-option
              v-for="item in lineLists"
              :key="item.ID"
              :label="item.OPERATION_LINE_NAME"
              :value="item.ID"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./Meilian/index.js"></script>
<style scoped>
@import "./Meilian/index.css";
.SmtLine {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
.huise:not(#liang) {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
</style>
