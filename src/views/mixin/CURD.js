export default function ({
  defaultSaveAPI = () => new Promise(),
  defaultCheckIsUsedAPI = () => new Promise(),
  isNeedDeleteCheck = false,
  primaryKey = 'ID',
  defaultGetListMethod = 'getLoadData',
  defaultRefs = 'xTable'
}) {
  return {
    data () {
      return {
        mainTable: [],
        loading: false,
        form: {}
      }
    },
    methods: {
      async removeClick (row, deleteParams = {}) {
        if (row && await this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).catch(_ => {
          /** 取消 */
        })) {
          if (isNeedDeleteCheck) {
            const res = await defaultCheckIsUsedAPI(deleteParams)
            if (res.Result === void (0) || res.Result === true) {
              if (res.Result === true) {
                this.$message({
                  message: this.$t('publics.tips.isInUsed'),
                  type: 'error'
                })
              }
              return false
            }
          }
          this.$refs[defaultRefs].remove(row)
          if (await this.preserveClick(true, row[primaryKey])) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._19'),
              type: 'success',
              duration: 2000
            })
          }
        }
      },
      async preserveClick (isDelete = false, isNeedLoadData = true) {
        let postdata = this.$refs[defaultRefs].getRecordset()
        if (
          postdata.insertRecords.length ||
          postdata.removeRecords.length ||
          postdata.updateRecords.length
        ) {
          if (!isDelete && !await new Promise((resolve) => {
            this.$refs[defaultRefs].validate(valid => {
              if (!valid) resolve(false)
              this.form.insertRecords = postdata.insertRecords
              this.form.updateRecords = postdata.updateRecords
              resolve(true)
            })
          })) {
            return false
          }
          this.form.removeRecords = postdata.removeRecords
          const response = await defaultSaveAPI(this.form)
          if (response.Result) {
            this.form = {}
            if (isNeedLoadData) {
              this[defaultGetListMethod]()
            }
            if (!isDelete) {
              this.$notify({
                title: this.$t('ssc._12'),
                message: this.$t('ssc._13'),
                type: 'success',
                duration: 2000
              })
            }
            return true
          } else {
            if (isNeedLoadData) this[defaultGetListMethod]()
          }
        } else {
          this.$message({
            showClose: true,
            message: this.$t('ssc._14'),
            type: 'warning'
          })
        }
      }
    }
  }
}
