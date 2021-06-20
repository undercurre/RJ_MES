export default {
  methods: {
    onChangeLocale (command) {
      this.$i18n.locale = command
      let message = `${this.$t('localePage._1')}${this.$t('_name')} [ ${this.$i18n.locale} ]`
      if (process.env.VUE_APP_BUILD_MODE === 'PREVIEW') {
        message = [
          `${this.$t('localePage._1')}${this.$t('_name')} [ ${this.$i18n.locale} ]`
        ].join('<br/>')
      }
      this.$notify({
        title: this.$t('localePage._2'),
        dangerouslyUseHTMLString: true,
        message
      })
    }
  }
}
