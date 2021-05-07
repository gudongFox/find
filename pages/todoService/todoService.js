// pages/todoService/todoService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: "2020101102800001",
    orderTime: "2020年07月07日08:47",
    clientName: "马先生",
    clientPhoneNum: "13000000001",
    clientLocation: "成都市锦江文化中心",
    clientHouseNum: "虎溪花园,4栋5-1",
    serviceObj: "家庭保洁",
    serviceTime: "2020年07月08日8:00～10:00",
    period: "第5次，共10次，间隔7天",
    rates: "45.00元/小时",
    comment: "有宠物",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 解码
    var clientInfo = JSON.parse(decodeURIComponent(options.URIClientInfo))
    var orderInfo = JSON.parse(decodeURIComponent(options.URIOrderInfo))
    // console.log(clientInfo)
    // console.log(orderInfo)
    this.setData({
      orderId: orderInfo.orderId,
      orderTime: orderInfo.orderTime,
      clientName: clientInfo.clientName,
      clientPhoneNum: clientInfo.clientTel,
      clientLocation: clientInfo.clientLocation,
      serviceProject: orderInfo.serviceProject,
      serviceTime: orderInfo.startTime.substring(0,16) + "~" + orderInfo.endTime.substring(11,16),
      period: "第"+orderInfo.numTimes+"次，共"+orderInfo.times+"次，间隔"+orderInfo.intervalDays+"天",
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