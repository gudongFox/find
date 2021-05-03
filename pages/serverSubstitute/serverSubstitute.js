// pages/newDemandServer/newDemandServer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientName:"王阿姨",
    clientPhoneNum:"13000000001",
    clientLocation:"成都市锦江文化中心",
    clientHouseNum:"虎溪花园，4栋5-1",

    serviceProject:0,
    projects:[
      {text:"家庭保洁", value:0},
      {text:"商业保洁", value:1},
      {text:"钟点工", value:2},
    ],
    serviceLength:1,
    serviceDate:"2020/07/08",
    serviceTime:"8:00",
    serviceNumthTimes:1,
    serviceTotalTimes:10,
    serviceInterval:7,
    serviceRate:45.00,
    serviceComment:"有宠物",
    isShowDateSelection:false,
    currentDate:new Date().getTime(),
    minDate:new Date().getTime(),
    isShowTimeSelection:false,
    currentTime:"12:00",
  },
// 设置服务时长
  setServiceLength:function(e){
    this.setData({
      serviceLength:e.detail.value
    })
  },
// 设置上门日期
  setServiceDate:function(){
    this.setData({
      // serviceDate:e.detail.value
      isShowDateSelection:true
    })
  },
  confirmDate:function(val){
    let dateObj = new Date(val.detail);
    let y = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    this.setData({
      serviceDate:y+"/"+month+"/"+day,
      isShowDateSelection:false
    })
  },
  cancelDate:function(){
    this.setData({
      isShowDateSelection:false
    })
  },

// 设置上门时间
  setServiceTime:function(e){
    this.setData({
      isShowTimeSelection:true
    })
  },

  confirmTime:function(val){
    this.setData({
      serviceTime:val.detail,
      isShowTimeSelection:false
    })
  },
  cancelTime:function(){
    this.setData({
      isShowTimeSelection:false
    })
  },

// 设置当前次数
  setServiceNumthTimes:function(e){
    this.setData({
      serviceNumthTimes:e.detail.value
    })
  },
// 设置总次数
  setServiceTotalTimes:function(e){
    this.setData({
      serviceTotalTimes:e.detail.value
    })
  },
  // 设置周期
  setServiceInterval:function(e){
    this.setData({
      serviceInterval:e.detail.value
    })
  },
  // 设置收费标准
  setServiceRate:function(e){
    this.setData({
      serviceRate:e.detail.value
    })
  },
  // 设置备注
  setServiceComment:function(e){
    this.setData({
      serviceComment:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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