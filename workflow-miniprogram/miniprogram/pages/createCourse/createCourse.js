// miniprogram/pages/createCourse/createCourse.js
import util from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    courseDate: '2020-01-31',
    courseTime: '20:00',
    expirationDate: '2020-01-31',
    expirationTime: '20:00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  async submit(e) {
    try {
      let f = e.detail.value
      let res = await util.request('/activity', 'POST', {
        name: f.courseName,
        description: f.description,
        activityType: 'course',
        actTime: f.courseDate + ' ' + f.courseTime,
        endTime: f.expirationDate + ' ' + f.expirationTime,
        location: f.location,
        phone: f.phone,
        quantityType: false
      })

      console.log(res)
      wx.showToast({
        title: '创建成功',
        icon: 'success'
      })
      wx.switchTab({
        url: '/pages/recruit/recruit'
      })
    } catch (e) {
      wx.showModal({
        title: '创建失败',
        showCancel: false
      })
      console.log(e)
    }
  },

  courseDateChange(e) {
    this.setData({
      courseDate: e.detail.value
    })
  },

  courseTimeChange(e) {
    this.setData({
      courseTime: e.detail.value
    })
  },

  expirationDateChange(e) {
    this.setData({
      expirationDate: e.detail.value
    })
  },

  expirationTimeChange(e) {
    this.setData({
      expirationTime: e.detail.value
    })
  }
})
