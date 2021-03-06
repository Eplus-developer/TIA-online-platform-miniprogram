// miniprogram/pages/createCourse/createCourse.js
import util from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities: [],
    activityIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    try {
      let activities = await util.request('/activity/all?type=fresh', 'GET')
      activities = activities.filter(e => e.activityType === 'course')
      console.log(activities)
      this.setData({
        activities: activities
      })
      if (options.activityId) {
        activities.forEach((e, index) => {
          if (e.id === parseInt(options.activityId)) {
            this.setData({
              activityIndex: index
            })
          }
        })
      }
    } catch (e) {
      wx.showModal({
        title: '活动获取失败',
        showCancel: false
      })
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  activityChange(e) {
    this.setData({
      activityIndex: e.detail.value
    })
  },

  async submit(e) {
    try {
      let res = await util.request(
        `/course/${this.data.activities[this.data.activityIndex].id}`,
        'POST',
        {
          name: e.detail.value.courseName,
          id: '1'
        }
      )
      console.log(res)
      wx.showToast({
        title: '创建成功',
        icon: 'success'
      })
      wx.navigateBack()
    } catch (e) {
      wx.showModal({
        title: '创建课程失败',
        showCancel: false
      })
      console.log(e)
    }
  }
})
