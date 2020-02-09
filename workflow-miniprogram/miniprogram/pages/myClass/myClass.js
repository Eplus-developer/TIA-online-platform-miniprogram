// miniprogram/pages/myClass/myClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我开设的课程", "我报名的课程"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hasReservedClass: 0,
    hasPostedClass: 0,
    sliderWidth: 96,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var sliderWidth_new = res.windowWidth / (2 * that.data.tabs.length)
        that.setData({
          sliderWidth: sliderWidth_new,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth_new) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
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

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
})