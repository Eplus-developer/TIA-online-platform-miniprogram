// pages/createRecruit/createRecruit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionArr:['请选择', '前端', 'JAVA', 'C#', 'python', '美工', 'C/C++', '其他'],
    matches:['比赛1','比赛2','比赛3'],
    teams: [{teamName:'请选择'}],
    posIndex: 0,
    matchIndex: 0,
    teamIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取比赛
    wx.request({
      url: getApp().globalData.baseURL + '/activity/all/competition?type=fresh',
      method: 'GET',
      header: {
      ...(getApp().globalData.globalHeaders),
      'content-type': 'application/json',
        'openid': wx.getStorageSync('openid')
      },
      success: function (res) {
        that.setData({
          matches: res.data.data
        })
        console.log(that.data.matches);
      },
      fail: function (res) {
        console.log("fail!");
      }
    });

    //获取团队
    wx.request({
      url : getApp().globalData.baseURL + '/team/joinedTeam',
      method: 'GET',
      header: {
      ...(getApp().globalData.globalHeaders),
      'content-type': 'application/json',
        'openid': wx.getStorageSync('openid')
      },
      success: function (res) {
        that.setData({
          teams: that.data.teams.concat(res.data.data)
        })
        console.log(that.data.teams);
      },
      fail: function (res) {
        console.log("fail!");
      }
    })
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

  positionChange: function(e){
    this.setData({
      posIndex: e.detail.value
    })
  },

  matchChange: function(e){
    this.setData({
      matchIndex: e.detail.value
    })
  },

  teamChange: function(e) {
    this.setData({
      teamIndex: e.detail.value
    })
  },

  formSubmit: function(e){
    console.log(e.detail.value);
    if(e.detail.value.name==""||e.detail.value.position==0||e.detail.value.team==0||e.detail.value.personNum==""||e.detail.value.intro==""){
      wx.showModal({
        title: '请补充完整招聘信息',
        showCancel: false
      })
    }else{
      var that = this;
      wx.request({
        url : getApp().globalData.baseURL + '/user/myself',
        method: 'GET',
        header: {
      ...(getApp().globalData.globalHeaders),
      'content-type': 'application/json',
          'openid': wx.getStorageSync('openid')
        },
        success: function (res) {
          wx.request({
            url: getApp().globalData.baseURL + '/recruit/' + that.data.matches[e.detail.value.match].id + '?' + 'teamId=' + that.data.teams[e.detail.value.team].teamId,
            method: 'POST',
            data: {
              "recruitName": e.detail.value.name,
              "recruitPosition": that.data.positionArr[e.detail.value.position],
              "recruitDescription": e.detail.value.intro,
              "recruitWillingNumber": e.detail.value.personNum,
            },
            header: {
      ...(getApp().globalData.globalHeaders),
      'content-type': 'application/json',
              'openid': wx.getStorageSync('openid')
            },
            success: function (res2) {
              wx.showToast({
                title: '发布成功',
                icon: 'success'
              })
              wx.switchTab({
                url: '/pages/recruit/recruit',
              })
            },
            fail: function (res2) {
              console.log("create fail");
            }
          })
        },
        fail: function (res) {
          console.log("get userId fail!");
        }
      })
    }
  }
})
