<template>
  <div class="AOIManualData">
    <el-row class="kanban-title AOIManualData-x" ref="kanbanTitle">
      <el-col :span="5"> &nbsp; </el-col>
      <el-col :span="14" :offset="5">
        <div class="kanban-title-panel">{{ StationName || '无码包装' }}</div>
      </el-col>
      <el-col :span="5">
        <div style="height: 100%; line-height: 50px; text-align: left">
          <span class="screen-span">
            <a
              id="liang"
              href="javascript:void(0)"
              class="tit-btn"
              style="
                margin-right: 20px;
                color: rgb(0, 255, 255);
                font-size: 15px;
                cursor: pointer;
              "
              @click="dialogStation = true"
              >选择工位</a
            >
          </span>
          <span class="screen-span">
            <a
              id="liang"
              href="javascript:void(0)"
              class="tit-btn"
              style="
                margin-right: 20px;
                color: rgb(0, 255, 255);
                font-size: 15px;
                cursor: pointer;
              "
              @click="dialogWoNo = true"
              >选择工单</a
            >
          </span>
          <span class="screen-span">
            <a
              href="javascript:void(0)"
              @click="$options.fs.fullScreen.handleFullScreen(this)"
              style="color: #00ffff; font-size: 15px;cursor: pointer;"
              >{{ $t("AoiAndSpiReport._2") }}</a
            >
          </span>
          <span class="screen-span">
            <a
              href="javascript:void(0)"
              @click="handleToEsop"
              style="color: #00ffff; font-size: 15px;margin-left: 20px;cursor: pointer;"
              >E-SOP</a>
          </span>
        </div>
      </el-col>
    </el-row>
    <!-- 工单信息 start -->
    <div class="kanban-wo-info AOIManualData-x">
      <div class="kanban-wo-info-panel">
        <el-row>
          <el-col :span="1">
            <div class="div-title">线体：</div>
          </el-col>
          <el-col :span="4">
            <div id="LineName" class="text-overflow div-value">
              {{ lineName }}
            </div>
          </el-col>
          <el-col :span="1" :offset="lineName ? 0 : 4">
            <div class="div-title">工单：</div>
          </el-col>
          <el-col :span="4">
            <div id="WoNo" class="text-overflow div-value">
              {{ workInfo.WoNo }}
            </div>
          </el-col>
          <el-col :span="1" :offset="workInfo.WoNo ? 0 : 4">
            <div class="div-title">料号：</div>
          </el-col>
          <el-col :span="4">
            <div id="PartNo" class="text-overflow div-value">
              {{ workInfo.PartNo }}
            </div>
          </el-col>
          <el-col :span="1" :offset="workInfo.PartNo ? 0 : 4">
            <div class="div-title">机种：</div>
          </el-col>
          <el-col :span="4">
            <div id="ModelName" class="text-overflow div-value">
              {{ workInfo.ModelName }}
            </div>
          </el-col>
          <el-col :span="1" :offset="workInfo.ModelName ? 0 : 4">
            <div class="div-title">数量：</div>
          </el-col>
          <el-col :span="3">
            <div id="WoTarget" class="text-overflow div-value">
              {{ workInfo.WoTarget }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 主体 -->
    <div style="padding: 0 15px" class="AOIManualData-x">
      <!-- 上半部分 -->
      <el-row>
        <el-col :span="8" style="padding-right: 10px; box-sizing: border-box">
          <!-- 每小时产能 -->
          <div class="borderl meixiaoshichanneng">
            <div class="titlex">今日每小时产能</div>
            <div id="meixiaoshichanneng"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <!-- 产能报工 -->
          <div class="borderl meixiaoshichanneng">
            <div class="titlex" style="border-bottom: 1px dashed #54dcf2">
              产能报工
            </div>
            <div style="padding-top: 10px">
              <el-form :model="form1" label-position="right">
                <el-form-item label="报工时段">
                  <div style="display: flex; align-items: center">
                    <div style="position: relative; width: 50%">
                      <el-date-picker
                        style="width: 100%"
                        v-model="form1.REPORT_DATE"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        placeholder=""
                      >
                      </el-date-picker>
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          position: absolute;
                          height: 24px;
                          right: 10px;
                          top: 4px;
                          width: 20px;
                          background: #00ffff;
                          height: 24px;
                        "
                      >
                        <i class="el-icon-caret-bottom" style="color: #000"></i>
                      </div>
                    </div>
                    <div style="position: relative; width: 50%">
                      <!-- <el-time-picker
                        style="width: 100%"
                        v-model="form1.REPORT_TIME"
                        value-format="HH:mm"
                        :picker-options="{
                          format: 'HH:mm',
                          start: '01:00',
                          step: '01:00',
                          end: '00:00'
                        }"
                        range-separator=""
                        start-placeholder=""
                        end-placeholder=""
                        placeholder=""
                      >
                      </el-time-picker> -->
                      <el-time-select
                        style="width: 100%"
                        placeholder=""
                        v-model="form1.REPORT_TIME"
                        :picker-options="{
                          start: '00:00',
                          step: '01:00',
                          end: '23:00'
                        }">
                      </el-time-select>
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          position: absolute;
                          height: 24px;
                          right: 0;
                          top: 4px;
                          width: 20px;
                          background: #00ffff;
                          height: 24px;
                        "
                      >
                        <i class="el-icon-caret-bottom" style="color: #000"></i>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="报工数量">
                  <div>
                    <el-input
                      class="x-no-right"
                      type="number"
                      v-model="form1.CapacityReportQty"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-form>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <div class="x-btnx" @click="submitChanNengBaogong">
                  提交产能报工
                </div>
                <div class="x-btnx" @click="cancelChangNengBaogong">撤销产能报工</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding-left: 10px; box-sizing: border-box">
           <!-- 历史作业记录 -->
          <div class="borderl meixiaoshichanneng">
            <div class="titlex" style="border-bottom: 1px dashed #54dcf2">
              历史作业记录
            </div>
            <div id="lishizuoyejilu">
              <div class="his-item" v-for="(item, index) in msgList" :key="index">
                {{ item.msg }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div></div>

    </div>
   <!-- 选择工位 -->
    <el-dialog class="my-dialog"
               :title="$t('CollectProducts._34')"
               :visible.sync="dialogStation"
               width="30%"
               ref="myDialog"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('SfcsOperationSites._8')"
                      prop="OPERATION_LINE_ID">
          <el-select v-model="StationFrom.OPERATION_LINE_ID"
                     style="width:100%"
                     @change="operationCjange"
                     :placeholder="$t('SfcsOperationSites._9')">
            <el-option v-for="item in LineList"
                       :key="item.Id"
                       :label="item.OPERATION_LINE_NAME"
                       :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('CollectProducts._35')">
          <el-select v-model="StationID"
                     filterable
                     :placeholder="$t('CollectProducts._36')"
                     style="width: 100%"
                     @change="StationChange">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="StationFrom.OPERATION_SITE_NAME"
                        @input="getStatusList"
                        @keyup.enter.native="getStatusList"
                        :placeholder="$t('CollectProducts._37')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getStatusList">{{ $t('publics.btn.search') }}</el-button>
            </div>

            <el-option v-for="item in StationtoList"
                       :key="item.ID"
                       :disabled="!item.ID"
                       :label="item.OPERATION_SITE_NAME"
                       :value="item.ID"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="StationFrom.Page"
                             :page-size="StationFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="StationtotalPage"
                             @size-change="StationSizeChange"
                             @current-change="StationCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogStation = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStation = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
     <!-- 选择工单 -->
    <el-dialog class="my-dialog"
               :title="$t('CollectProducts._30')"
               :visible.sync="dialogWoNo"
               width="30%"
               ref="WONODialog"
               :close-on-click-modal="false">
      <!--  :before-close="WONOleClose" -->
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('CollectProducts._31')">
          <el-select v-model="WoNoBer"
                     filterable
                     :placeholder="$t('CollectProducts._32')"
                     style="width: 100%"
                     @change="WoNoChange">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="WoNoFrom.WO_NO"
                        @input="getOrder"
                        @keyup.enter.native="getOrder"
                        :placeholder="$t('CollectProducts._33')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getOrder">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option v-for="(item,index) in WoNoList"
                       :key="index"
                       :label="item.WO_NO"
                       :value="item.WO_NO"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="WoNoFrom.Page"
                             :page-size="WoNoFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="WoNototalPage"
                             @size-change="WoNoSizeChange"
                             @current-change="WoNoCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogWoNo = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="dialogWoNo = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./AOIManualDataPrint.js"></script>

<style lang="scss" scoped>
@import "~@/assets/style/bootstrap.min.css";
@import "./index.scss";
</style>

<style>
.AOIManualData-x .el-form-item__label {
  color: #fff!important;
}

.AOIManualData-x .el-input__inner {
  height: 24px;
  line-height: 24px;
  color: #fff!important;
  background: rgb(17, 32, 91);
  border: none;
  border-radius: 0;
  padding: 0 5px;
}

.AOIManualData-x .el-input__prefix {
  display: none;
}

.AOIManualData-x .el-icon-time {
  display: none;
}

.AOIManualData-x .el-date-editor input {
  background: rgb(17, 32, 91);
  color: #fff;
}

.x-no-right {
  width: calc(100% - 69px);
  margin-right: 0;
}

.AOIManualData-x .el-form-item__label {
  color: #333;
}
</style>
