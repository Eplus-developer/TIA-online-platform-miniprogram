// pages/selfInfo/selfInfo.js
import util from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    editable: false,
    info: [],
    followingUserNum: 0,
    followedUserNum: 0,
    collegeArr: ['计算机学院', '软件工程学院', '数据学院', '其他'],
    gradeArr: [
      '本16级',
      '本17级',
      '本18级',
      '本19级',
      '本20级',
      '本21级',
      '研17级',
      '研18级',
      '研19级',
      '研20级',
      '研21级'
    ],
    genderArr: ['男', '女', '未知']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.setData({
      editable: !!options.editable
    })
    try {
      let code = await util.request('/user/myself', 'GET')
      if (options.userId) code = parseInt(options.userId)
      let f = await util.request(`/user/${code}/followingUser`, 'GET')
      let n = await util.request(`/user/${code}/followedUser`, 'GET')
      let info = await util.request(`/user/${code}/detailPage`, 'GET')
      this.setData({
        followingUserNum: f.length,
        followedUserNum: n.length,
        info: info
      })
    } catch (e) {
      console.log('获取失败')
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
  onShareAppMessage: function() {}
})
