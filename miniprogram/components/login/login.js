// components/login/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTapLogin(event) {
      const loginDetail = {
        userInfo: event.detail.userInfo
      }

      this.triggerEvent('onLogin', loginDetail)
    },

  }
})
