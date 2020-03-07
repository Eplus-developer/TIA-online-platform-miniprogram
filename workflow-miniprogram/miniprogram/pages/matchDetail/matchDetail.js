// pages/matchDetail/matchDetail.js
import util from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    match: {
      url: 'https://workflow-1258575893.cos.ap-shanghai.myqcloud.com/m1.jpg',
      title: '第16届“大夏杯”大学生创业大赛',
      place: '华东师范大学中山北路校区',
      endTime: '2019年4月28日',
      matchTime: '2019年9月15日',
      summary:
        '这是一个比较长的简介这是一个比较长的简介这是一个比较长的简介这是一个比较长的简介这是一个比较长的简介这是一个比较长的简介',
      followed: false
    },
    isCourse: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.setData({
      id: options.id,
      isCourse: !!options.course
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

  changeFocus: async function(e) {
    let method = this.data.match.followed === true ? 'DELETE' : 'PUT'
    let title = this.data.match.followed === true ? '取消收藏' : '收藏成功'
    try {
      await util.request('/user/activity/' + this.data.id, method)
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

  createRecruit: async function() {
    if (this.data.isCourse) {
      // try {
      //   let res = await util.request(`/activity/${this.data.id}/enroll`, 'PUT')
      //   console.log(res)
      //   wx.showToast({
      //     title: '报名成功',
      //     icon: 'success'
      //   })
      //   wx.navigateBack()
      // } catch (e) {
      //   wx.showModal({
      //     title: '报名失败',
      //     showCancel: false
      //   })
      //   console.log(e)
      // }
      wx.navigateTo({
        url: `/pages/createCourse/createCourse?activityId=${this.data.id}`
      })
    } else {
      try {
        // 判断是否已经有团队
        let teams = await util.request('/team/joinedTeam', 'GET')
        if (teams.length === 0) {
          wx.navigateTo({
            url: '/pages/createTeam/createTeam'
          })
        } else {
          wx.navigateTo({
            url: '/pages/createRecruit/createRecruit'
          })
        }
      } catch (e) {
        wx.showModal({
          title: '创建失败',
          showCancel: false
        })
        console.log(e)
      }
    }
  },

  async refresh() {
    try {
      let res = await util.request(`/activity/${this.data.id}`, 'GET')
      console.log(res)
      res.activitySignUpDeadline = util.formatTime(
        new Date(res.activitySignUpDeadline)
      )
      res.activityTime = util.formatTime(new Date(res.activityTime))
      this.setData({
        match: res
      })
    } catch (e) {
      console.log('获取失败')
    }
  }
})
