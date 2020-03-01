const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return year + '年' + month + '月' + day + '日'
}


const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const fetchUtil = (url, method, data, headers={}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: getApp().globalData.baseURL + url,
      method: method,
      data: data,
      header: {
        ...headers,
        ...(getApp().globalData.globalHeaders),
        'content-type': 'application/json',
        'openid': wx.getStorageSync('openid')
      },
      success: (res) => resolve(res),
      fail: (err) => reject(err)
    })
  })
}

export const checkPhone = (p) => {
  return /^1[3456789]\d{9}$/.test(p)
}

export const checkEmail = (e) => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(e)
}

export const checkStuId = (e) => {
  return /\d{11}/.test(e)
}

module.exports = {
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  checkPhone: checkPhone,
  checkEmail: checkEmail,
  checkStuId: checkStuId,
}
