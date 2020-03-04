// pages/myFocus/myFocus.js
import util from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sliderWidth: 96,
    tabs: ['同学', '比赛', '招聘'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hasFocusPerson: 0,
    hasFocusMatch: 1,
    hasFocusRecruit: 1,
    focusPerson: [
      {
        id: 1,
        name: '三眼皮猴子',
        url: 'https://workflow-1258575893.cos.ap-shanghai.myqcloud.com/a3.jpg',
        motto: '好好睡觉'
      }
    ],

    focusRecruits: [
      {
        id: 1,
        img: 'https://workflow-1258575893.cos.ap-shanghai.myqcloud.com/a1.jpg',
        creator: 'Knight',
        name: '本小队需要JAVA后端若干名',
        match: '第16届“大夏杯”大学生创业大赛',
        now: 1,
        total: 3,
        focus: 1
      }
    ],

    focusMatches: [
      {
        id: 1,
        img: 'https://workflow-1258575893.cos.ap-shanghai.myqcloud.com/m1.jpg',
        title: '第16届“大夏杯”大学生创业大赛',
        level: '校级',
        time: '2019年4月28日'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        var sliderWidth_new = res.windowWidth / (2 * that.data.tabs.length)
        that.setData({
          sliderWidth: sliderWidth_new,
          sliderLeft:
            (res.windowWidth / that.data.tabs.length - sliderWidth_new) / 2,
          sliderOffset:
            (res.windowWidth / that.data.tabs.length) * that.data.activeIndex
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.refresh()
  },

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

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  },

  matchClick: function(e) {
    // console.log(e.currentTarget.id);
    wx.setStorageSync('matchId', e.currentTarget.id)
  },

  toOthersInfo: function(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/selfInfo/selfInfo?userId=${e.currentTarget.dataset.userId}`
    })
  },

  toDetail: function(e) {
    wx.setStorageSync('recruitId', e.currentTarget.id)
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/recruitDetail/recruitDetail'
      })
    }, 500)
  },

  changeFocus: async function(e) {
    var that = this
    wx.request({
      url:
        getApp().globalData.baseURL +
        '/user/recruit/' +
        e.currentTarget.dataset.id.recruitId,
      method: 'delete',
      header: {
        ...getApp().globalData.globalHeaders,
        'content-type': 'application/json',
        openid: wx.getStorageSync('openid')
      },
      success: function(res) {
        wx.showToast({
          title: '取消收藏',
          icon: 'success'
        })
        that.onLoad()
      },
      fail: function(res) {
        wx.showToast({
          title: '操作失败',
          icon: 'success'
        })
      }
    })
    this.refresh()
  },

  async refresh() {
    try {
      let code = await util.request('/user/myself', 'GET')
      let res = await util.request(`/user/${code}/followingUser`, 'GET')
      console.log(res)
      let res2 = await util.request(`/user/${code}/followedActivity`, 'GET')
      console.log(res2)
      for (let item of res2) {
        item.activitySignUpDeadline = util.formatTime(
          new Date(item.activitySignUpDeadline)
        )
        item.activityTime = util.formatTime(new Date(item.activityTime))
      }
      let res3 = await util.request(`/user/${code}/followedRecruit`, 'GET')
      console.log(res3)
      this.setData({
        focusPerson: res,
        hasFocusPerson: res.length,
        focusMatches: res2,
        hasFocusMatch: res2.length,
        focusRecruits: res3,
        hasFocusRecruit: res3.length
      })
    } catch (e) {
      console.log('获取失败')
    }
  }
})
