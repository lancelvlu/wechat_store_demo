
const util = require("../../utils/util")
const db = require("../../utils/db")

// pages/cart/cart.js
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: null,
    cartList: [],
    isSelectAllChecked: false,
    isCartEdit: false,
    cartCheckMap: {},
    cartTotal: "105.33"
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
  onShow: function () {
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
      this.getCart()
    }).catch(err => {
      console.log("Not Authenticated yet")
    })
  },

  getCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    const cartCheckMap = this.data.cartCheckMap
    db.getCart().then(result => {
      wx.hideLoading()
      const data = result.result.data

      if (data.length) {
        // update the total price for cart
        let checkout = 0;
        data.forEach(product => {
          checkout += product.price * product.count
        })

        this.setData({
          cartTotal: util.formatPrice(checkout),
          cartList: data
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },
  onTapCheck(event) {
    const checkId = event.currentTarget.dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let isSelectAllChecked = this.data.isSelectAllChecked
    const cartList = this.data.cartList
    let cartTotal = 0

    if (checkId === 'selectAll') {
      isSelectAllChecked = !isSelectAllChecked
      cartList.forEach(product => {
        cartCheckMap[product.productId] = isSelectAllChecked
      })
    } else {
      cartCheckMap[checkId] = !cartCheckMap[checkId]
      isSelectAllChecked = true
      cartList.forEach(product => {
        if (!cartCheckMap[product.productId]) {
          // not all product selected
          isSelectAllChecked = false
        }
      })
    }

    cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

    this.setData({
      cartTotal,
      isSelectAllChecked,
      cartCheckMap
    })

  },
  onTapCheckout() {
    if (this.data.cartTotal == 0) {
      wx.showToast({
        icon: 'none',
        title: 'Please Select Items',
      })
      return
    }
    wx.showLoading({
      title: 'Loading...',
    })

    const cartCheckMap = this.data.cartCheckMap
    const cartList = this.data.cartList
    const productsToCheckout = cartList.filter(product => cartCheckMap[product.productId])
    const cartToUpdate = cartList.filter(product => !cartCheckMap[product.productId])

    db.addToOrder({
      list: productsToCheckout,
      isCheckout: true
    }).then(result => {
      wx.hideLoading()

      const data = result
      console.log(result)
      if (data) {
        wx.showToast({
          title: 'Succeed',
        })

        this.setData({
          cartList: cartToUpdate
        })

        this.getCart()
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

  onTapEditCart() {
    if (!this.data.isCartEdit) {
      this.setData({
        isCartEdit: true
      })
    } else {
      this.updateCart()
    }
  },

  updateCart() {
    wx.showLoading({
      title: 'Loading...',
    })

    const cartList = this.data.cartList

    db.updateCart(cartList).then(result => {
      wx.hideLoading()

      const data = result.result

      if (data) {
        this.setData({
          isCartEdit: false
        })
      }
    }).catch(err => {
      console.error(err)
      wx.hideLoading()

      wx.showToast({
        icon: 'none',
        title: 'Failed'
      })
    })
  },

  adjustCartProductCount(event) {
    const dataset = event.currentTarget.dataset
    const adjustType = dataset.type
    const productId = dataset.id
    const cartCheckMap = this.data.cartCheckMap
    let cartList = this.data.cartList
    const productToAdjust = cartList.find(product => product.productId === productId) || {}

    if (adjustType === 'add') {
      productToAdjust.count++
    } else {
      if (productToAdjust.count >= 2) {
        productToAdjust.count--
      } else {
        delete cartCheckMap[productId]
        cartList = cartList.filter(product => product.productId !== productId)
      }
    }

    const cartTotal = this.updateTotalPrice(cartList, cartCheckMap)

    this.setData({
      cartTotal,
      cartList,
    })
    
    if (!cartList.length) {
      this.updateCart()
    }

  },

  updateTotalPrice(cartList, cartCheckMap) {
    let checkout = 0
    cartList.forEach(product => {
      if (cartCheckMap[product.productId]) checkout += product.price * product.count
    })

    return util.formatPrice(checkout)
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