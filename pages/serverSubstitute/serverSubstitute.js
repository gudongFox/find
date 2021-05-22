// pages/newDemandServer/newDemandServer.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    URIClientInfo:"",
    clientName: "",
    clientGender: "",
    clientAge: "",
    clientPhoneNum: "",
    clientLocation: "",

    serviceProject: "家庭保洁",
    projects: [{
        text: "家庭保洁",
        value: "家庭保洁",
        icon: "wap-home-o",
      },
      {
        text: "商业保洁",
        value:"商业保洁",
        icon: "hotel-o",
      },
      {
        text: "钟点工",
        value: "钟点工",
        icon: "underway-o",
      },
    ],
    serviceLength: "",
    serviceDate: "",
    serviceTime: "",
    serviceNumthTimes: "",
    serviceTotalTimes: 1,
    serviceInterval: 0,
    servicePrice: 0,
    serviceComment: "",
    isShowDateSelection: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    isShowTimeSelection: false,
    currentTime: "12:00",
  },

  // 设置服务类型
  setServiceProject:function(value){
    this.setData({
      serviceProject: value.detail
    })
  },
  // 设置服务时长
  setServiceLength: function (value) {
    this.setData({
      serviceLength: value.detail
    })
  },
  // 设置上门日期
  setServiceDate: function () {
    this.setData({
      isShowDateSelection: true
    })
  },
  // 确定选择此上门日期
  confirmDate: function (val) {
    let dateObj = new Date(val.detail);
    let y = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    this.setData({
      serviceDate: y + "/" + month + "/" + day,
      isShowDateSelection: false
    })
  },
  // 取消选择日期
  cancelDate: function () {
    this.setData({
      isShowDateSelection: false
    })
  },

  // 设置上门时间
  setServiceTime: function (e) {
    this.setData({
      isShowTimeSelection: true
    })
  },
  // 确定选择此上门时间
  confirmTime: function (val) {
    this.setData({
      serviceTime: val.detail,
      isShowTimeSelection: false
    })
  },
  // 取消选择上门时间
  cancelTime: function () {
    this.setData({
      isShowTimeSelection: false
    })
  },

  // 设置当前次数
  setServiceNumthTimes: function (value) {
    this.setData({
      serviceNumthTimes: value.detail
    })
  },
  // 设置总次数
  setServiceTotalTimes: function (value) {
    this.setData({
      serviceTotalTimes: value.detail
    })
  },
  // 设置周期
  setServiceInterval: function (value) {
    this.setData({
      serviceInterval: value.detail
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

  // 确认接单按钮响应
  // 接单跳转到形成订单页面
  clickReceive: function () {
    // 检查数据是否完整
    if(this.data.serviceProject == ""){
      Dialog.alert({
        message: '请选择服务类型',
      });
      return
    }else if(this.data.serviceLength <= 0){
      Dialog.alert({
        message: "服务时长需大于0小时",
      });
      return
    }else if(this.data.serviceDate == ""){
      Dialog.alert({
        message: '请选择上门日期',
      });
      return
    }else if(this.data.serviceTime == ""){
      Dialog.alert({
        message: '请选择上门时间',
      });
      return
    }else if(this.data.servicePrice <= 0){
      Dialog.alert({
        message: '收费标准不应为0',
      });
      return
    }
    // 将更新后到数据传递
    var newInfo = {
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
    console.log(newInfo)
    var URINewInfo = encodeURIComponent(JSON.stringify(newInfo));
    // this.setData({
    //   URINewInfo: URINewInfo,
    // })
    wx.navigateTo({
      url: '/pages/receiveSubOrderServer/receiveSubOrderServer?URIClientInfo=' + this.data.URIClientInfo + "&URINewInfo=" + URINewInfo,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
    此页面：
    select客户信息、需求信息
    update需求内容
    接单（需要server_id client_id）
    委托（跳转委托页面）
    */
    // 解码
    var clientInfo = JSON.parse(decodeURIComponent(options.URIClientInfo));
    clientInfo = clientInfo.clientInfo;
    if(clientInfo.clientGender == 1){
      clientInfo.clientGender = "男";
    }else if(clientInfo.clientGender == 2){
      clientInfo.clientGender = "女";
    }else{
      clientInfo.clientGender = "未知";
    }
    var today = new Date();
    var serviceDate = today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
    var serviceHours = today.getHours();
    var serviceMinutes = today.getMinutes();
    if(serviceHours < 10){
      serviceHours = "0" + serviceHours;
    }
    if(serviceMinutes < 10){
      serviceMinutes = "0" + serviceMinutes;
    }
    var serviceTime = serviceHours + ":" + serviceMinutes;
    this.setData({
      URIClientInfo: options.URIClientInfo,
      clientName: clientInfo.clientName,
      clientGender: clientInfo.clientGender,
      clientAge: clientInfo.clientAge,
      clientPhoneNum: clientInfo.clientTel,
      clientLocation: clientInfo.clientLocation,
      serviceDate: serviceDate,
      serviceTime: serviceTime,
      currentTime: serviceTime,
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