<template>
  <div class="jz-bar-root"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
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
  data () {
    return {
      options: {
        title: {
          text: 'Site Statistic',
          left: 'center',
          top: 0
        },
        color: ['#fff500', '#ff0000', '#09ff00', '#bc35d8'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Pass', 'Fail', 'Repass', 'Refail'],
          right: '10%'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Pass',
            type: 'bar',
            barGap: 0,
            data: [0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Fail',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Repass',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Refail',
            type: 'bar',
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      },
      bar: null,
      enum: {
        PASS: 0,
        FAIL: 1,
        REPASS: 2,
        REFAIL: 3
      }
    }
  },
  watch: {
    width (val) {
      this.bar.resize({
        width: val,
        height: this.height
      })
    },
    height (val) {
      this.bar.resize({
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
        this.bar.setOption(val)
      }
    }
  },
  computed: {

  },
  methods: {
    changeData () {
      this.options.xAxis[0].data = []
      this.options.series[this.enum.PASS].data = []
      this.options.series[this.enum.FAIL].data = []
      this.options.series[this.enum.REPASS].data = []
      this.options.series[this.enum.REFAIL].data = []
      this.value.map((item, index) => {
        this.options.xAxis[0].data.push(item.OPERATION_NAME)
        this.options.series[this.enum.PASS].data.push(item.PASS || 0)
        this.options.series[this.enum.FAIL].data.push(item.FAIL || 0)
        this.options.series[this.enum.REPASS].data.push(item.REPASS || 0)
        this.options.series[this.enum.REFAIL].data.push(item.REFAIL || 0)
      })
    }
  },
  mounted () {
    this.bar = echarts.init(this.$el, 'light') // 初始化echarts, theme为light
    this.changeData()
  }
}
</script>

<style lang="scss" scoped>
.jz-bar-root {
  width: 100%;
  height: 100%;
}
</style>
