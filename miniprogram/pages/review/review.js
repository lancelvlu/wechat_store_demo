// miniprogram/pages/review/review.js

const db = require('../../utils/db')
const util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    reviewList: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setProduct(options)
    this.getReviews(options.productId)
  },
  getReviews(productId) {
    db.getReviews(productId).then(result => {
      const data = result.data
      if (data.length) {
        this.setData({
          reviewList: data.map(review => {
            review.createTime = util.formatTime(review.createTime, 'yyyy/MM/dd'),
              review.images = review.images ? review.images : []
            return review
          })
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },
  previewImage(event) {
    let target = event.currentTarget
    let src = target.dataset.src

    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  setProduct(options) {
    let product = {
      productId: options.productId,
      name: options.name,
      price: options.price,
      image: options.image
    }
    this.setData({
      product,
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

  }
})