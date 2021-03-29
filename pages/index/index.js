//index.js
//获取应用实例
const app = getApp()

Page({
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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // tabbar切换
  onShow: function(){
    this.getTabBar().init();
  },
  onclick:function(){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  }
})
