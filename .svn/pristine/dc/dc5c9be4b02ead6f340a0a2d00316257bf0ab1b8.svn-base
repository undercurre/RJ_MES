export default {
  data () {
    return {
      formData: {
        Key: '',
        Page: 1,
        Limit: 15
      },
      totalPage: 0
    }
  },
  methods: {
    foPage () {
      return this.getLoadData ? this.getLoadData : function () {}
    },
    handleSizeChange (Limit) {
      if (!this.formData) {
        this.formData = {}
      }
      this.formData.Limit = Limit
      this.formData.Page = 1
      this.foPage()()
    },
    handleCurrentChange (Page) {
      if (!this.formData) {
        this.formData = {}
      }
      this.formData.Page = Page
      this.foPage()()
    }
  }
}
