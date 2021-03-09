let app = getApp()

Page({
  data: {
    currentTab: 0,
    items: [
      {
        "iconPath": "/pages/img/all.png",
        "selectedIconPath": "/pages/img/all1.png",
        "text": "接订单"
      },
      {
        "iconPath": "/pages/img/category.png",
        "selectedIconPath": "/pages/img/category (1).png",
        "text": "订单管理"
      },
      {
        "iconPath": "/pages/img/Customer management.png",
        "selectedIconPath": "/pages/img/Customer management (1).png",
        "text": "服务记录"
      },
      {
        "iconPath": "/pages/img/bussiness-man.png",
        "selectedIconPath": "/pages/img/bussiness-man (1).png",
        "text": "我的"
      }
    ]
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onLoad: function (option) {

  },
  onShow:function(){
    wx.hideHomeButton({
      success: (res) => {},
    })
  }
})
