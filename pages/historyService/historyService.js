// pages/todoService/todoService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: "",
    orderTime: "",
    clientName: "",
    clientPhoneNum: "",
    clientLocation: "",
    serviceProject: "",
    serviceTime: "",
    period: "",
    rates: "",
    comment: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 解码
    var clientInfo = JSON.parse(decodeURIComponent(options.URIClientInfo))
    var orderInfo = JSON.parse(decodeURIComponent(options.URIOrderInfo))
    this.setData({
      orderId: orderInfo.orderId,
      orderTime: orderInfo.orderTime,
      clientName: clientInfo.clientName,
      clientPhoneNum: clientInfo.clientTel,
      clientLocation: clientInfo.clientLocation,
      serviceProject: orderInfo.serviceProject,
      serviceTime: orderInfo.startTime.substring(0,16) + "~" + orderInfo.endTime.substring(11,16),
      period: "共"+orderInfo.times+"次~间隔"+orderInfo.intervalDays+"天",
      rates: orderInfo.price + "元/小时",
      comment: orderInfo.orderComment,
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