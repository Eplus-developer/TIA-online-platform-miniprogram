// miniprogram/pages/myCourse/myCourse.js
import util from '../../utils/util'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    created: [],
    booked: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    try {
      let userId = await util.request('/user/myself', 'GET')
      let created = await util.request(`/user/${userId}/createdCourse`)
      let booked = await util.request(`/course/joinedCourse`, 'GET', {
        userId: userId
      })
      console.log(created)
      console.log(booked)
      this.setData({
        created: created,
        booked: booked
      })
    } catch (e) {
      wx.showModal({
        title: '课程获取出错',
        showCancel: false
      })
      console.log(e)
    }
  },

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

  toAppliers(e) {
    wx.navigateTo({
      url: `/pages/subscribers/subscribers?courseId=${e.currentTarget.dataset.courseId}`
    })
  }
})
