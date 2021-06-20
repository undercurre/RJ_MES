<template>
  <div class="SOPRoutes-sop" style="background: #040f3c">
    <!-- <el-dialog
      :title="$t('SOPRoutes._98')"
      :visible.sync="PrimaryOperation"
      :close-on-click-modal="false"
      width="100%"
      top="0"
      class="primary-operation"
      @close="backClick"
    > -->
    <div class="container-fluid">
      <!--头部-->
      <div class="row header-title">
        <div class="col-md-1">&nbsp;</div>
        <div class="col-md-10">
          <div class="kanban-title-panel">
            <span v-if="userData.OPERATION_SITE_NAME">
              {{ userData.OPERATION_SITE_NAME }}
            </span>
            <span v-else>---</span>
          </div>
        </div>
        <div
          class="col-md-1"
          style="text-align: center; height: 100%; line-height: 40px"
        >
          <!-- <span class="screen-span">
            <a href="javascript:void(0)"
               @click="$options.fs.fullScreen.handleFullScreen(this)"
               style="color:#00ffff;font-size:15px;">{{ $t("AoiAndSpiReport._2") }}</a>
          </span> -->
        </div>
      </div>
      <!--工单信息栏-->
      <div class="row wo-info">
        <div class="border-container" style="height: 100%">
          <input id="siteId" type="hidden" name="siteId" value />
          <div class="col-md-8 col-row">
            <div class="row col-row">
              <div class="col-md-12 col-row">
                <div class="col-md-3 div-title">
                  {{ $t("SOPRoutes._122") }}:
                  <span v-if="userData.OPERATION_LINE_NAME">
                    {{ userData.OPERATION_LINE_NAME }}
                  </span>
                  <span v-else>---</span>
                </div>
                <div class="col-md-3 div-title">
                  {{ $t("SOPRoutes._123") }}:
                  <span v-if="userData.WO_NO">{{ userData.WO_NO }}</span>
                  <span v-else>---</span>
                </div>
                <div class="col-md-3 div-title">
                  {{ $t("SOPRoutes._124") }}:
                  <span v-if="userData.PCB_PN">{{ userData.PCB_PN }}</span>
                  <span v-else>---</span>
                </div>
                <div class="col-md-3 div-title">
                  {{ $t("SOPRoutes._125") }}:
                  <span v-if="userData.MODEL">{{ userData.MODEL }}</span>
                  <span v-else>---</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-row">
            <div class="row col-row">
              <div class="col-md-12 col-row">
                <div class="col-md-4 div-title">
                  {{ $t("SOPRoutes._126") }}:
                  <span v-if="userData.STANDARD_HUMAN">
                    {{ userData.STANDARD_HUMAN }}
                  </span>
                  <span v-else>---</span>
                </div>
                <div class="col-md-4 div-title">
                  {{ $t("SOPRoutes._127") }}:
                  <span v-if="userData.STANDARD_WORK_FORCE">
                    {{ userData.STANDARD_WORK_FORCE }}
                  </span>
                  <span v-else>---</span>
                </div>
                <div class="col-md-4 div-title">
                  {{ $t("SOPRoutes._128") }}:
                  <span v-if="userData.STANDARD_CAPACITY">
                    {{ userData.STANDARD_CAPACITY }}
                  </span>
                  <span v-else>---</span>
                </div>
              </div>
            </div>
          </div>
          <span class="top-left border-span-m" />
          <span class="top-right border-span-m" />
          <span class="bottom-left border-span-m" />
          <span class="bottom-right border-span-m" />
        </div>
      </div>
      <div class="row" style="height: 85%">
        <!--左侧-->
        <div class="col-md-9 col-row" style="padding-right: 20px">
          <div class="row" style="height: 50%">
            <div
              class="col-md-6 MitoShow-div"
              style="padding: 0 7.5px 0 0; height: 100%"
            >
              <div
                class="pic-pn-div border-container"
                style="padding: 5px; height: 100%"
              >
                <img
                  :src="img_url + productData.RESOURCE_URL"
                  :alt="$t('SOPRoutes._60')"
                  width="100%"
                  height="100%"
                />
                <div class="sop-carousel-text MitoShow-text">
                  <p
                    class="last"
                    v-if="productData"
                    v-html="productData.RESOURCE_MSG"
                  />
                </div>

                <div id="pic_pn_des" class="img-pn-des" />
                <span class="top-left border-span" />
                <span class="top-right border-span" />
                <span class="bottom-left border-span" />
                <span class="bottom-right border-span" />
              </div>
            </div>
            <div
              class="col-md-6 MitoShow-div"
              style="padding: 0 0 0 7.5px; height: 100%"
            >
              <!--1个单元格-->
              <div
                v-if="Resource > -1 && Resource < 2"
                id="model1"
                class="border-container"
                style="padding: 0px; height: 100%"
              >
                <div class="row" style="height: 100%">
                  <div class="col-md-12" style="padding: 0px; height: 100%">
                    <div
                      class="pic-pn-div"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        v-if="Resource1"
                        :src="img_url + Resource1.RESOURCE_URL"
                        :alt="$t('SOPRoutes._60')"
                        width="100%"
                        height="100%"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource1"
                          v-html="Resource1.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic1_des" class="img-pn-des" />
                    </div>
                  </div>
                </div>
                <span class="top-left border-span" />
                <span class="top-right border-span" />
                <span class="bottom-left border-span" />
                <span class="bottom-right border-span" />
              </div>
              <!--2个单元格（1行2列）-->
              <div
                v-if="Resource > 1 && Resource < 3"
                id="model2"
                class="border-container"
                style="padding: 0px; height: 100%"
              >
                <div class="row" style="height: 100%">
                  <div
                    class="col-md-6 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border3"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic1"
                        :src="img_url + Resource1.RESOURCE_URL"
                        :alt="$t('SOPRoutes._60')"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource1"
                          v-html="Resource1.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic1_des" class="img-pn-des" />
                    </div>
                  </div>
                  <div
                    class="col-md-6 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic2"
                        :src="img_url + Resource2.RESOURCE_URL"
                        :alt="$t('SOPRoutes._60')"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource2"
                          v-html="Resource2.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic2_des" class="img-pn-des" />
                    </div>
                  </div>
                </div>
                <span class="top-left border-span" />
                <span class="top-right border-span" />
                <span class="bottom-left border-span" />
                <span class="bottom-right border-span" />
              </div>
              <!--4个单元格（2行4列）-->
              <div
                v-if="Resource > 2 && Resource < 5"
                id="model4"
                class="border-container"
                style="padding: 0px; height: 100%"
              >
                <div class="row" style="height: 50%">
                  <div
                    class="col-md-6 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border1"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic1"
                        :src="img_url + Resource1.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource1"
                          v-html="Resource1.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic1_des" class="img-pn-des" />
                    </div>
                  </div>
                  <div
                    class="col-md-6 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border2"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic2"
                        :src="img_url + Resource2.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource2"
                          v-html="Resource2.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic2_des" class="img-pn-des" />
                    </div>
                  </div>
                </div>
                <div class="row" style="height: 50%">
                  <div
                    class="col-md-6 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border1"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic3"
                        :src="img_url + Resource3.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource3"
                          v-html="Resource3.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic3_des" class="img-pn-des" />
                    </div>
                  </div>
                  <div
                    v-if="Resource4"
                    class="col-md-6 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic4"
                        :src="img_url + Resource4.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource4"
                          v-html="Resource4.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic4_des" class="img-pn-des" />
                    </div>
                  </div>
                </div>
                <span class="top-left border-span" />
                <span class="top-right border-span" />
                <span class="bottom-left border-span" />
                <span class="bottom-right border-span" />
              </div>
              <!--6个单元格（2行3列）-->
              <div
                v-if="Resource > 4"
                id="model6"
                class="border-container"
                style="padding: 0px; height: 100%"
              >
                <div class="row" style="height: 50%">
                  <div
                    class="col-md-4 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border1"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic1"
                        :src="img_url + Resource1.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource1"
                          v-html="Resource1.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic1_des" class="img-pn-des" />
                    </div>
                  </div>
                  <div
                    class="col-md-4 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border1"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic2"
                        :src="img_url + Resource2.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource2"
                          v-html="Resource2.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic2_des" class="img-pn-des" />
                    </div>
                  </div>
                  <div
                    class="col-md-4 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border2"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic3"
                        :src="img_url + Resource3.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource3"
                          v-html="Resource3.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic3_des" class="img-pn-des" />
                    </div>
                  </div>
                </div>
                <div class="row" style="height: 50%">
                  <div
                    class="col-md-4 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border3"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic4"
                        :src="img_url + Resource4.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource4"
                          v-html="Resource4.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic4_des" class="img-pn-des" />
                    </div>
                  </div>
                  <div
                    class="col-md-4 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div pic_border3"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic5"
                        :src="img_url + Resource5.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource5"
                          v-html="Resource5.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic5_des" class="img-pn-des" />
                    </div>
                  </div>
                  <div
                    v-if="Resource6"
                    class="col-md-4 MitoShow-div"
                    style="padding: 0px; height: 100%"
                  >
                    <div
                      class="pic-pn-div"
                      style="padding: 5px; height: 100%; overflow: hidden"
                    >
                      <img
                        name="pic6"
                        :src="img_url + Resource6.RESOURCE_URL"
                        class="img-pn"
                      />
                      <div class="sop-carousel-text MitoShow-text">
                        <p
                          class="last"
                          v-if="Resource6"
                          v-html="Resource6.RESOURCE_MSG"
                        />
                      </div>
                      <div name="pic6_des" class="img-pn-des" />
                    </div>
                  </div>
                </div>
                <span class="top-left border-span" />
                <span class="top-right border-span" />
                <span class="bottom-left border-span" />
                <span class="bottom-right border-span" />
              </div>
            </div>
          </div>
          <div class="row" style="height: 50%">
            <div style="padding: 15px 0; height: 100%; display: grid">
              <div
                class="pic-pn-div border-container"
                style="padding: 5px; height: 100%"
              >
                <div id="mapswp" class="col-md-12 col-row img-pn">
                  <el-carousel :interval="5000">
                    <el-carousel-item
                      v-for="item in resourceData"
                      :key="item.ID"
                      @mouseenter.native="onMouaweOer"
                      @mouseleave.native="onMouseout"
                    >
                      <img
                        :src="img_url + item.RESOURCE_URL"
                        :alt="$t('SOPRoutes._60')"
                      />
                      <div v-if="oShowText" class="sop-carousel-text">
                        <p
                          class="last"
                          v-if="item"
                          v-html="item.RESOURCE_MSG"
                        />
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <span class="top-left border-span" />
                <span class="top-right border-span" />
                <span class="bottom-left border-span" />
                <span class="bottom-right border-span" />
              </div>
            </div>
          </div>
        </div>
        <!--右侧-->
        <div class="col-md-3" style="padding: 0; height: 100%">
          <div class="row" style="height: 50%">
            <div class="border-container" style="height: 100%">
              <div
                class="col-md-12 name-title-m"
                style="height: 22px; padding-top: 5px"
              >
                {{ $t("SOPRoutes._129") }}
              </div>
              <div class="col-md-12" style="height: 120px; padding-top: 10px">
                <div class="row" style="height: 100%">
                  <div class="col-md-3" style="height: 100%; padding: 0">
                    <img
                      :src="img_url + info.PHOTO_BASE64"
                      alt
                      width="100%"
                      v-if="info.PHOTO_BASE64"
                    />
                    <img src="./css/face1.png" alt width="100%" v-else />
                  </div>
                  <div class="col-md-4" style="padding: 0 5px">
                    <div
                      class="item"
                      style="line-height: 32px; font-size: 16px"
                    >
                      {{ $t("SOPRoutes._130") }}:&nbsp;&nbsp;
                      <span id="name">
                        {{ info.USER_NAME }}
                      </span>
                    </div>
                    <div
                      class="item"
                      style="line-height: 32px; font-size: 16px"
                    >
                      {{ $t("SOPRoutes._131") }}:&nbsp;&nbsp;
                      <span id="sex">
                        {{ info.USER_SEX }}
                      </span>
                    </div>
                    <div
                      class="item"
                      style="line-height: 32px; font-size: 16px"
                    >
                      {{ $t("SOPRoutes._132") }}:&nbsp;&nbsp;
                      <span id="education">
                        {{ info.EDUCATION }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-5" style="padding: 0 5px">
                    <div
                      class="item"
                      style="line-height: 32px; font-size: 16px"
                    >
                      {{ $t("SOPRoutes._133") }}:{{ account }}
                    </div>
                    <div
                      class="item"
                      style="line-height: 32px; font-size: 16px"
                    >
                      {{ $t("SOPRoutes._134") }}:&nbsp;&nbsp;
                      <span id="age">
                        {{ info.USER_AGE }}
                      </span>
                    </div>
                    <div
                      class="item"
                      style="line-height: 32px; font-size: 16px"
                    >
                      {{ $t("SOPRoutes._135") }}:&nbsp;&nbsp;
                      <span id="entryDate">
                        {{ info.ENTRYDATE }}
                      </span>
                    </div>
                    <div
                      class="item"
                      style="line-height: 35px; font-size: 16px"
                    >
                      {{ $t("SOPRoutes._136") }}:&nbsp;&nbsp;
                      <span id="workingyears" v-if="info.WORKINGYEARS"
                        >{{ info.WORKINGYEARS }}{{ $t("SOPRoutes._137") }}</span
                      >
                      <span id="workingyears" v-else>---</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding: 10px 10px 0 0px; height: 320px">
                <div
                  id="PersonRadar"
                  style="
                    height: 200px;
                    width: 260px;
                    position: absolute;
                    left: 10px;
                    top: 130px;
                  "
                />
              </div>
              <div
                id="div_eligible_yes"
                class="stamper yes_stamper"
                style="display: none"
              >
                {{ $t("SOPRoutes._138") }}
              </div>
              <div
                id="div_eligible_no"
                class="stamper no_stamper"
                style="display: none"
              >
                {{ $t("SOPRoutes._139") }}
              </div>
              <span class="top-left border-span" />
              <span class="top-right border-span" />
              <span class="bottom-left border-span" />
              <span class="bottom-right border-span" />
            </div>
          </div>
          <div class="row" style="height: 25%; padding: 15px 0 0 0">
            <div class="border-container" style="height: 100%">
              <div class="col-md-12 name-title-m" style="padding-top: 5px">
                {{ $t("SOPRoutes._174") }}
              </div>
              <div class="col-md-12">
                <div class="row" v-if="ROLEstsut">
                  <!-- v-if="$btnList.indexOf('SfcsOperationShortage') !== -1" -->
                  <div
                    class="col-md-6"
                    v-if="$btnList.indexOf('SfcsOperationShortage') !== -1"
                  >
                    <button
                      id="queliao"
                      data-type="0"
                      class="btn-style btn-6"
                      @click="innerVisible_but(0)"
                    >
                      {{ $t("SOPRoutes._175") }}
                    </button>
                  </div>
                  <div
                    class="col-md-6"
                    v-if="$btnList.indexOf('SfcsOperationquality') !== -1"
                  >
                    <button
                      id="pinzhi"
                      data-type="1"
                      class="btn-style btn-2"
                      @click="innerVisible_but(1)"
                    >
                      {{ $t("SOPRoutes._176") }}
                    </button>
                  </div>
                  <div class="row">
                    <div
                      class="col-md-6"
                      v-if="$btnList.indexOf('SfcsOperationDevice') !== -1"
                    >
                      <button
                        id="shebei"
                        data-type="2"
                        class="btn-style btn-3"
                        @click="innerVisible_but(2)"
                      >
                        {{ $t("SOPRoutes._177") }}
                      </button>
                    </div>
                    <div
                      class="col-md-6"
                      v-if="$btnList.indexOf('SfcsOperationHelp') !== -1"
                    >
                      <button
                        id="bangzhu"
                        data-type="3"
                        class="btn-style btn-1"
                        @click="innerVisible_but(3)"
                      >
                        {{ $t("SOPRoutes._178") }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-md-6">
                    <button
                      id="queliao"
                      data-type="0"
                      class="btn-style btn-6"
                      @click="innerVisible_but(0)"
                    >
                      {{ $t("SOPRoutes._175") }}
                    </button>
                  </div>
                  <div class="col-md-6">
                    <button
                      id="pinzhi"
                      data-type="1"
                      class="btn-style btn-2"
                      @click="innerVisible_but(1)"
                    >
                      {{ $t("SOPRoutes._176") }}
                    </button>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <button
                        id="shebei"
                        data-type="2"
                        class="btn-style btn-3"
                        @click="innerVisible_but(2)"
                      >
                        {{ $t("SOPRoutes._177") }}
                      </button>
                    </div>
                    <div class="col-md-6">
                      <button
                        id="bangzhu"
                        data-type="3"
                        class="btn-style btn-1"
                        @click="innerVisible_but(3)"
                      >
                        {{ $t("SOPRoutes._178") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <span class="top-left border-span" />
              <span class="top-right border-span" />
              <span class="bottom-left border-span" />
              <span class="bottom-right border-span" />
            </div>
          </div>
          <div class="row" style="height: 22.5%; padding: 10px 0 0 0">
            <div class="border-container" style="height: 100%">
              <div class="col-md-12 name-title-m" style="margin-bottom: 10px">
                {{ $t("SOPRoutes._182") }}
              </div>
              <div id="edubalance" style="color: floralwhite; padding: 0 15px">
                <div
                  id="msgArea"
                  v-html="msgArea"
                  style="margin-top: 3px"
                ></div>
              </div>
              <span class="top-left border-span"></span>
              <span class="top-right border-span"></span>
              <span class="bottom-left border-span"></span>
              <span class="bottom-right border-span"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </el-dialog> -->
    <el-dialog
      v-dialogDrag
      width="60%"
      :title="$t('SOPRoutes._140')"
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      append-to-body
      class="sop-dialog"
      top="0"
    >
      <div class="sop-dialog-title">{{ $t("SOPRoutes._141") }}</div>
      <div class="sop-dialog-area">
        <el-form label-width="80px">
          <el-form-item :label="$t('SOPRoutes._142')">
            <el-select
              v-model="callVal.CALL_TYPE_CODE"
              style="width: 100%; margin-right: 0px"
              disabled
              :placeholder="$t('SOPRoutes._142')"
            >
              <el-option
                v-for="item in fmtCallTypeCode"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('SOPRoutes._144')">
            <el-select
              v-model="callVal.CALL_CODE"
              style="width: 100%; margin-right: 0px"
              :placeholder="$t('SOPRoutes._145')"
              @change="handleChangeCallTypeCode"
            >
              <el-option
                v-for="item in sort"
                :key="item.CALL_CODE"
                :label="item.CALL_CODE"
                :value="item.CALL_CODE"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('SOPRoutes._146')">
            <el-input
              v-model="callVal.CALL_CONTENT"
              type="textarea"
              :placeholder="$t('SOPRoutes._147')"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="sop-dialog-button">
        <el-button type="success" @click="shout_but"
          >&nbsp;{{ $t("SOPRoutes._148") }}&nbsp;</el-button
        >
      </div>
      <div class="sop-dialog-title">{{ $t("SOPRoutes._149") }}</div>
      <div class="sop-dialog-table">
        <el-table
          :data="callTable"
          stripe
          border
          style="width: 100%"
          height="100%"
          highlight-current-row
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
          @selection-change="handleRowClick"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            prop="CALL_NO"
            :label="$t('SOPRoutes._150')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="OPERATION_LINE_NAME"
            :label="$t('SOPRoutes._151')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="OPERATION_SITE_NAME"
            :label="$t('SOPRoutes._152')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="OPERATOR"
            :label="$t('SOPRoutes._153')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="CREATE_TIME"
            :label="$t('SOPRoutes._154')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="CALL_CODE"
            :label="$t('SOPRoutes._155')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="CALL_CONTENT"
            :label="$t('SOPRoutes._156')"
            align="center"
            :show-overflow-tooltip="true"
          />
        </el-table>
      </div>
      <el-pagination
        ref="pagi"
        :current-page="callData.Page"
        :page-size="callData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="calltotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div class="sop-dialog-button">
        <el-button type="success" @click="sign_but"
          >&nbsp;{{ $t("SOPRoutes._157") }}&nbsp;</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { GetPartByPartNo } from '@/api/SOPRoutes/index.js'
import {
  CallWindow,
  GetCallCodeChinese,
  GetRecordBySiteId,
  AddCallRecord,
  EditCallRecord,
  LoadResourceProductData,
  LoadEmployeeData,
  LoadResourceData,
  // LoadSkillStandard,
  LoadResourceCmpData
} from '@/api/SOPRoutes/SOP.js'
import { LoadSiteMsgPreview, LoadSiteMsg } from '@/api/SfcsOperationSites'
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import util from '@/libs/util.js'
const fs = {
  // 全屏 类
  fullScreen: (function () {
    var isFullScreen = false
    var requestFullScreen = function () {
      // 全屏
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        alert(this.$t('pdl.ns'))
      }
    }
    // 退出全屏 判断浏览器种类
    var exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      var exitMethod =
        document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for Internet Explorer
        // eslint-disable-next-line
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }

    return {
      handleFullScreen: function ($this) {
        if (isFullScreen) {
          exitFull()
          isFullScreen = false
        } else {
          requestFullScreen()
          isFullScreen = true
        }
      }
    }
  })()
}
export default {
  fs,
  name: 'SOPbrowse',
  data () {
    return {
      fmtCallTypeCode: [
        {
          code: 0,
          name: this.$t('SOPRoutes._158')
        },
        {
          code: 1,
          name: this.$t('SOPRoutes._159')
        },
        {
          code: 2,
          name: this.$t('SOPRoutes._160')
        },
        {
          code: 3,
          name: this.$t('SOPRoutes._161')
        }
      ],
      // 人员信息
      info: {
        USER_NAME: '',
        USER_SEX: '',
        WORKINGYEARS: '',
        EDUCATION: '',
        ENTRYDATE: '',
        PHOTO: '',
        PHOTO_BASE64: '',
        USER_AGE: ''
      },
      bannerHeight: '',
      partNo: undefined,
      page: 1,
      list_rows: 10,
      resourceData: [],
      img_url: process.env.VUE_APP_BASE_IMG,
      img: '',
      errorImg01: 'this.src="' + require('./css/face1.png') + '"',
      innerVisible: false,
      callTable: [],
      callData: {
        Page: 1,
        Limit: 15
      },
      calltotal: 0,
      callVal: {
        CALL_TYPE_CODE: '',
        CALL_CODE: '',
        CALL_CONTENT: ''
      },
      sort: [],
      signArr: {
        CHECKIN_OPERATOR: '', // 账号
        CALL_RECORD_IDS: '' // id
      },
      netData: {},
      PreviewVal: {
        part_no: '',
        operations_id: ''
      },
      userData: {
        OPERATION_SITE_NAME: '',
        OPERATION_LINE_NAME: '',
        WO_NO: '',
        PCB_PN: '',
        MODEL: '',
        STANDARD_HUMAN: '',
        STANDARD_WORK_FORCE: '',
        STANDARD_CAPACITY: ''
      },
      productData: {
        RESOURCE_URL: ''
      },
      MitoShow: false,
      Resource: 0,
      Resource1: {},
      Resource2: {},
      Resource3: {},
      Resource4: {},
      Resource5: {},
      Resource6: {},
      // 消息框
      msgArea: '',
      oShowText: false,
      Signradio: '',
      part: {
        part_no: '',
        operations_id: '',
        partNo: ''
      },
      PrimaryOperation: true,
      siteID: '', // 站点id
      account: '',
      siteInfo: {
        part_no: '',
        operations_id: ''
      },
      ROLEstsut: true
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },

  mounted () {
    this.$nextTick(function () {
      if (this.userinfo.ROLE_ID) {
        this.ROLEstsut = true
        this.$store.dispatch('custom/permission/getBtnList')
      } else {
        this.ROLEstsut = false
      }
      this.radar()
    })
  },
  created () {
    const tok = util.cookies.get('token')
    if (!tok) {
      var token = this.$route.query.token
      util.cookies.set('token', token)
    }
    if (this.userinfo.USER_NAME) {
      this.account = this.userinfo.USER_NAME
    } else {
      this.account = this.$route.query.account
    }

    this.siteID = this.$route.query.siteId ? this.$route.query.siteId : '-99' // site_id 站点ID account 账号  name姓名
    this.siteInfo.part_no = this.$route.query.partNo
    this.siteInfo.operations_id = this.$route.query.operationId
    if (Number(this.siteID) === -99) {
      this.getPreview()
    } else {
      this.getLoadSiteMsg()
    }
    // this.getPreview()
    // this.getLoadSiteMsg()
  },
  methods: {
    backClick () {
      this.PrimaryOperation = false
      this.$router.push('/SOPchange/Index')
    },
    onMouaweOer () {
      this.oShowText = true
    },
    onMouseout () {
      this.oShowText = false
    },
    // 通过工序ID获取站点信息
    async getLoadSiteMsg () {
      const res = await LoadSiteMsg(this.siteID)
      if (res.Result) {
        this.getUserData()
        const data = JSON.parse(res.Result)
        console.log(data, '工序ID获取站点信息')

        this.userData = data
        this.loadResourceData(data.OPERATIONS_ROUTE_ID)
        this.loadResourceProductData(data.ROUTE_ID)
        this.LoadResourceCmpData(data.OPERATIONS_ROUTE_ID)
      }
    },
    // 通过料号,工序ID获取站点信息
    async getPreview () {
      const res = await LoadSiteMsgPreview(this.siteInfo)
      if (res.Result) {
        this.getUserData()
        const data = JSON.parse(res.Result)
        console.log(data, '工序ID获取站点信息')

        this.userData = data
        this.loadResourceData(data.OPERATIONS_ROUTE_ID)
        this.loadResourceProductData(data.ROUTE_ID)
        this.LoadResourceCmpData(data.OPERATIONS_ROUTE_ID)
      }
    },
    radar () {
      /* =====================员工技能 雷达图 init=========================== */
      this.PersonRadar = echarts.init(document.getElementById('PersonRadar'))
      var optionRadar = null
      optionRadar = {
        tooltip: {},
        // 图表的位置
        grid: {
          position: 'center'
        },
        radar: {
          shape: 'circle',
          splitNumber: 2, // 雷达图圈数设置
          name: {
            textStyle: {
              color: '#fff'
            }
          },
          // 设置雷达图中间射线的颜色
          axisLine: {
            lineStyle: {
              color: 'rgba(131,141,158,0.6)'
            }
          },
          indicator: [
            {
              name: 'FCT',
              max: 100
            },
            {
              name: 'ICT',
              max: 100
            },
            {
              name: '执锡',
              max: 100
            },
            {
              name: '面板QC',
              max: 100
            },
            {
              name: '底板QC',
              max: 100
            },
            {
              name: '插件',
              max: 100
            },
            {
              name: '特殊岗位',
              max: 100
            },
            {
              name: '包装刷油',
              max: 100
            }
          ],
          nameGap: 5, // 文字距离图形的距离
          radius: 70, // 设置雷达图大小
          // 雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
          splitArea: {
            show: false,
            areaStyle: {
              color: '#54dcf2' // 图表背景的颜色
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: 'rgba(131,141,158,0.6)' // 设置网格的颜色
            }
          },
          // 若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
          axisLabel: {
            show: false,
            fontSize: 10,
            color: '#838D9E',
            showMaxLabel: false, // 不显示最大值，即外圈不显示数字30
            showMinLabel: false // 显示最小数字，即中心点显示0
          }
        },
        series: [
          {
            name: '技能分值', // tooltip中的标题
            type: 'radar', // 表示是雷达图
            symbol: 'circle', // 拐点的样式，'circle','rect','angle'等
            symbolSize: 5, // 拐点的大小
            areaStyle: {
              normal: {
                width: 0.1,
                opacity: 0.5
              }
            },
            data: [
              {
                // 插输入数据
                value: [],
                name: '技能分值', // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: 'rgba(255,225,0,.5)',
                    lineStyle: {
                      color: 'rgba(255,225,0,.5)'
                    }
                  }
                },
                // 在拐点处显示数值
                label: {
                  normal: {
                    show: true,
                    formatter: function (params) {
                      return params.value
                    }
                  }
                }
              }
            ]
          }
        ]
      }
      this.PersonRadar.setOption(optionRadar, true)
    },
    getEmployeeData () {
      var PersonRadar = echarts.init(document.getElementById('PersonRadar'))
      var arrseries = [60, 78, 70, 100, 78, 98, 100, 88]
      var arrxradar = [
        {
          name: 'FCT',
          max: 100
        },
        {
          name: 'ICT',
          max: 100
        },
        {
          name: this.$t('SOPRoutes._162'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._163'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._164'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._165'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._166'),
          max: 100
        },
        {
          name: this.$t('SOPRoutes._167'),
          max: 100
        }
      ]
      PersonRadar.hideLoading() // 隐藏加载动画
      PersonRadar.setOption({
        // 加载数据图表
        radar: {
          indicator: arrxradar
        },
        series: [
          {
            // 根据名字对应到相应的系列
            data: [
              {
                value: arrseries,
                name: this.$t('SOPRoutes._168'), // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: 'rgba(255,225,0,.5)',
                    lineStyle: {
                      color: 'rgba(255,225,0,.5)'
                    }
                  }
                },
                // 在拐点处显示数值
                label: {
                  normal: {
                    show: true,
                    formatter: function (params) {
                      return params.value
                    }
                  }
                }
              }
            ]
          }
        ]
      })
    },
    /** ===============  */
    async innerVisible_but (type) {
      this.callVal.CALL_TYPE_CODE = type
      this.callVal.CALL_CODE = ''
      this.callVal.CALL_CONTENT = ''
      const res = await this.callWindowInit()
      if (res.Result) {
        this.sort = res.Result
        this.innerVisible = true
        this.initRecord()
      }
    },
    async callWindowInit () {
      // eslint-disable-next-line no-return-await
      return await CallWindow(this.callVal.CALL_TYPE_CODE)
    },
    async handleChangeCallTypeCode (currentVal) {
      this.callVal.CALL_CODE = currentVal
      const res = await this.getCallCodeChinese()
      if (res.Result) {
        // eslint-disable-next-line no-useless-escape
        const data = res.Result.replace(/\"/g, '')
        this.callVal.CALL_CONTENT = data && data !== 'null' ? data : ''
      }
    },
    async getCallCodeChinese () {
      // eslint-disable-next-line no-return-await
      return await GetCallCodeChinese(this.callVal.CALL_CODE)
    },
    // 异常区
    async initRecord () {
      const res = await this.getRecordBySiteId()
      if (res.Result) {
        // console.log(res.Result, '异常区', JSON.parse(res.Result))
        // this.callTable = this.handleClassify(JSON.parse(res.Result))
        this.callTable = JSON.parse(res.Result)
        this.calltotal = res.TotalCount
        this.handleClassify(JSON.parse(res.Result))
      }
    },
    handleSizeChange (val) {
      this.callData.Limit = val
      this.initRecord()
    },
    handleCurrentChange (val) {
      this.callData.Page = val
      this.initRecord()
    },
    async getRecordBySiteId () {
      // eslint-disable-next-line no-return-await
      return await GetRecordBySiteId(this.callData)
    },
    // 选项
    handleClassify (data) {
      const newData = []
      data.map((item) => {
        switch (item.CALL_TYPE_CODE) {
          case this.$t('SOPRoutes._158'):
            if (this.callVal.CALL_TYPE_CODE === 0) {
              newData.push(item)
            }
            break
          case this.$t('SOPRoutes._159'):
            if (this.callVal.CALL_TYPE_CODE === 1) {
              newData.push(item)
            }
            break
          case this.$t('SOPRoutes._160'):
            if (this.callVal.CALL_TYPE_CODE === 2) {
              newData.push(item)
            }
            break
          case this.$t('SOPRoutes._161'):
            if (this.callVal.CALL_TYPE_CODE === 3) {
              newData.push(item)
            }
            break
        }
      })
      return newData
    },
    // 呼叫
    async shout_but () {
      if (this.callVal.CALL_CODE === '') {
        this.$message({
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: this.$t('SOPRoutes._169'),
          type: 'warning'
        })
        return
      }
      if (this.callVal.CALL_CONTENT === '') {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._170'),
          type: 'warning'
        })
        return
      }
      const params = {
        ...this.callVal,
        OPERATION_SITE_ID: this.siteID ? this.siteID : '000',
        OPERATOR: this.userinfo.USER_NAME
          ? this.userinfo.USER_NAME
          : this.account
      }
      const res = await AddCallRecord(params)
      if (res.Result) {
        // var resData = res.Result // 返回的对象
        var myDate = new Date()
        var obj = {
          CREATE_TIME: myDate.toLocaleString(),
          OPERATOR: this.userinfo.USER_NAME
            ? this.userinfo.USER_NAME
            : this.account,
          CALL_CONTENT: this.callVal.CALL_CONTENT
        }
        this.updateMsgArea(obj, 'call')
        // window.top.updateMsgArea && window.top.updateMsgArea(resData, 'call') // 更新消息区
        this.$message.success(this.$t('SOPRoutes._171'))
        this.page = 1
        this.callTable = []
        await this.initRecord()
        this.resetCallVall()
      }
    },
    resetCallVall () {
      this.callVal = {
        CALL_TYPE_CODE: '',
        CALL_CODE: '',
        CALL_CONTENT: ''
      }
    },
    // 签到
    async sign_but () {
      if (this.signArr.CALL_RECORD_IDS === '') {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._172'),
          type: 'warning'
        })
        return false
      }
      const res = await EditCallRecord(this.signArr)
      if (res.Result) {
        this.$message.success(this.$t('SOPRoutes._173'))
        this.callTable = []
        this.page = 1
        this.initRecord()
        let data = JSON.parse(res.Result)
        console.log(data, 'data')
        for (var i = 0; i < data.length; i++) {
          this.updateMsgArea(data[i], 'check')
          // window.top.updateMsgArea(res[i], 'check')
        }
      }
    },
    handleRowClick (row) {
      var ids = ''
      for (var i = 0; i < row.length; i++) {
        ids += row[i].Id + '|'
      }
      console.log(ids, 'ids')
      this.signArr.CALL_RECORD_IDS = ids
    },
    updateMsgArea (msg, type) {
      var msgArr = ''
      if (type === 'call') {
        msgArr =
          '<p>' +
          this.$t('crp.tb_5') +
          '：' +
          msg.CREATE_TIME +
          '<br/>' +
          this.$t('SOPRoutes._183') +
          '：' +
          msg.OPERATOR +
          this.$t('SOPRoutes._186') +
          '<br/>' +
          this.$t('SOPRoutes._184') +
          '：' +
          msg.CALL_CONTENT +
          '</p>'
      } else if (type === 'check') {
        msgArr =
          '<p>' +
          this.$t('crp.tb_13') +
          '：' +
          msg.CHECKIN_TIME +
          '<br/>' +
          this.$t('SOPRoutes._184') +
          '：' +
          msg.CALL_CONTENT +
          '<br/>' +
          this.$t('SOPRoutes._185') +
          '</p>'
      }
      this.msgArea = msgArr
    },
    // 获取员工信息
    async getUserData () {
      const res = await LoadEmployeeData(this.account)
      var data = JSON.parse(res.Result)
      if (res.Result) {
        if (this.$route.query.name) {
          this.info.USER_NAME = this.$route.query.name
        } else {
          this.info.USER_NAME = data.USER_NAME
        }
        this.info.USER_SEX = data.USER_SEX
        this.info.WORKINGYEARS = data.WORKINGYEARS
        this.info.EDUCATION = data.EDUCATION
        this.info.ENTRYDATE = data.ENTRYDATE
        this.info.PHOTO = data.PHOTO
        this.info.PHOTO_BASE64 = data.PHOTO_BASE64
        this.info.USER_AGE = data.USER_AGE
        console.log(res, '获取员工信息获取员工信息获取员工信息')

        console.log(data, '获取员工信')
        if (data.TRAIN_GRAGE_LIST.length > 0) {
          // showStamper(data.TRAIN_GRAGE_LIST);
          var arrxradar = [] // new Array[]; 数组
          var arrseries = [] // new Array[]; 数组
          for (var i in data.TRAIN_GRAGE_LIST) {
            if (data.TRAIN_GRAGE_LIST[i].GRADE === 0) {
              arrseries.push(60)
            } else {
              arrseries.push(data.TRAIN_GRAGE_LIST[i].GRADE)
            }
            var obj = {} // 对象
            obj.max = 100
            obj.name = data.TRAIN_GRAGE_LIST[i].TRAIN_NAME
            arrxradar.push(obj)
          }

          this.PersonRadar.hideLoading() // 隐藏加载动画
          this.PersonRadar.setOption({
            // 加载数据图表
            radar: {
              indicator: arrxradar
            },
            series: [
              {
                // 根据名字对应到相应的系列
                data: [
                  {
                    value: arrseries,
                    name: this.$t('SOPRoutes._168'), // 设置区域边框和区域的颜色
                    itemStyle: {
                      normal: {
                        color: 'rgba(255,225,0,.5)',
                        lineStyle: {
                          color: 'rgba(255,225,0,.5)'
                        }
                      }
                    },
                    // 在拐点处显示数值
                    label: {
                      normal: {
                        show: true,
                        formatter: function (params) {
                          return params.value
                        }
                      }
                    }
                  }
                ]
              }
            ]
          })
        }
      }
    },
    // 加载作业图列表
    async loadResourceData (e) {
      const res = await LoadResourceData(e)
      if (res.Result) {
        this.resourceData = JSON.parse(res.Result)
        // console.log(this.resourceData, '加载作业图轮播图')
      }
    },
    // 获取产品图:资源列表
    async loadResourceProductData (id) {
      const res = await LoadResourceProductData(id)
      if (res.Result) {
        var data = JSON.parse(res.Result)
        if (data) {
          this.productData = data
        }
        console.log(JSON.parse(res.Result), '获取产品图:资源列表')
      }
    },
    // 获取 零件图:资源列表
    async LoadResourceCmpData (id) {
      const res = await LoadResourceCmpData(id)
      if (res.Result) {
        console.log(JSON.parse(res.Result), '获取零件图:资源列表')
        const data = JSON.parse(res.Result)
        this.Resource = data.length
        console.log(this.Resource, 'this.Resource')
        this.Resource1 = data[0]
        this.Resource2 = data[1]
        this.Resource3 = data[2]
        this.Resource4 = data[3]
        this.Resource5 = data[4]
        this.Resource6 = data[5]
      }
    }
  }
}
</script>
<style scoped src="../../assets/style/bootstrap.min.css"></style>
<style scoped src="./css/index.css"></style>
<style scoped src="./css/button-style.css"></style>
<style type="text/css">
.primary-operation .el-dialog {
  height: 100%;
  margin: 0;
  background: #040f3c;
}
.primary-operation .el-dialog .el-dialog__body {
  padding: 0;
  height: 93%;
  background: #040f3c;
}
.SOPRoutes-sop .btn-style {
  margin: 0px;
  margin-top: 15px;
  padding: 5px 5px;
}

