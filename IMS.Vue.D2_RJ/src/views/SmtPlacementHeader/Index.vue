<template>
  <div>
    <transition name="el-fade-in-linear">
      <list v-if="!mstId && !AIflag && !Txtflag && !RIflag && !SimensFlag && !TxtflagV2" />
      <modify v-if="mstId && !AIflag && !Txtflag && !RIflag && !SimensFlag && !TxtflagV2" />
      <AIupload v-if="AIflag && !mstId" />
      <TxtUpload v-if="Txtflag && !mstId" />
      <TxtUploadV2 v-if="TxtflagV2 && !mstId" />
      <RIupload v-if="RIflag && !mstId" />
      <SimensUpload v-if="SimensFlag && !mstId"/>
    </transition>
  </div>
</template>
<script>
import List from './components/List.vue'
import Modify from './components/Modify.vue'
import AIupload from './components/AIupload.vue'
import TxtUpload from './components/TxtUpload.vue'
import RIupload from './components/RIupload.vue'
import SimensUpload from './components/SimensUpload'
import TxtUploadV2 from './components/TxtUploadV2'
import { mapState } from 'vuex'
export default {
  name: 'SmtPlacementHeader',
  components: {
    List,
    Modify,
    AIupload,
    TxtUpload,
    RIupload,
    SimensUpload,
    TxtUploadV2
  },
  computed: {
    ...mapState({
      mstId: state => state.custom.materials.mstId,
      AIflag: state => state.custom.materials.AIflag,
      Txtflag: state => state.custom.materials.Txtflag,
      RIflag: state => state.custom.materials.RIflag,
      SimensFlag: state => state.custom.materials.SimensFlag,
      TxtflagV2: state => state.custom.materials.TxtflagV2
    })
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
