
console.log('andon')
function updateMsgArea (msg, type) {
  var msgArr = ''
  if (type === 'call') {
    msgArr = '<p>' + this.$t('crp.tb_5') + '：' + msg.CREATE_TIME + '<br/>' + this.$t('SOPRoutes._183') + '：' + msg.OPERATOR + this.$t('SOPRoutes._186') + '<br/>' + this.$t('SOPRoutes._184') + '：' + msg.CALL_CONTENT + '</p>'
  } else if (type === 'check') {
    msgArr = '<p>' + this.$t('crp.tb_13') + '：' + msg.CHECKIN_TIME + '<br/>' + this.$t('SOPRoutes._184') + '：' + msg.CALL_CONTENT + '<br/>' + this.$t('SOPRoutes._185') + '</p>'
  }
  this.msgArea = msgArr
}
window.updateMsgArea = updateMsgArea // 开放接口
