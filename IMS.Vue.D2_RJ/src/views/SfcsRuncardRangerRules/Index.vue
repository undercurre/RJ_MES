<template>
  <d2-container class="SfcsRuncardRangerRules">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.PART_NO"
                  :placeholder="$t('srrr._1')"
                  clearable
                  style="width: 200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select clearable
                   v-model="formData.CUSTOMER_ID"
                   style="width: 200px"
                   :placeholder="$t('srrr._2')">
          <div style="
              position: absolute;
              width: 100%;
              height: 6px;
              background: #fff;
              background: #fff;
              top: 0;
              z-index: 99;
            "></div>
          <div style="
              position: absolute;
              width: 100%;
              height: 6px;
              background: #fff;
              background: #fff;
              bottom: 0;
              z-index: 99;
            "></div>
          <div style="
              width: 600px;
              display: flex;
              padding: 0 20px 0 10px;
              position: sticky;
              top: 6px;
              background: #fff;
              z-index: 90;
            ">
            <el-input v-model="clientForm.Key"
                      @input="searchClient"
                      @keyup.enter.native="searchClient"
                      :placeholder="$t('SmtStencilPart._16')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="searchClient">{{ $t("publics.btn.search") }}</el-button>
          </div>
          <el-option v-for="item in CustomList"
                     :key="item.ID"
                     :label="item.CUSTOMER"
                     :value="item.ID"
                     :disabled="item.disabled">
            <span style="float: left">{{ item.CUSTOMER }}</span>
          </el-option>
          <div style="
              width: 600px;
              position: sticky;
              bottom: 6px;
              background: #fff;
              z-index: 90;
              padding-left: 15px;
            ">
            <el-pagination :pager-count="5"
                           :current-page="clientForm.Page"
                           :page-size="clientForm.Limit"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="clientPage"
                           @size-change="clientSizeChange"
                           @current-change="clientCurrentChange" />
          </div>
        </el-select>
        <el-select clearable
                   v-model="formData.PRODUCT_FAMILY_ID"
                   style="width: 200px"
                   :placeholder="'请选择产品系列'">
          <div style="
              position: absolute;
              width: 100%;
              height: 6px;
              background: #fff;
              background: #fff;
              top: 0;
              z-index: 99;
            "></div>
          <div style="
              position: absolute;
              width: 100%;
              height: 6px;
              background: #fff;
              background: #fff;
              bottom: 0;
              z-index: 99;
            "></div>
          <div style="
              width: 600px;
              display: flex;
              padding: 0 20px 0 10px;
              position: sticky;
              top: 6px;
              background: #fff;
              z-index: 90;
            ">
            <el-input v-model="ProductForm.FAMILY_NAME"
                      @input="searchProduct"
                      @keyup.enter.native="searchProduct"
                      :placeholder="$t('SmtStencilPart._16')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="searchProduct">{{ $t("publics.btn.search") }}</el-button>
          </div>
          <el-option v-for="item in ProductList"
                     :key="item.ID"
                     :label="item.FAMILY_NAME"
                     :value="item.ID"
                     :disabled="item.disabled">
            <span style="float: left">{{ item.FAMILY_NAME }}</span>
          </el-option>
          <div style="
              width: 600px;
              position: sticky;
              bottom: 6px;
              background: #fff;
              z-index: 90;
              padding-left: 15px;
            ">
            <el-pagination :pager-count="5"
                           :current-page="ProductForm.Page"
                           :page-size="ProductForm.Limit"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="ProductDataPage"
                           @size-change="ProductSizeChange"
                           @current-change="ProductCurrentChange" />
          </div>
        </el-select>
        <!-- <el-select v-model="formData.RULE_TYPE"
                   filterable
                   style="width: 200px"
                   :placeholder="$t('srrr._42')">
          <el-option v-for="item in BarCodeList"
                     :key="item.ID"
                     :label="item.Value"
                     :value="item.ID" />
        </el-select> -->
        <el-select clearable
                   v-model="verifyDate.WO_NO"
                   style="width: 200px"
                   :placeholder="$t('srrr._43')">
          <div style="
              position: absolute;
              width: 100%;
              height: 6px;
              background: #fff;
              background: #fff;
              top: 0;
              z-index: 99;
            "></div>
          <div style="
              position: absolute;
              width: 100%;
              height: 6px;
              background: #fff;
              background: #fff;
              bottom: 0;
              z-index: 99;
            "></div>
          <div style="
              width: 600px;
              display: flex;
              padding: 0 20px 0 10px;
              position: sticky;
              top: 6px;
              background: #fff;
              z-index: 90;
            ">
            <el-input v-model="WO_NOForm.WO_NO"
                      @input="searchWO_NO"
                      @keyup.enter.native="searchWO_NO"
                      :placeholder="$t('SmtStencilPart._16')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="searchWO_NO">{{ $t("publics.btn.search") }}</el-button>
          </div>
          <el-option v-for="item in SmtWoList"
                     :key="item.ID"
                     :label="item.WO_NO"
                     :value="item.WO_NO"
                     :disabled="item.disabled">
            <span style="float: left">{{ item.WO_NO }}</span>
            <span style="float: right">{{ item.DESCRIPTION }}</span>
          </el-option>
          <div style="
              width: 600px;
              position: sticky;
              bottom: 6px;
              background: #fff;
              z-index: 90;
              padding-left: 15px;
            ">
            <el-pagination :pager-count="5"
                           :current-page="WO_NOForm.Page"
                           :page-size="WO_NOForm.Limit"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="SmtWoPage"
                           @size-change="WO_NOSizeChange"
                           @current-change="WO_NOCurrentChange" />
          </div>
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("srrr._4") }}</el-button>
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click.prevent="eliminateClick"
                   v-if="$btnList.indexOf('SfcsRuncardRangerRulesAdd') !== -1">{{ $t("srrr._38") }}</el-button>
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsRuncardRangerRulesEdit') !== -1">{{ $t("srrr._6") }}</el-button>
      </custom-container-header>
    </template>
    <el-tabs type="border-card"
             @tab-click="changeTab">
      <el-tab-pane :label="$t('srrr._44')">
        <el-form ref="verifyDate"
                 :model="verifyDate"
                 label-width="170px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('srrr._20')">
                <el-radio-group v-model="verifyDate.RangerRuleType"
                                class="group"
                                @change="groupClick">
                  <el-radio :disabled="disaRdaio"
                            label="1"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._22") }}</el-radio>
                  <el-radio label="0"
                            :disabled="disaRdaio"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._21") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="2"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._23") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="3"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._40") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="4"
                            style="width: 100%">{{$t("srrr._45")}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('srrr._25')">
                <el-select :disabled="disaB"
                           @change="VerifyClick"
                           clearable
                           v-model="verifyDate.CUSTOMER_ID"
                           style="width: 100%"
                           :placeholder="$t('srrr._2')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="clientForm.Key"
                              @input="searchClient"
                              @keyup.enter.native="searchClient"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchClient">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in CustomList"
                             :key="item.ID"
                             :label="item.CUSTOMER"
                             :value="item.ID"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.CUSTOMER }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="clientForm.Page"
                                   :page-size="clientForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="clientPage"
                                   @size-change="clientSizeChange"
                                   @current-change="clientCurrentChange" />
                  </div>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('srrr._24')">
                <el-select :disabled="disaA"
                           clearable
                           @change="VerifyClick"
                           v-model="verifyDate.PRODUCT_FAMILY_ID"
                           style="width: 100%"
                           :placeholder="$t('srrr._26')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="ProductForm.FAMILY_NAME"
                              @input="searchProduct"
                              @keyup.enter.native="searchProduct"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchProduct">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in ProductList"
                             :key="item.ID"
                             :label="item.FAMILY_NAME"
                             :value="item.ID"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.FAMILY_NAME }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="ProductForm.Page"
                                   :page-size="ProductForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="ProductDataPage"
                                   @size-change="ProductSizeChange"
                                   @current-change="ProductCurrentChange" />
                  </div>
                </el-select>
                <!-- <el-input
                  v-model="verifyDate.PLATFORM_ID"
                  :disabled="disaA"
                  filterable
                  clearable
                  :placeholder="$t('srrr._26')"
                  @keyup.enter.native="VerifyClick"
                /> -->
              </el-form-item>
              <el-form-item :label="$t('srrr._23')">
                <el-input v-model="verifyDate.PART_NO"
                          :disabled="disaRadi"
                          :placeholder="$t('srrr._27')"
                          @keyup.enter.native="VerifyClick" />
              </el-form-item>
              <el-form-item :label="$t('srrr._46')">
                <el-input v-model="verifyDate.SALES_ORDER"
                          :disabled="disC"
                          :placeholder="$t('srrr._47')"
                          @keyup.enter.native="VerifyClick" />
              </el-form-item>
              <el-form-item :label="$t('srrr._45')">
                <el-select :disabled="disaD"
                           clearable
                           @change="VerifyClick"
                           v-model="verifyDate.WO_NO"
                           style="width: 100%"
                           :placeholder="$t('srrr._43')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="WO_NOForm.WO_NO"
                              @input="searchWO_NO"
                              @keyup.enter.native="searchWO_NO"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchWO_NO">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in SmtWoList"
                             :key="item.ID"
                             :label="item.WO_NO"
                             :value="item.WO_NO"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.WO_NO }}</span>
                    <span style="float: right">{{ item.DESCRIPTION }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="WO_NOForm.Page"
                                   :page-size="WO_NOForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="SmtWoPage"
                                   @size-change="WO_NOSizeChange"
                                   @current-change="WO_NOCurrentChange" />
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form ref="form"
                 :model="form"
                 :show-message="false"
                 :rules="rules"
                 label-width="170px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('srrr._10')"
                            prop="FIX_HEADER">
                <el-input v-model="form.FIX_HEADER"
                          :placeholder="$t('srrr._29')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._12')"
                            prop="RANGE_LENGTH">
                <el-input v-model="form.RANGE_LENGTH"
                          :placeholder="$t('srrr._30')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._14')"
                            prop="DIGITAL">
                <el-select v-model="form.DIGITAL"
                           style="width: 100%"
                           :disabled="disaInp"
                           :placeholder="$t('srrr._31')"
                           @change="digClick">
                  <el-option v-for="item in DigitalList"
                             :key="item.LOOKUP_CODE"
                             :label="item.MEANING"
                             :value="item.LOOKUP_CODE" />
                </el-select>
              </el-form-item>
              <!--<el-form-item :label="$t('MesBatchManager._29')"
                            prop="SORT_TYPE">
                <el-select v-model="form.SORT_TYPE"
                           style="width: 100%"
                           :disabled="disaInp"
                           placeholder=" ">
                  <el-option v-for="item in SORTTYPELIST"
                             :key="item.LOOKUP_CODE"
                             :label="item.MEANING"
                             :value="item.LOOKUP_CODE" />
                </el-select>
              </el-form-item>-->
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('srrr._11')"
                            prop="FIX_TAIL">
                <el-input v-model="form.FIX_TAIL"
                          :placeholder="$t('srrr._32')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._13')"
                            prop="RANGE_START_CODE">
                <el-input v-model="form.RANGE_START_CODE"
                          :placeholder="$t('srrr._33')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._15')">
                <el-select v-model="form.ENABLED"
                           :disabled="disaInp"
                           style="width: 100%"
                           :placeholder="$t('srrr._34')">
                  <el-option :label="$t('srrr._16')"
                             value="Y" />
                  <el-option :label="$t('srrr._17')"
                             value="N" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('srrr._48')">
        <el-form ref="verifyDate"
                 :model="verifyDate"
                 label-width="170px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('srrr._20')">
                <el-radio-group v-model="verifyDate.RangerRuleType"
                                class="group"
                                @change="groupClick">
                  <el-radio :disabled="disaRdaio"
                            label="1"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._22") }}</el-radio>
                  <el-radio label="0"
                            :disabled="disaRdaio"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._21") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="2"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._23") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="3"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._40") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="4"
                            style="width: 100%">{{$t("srrr._45")}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('srrr._25')">
                <el-select :disabled="disaB"
                           @change="VerifyClick"
                           clearable
                           v-model="verifyDate.CUSTOMER_ID"
                           style="width: 100%"
                           :placeholder="$t('srrr._2')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="clientForm.Key"
                              @input="searchClient"
                              @keyup.enter.native="searchClient"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchClient">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in CustomList"
                             :key="item.ID"
                             :label="item.CUSTOMER"
                             :value="item.ID"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.CUSTOMER }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="clientForm.Page"
                                   :page-size="clientForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="clientPage"
                                   @size-change="clientSizeChange"
                                   @current-change="clientCurrentChange" />
                  </div>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('srrr._24')">
                <el-select :disabled="disaA"
                           clearable
                           @change="VerifyClick"
                           v-model="verifyDate.PRODUCT_FAMILY_ID"
                           style="width: 100%"
                           :placeholder="$t('srrr._26')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="ProductForm.FAMILY_NAME"
                              @input="searchProduct"
                              @keyup.enter.native="searchProduct"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchProduct">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in ProductList"
                             :key="item.ID"
                             :label="item.FAMILY_NAME"
                             :value="item.ID"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.FAMILY_NAME }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="ProductForm.Page"
                                   :page-size="ProductForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="ProductDataPage"
                                   @size-change="ProductSizeChange"
                                   @current-change="ProductCurrentChange" />
                  </div>
                </el-select>
                <!-- <el-input
                  v-model="verifyDate.PLATFORM_ID"
                  :disabled="disaA"
                  filterable
                  clearable
                  :placeholder="$t('srrr._26')"
                  @keyup.enter.native="VerifyClick"
                /> -->
              </el-form-item>
              <el-form-item :label="$t('srrr._23')">
                <el-input v-model="verifyDate.PART_NO"
                          :disabled="disaRadi"
                          :placeholder="$t('srrr._27')"
                          @keyup.enter.native="VerifyClick" />
              </el-form-item>
              <el-form-item :label="$t('srrr._46')">
                <el-input v-model="verifyDate.SALES_ORDER"
                          :disabled="disC"
                          :placeholder="$t('srrr._47')"
                          @keyup.enter.native="VerifyClick" />
              </el-form-item>
              <el-form-item :label="$t('srrr._45')">
                <el-select :disabled="disaD"
                           clearable
                           @change="VerifyClick"
                           v-model="verifyDate.WO_NO"
                           style="width: 100%"
                           :placeholder="$t('srrr._43')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="WO_NOForm.WO_NO"
                              @input="searchWO_NO"
                              @keyup.enter.native="searchWO_NO"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchWO_NO">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in SmtWoList"
                             :key="item.ID"
                             :label="item.WO_NO"
                             :value="item.WO_NO"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.WO_NO }}</span>
                    <span style="float: right">{{ item.DESCRIPTION }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="WO_NOForm.Page"
                                   :page-size="WO_NOForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="SmtWoPage"
                                   @size-change="WO_NOSizeChange"
                                   @current-change="WO_NOCurrentChange" />
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form ref="form"
                 :model="form"
                 :show-message="false"
                 :rules="rules"
                 label-width="170px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('srrr._10')"
                            prop="FIX_HEADER">
                <el-input v-model="form.FIX_HEADER"
                          :placeholder="$t('srrr._29')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._12')"
                            prop="RANGE_LENGTH">
                <el-input v-model="form.RANGE_LENGTH"
                          :placeholder="$t('srrr._30')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._14')"
                            prop="DIGITAL">
                <el-select v-model="form.DIGITAL"
                           style="width: 100%"
                           :disabled="disaInp"
                           :placeholder="$t('srrr._31')"
                           @change="digClick">
                  <el-option v-for="item in DigitalList"
                             :key="item.LOOKUP_CODE"
                             :label="item.MEANING"
                             :value="item.LOOKUP_CODE" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('srrr._11')"
                            prop="FIX_TAIL">
                <el-input v-model="form.FIX_TAIL"
                          :placeholder="$t('srrr._32')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._13')"
                            prop="RANGE_START_CODE">
                <el-input v-model="form.RANGE_START_CODE"
                          :placeholder="$t('srrr._33')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._15')">
                <el-select v-model="form.ENABLED"
                           :disabled="disaInp"
                           style="width: 100%"
                           :placeholder="$t('srrr._34')">
                  <el-option :label="$t('srrr._16')"
                             value="Y" />
                  <el-option :label="$t('srrr._17')"
                             value="N" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('srrr._49')">
        <el-form ref="verifyDate"
                 :model="verifyDate"
                 label-width="170px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('srrr._20')">
                <el-radio-group v-model="verifyDate.RangerRuleType"
                                class="group"
                                @change="groupClick">
                  <el-radio :disabled="disaRdaio"
                            label="1"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._22") }}</el-radio>
                  <el-radio label="0"
                            :disabled="disaRdaio"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._21") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="2"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._23") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="3"
                            style="width: 100%; margin-bottom: 30px">{{ $t("srrr._40") }}</el-radio>
                  <el-radio :disabled="disaRdaio"
                            label="4"
                            style="width: 100%">{{$t("srrr._45")}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('srrr._25')">
                <el-select :disabled="disaB"
                           @change="VerifyClick"
                           clearable
                           v-model="verifyDate.CUSTOMER_ID"
                           style="width: 100%"
                           :placeholder="$t('srrr._2')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="clientForm.Key"
                              @input="searchClient"
                              @keyup.enter.native="searchClient"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchClient">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in CustomList"
                             :key="item.ID"
                             :label="item.CUSTOMER"
                             :value="item.ID"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.CUSTOMER }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="clientForm.Page"
                                   :page-size="clientForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="clientPage"
                                   @size-change="clientSizeChange"
                                   @current-change="clientCurrentChange" />
                  </div>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('srrr._24')">
                <el-select :disabled="disaA"
                           clearable
                           @change="VerifyClick"
                           v-model="verifyDate.PRODUCT_FAMILY_ID"
                           style="width: 100%"
                           :placeholder="$t('srrr._26')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="ProductForm.FAMILY_NAME"
                              @input="searchProduct"
                              @keyup.enter.native="searchProduct"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchProduct">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in ProductList"
                             :key="item.ID"
                             :label="item.FAMILY_NAME"
                             :value="item.ID"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.FAMILY_NAME }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="ProductForm.Page"
                                   :page-size="ProductForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="ProductDataPage"
                                   @size-change="ProductSizeChange"
                                   @current-change="ProductCurrentChange" />
                  </div>
                </el-select>
                <!-- <el-input
                  v-model="verifyDate.PLATFORM_ID"
                  :disabled="disaA"
                  filterable
                  clearable
                  :placeholder="$t('srrr._26')"
                  @keyup.enter.native="VerifyClick"
                /> -->
              </el-form-item>
              <el-form-item :label="$t('srrr._23')">
                <el-input v-model="verifyDate.PART_NO"
                          :disabled="disaRadi"
                          :placeholder="$t('srrr._27')"
                          @keyup.enter.native="VerifyClick" />
              </el-form-item>
              <el-form-item :label="$t('srrr._46')">
                <el-input v-model="verifyDate.SALES_ORDER"
                          :disabled="disC"
                          :placeholder="$t('srrr._47')"
                          @keyup.enter.native="VerifyClick" />
              </el-form-item>
              <el-form-item :label="$t('srrr._45')">
                <el-select :disabled="disaD"
                           clearable
                           @change="VerifyClick"
                           v-model="verifyDate.WO_NO"
                           style="width: 100%"
                           :placeholder="$t('srrr._43')">
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "></div>
                  <div style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    ">
                    <el-input v-model="WO_NOForm.WO_NO"
                              @input="searchWO_NO"
                              @keyup.enter.native="searchWO_NO"
                              :placeholder="$t('SmtStencilPart._16')"></el-input>
                    <el-button type="primary"
                               icon="el-icon-search"
                               @click.prevent="searchWO_NO">{{ $t("publics.btn.search") }}</el-button>
                  </div>
                  <el-option v-for="item in SmtWoList"
                             :key="item.ID"
                             :label="item.WO_NO"
                             :value="item.WO_NO"
                             :disabled="item.disabled">
                    <span style="float: left">{{ item.WO_NO }}</span>
                    <span style="float: right">{{ item.DESCRIPTION }}</span>
                  </el-option>
                  <div style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    ">
                    <el-pagination :pager-count="5"
                                   :current-page="WO_NOForm.Page"
                                   :page-size="WO_NOForm.Limit"
                                   :page-sizes="[10, 20, 30, 40]"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="SmtWoPage"
                                   @size-change="WO_NOSizeChange"
                                   @current-change="WO_NOCurrentChange" />
                  </div>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form ref="form"
                 :model="form"
                 :show-message="false"
                 :rules="rules"
                 label-width="170px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('srrr._10')"
                            prop="FIX_HEADER">
                <el-input v-model="form.FIX_HEADER"
                          :placeholder="$t('srrr._29')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._12')"
                            prop="RANGE_LENGTH">
                <el-input v-model="form.RANGE_LENGTH"
                          :placeholder="$t('srrr._30')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._14')"
                            prop="DIGITAL">
                <el-select v-model="form.DIGITAL"
                           style="width: 100%"
                           :disabled="disaInp"
                           :placeholder="$t('srrr._31')"
                           @change="digClick">
                  <el-option v-for="item in DigitalList"
                             :key="item.LOOKUP_CODE"
                             :label="item.MEANING"
                             :value="item.LOOKUP_CODE" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('srrr._11')"
                            prop="FIX_TAIL">
                <el-input v-model="form.FIX_TAIL"
                          :placeholder="$t('srrr._32')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._13')"
                            prop="RANGE_START_CODE">
                <el-input v-model="form.RANGE_START_CODE"
                          :placeholder="$t('srrr._33')"
                          type="text"
                          :disabled="disaInp" />
              </el-form-item>
              <el-form-item :label="$t('srrr._15')">
                <el-select v-model="form.ENABLED"
                           :disabled="disaInp"
                           style="width: 100%"
                           :placeholder="$t('srrr._34')">
                  <el-option :label="$t('srrr._16')"
                             value="Y" />
                  <el-option :label="$t('srrr._17')"
                             value="N" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div>
      <div class="form-title">{{ $t("srrr._19") }}</div>
      <div class="SfcsRuncardRangerRules-table">
        <vxe-table v-loading="loading"
                   ref="xTable"
                   border
                   stripe
                   keep-source
                   highlight-hover-row
                   highlight-current-row
                   show-overflow
                   auto-resize
                   width="100%"
                   height="100%"
                   :edit-config="{ mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :data="annalTable"
                   @cell-click="obtain_but">
          <vxe-table-column show-overflow
                            :title="$t('srrr._7')"
                            type="radio"
                            width="80"
                            align="center" />

          <vxe-table-column show-overflow
                            field="CUSTOMER_ID"
                            :edit-render="{ name: 'select', options: CustomListbox }"
                            :title="$t('srrr._8')"
                            align="center"
                            min-width="180" />
          <vxe-table-column show-overflow
                            field="FAMILY_NAME"
                            :title="$t('srrr._24')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            min-width="250" />
          <vxe-table-column show-overflow
                            field="PART_NO"
                            :title="$t('srrr._9')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            min-width="220" />
          <vxe-table-column show-overflow
                            field="SALES_ORDER"
                            :title="$t('srrr._40')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            min-width="220" />
          <vxe-table-column show-overflow
                            field="WO_NO"
                            :title="$t('srrr._45')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            min-width="180" />
          <vxe-table-column show-overflow
                            field="RULE_TYPE"
                            :title="$t('srrr._50')"
                            :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
                            align="center"
                            min-width="150">
            <template v-slot:edit="{ row }">
              <span v-if="row.RULE_TYPE === 0">{{$t('srrr._44')}}</span>
              <span v-if="row.RULE_TYPE === 1">{{$t('srrr._48')}}</span>
              <span v-if="row.RULE_TYPE === 2">{{$t('srrr._49')}}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column show-overflow
                            field="FIX_HEADER"
                            :title="$t('srrr._10')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="120" />
          <vxe-table-column show-overflow
                            field="FIX_TAIL"
                            :title="$t('srrr._11')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="120" />
          <vxe-table-column show-overflow
                            field="RANGE_LENGTH"
                            :title="$t('srrr._12')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            min-width="160" />
          <vxe-table-column show-overflow
                            field="RANGE_START_CODE"
                            :title="$t('srrr._13')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            min-width="200" />
          <vxe-table-column show-overflow
                            field="DIGITAL"
                            :edit-render="{ name: 'select', options: DigitalListbox }"
                            :title="$t('srrr._14')"
                            align="center"
                            min-width="170" />
          <!-- <vxe-table-column
            show-overflow
            field="DIGITAL"
            :title="$t('srrr._14')"
            :edit-render="{name: 'input'}"
            align="center"
            width="150"
          /> -->

          <vxe-table-column field="ENABLED"
                            :title="$t('srrr._15')"
                            :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
                            width="150"
                            align="center">
            <template v-slot:edit="{ row }">
              <div class="rddselect">
                <el-switch disabled
                           v-model="row.ENABLED"
                           :active-text="$t('srrr._16')"
                           :inactive-text="$t('srrr._17')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column min-width="240"
                            show-overflow
                            field="EXCLUSIVE_CHAR"
                            :title="$t('srrr._18')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
        </vxe-table>
      </div>
      <el-pagination class="SfcsRuncardRangerRules-pagination"
                     :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsRuncardRangerRules'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
