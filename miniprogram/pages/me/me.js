const util = require('../../utils/util')

Page({
  data: {
    userInfo: null,
  },

  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
  },

  onTapAddress() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  },

  onTapService() {
    wx.showToast({
      icon: 'none',
      title: 'This function is not open yet.'
    })
  }
})