// pages/recruit/recruit.js
import util from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        id: 1,
        img: 'https://workflow-1258575893.cos.ap-shanghai.myqcloud.com/a1.jpg',
        creator: 'Knight',
        name: '本小队需要JAVA后端若干名',
        match: '第16届“大夏杯”大学生创业大赛',
        now: 1,
        total: 3,
        focus: 0
      }
    ],
    time: util.formatDateTime(new Date()),
    // not referenced from recruit.wxml
    offset: 0,
    // whether there are some recruitment in the page
    hasRecruit: 0,
    recruitName: '',
    createButtonExpand: false,
    filterHide: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      createButtonExpand: false
    })
    this.refreshRecruit()
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
  onPullDownRefresh: function() {
    this.refreshRecruit()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    console.log(
      'reach bottom! Time: ' + this.data.time + '. offset: ' + this.data.offset
    )
    let url =
      '/recruit/all?currentTime=' +
      this.data.time +
      '&pageNum=' +
      this.data.offset
    if (this.data.recruitName !== '')
      url += `&recruitName=${this.data.recruitName}`
    let res = await util.request(url, 'GET')
    if (res.length === 0) return
    this.setData({
      list: this.data.list.concat(res),
      offset: this.data.offset + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  toDetail: function(e) {
    wx.setStorageSync('recruitId', e.currentTarget.id)
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/recruitDetail/recruitDetail'
      })
    }, 500)
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
    this.refreshRecruit()
  },

  toOthersInfo: function(e) {
    wx.setStorageSync('userId', e.currentTarget.dataset.id)
    console.log(wx.getStorageSync('userId'))
    wx.navigateTo({
      url: '/pages/othersInfo/othersInfo'
    })
  },

  // deleteRecruit: function(e) {
  //   let that = this;
  //   wx.showModal({
  //     title: '是否确认删除？',
  //     showCancel: true,
  //     cancelText: '取消',
  //     success: function(res) {
  //       if (!res.confirm) return;
  //       wx.request({
  //         url: getApp().globalData.baseURL + '/recruit/' + e.currentTarget.dataset.id.recruitId,
  //         method: 'delete',
  //         header: {
  //           ...(getApp().globalData.globalHeaders),
  //           'content-type': 'application/json',
  //           'openid': wx.getStorageSync('openid')
  //         },
  //         success: function(res) {
  //           if (res.data.code == 200) {
  //             wx.showToast({
  //               title: '删除成功！',
  //               icon: 'success'
  //             })
  //             that.refreshRecruit();
  //           }
  //         },
  //         fail: function(res) {
  //           wx.showToast({
  //             title: '操作失败！',
  //             icon: 'success'
  //           })
  //         }
  //       })
  //     },
  //     fail: function(res) {
  //       wx.showToast({
  //         title: '操作失败！',
  //         icon: 'success'
  //       })
  //     }
  //   })
  // },

  getRecruitName: function(e) {
    console.log(e.detail.value)
    this.setData({
      recruitName: e.detail.value
    })
  },

  screen: async function(e) {
    try {
      let res = await util.request(
        '/recruit/all?recruitName=' +
          this.data.recruitName +
          '&currentTime=' +
          util.formatDateTime(new Date()) +
          '&pageNum=0',
        'GET'
      )
      if (res.length !== 0)
        this.setData({
          offset: 1,
          hasRecruit: 1
        })
    } catch (e) {
      wx.showToast({
        title: '搜索失败'
      })
    }
  },

  toggleFilter: function() {
    this.setData({
      filterHide: !this.data.filterHide
    })
  },

  createRecruit: async function(e) {
    // 判断是否已经有团队
    let res = await util.request('/team/joinedTeam', 'GET')
    if (res.length === 0)
      wx.navigateTo({
        url: '/pages/createTeam/createTeam'
      })
    else
      wx.navigateTo({
        url: '/pages/createRecruit/createRecruit'
      })
  },

  expand: function() {
    this.setData({
      createButtonExpand: !this.data.createButtonExpand
    })
  },

  refreshRecruit: async function() {
    let nowTime = util.formatDateTime(new Date())
    try {
      let res = await util.request(
        '/recruit/all?currentTime=' + nowTime + '&pageNum=0',
        'GET'
      )
      console.log(res)
      this.setData({
        list: res
      })
      if (res.length !== 0)
        this.setData({
          offset: 1,
          hasRecruit: 1
        })
    } catch (e) {
      console.log(e)
    }
  }
})
