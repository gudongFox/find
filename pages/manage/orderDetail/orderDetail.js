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
    period: "第"+1+"次，共"+1+"次，间隔"+0+"天",
    rates: 0 + "元/小时",
    comment: "",
    serverName: '',
    serverTel: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId
    var that = this;
    wx.request({
      url: 'http://129.211.68.243:8080/order/detail',
      method:"GET",
      data:{
        clientId:wx.getStorageSync('openid'),
        isExecuting: true
      },
      success:function(res){
        console.log(res)
        var list = res.data.data.executingOrders
        var clientInfo = res.data.data.clientInfo
        console.log(clientInfo)
        var orderInfo = []
        for(let i = 0; i < list.length; i++){
          if(list[i].orderId == orderId){
            orderInfo = list[i];
          }
          var s = list[i].startTime;
          if(s != null){
            s = s.substring(0,10)
            console.log(s)
            list[i].startTime = s
          }
        }
        that.setData({
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
          serverName: orderInfo.serverName,
    })
      }
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