// miniprogram/pages/appliers/appliers.js
import util from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [],
    hasUser: 0,
    recruitId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    try {
      let res = await util.request(`/recruit/${options.recruitId}/applyUser`, 'GET')
      console.log(res)
      this.setData({
        users: res,
        hasUser: res.length,
        recruitId: parseInt(options.recruitId)
      })
    } catch (e) {
      wx.showModal({
        title: '获取失败',
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

  async pass(e) {
    wx.showModal({
      title: '是否通过？',
      success: async res => {
        if (res.cancel) return
        console.log(e.currentTarget.dataset.id)
        try {
          await util.request(`/recruit/${this.data.recruitId}/user/${e.currentTarget.dataset.id}`, 'PUT')
          wx.showToast({
            title: '通过成功',
            icon: 'success'
          })
          let i = -1
          this.data.users.forEach((item, idx) => {
            if (item.userId === e.currentTarget.dataset.id) i = idx
          })
          if (i === -1) throw '数据错误'
          let tmp = this.data.users
          tmp.splice(i, 1)
          console.log(tmp)
          this.setData({
            users: tmp
          })
        } catch (e) {
          wx.showModal({
            title: '操作失败',
            showCancel: false
          })
          console.log(e)
        }
      }
    })
  },

  userDetail(e) {

  }
})
