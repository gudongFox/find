// pages/todoService/todoService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: "",
    orderTime: "",
    clientName: "",
    clientGender: "",
    clientPhoneNum: "",
    clientLocation: "",

    serverName: "",
    serverProfile: "https://img.yzcdn.cn/vant/cat.jpeg",
    serviceProject: "",
    serviceStartTime: "",
    serviceEndTime: "",
    servicePeriod: "",
    serviceRate: "",
    serviceComment: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var serverId = options.serverId;
    var serverName = options.serverName;
    wx.request({
      url: "http://localhost:8080/server/getUnFinOrder/" + serverId,
      method: "GET",
      header: {
        'content-type': 'application/json' // GET方式
      },
      success(res) {
        // console.log(serverId + "的未完成订单");
        // console.log(res);
        var orderData = res.data[0];
        that.setData({
            orderId: orderData.orderId,
            orderTime: orderData.orderTime,
            // clientName: "马先生",
            // clientPhoneNum: "13000000001",
            // clientLocation: "成都市锦江文化中心",

            serverName: serverName,
            serverProfile: "https://img.yzcdn.cn/vant/cat.jpeg",
            serviceProject: orderData.serviceProject,
            serviceStartTime: orderData.startTime,
            serviceEndTime: orderData.endTime,
            servicePeriod: "第" + orderData.numTimes + "次，共" + orderData.times + "次，间隔" + orderData.intervalDays + "天",
            serviceRate: orderData.price + "元/小时",
            serviceComment: orderData.orderComment,
          }),
          wx.request({
            url: "http://localhost:8080/client/info/",
            method: "GET",
            data: {
              clientId: orderData.clientId,
            },
            header: {
              'content-type': 'application/json' // GET方式
            },
            success(res) {
              // console.log("客户信息");
              // console.log(res.data.data.client)
              var clientData = res.data.data.client;
              if (clientData.clientGender == 1) {
                clientData.clientGender = "男";
              } else if (clientData.clientGender == 2) {
                clientData.clientGender = "女";
              } else {
                clientData.clientGender = "未知";
              }
              that.setData({
                clientName: clientData.clientName,
                clientGender: clientData.clientGender,
                clientPhoneNum: clientData.clientTel,
                clientLocation: clientData.clientLocation,
              })
            }
          })
      },
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