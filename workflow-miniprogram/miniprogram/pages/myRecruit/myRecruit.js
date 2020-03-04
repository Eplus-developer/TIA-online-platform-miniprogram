// pages/myRecruit/myRecruit.js
import util from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['我的申请', '我发布的'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    hasOthersApply: 0,
    hasApply: 0,
    othersApplyList: [],
    applyList: [],
    sliderWidth: 96,
    recruitmentList: [],
    hasRecruitment: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    wx.getSystemInfo({
      success: res => {
        let sliderWidth_new = res.windowWidth / (2 * this.data.tabs.length)
        this.setData({
          sliderWidth: sliderWidth_new,
          sliderLeft:
            (res.windowWidth / this.data.tabs.length - sliderWidth_new) / 2,
          sliderOffset:
            (res.windowWidth / this.data.tabs.length) * this.data.activeIndex
        })
      }
    })

    this.refresh()
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

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  },

  toDetail: function(e) {
    wx.setStorageSync('recruitId', e.currentTarget.id)
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/recruitDetail/recruitDetail?showAppliers'
      })
    }, 500)
  },

  toOthersInfo: function(e) {
    wx.navigateTo({
      url: `/pages/selfInfo/selfInfo?userId=${e.currentTarget.dataset.id}`
    })
  },

  acceptApply: async function(e) {
    try {
      await util.request(
        '/recruit/' +
          e.currentTarget.dataset.recruitId +
          '/user/' +
          e.currentTarget.dataset.userId,
        'PUT'
      )
      wx.showToast({
        title: '已同意',
        icon: 'success'
      })
      this.onLoad()
    } catch (e) {
      wx.showModal({
        title: '失败',
        showCancel: false
      })
    }
  },

  changeFocus: async function(e) {
    let method = e.currentTarget.dataset.id.followed === true ? 'DELETE' : 'PUT'
    let title =
      e.currentTarget.dataset.id.followed === true ? '取消收藏' : '收藏成功'
    try {
      await util.request(
        '/user/recruit/' + e.currentTarget.dataset.id.recruitId,
        method
      )
      wx.showToast({
        title: title,
        icon: 'success'
      })
    } catch (e) {
      wx.showToast({
        title: '操作失败',
        icon: 'success'
      })
    }
    this.refresh()
  },

  cancelAppliedRecruit: async function(e) {
    wx.showModal({
      title: '是否取消申请？',
      showCancel: true,
      cancelText: '取消',
      success: async res => {
        if (!res.confirm) return
        try {
          let code = await util.request('/user/myself', 'GET')
          await util.request(
            `/recruit/${e.currentTarget.dataset.recruitId}/appliedUser/${code}`,
            'DELETE'
          )
          wx.showToast({
            title: '成功取消',
            icon: 'success'
          })
        } catch (e) {
          wx.showModal({
            title: '取消失败',
            showCancel: false
          })
          console.log(e)
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '操作失败！',
          icon: 'loading'
        })
      }
    })
  },

  async refresh() {
    // 我的申请
    try {
      let recruitment = await util.request('/recruit/appliedRecruit', 'GET')
      console.log(recruitment)
      this.setData({
        applyList: recruitment,
        hasApply: recruitment.length
      })
    } catch (e) {
      console.log('获取失败')
    }

    // 待处理的提交的申请
    // 此页面不再展示等处理的申请
    // try {
    //   let application = await util.request('/recruit/myAppliedUsers', 'GET')
    //   console.log(application)
    //   this.setData({
    //     othersApplyList: application,
    //     hasOthersApply: application.length
    //   })
    // } catch (e) {
    //   console.log('获取失败')
    // }

    try {
      let recruitmentList = await util.request('/recruit/all/publish', 'GET')
      this.setData({
        recruitmentList: recruitmentList,
        hasRecruitment: recruitmentList.length
      })
    } catch (e) {
      wx.showModal({
        title: '获取失败',
        showCancel: false
      })
      console.log(e)
    }
  }
})
