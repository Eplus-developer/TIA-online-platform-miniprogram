// pages/recruitDetail/recruitDetail.js
import util from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showApply: false,
    showAppliers: false,

    recruit: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.setData({
      showApply: !!options.showApply,
      showAppliers: !!options.showAppliers
    })
    try {
      let res = await util.request(`/recruit/${wx.getStorageSync('recruitId')}`, 'GET')
      this.setData({
        recruit: res
      })
    } catch (e) {
      wx.showModal({
        title: '招聘获取失败',
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

  applyRecruit: function() {
    wx.request({
      url: getApp().globalData.baseURL + '/user/myself',
      method: 'GET',
      header: {
        ...getApp().globalData.globalHeaders,
        'content-type': 'application/json',
        openid: wx.getStorageSync('openid')
      },
      success: function(res) {
        wx.request({
          url:
            getApp().globalData.baseURL +
            '/recruit/' +
            wx.getStorageSync('recruitId') +
            '/appliedUser/' +
            res.data.data,
          method: 'PUT',
          header: {
            ...getApp().globalData.globalHeaders,
            'content-type': 'application/json',
            openid: wx.getStorageSync('openid')
          },
          success: function(res) {
            wx.showToast({
              title: '应聘成功！',
              icon: 'success'
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/recruit/recruit'
              })
            }, 1000)
          },
          fail: function(res) {
            wx.showToast({
              title: '应聘失败！',
              icon: 'loading'
            })
          }
        })
      },
      fail: function(res) {
        console.log('get selfId fail!')
      }
    })
  }
})
