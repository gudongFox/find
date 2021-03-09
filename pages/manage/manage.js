// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 0,
    active:0
  },

  
  onShow: function(){
    this.getTabBar().init();
  },
  onclick:function(){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  }
})