const API = helper('SfcsRuncardRangerRules')
const API2 = helper('SfcsProductFamily')
const API3 = helper('SmtWo')
const API4 = helper('SfcsCustomers')
export default {
  name: 'SfcsRuncardRangerRules',
  components: {
    customContainerHeader
  },
  data () {
    return {
      CustomList: [],
      CustomListbox: [],
      DigitalList: [],
      DigitalListbox: [],
      disaRadi: true,
      disaB: true,
      disaInp: true,
      disaRdaio: false,
      groupInde: 0,

      activeName: 'annal',
      radio: '',
      Detailradio: '',
      loading: false,
      annalTable: [],
      Detailloading: false,
      DetailTable: [],
      total: 0,
      verifyDate: {
        RangerRuleType: '',
        PLATFORM_ID: '',
        CUSTOMER_ID: '',
        PART_NO: ''
      },

      formData: {
        CUSTOMER_ID: '',
        RULE_TYPE: 0,
        PART_NO: '',
        Page: 1,
        Limit: 15
      },
      ProductForm: {
        Page: 1,
        Limit: 10
      },
      ProductDataPage: 0,
      form: {
        ID: 0,
        CUSTOMER_ID: '', // 客户
        PLATFORM_ID: '', // 产品系列
        PART_NO: '', // 成品料号
        MODEL_ID: '', // 模块
        FIX_HEADER: '', // 前导符
        FIX_TAIL: '', // 结束符
        RANGE_LENGTH: '', // 流水范围长度
        RANGE_START_CODE: '', // 流水范围开始字符
        DIGITAL: '', // 进制
        DIGITAL_Caption: '', // 进制说明
        EXCLUSIVE_CHAR: '', // 不包括字符
        ENABLED: 'Y', // 是否激活
        SORT_TYPE: 1
      },
      rules: {
        // FIX_HEADER: [
        //   { required: true, message: this.$t('srrr._29'), trigger: 'blur' }
        // ],
        RANGE_LENGTH: [
          { required: true, message: this.$t('srrr._30'), trigger: 'blur' }
        ],
        DIGITAL: [
          { required: true, message: this.$t('srrr._31'), trigger: 'change' }
        ],
        RANGE_START_CODE: [
          { required: true, message: this.$t('srrr._33'), trigger: 'blur' }
        ]
      },
      DetailData: {
        ID: '',
        Key: '',
        Page: 1,
        Limit: 10
      },
      Record: {
        id: 0
      },
      Detailtotal: 0,
      formDa: {},

      seve: {
        headerId: '',
        user: '',
        status: '',
        content: ''
      },
      disC: true,
      disaA: true,
      disaD: true,
      ProductList: [],
      BarCodeList: [
        { ID: 0, Value: this.$t('srrr._44') },
        { ID: 1, Value: this.$t('srrr._48') },
        { ID: 2, Value: this.$t('srrr._49') }
      ],
      SmtWoList: [],
      SmtWoPage: 0,
      WO_NOForm: {
        Page: 1,
        Limit: 10
      },
      clientPage: 0,
      clientForm: {
        Page: 1,
        Limit: 10
      },
      SORTTYPELIST: [
        {
          LOOKUP_CODE: 1,
          MEANING: '递增'
        },
        {
          LOOKUP_CODE: 2,
          MEANING: '递减'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  watch: {
    CustomList (val) {
      if (val.length === 0) {
        this.CustomList.push({
          ID: '',
          CUSTOMER: '',
          disabled: true
        })
      }
    },
    ProductList (val) {
      if (val.length === 0) {
        this.ProductList.push({
          ID: '',
          FAMILY_NAME: '',
          disabled: true
        })
      }
    },
    SmtWoList (val) {
      if (val.length === 0) {
        this.SmtWoList.push({
          ID: '',
          WO_NO: '',
          disabled: true
        })
      }
    }
  },
  created () {
    this.seve.user = this.userinfo.USER_NAME
    this.getIndex()
  },
  methods: {
    searchClient () {
      this.clientForm.Page = 1
      this.getSfcsCustomersLoadData()
    },
    clientSizeChange (Limit) {
      this.clientForm.Limit = Limit
      this.getSfcsCustomersLoadData()
    },
    clientCurrentChange (Page) {
      this.clientForm.Page = Page
      this.getSfcsCustomersLoadData()
    },
    searchProduct () {
      this.ProductForm.Page = 1
      this.getSfcsProductFamilyLoadData()
    },
    ProductSizeChange (Limit) {
      this.ProductForm.Limit = Limit
      this.getSfcsProductFamilyLoadData()
    },
    ProductCurrentChange (Page) {
      this.ProductForm.Page = Page
      this.getSfcsProductFamilyLoadData()
    },
    searchWO_NO () {
      this.WO_NOForm.Page = 1
      this.getSmtWoLoadData()
    },
    WO_NOSizeChange (Limit) {
      this.WO_NOForm.Limit = Limit
      this.getSmtWoLoadData()
    },
    WO_NOCurrentChange (Page) {
      this.WO_NOForm.Page = Page
      this.getSmtWoLoadData()
    },
    changeTab (e) {
      // console.log(e)
      this.eliminateClick()
      this.verifyDate.RULE_TYPE = parseInt(e.index)
      this.formData.RULE_TYPE = parseInt(e.index)
      this.form.RULE_TYPE = parseInt(e.index)
      this.getLoadData()
    },
    groupClick (e) {
      this.groupInde = e
      if (e === '1') {
        this.disaRadi = true
        this.disaB = false
        this.disC = true
        this.disaD = true
        this.disaA = true
      } else if (e === '2') {
        this.disaB = true
        this.disaRadi = false
        this.disaA = true
        this.disaD = true
        this.disC = true
      } else if (e === '3') {
        this.disC = false
        this.disaB = true
        this.disaD = true
        this.disaA = true
        this.disaRadi = true
      } else if (e === '0') {
        this.disaA = false
        this.disC = true
        this.disaD = true
        this.disaB = true
        this.disaRadi = true
      } else if (e === '4') {
        this.disaA = true
        this.disC = true
        this.disaB = true
        this.disaD = false
        this.disaRadi = true
      }
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        console.log(res)
        this.DigitalList = res.Result.DigitalList
        this.CustomListbox.push({
          label: '',
          value: '',
          disabled: false
        })
        res.Result.CustomList.map((item) => {
          this.CustomListbox.push({
            label: item.CUSTOMER,
            value: Number(item.ID),
            disabled: false
          })
        })

        this.DigitalListbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DigitalList.map((item) => {
          this.DigitalListbox.push({
            label: item.MEANING,
            value: Number(item.LOOKUP_CODE),
            disabled: false
          })
        })
        this.getLoadData()
        this.getSfcsProductFamilyLoadData()
        this.getSmtWoLoadData()
        this.getSfcsCustomersLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.annalTable = res.Result
        this.total = res.TotalCount
      }
    },
    async getSfcsProductFamilyLoadData () {
      const res = await API2.LoadData(this.ProductForm)
      if (res.Result) {
        this.ProductList = []
        this.ProductDataPage = res.TotalCount
        res.Result.map((item) => {
          if (item.ENABLED === 'Y') {
            this.ProductList.push(item)
          }
        })
      }
    },
    async getSmtWoLoadData () {
      const res = await API3.LoadData(this.WO_NOForm)
      if (res.Result) {
        this.SmtWoList = res.Result || []
        this.SmtWoPage = res.TotalCount || 0
      }
    },
    async getSfcsCustomersLoadData () {
      const res = await API4.LoadData(this.clientForm)
      if (res.Result) {
        this.CustomList = res.Result
        this.clientPage = res.TotalCount
      }
    },
    //
    async VerifyClick () {
      if (this.verifyDate.RangerRuleType === '') {
        this.$message({
          showClose: true,
          message: this.$t('srrr._28'),
          type: 'warning'
        })
        return
      }
      if (this.groupInde === '0') {
        if (
          this.verifyDate.PRODUCT_FAMILY_ID === '' ||
          !this.verifyDate.PRODUCT_FAMILY_ID
        ) {
          this.$message({
            showClose: true,
            message: this.$t('srrr._a2'),
            type: 'warning'
          })
          return
        }
      }
      if (this.groupInde === '1') {
        if (this.verifyDate.CUSTOMER_ID === '') {
          this.$message({
            showClose: true,
            message: this.$t('srrr._2'),
            type: 'warning'
          })
          return
        }
      }
      if (this.groupInde === '2') {
        if (this.verifyDate.PART_NO === '') {
          this.$message({
            showClose: true,
            message: this.$t('srrr._27'),
            type: 'warning'
          })
        }
      }
      if (this.groupInde === '3') {
        if (this.verifyDate.SALES_ORDER === '') {
          this.$message({
            showClose: true,
            message: this.$t('srrr._41'),
            type: 'warning'
          })
        }
      }
      if (this.groupInde === '4') {
        if (this.verifyDate.WO_NO === '') {
          this.$message({
            showClose: true,
            message: this.$t('srrr._43'),
            type: 'warning'
          })
        }
      }
      const res = await API.VerifyRanger(this.verifyDate)
      if (res.Result) {
        this.disaRdaio = true
        this.disaB = true
        this.disaRadi = true
        this.disaInp = false
        this.disC = true
        this.disaA = true
        this.disaD = true
      } else {
        this.disaRdaio = false
        this.disaRadi = false
        this.disaB = false
        this.disaA = false
        this.disaInp = true
        this.disC = true
        this.disaD = false
      }
    },
    // 点击获取表格一行数据
    obtain_but (e) {
      this.radio = this.annalTable.indexOf(e)
      var row = e.row
      this.disaInp = false
      this.disaRadi = true
      this.disaRdaio = true
      this.disC = true

      this.verifyDate.CUSTOMER_ID = row.CUSTOMER_ID ? row.CUSTOMER_ID : ''
      this.verifyDate.PART_NO = row.PART_NO || ''
      this.verifyDate.SALES_ORDER = row.SALES_ORDER || ''

      if (row.CUSTOMER_ID) {
        this.verifyDate.RangerRuleType = '1'
      } else if (row.PART_NO) {
        this.verifyDate.RangerRuleType = '2'
      } else if (row.SALES_ORDER) {
        this.verifyDate.RangerRuleType = '3'
      }

      // this.form = row
      this.form.ID = row.ID
      this.form.FIX_HEADER = row.FIX_HEADER
      this.form.RANGE_LENGTH = row.RANGE_LENGTH
      this.form.FIX_TAIL = row.FIX_TAIL
      this.form.CUSTOMER_ID = row.CUSTOMER_ID
      this.form.MODEL_ID = row.MODEL_ID
      this.form.RANGE_START_CODE = row.RANGE_START_CODE
      this.form.DIGITAL = row.DIGITAL ? row.DIGITAL : ''
      this.form.ENABLED = row.ENABLED
      this.form.SORT_TYPE = row.SORT_TYPE
      console.log(row, 'rowrow')
      console.log(row, '点击获取表格一行数据')
      this.DigitalList.forEach((v) => {
        console.log(v, 'v,i')
        if (this.form.DIGITAL === v.LOOKUP_CODE) {
          this.form.DIGITAL_Caption = v.MEANING
        }
      })
    },
    digClick (i) {
      this.DigitalList.forEach((v) => {
        if (i === v.LOOKUP_CODE) {
          this.form.DIGITAL_Caption = v.MEANING
        }
      })
    },
    //
    // 清空
    eliminateClick () {
      this.form = {
        ID: 0,
        CUSTOMER_ID: '', // 客户
        PLATFORM_ID: '', // 产品系列
        PART_NO: '', // 成品料号
        MODEL_ID: '', // 模块
        FIX_HEADER: '', // 前导符
        FIX_TAIL: '', // 结束符
        RANGE_LENGTH: '', // 流水范围长度
        RANGE_START_CODE: '', // 流水范围开始字符
        DIGITAL: '', // 进制
        DIGITAL_Caption: '', // 进制说明
        EXCLUSIVE_CHAR: '', // 不包括字符
        SORT_TYPE: 1,
        ENABLED: 'Y' // 是否激活
      }
      this.disaB = true
      this.disaRdaio = false
      this.disaInp = true
      this.disC = true
      this.disaD = true
      this.verifyDate = {
        RangerRuleType: '',
        PLATFORM_ID: '',
        CUSTOMER_ID: '',
        PART_NO: ''
      }
      this.$refs.form.resetFields()
      this.getLoadData()
      this.getSfcsProductFamilyLoadData()
      this.getSmtWoLoadData()
      this.getSfcsCustomersLoadData()
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    //  保存
    async preserveClick () {
      this.form.WO_NO = this.verifyDate.WO_NO
      this.form.CUSTOMER_ID = this.verifyDate.CUSTOMER_ID
      this.form.PART_NO = this.verifyDate.PART_NO
      this.form.SALES_ORDER = this.verifyDate.SALES_ORDER
      this.form.PRODUCT_FAMILY_ID = this.verifyDate.PRODUCT_FAMILY_ID
      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          if (
            Number(this.form.RANGE_LENGTH) !==
            this.form.RANGE_START_CODE.toString().length
          ) {
            this.$message({
              showClose: true,
              message: this.$t('srrr._35'),
              type: 'warning'
            })
            return
          }
          if (this.form.FIX_HEADER === '' && this.form.FIX_TAIL === '') {
            this.$message({
              showClose: true,
              message: this.$t('srrr._39'),
              type: 'warning'
            })
            return
          }
          // if (this.form.FIX_HEADER) {
          //   this.form.FIX_HEADER = this.form.FIX_HEADER.toUpperCase()
          // }
          // if (this.form.FIX_TAIL) {
          //   this.form.FIX_TAIL = this.form.FIX_TAIL.toUpperCase()
          // }
          console.log(JSON.stringify(this.form))
          API.SaveData(this.form).then((response) => {
            if (response.Result) {
              this.$notify({
                title: this.$t('srrr._36'),
                message: this.$t('srrr._37'),
                type: 'success',
                duration: 2000
              })
              this.verifyDate.PRODUCT_FAMILY_ID = ''
              this.verifyDate.CUSTOMER_ID = ''
              this.verifyDate.RangerRuleType = ''
              this.verifyDate.PART_NO = ''
              this.verifyDate.SALES_ORDER = ''
              // this.$refs.verifyDate.resetFields()
              this.$refs.form.resetFields()
              this.form.ENABLED = 'Y'
              // this.eliminateClick()
              this.getLoadData()
            }
          })
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsRuncardRangerRules {
  .form-title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }

  .SfcsRuncardRangerRules-table {
    height: calc(100vh - 484px);
  }
}
</style>
<style>
.verify {
  width: 100%;
  text-align: center;
  border: 1px solid #666;
  padding: 25px 10px;
}
.verify .el-icon-edit-outline {
  font-size: 60px;
  color: #ccc;
}
.SfcsRuncardRangerRules .el-tabs__header {
  margin: 0;
}
.SfcsRuncardRangerRules .radio .el-radio__label {
  display: none;
}
.SfcsRuncardRangerRules .SfcsRuncardRangerRules-pagination {
  border: 1px solid #e6ebf5;
}
</style>
