const db = wx.cloud.database({
  env: 'store-test-woet2'
  })

module.exports = {
  getProductList() {
    return db.collection('product').get()
  },

  getProductDetail(id) {
    return wx.cloud.callFunction({
      name: 'productDetail',
      data: {
        id
      },
    })
  },
}
