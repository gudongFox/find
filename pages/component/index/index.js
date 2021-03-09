// pages/component/index/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    active:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    value1: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
