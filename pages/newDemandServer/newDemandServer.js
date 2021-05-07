// pages/newDemandServer/newDemandServer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URIClientInfo: "",
    URIDemandInfo: "",
    // URINewInfo: "",
    demandId:"",
    serviceProject: "家庭保洁",
    projects: [{
        text: "家庭保洁",
        value: "家庭保洁",
      },
      {
        text: "商业保洁",
        value: "商业保洁",
      },
      {
        text: "钟点工",
        value: "钟点工",
      },
    ],
    serviceLength: 0,
    serviceDate: "",
    serviceTime: "",
    serviceNumthTimes: 1,
    serviceTotalTimes: 1,
    serviceInterval: 0,
    servicePrice: 0,
    serviceComment: "",
    // 上门日期选择器相关
    isShowDateSelection: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    // 上门时间选择器相关
    isShowTimeSelection: false,
    currentTime: "12:00"
  },
  // 设置服务时长
  setServiceLength: function (e) {
    this.setData({
      serviceLength: e.detail.value
    })
  },
  // 设置上门日期
  setServiceDate: function () {
    this.setData({
      isShowDateSelection: true
    })
  },
  confirmDate: function (val) {
    let dateObj = new Date(val.detail);
    let y = dateObj.getFullYear();
    let m = dateObj.getMonth() + 1;
    let d = dateObj.getDate();
    this.setData({
      serviceDate: y + "/" + m + "/" + d,
      isShowDateSelection: false
    })
  },
  cancelDate: function () {
    this.setData({
      isShowDateSelection: false
    })
  },
  // 设置上门时间
  setServiceTime: function () {
    this.setData({
      isShowTimeSelection: true
    })
  },
  confirmTime: function (val) {
    this.setData({
      serviceTime: val.detail,
      isShowTimeSelection: false
    })
  },
  cancelTime: function () {
    this.setData({
      isShowTimeSelection: false
    })
  },
  // 设置当前次数
  setServiceNumthTimes: function (e) {
    this.setData({
      serviceNumthTimes: e.detail.value
    })
  },
  // 设置总次数
  setServiceTotalTimes: function (e) {
    this.setData({
      serviceTotalTimes: e.detail.value
    })
  },
  // 设置周期
  setServiceInterval: function (e) {
    this.setData({
      serviceInterval: e.detail.value
    })
  },
  // 设置收费标准
  setServiceRate: function (e) {
    this.setData({
      servicePrice: e.detail.value
    })
  },
  // 设置备注
  setServiceComment: function (e) {
    this.setData({
      serviceComment: e.detail.value
    })
  },

  // 接单跳转到形成订单页面
  clickReceive: function () {
    // 将更新后到数据传递
    var newInfo = {
      demandId: this.data.demandId,
      serviceProject: this.data.serviceProject,
      serviceLength: this.data.serviceLength,
      serviceDate: this.data.serviceDate,
      serviceTime: this.data.serviceTime,
      serviceNumthTimes: this.data.serviceNumthTimes,
      serviceTotalTimes: this.data.serviceTotalTimes,
      serviceInterval: this.data.serviceInterval,
      servicePrice: this.data.servicePrice,
      serviceComment: this.data.serviceComment,
    }
    var URINewInfo = encodeURIComponent(JSON.stringify(newInfo));
    // this.setData({
    //   URINewInfo: URINewInfo,
    // })
    wx.navigateTo({
      url: '/pages/receiveOrderServer/receiveOrderServer?URIClientInfo=' + this.data.URIClientInfo + "&URINewInfo=" + URINewInfo,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      URIClientInfo: options.URIClientInfo,
      URIDemandInfo: options.URIDemandInfo,
    })
    // 解码
    var clientInfo = JSON.parse(decodeURIComponent(options.URIClientInfo));
    var demandInfo = JSON.parse(decodeURIComponent(options.URIDemandInfo));
    // console.log(clientInfo);
    // console.log(demandInfo);
    if (demandInfo.serviceProject == null) {
      demandInfo.serviceProject = "家庭保洁";
    }
    // 判断开始时间或结束时间是否为空
    var serviceLength = 0;
    if (demandInfo.startTime != null && demandInfo.endTime != null) {
      serviceLength = demandInfo.endTime.substring(11, 13) - demandInfo.startTime.substring(11, 13);
    }
    var serviceDate;
    var serviceTime;
    //判断数据是否为空
    if (demandInfo.startTime != null) {
      serviceDate = demandInfo.startTime.substring(0, 4) + "/" + demandInfo.startTime.substring(5, 7) + "/" + demandInfo.startTime.substring(8, 10);
      serviceTime = demandInfo.startTime.substring(11, 16);
    } else {
      var today = new Date();
      serviceDate = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDay();
      serviceTime = today.getHours() + ":" + today.getMinutes()
    }
    this.setData({
      demandId: demandInfo.demandId,
      serviceProject: demandInfo.serviceProject,
      serviceLength: serviceLength,
      serviceDate: serviceDate,
      serviceTime: serviceTime,
      serviceNumthTimes: demandInfo.numTimes,
      serviceTotalTimes: demandInfo.times,
      serviceInterval: demandInfo.intervalDays,
      servicePrice: demandInfo.price,
      serviceComment: demandInfo.demandComment,
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