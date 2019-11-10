// pages/order/order.js
const util = require("../../utils/util")
const db = require("../../utils/db")

Page({

  /**
   * Page initial data
   */
  data: {
    orderList: []
  },

  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo,
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      // db.getOrdersLocal()
      this.getOrders()
    }).catch(err => {
      console.log("Not Authenticated yet")
    })
    this.data.orderList.forEach(order => {
      order.productList.forEach(product => product.price = util.formatPrice(product.price))
    })
   

    // this.setData({
    //   orderList: this.data.orderList
    // })
  },
  
  getOrders() {
    wx.showLoading({
      title: 'Loading...'
    })

    db.getOrders().then(result => {
      wx.hideLoading()

      const data = result.result
      // console.log(result)
      if (data) {
        this.setData({
          orderList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed',
      })
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})