// pages/editMyInfo/editMyInfo.js
import { checkPhone, checkEmail } from '../../utils/util'
import util from '../../utils/util'

Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    genderArr: ['男', '女', '未知'],
    collegeIndex: 0,
    gradeIndex: 0,
    genderIndex: 0,
    userPhone: '',
    userEmail: '',
    userSpecialty: '',
    userResume: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    try {
      let code = await util.request('/user/myself', 'GET')
      let info = await util.request(`/user/${code}/detailPage`, 'GET')
      console.log(info)
      let college = this.data.collegeArr.indexOf(info.college)
      if (college === -1) college = 0
      this.setData({
        collegeIndex: college,
        gradeIndex: parseInt(info.userGrade),
        genderIndex: info.gender ? 0 : 1,
        userPhone: info.userPhone,
        userEmail: info.userEmail,
        userSpecialty: info.userSpecialty,
        userResume: info.userResume
      })
      console.log(info)
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
  onShareAppMessage: function() {},

  collegeChange: function(e) {
    this.setData({
      collegeIndex: e.detail.value
    })
  },

  gradeChange: function(e) {
    this.setData({
      gradeIndex: e.detail.value
    })
  },

  genderChange: function(e) {
    this.setData({
      genderIndex: e.detail.value
    })
  },

  formSubmit: async function(e) {
    if (!checkPhone(e.detail.value.userPhone)) {
      wx.showToast({
        title: '手机号非法',
        icon: 'none'
      })
      return
    }
    if (!checkEmail(e.detail.value.userEmail)) {
      wx.showToast({
        title: '邮箱不合法',
        icon: 'none'
      })
      return
    }
    try {
      await util.request('/user/self', 'PUT', {
        gender: parseInt(this.data.genderIndex) === 0,
        college: this.data.collegeArr[this.data.collegeIndex],
        grade: this.data.gradeIndex,
        phone: e.detail.value.userPhone,
        email: e.detail.value.userEmail,
        specialty: e.detail.value.userSpecialty,
        resume: e.detail.value.userResume
      })
      wx.showToast({
        title: '修改成功！',
        icon: 'success'
      })
      wx.redirectTo({
        url: '/pages/selfInfo/selfInfo'
      })
    } catch (e) {
      console.log('修改失败')
    }
  }
})
