import 'weapp-cookie'
import util from 'utils/util'

const app = getApp()

//app.js

App({
  onLaunch: function() {
    // 登录
    wx.login({
      success: async res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //获取凭证
        if (res.code) {
          try {
            let t = await util.request('/wxLogin', 'GET', {
              code: res.code
            })
            wx.setStorageSync('openid', t)
          } catch (e) {
            wx.showModal({
              title: '登录失败',
              showCancel: false
            })
            console.log(e)
          }
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseURL: 'http://47.103.95.85:8080',
    // baseURL: 'http://localhost:8080',
    globalHeaders: {}
  }
})
