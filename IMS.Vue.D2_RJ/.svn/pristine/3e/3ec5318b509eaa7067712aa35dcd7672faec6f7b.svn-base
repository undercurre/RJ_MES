<template>
  <div class="jz-pie-root"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    title: {
      type: String,
      default: 'Pass'
    },
    value: {
      required: true
    },
    width: {
      required: true
    },
    height: {
      required: true
    }
  },
  watch: {
    width (val) {
      this.pie.resize({
        width: val,
        height: this.height
      })
    },
    height (val) {
      this.pie.resize({
        width: this.width,
        height: val
      })
    },
    value (val) {
      this.changeData()
    },
    options: {
      deep: true,
      handler (val) {
        this.pie.setOption(val)
      }
    }
  },
  data () {
    return {
      options: {
        title: {
          text: 'Site Statistic',
          subtext: `${this.title}比例`,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 20,
          data: []
        },
        series: [
          {
            name: '数据项目',
            type: 'pie',
            radius: '60%',
            data: [
              { value: 0, name: '前外观检查工序' },
              { value: 0, name: 'ICT测试工序' },
              { value: 0, name: '后外观检查' },
              { value: 0, name: 'FCT测试工序' },
              { value: 0, name: '二次功能测试' },
              { value: 0, name: '包装工序' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      pie: null
    }
  },
  methods: {
    changeData () {
      this.options.legend.data = []
      this.options.series.data = []
      this.value.map((item, index) => {
        const name = item.OPERATION_NAME
        const value = item[this.title] || 0
        this.options.legend.data.push(item.OPERATION_NAME)
        this.options.series.data.push({
          name, value
        })
      })
    }
  },
  mounted () {
    this.pie = echarts.init(this.$el, 'light') // 初始化echarts, theme为light
    this.changeData()
  }
}
</script>

<style lang="scss" scoped>
.jz-pie-root {
  width: 100%;
  height: 100%;
}
</style>
