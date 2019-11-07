// pages/order/order.js
const util = require("../../utils/util")

Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    orderList: [{
      id: 0,
      productList: [{
        count: 1,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
        name: 'Product 1',
        price: "50.50",
      }]
    },
    {
      id: 1,
      productList: [{
        count: 1,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
        name: 'Product 2',
        price: "40.10",
      },
      {
        count: 1,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product3.jpg',
        name: 'Product 3',
        price: "30.50",
      }
      ]
    },
    {
      id: 2,
      productList: [{
        count: 2,
        image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product4.jpg',
        name: 'Product 4',
        price: "70.40",
      }]
    }
    ],
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
    })
    this.data.orderList.forEach(order => {
      order.productList.forEach(product => product.price = util.priceFormat(product.price))
    })

    this.setData({
      orderList: this.data.orderList
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