.SOPRoutes-sop .stamper {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  width: 160px;
  height: 70px;
  line-height: 60px;
  margin: 140px 0 0 300px;
  text-align: center;
  font-size: 40px;
  font-weight: 900;
  font-family: "新宋体";
  transform: rotate(-20deg);
  cursor: pointer;
  border-radius: 50% / 50%;
}

.SOPRoutes-sop .yes_stamper {
  border: 5px solid rgba(18, 233, 35, 0.6);
  color: rgba(18, 233, 35, 0.6);
}

.SOPRoutes-sop .no_stamper {
  border: 5px solid rgba(255, 0, 0, 0.6);
  color: rgba(255, 0, 0, 0.6);
}
.SOPRoutes-sop .border-container {
  color: #ffffff;
}
.sop-dialog {
  overflow: hidden;
}
.sop-dialog .el-dialog__body {
  padding: 15px;
}
.sop-dialog-title {
  background-color: #3e9ce2;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  margin-bottom: 10px;
}
.sop-dialog-area label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
}
.sop-dialog-area label span {
  width: 80px;
}
.sop-dialog-button {
  padding-top: 15px;
  color: #fff;
  text-align: right;
}
.SOPRoutes-sop {
  width: 100%;
  height: 100%;
}
.sop-carousel-text {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  background: rgba(0, 0, 0, 0.6);
}
.sop-carousel-text .last {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 100%;
  padding: 0px 5px;
}
.SOPRoutes-sop .el-carousel {
  width: 100%;
  height: 100%;
}
.SOPRoutes-sop .el-carousel__container {
  width: 100%;
  height: 100%;
}
.SOPRoutes-sop .el-carousel__container .el-carousel__item {
  text-align: center;
}
.SOPRoutes-sop .el-carousel__container .el-carousel__item img {
  height: 100%;
}
.SOPRoutes-sop .btn-6:before {
  content: "";
  background-color: #53cdd8;
  position: absolute;
  z-index: -1;
  top: 0;
  right: -30px;
  height: 100%;
  width: 0;
  -webkit-transform: skew(45deg, 0);
  transform: skew(45deg, 0);
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.SOPRoutes-sop .sp-titx {
  width: 100px !important;
}
.SOPRoutes-sop .callTable-radio .el-radio__label {
  display: none;
}
.sop-dialog-table {
  height: calc(100vh - 555px);
}

.MitoShow-div:hover .MitoShow-text {
  display: inline-block;
}

.MitoShow-text {
  display: none;
}
.MitoShow-text .last {
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 99%;
  padding: 0px 5px;
}
.SOPRoutes-sop .border-container .div-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
