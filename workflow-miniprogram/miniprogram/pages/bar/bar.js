import * as echarts from '../../ec-canvas/echarts'

const app = getApp()

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  })
  canvas.setChart(chart)

  var option = {
    backgroundColor: '#ffffff',
    color: ['#4a69bd'],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#4a69bd'
        }
      },
      indicator: [
        {
          name: '前端',
          max: 10
        },
        {
          name: '沟通',
          max: 10
        },
        {
          name: '后端',
          max: 10
        },
        {
          name: '项目经验',
          max: 10
        },
        {
          name: '移动端',
          max: 10
        },
        {
          name: '算法',
          max: 10
        },
        {
          name: '数据',
          max: 10
        }
      ]
    },
    series: [
      {
        name: '具体数值',
        type: 'radar',
        data: [
          {
            value: [6, 8, 7, 9, 5, 6, 10],
            name: '数值'
          }
        ]
      }
    ]
  }

  chart.setOption(option)
  return chart
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
})
