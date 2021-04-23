// pages/add/chooseCustomer/chooseCustomer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customers: [{
      id: 0,
      name: "张老师",
      location: "虎溪花园，4栋3-3-1",
      times: "2",
      remark: "家有宠物"
    },
    {
      id: 1,
      name: "王老师",
      location: "虎溪花园，4栋3-3-1",
      times: "1",
      remark: ""
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  backAdd: function(option){
    var that = this
    var id = option.currentTarget.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/add/add?id=' + id
    })
  }
})