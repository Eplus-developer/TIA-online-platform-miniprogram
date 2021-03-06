// miniprogram/pages/createMatch/createMatch.js
import util from '../../utils/util'
import md5 from 'md5'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    actTime: '2020-02-22',
    endTime: '2020-02-22',
    type: 0,
    quantityType: ['单人参加', '多人参加'],
    photo: null
  },

  startTimeChange(e) {
    this.setData({
      actTime: e.detail.value
    })
  },

  endTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  typeChange(e) {
    this.setData({
      type: e.detail.value
    })
  },

  async createMatch(e) {
    if (!util.checkPhone(e.detail.value.phone)) {
      wx.showModal({
        title: '请填写正确的手机号码',
        showCancel: false
      })
      return
    }
    let p = this.data.photo.split('.')
    p = p[p.length - 1]
    util.cos.postObject(
      {
        Bucket: 'tia-1258575893',
        Region: 'ap-shanghai',
        Key:
          md5(new Date().toISOString() + wx.getStorageSync('openid')) + '.' + p,
        FilePath: this.data.photo, // wx.chooseImage 选择文件得到的 tmpFilePath
        onProgress: function(info) {
          console.log(JSON.stringify(info))
        }
      },
      async (err, data) => {
        if (err) {
          wx.showModal({
            title: '上传失败',
            showCancel: false
          })
          return
        }
        try {
          await util.request('/activity', 'POST', {
            name: e.detail.value.name,
            description: e.detail.value.description,
            activityType: 'competition',
            actTime: this.data.actTime + ' 00:00',
            endTime: this.data.endTime + ' 00:00',
            phone: e.detail.value.phone,
            quantityType: this.data.type === 1,
            location: e.detail.value.location,
            image: 'https://' + data.Location
          })
          wx.showToast({
            title: '创建成功',
            icon: 'success'
          })
          wx.switchTab({
            url: '/pages/match/match'
          })
        } catch (e) {
          wx.showModal({
            title: '创建失败',
            showCancel: false
          })
        }
      }
    )
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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

  async selectImage() {
    wx.chooseImage({
      success: res => {
        this.setData({
          photo: res.tempFilePaths[0]
        })
      }
    })
  }
})
