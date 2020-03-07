// miniprogram/pages/subscribers/subscribers.js
import util from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    members: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    try {
      let members = await util.request(`/course/${options.courseId}/members`)
      console.log(members)
      this.setData({
        members: members
      })
    } catch (e) {
      wx.showModal({
        title: '获取成员失败',
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

  userDetail(e) {
    wx.navigateTo({
      url: `/pages/selfInfo/selfInfo?userId=${e.currentTarget.dataset.userId}`
    })
  }
})
