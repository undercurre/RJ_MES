export default {
  namespaced: true,
  state: {
    mstId: 0,
    AIflag: false,
    Txtflag: false,
    machineList: {},
    RIflag: false,
    SimensFlag: false,
    TxtflagV2: false
  },
  mutations: {
    SET_MST_ID: (state, id) => {
      state.mstId = id
    },
    SET_AI_FLAG: (state, value) => {
      state.Txtflag = false
      state.RIflag = false
      state.SimensFlag = false
      state.TxtflagV2 = false
      state.AIflag = value
    },
    SET_TXT_FLAG: (state, value) => {
      state.AIflag = false
      state.RIflag = false
      state.SimensFlag = false
      state.TxtflagV2 = false
      state.Txtflag = value
    },
    SET_TXT_V2_FLAG: (state, value) => {
      state.AIflag = false
      state.RIflag = false
      state.SimensFlag = false
      state.Txtflag = false
      state.TxtflagV2 = value
    },
    SET_MACHINELIST: (state, value) => {
      state.machineList = value
    },
    SET_RI_FLAG: (state, value) => {
      state.AIflag = false
      state.Txtflag = false
      state.SimensFlag = false
      state.TxtflagV2 = false
      state.RIflag = value
    },
    SET_SIMENS_FLAG: (state, value) => {
      state.AIflag = false
      state.Txtflag = false
      state.RIflag = false
      state.TxtflagV2 = false
      state.SimensFlag = value
    }
  }
}
