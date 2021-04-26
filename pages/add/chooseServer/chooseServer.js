// pages/add/chooseCustomer/chooseCustomer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server: {
      id: 0,
      name: "张老师",
      gender: "女",
      age: "48",
      servertype: "家庭保洁/钟点工",
      location: "虎溪花园，4栋3-3-1",
      times: "7",
      remark: "服务质量不错"
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  backAdd: function(option){
    wx.navigateBack({
      delta: 1,
    })
  },
  backIndex: function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})