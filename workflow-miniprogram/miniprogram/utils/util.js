import COS from 'cos-wx-sdk-v5'

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return year + '年' + month + '月' + day + '日'
}

export const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export const request = (url, method, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getApp().globalData.baseURL + url,
      method: method,
      data: data,
      header: {
        ...headers,
        ...getApp().globalData.globalHeaders,
        'content-type': 'application/json',
        openid: wx.getStorageSync('openid')
      },
      success: res => {
        if (res.statusCode === 200) resolve(res.data.data)
        else reject(res)
      },
      fail: err => reject(err)
    })
  })
}

export const checkPhone = p => {
  return /^1[3456789]\d{9}$/.test(p)
}

export const checkEmail = e => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e)
}

export const checkStuId = e => {
  return /\d{11}/.test(e)
}

export const cos = new COS({
  SecretId: `AKIDNXQ7ZkWbGgphISq4XVFjyxqVt3zh6IE3`,
  SecretKey: 'ziFSP4TdhW4NVNxGH9k4A3j9I9wUmr0t'
})

/*
 bucket: tia-1258575893
 region: ap-shanghai
 */

module.exports = {
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  request: request,
  checkPhone: checkPhone,
  checkEmail: checkEmail,
  checkStuId: checkStuId,
  cos: cos
}
