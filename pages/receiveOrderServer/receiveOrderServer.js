// pages/newDemandServer/newDemandServer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientId: "",
    demandId: "",
    clientName: "",
    clientGender: "",
    clientPhoneNum: "",
    clientLocation: "",
    serviceProject: "",
    serviceTime: "",
    serviceLength: "",
    servicePeriod: "",
    rates: "",
    serviceComment: "",
  },

  // 取消订单按钮响应
  cancelOrder: function () {
    wx.navigateBack({
      delta: 2,
    })
  },

  // 确认订单按钮响应
  confirmOrder: function () {
    var now = new Date();
    var orderTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    var serviceDate = this.data.serviceTime.split(" ")[0].replace(/\//g, "-");
    var startTime = serviceDate + " " + this.data.serviceTime.split(" ")[1] + ":00"
    var endTime = serviceDate + " " + (Number(this.data.serviceTime.split(" ")[1].split(":")[0]) + Number(this.data.serviceLength)) + ":" + this.data.serviceTime.split(" ")[1].split(":")[1] + ":00";
    // 获取用户ID
    var serverId = wx.getStorageSync('openid');
    // console.log("获取openid");
    // console.log(serverId);
    // serverId = "liling";
    var demandId = this.data.demandId;
    wx.request({
      url: 'http://101.34.21.175:8080/server/receiveOrder/' + serverId + "/" + demandId,
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        // "content-type": "application/x-www-form-urlencoded",//POST方式
      },
      data: {
          "orderTime": orderTime,
          "clientId": this.data.clientId,
          "mandatorId": 0,
          "serviceProject": this.data.serviceProject,
          "startTime": startTime,
          "endTime": endTime,
          "price": this.data.rates,
          "times": Number(this.data.servicePeriod.split("共")[1].split("次")[0]),
          "intervalDays": Number(this.data.servicePeriod.split("间隔")[1].split("天")[0]),
          "orderComment": this.data.serviceComment,
          "isSubstitue": 0,
          "numTimes": 0,
      },
      success: function (res){
        // console.log(res);
        wx.redirectTo({
          url: '/pages/indexs/indexs',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 解码
    var clientInfo = JSON.parse(decodeURIComponent(options.URIClientInfo));
    var newInfo = JSON.parse(decodeURIComponent(options.URINewInfo));
    // console.log("客户信息");
    // console.log(clientInfo);
    // console.log("新需求信息");
    // console.log(newInfo);
    // 解析性别
    if (clientInfo.clientGender == 1) {
      clientInfo.clientGender = "男";
    } else if (clientInfo.clientGender == 2) {
      clientInfo.clientGender = "女";
    } else {
      clientInfo.clientGender = "未知";
    }
    this.setData({
      clientId: clientInfo.clientId,
      demandId: newInfo.demandId,
      clientName: clientInfo.clientName,
      clientGender: clientInfo.clientGender,
      clientPhoneNum: clientInfo.clientTel,
      clientLocation: clientInfo.clientLocation,
      serviceProject: newInfo.serviceProject,
      serviceTime: newInfo.serviceDate + " " + newInfo.serviceTime,
      serviceLength: newInfo.serviceLength,
      servicePeriod: "共" + newInfo.serviceTotalTimes + "次~间隔" + newInfo.serviceInterval + "天",
      rates: newInfo.servicePrice,
      serviceComment: newInfo.serviceComment,
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