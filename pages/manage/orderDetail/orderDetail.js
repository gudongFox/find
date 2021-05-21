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
    imageUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId
    var date = options.time
    var that = this;
    var image = options.image
    wx.request({
      url: 'http://129.211.68.243:8080/order/detail',
      method:"GET",
      data:{
        clientId:wx.getStorageSync('openid'),
        isExecuting: true,
        day: that.formatDate(date)
      },
      success:function(res){
        console.log(res)
        var list = res.data.data.executingOrders
        var list1 = res.data.data.dailyOrders
        var clientInfo = res.data.data.clientInfo
        var orderInfo = []
        for(let i = 0; i < list.length; i++){
          if(list[i].orderId == orderId){
            orderInfo = list[i];
          }
        }
        for(let i = 0; i < list1.length; i++){
          if(list1[i].orderId == orderId){
            orderInfo = list1[i];
          }
        }
        if(orderInfo.numTimes == null){
          orderInfo.numTimes = 1
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
          imageUrl: image
    })
      }
    })
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth().length>1?date.getMonth() + 1 : '0'+(date.getMonth()+1)}-${date.getDate()}`;
  },
})