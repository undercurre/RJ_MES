<template>
  <div class="EquipCheck">
    <div class="container-fluid"
         :class="{
        huise: !lineId || dialogVisible
      }">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="16"
                :offset="4">
          <div class="kanban-title-panel">{{ $t("eck._1") }}</div>
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
      <!-- 工单信息 end -->
      <!-- 主体 start -->
      <div style="height: calc(100vh - 70px - 67px);">
        <div class="block-center">
          <div class="kanban-wo-info"
               style="height:100%;position: relative;padding: 0">
            <div id="imgContent"
                 class="kanban-wo-info-panel"
                 style="padding:10px;position: relative;height: 100%;box-sizing: border-box">
              <div id="imgList">
                <div v-for="(item, index) in imgListHtml"
                     :key="index"
                     class="ImgDiv"
                     :class="active == index ? 'ImgDivClass' : ''"
                     @click="imgoClick(index, item.ID)">
                  <img id="CheckImg"
                       class="CheckImg"
                       :src="img_url + item.ImgUrl"
                       :class="active == index ? 'img_cur' : ''" />
                </div>
              </div>
              <span class="top-left border-span-m" />
              <span class="top-right border-span-m" />
              <span class="bottom-left border-span-m" />
              <span class="bottom-right border-span-m" />
              <div class="statusCss">
                <table>
                  <tr style="line-height:30px;">
                    <td>
                      <div class="statusBack"
                           style="background-color:green" />
                    </td>
                    <td>{{ $t("eck._6") }}</td>
                    <td>
                      <div class="statusBack"
                           style="background-color:blue" />
                    </td>
                    <td>{{ $t("eck._7") }}</td>
                    <td>
                      <div class="statusBack"
                           style="background-color:orange" />
                    </td>
                    <td>{{ $t("eck._8") }}</td>
                    <td>
                      <div class="statusBack"
                           style="background-color:#0dcdf8" />
                    </td>
                    <td>{{ $t("eck._9") }}</td>
                    <td>
                      <div class="statusBack"
                           style="background-color:red" />
                    </td>
                    <td>{{ $t("eck._10") }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <el-row>
          <el-col :span="8"
                  style="padding: 0 9px 0 0;box-sizing: border-box">
            <div class="block-center">
              <div class="kanban-wo-info-panel">
                <div class="kanban-panel-title">{{ $t("eck._11") }}</div>
                <div style="height: calc(100% - 46px);overflow-y: auto">
                  <table class="kanban-table kanban-table-equip"
                         v-html="basicHtml"></table>
                </div>
                <div v-if="basicSTATUS == 0"
                     id="stamper0"
                     class="stamper"
                     style="color:green;border-color:green">
                  {{ $t("eck._6") }}
                </div>
                <div v-if="basicSTATUS == 1"
                     id="stamper1"
                     class="stamper"
                     style="color:blue;border-color:blue">
                  {{ $t("eck._7") }}
                </div>
                <div v-if="basicSTATUS == 2"
                     id="stamper2"
                     class="stamper"
                     style="color:orange;border-color:orange">
                  {{ $t("eck._8") }}
                </div>
                <div v-if="basicSTATUS == 3"
                     id="stamper3"
                     class="stamper"
                     style="color:#0dcdf8;border-color:#0dcdf8">
                  {{ $t("eck._9") }}
                </div>
                <div v-if="basicSTATUS == 4"
                     id="stamper4"
                     class="stamper"
                     style="color:red;border-color:red">
                  {{ $t("eck._10") }}
                </div>

                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="8"
                  style="padding: 0 6px 0 6px;box-sizing: border-box">
            <div class="block-center">
              <div class="kanban-wo-info-panel">
                <div class="kanban-panel-title">{{ $t("eck._12") }}</div>
                <div style="height: calc(100% - 46px);overflow-y: auto">
                  <table id="table_DayKeep"
                         class="table-list"
                         v-html="tableId" />
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="8"
                  style="padding: 0 0 0 9px;box-sizing: border-box">
            <div class="block-center">
              <div class="kanban-wo-info-panel">
                <div class="kanban-panel-title">{{ $t("eck._13") }}</div>
                <div style="height: calc(100% - 46px);overflow-y: auto">
                  <table id="table_Repair"
                         class="table-list"
                         v-html="serviceHtml" />
                </div>
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
          <el-select v-model="lineId"
                     filterable
                     clearable
                     :placeholder="$t('_kanban._3')"
                     style="width: 100%">
            <el-option v-for="(item,index) in list"
                       :key="index"
                       :label="item.label"
                       :value="item.value"></el-option>
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

<script src="./EquipCheck/index.js"></script>

<style scoped>
/* @import "~@/assets/style/bootstrap.min.css"; */
@import './EquipCheck/index.css';
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
.EquipCheck {
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
</style>
