// components/w-tab-view/w-tab-view.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: Array
  },

  lifetimes: {
    ready() {
      this.slide()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 0,
    left: 0,
    active: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap: function(e) {
      this.setData({
        active: e.target.dataset.idx
      })
      this.slide()
    },
    slide: function() {
      this.createSelectorQuery()
        .selectAll('.header')
        .boundingClientRect(res => {
          let w = res[0].width / (2 * this.data.tabs.length)
          this.setData({
            width: w,
            left: w * 2 * this.data.active + w / 2
          })
        })
        .exec()
    }
  }
})
