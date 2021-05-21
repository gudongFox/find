// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    historyList:[],
    clentName:'',
    clientLocation:'',
    value: 0,
    active:0,
    show: false,
    minDate: new Date(2020, 0, 1).getTime(),
    defaultDate: new Date().toLocaleDateString(),
    month: new Date().getMonth()+1,
    day: new Date().getDate()
  },
  onLoad: function () {
    wx.stopPullDownRefresh()
    this.query()
  },
  query: function(){
    var that = this;
    // console.log(that.data.defaultDate.getDate())
    var date = that.data.defaultDate
    
    console.log(that.formatDate(date))
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
        var list = res.data.data.dailyOrders
        for(let i = 0; i < list.length; i++){
          var s = list[i].startTime;
          var s1 = list[i].endTime
          if(s != null){
            list[i].endTime = s.substring(0,10).replaceAll('-','/')
            s = s.substring(5,16)
            s1 = s1.substring(11,16)
            list[i].startTime = parseInt(s.substring(0,2))+"月"+ parseInt(s.substring(3,5))+"日，"+s.substring(6,11) + '-' + s1
          }
        }
        that.setData({
          historyList: list
        })
        console.log(that.data.historyList)
      }
    }),
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
        for(let i = 0; i < list.length; i++){
          var s = list[i].startTime;
          var s1 = list[i].endTime
          if(s != null){
            list[i].endTime = s.substring(0,10).replaceAll('-','/')
            s = s.substring(5,16)
            s1 = s1.substring(11,16)
            list[i].startTime = parseInt(s.substring(0,2))+"月"+ parseInt(s.substring(4,5))+"日，"+s.substring(6,11) + '-' + s1
          }
        }
          that.setData({
            orderList:list,
            clientName: res.data.data.clientInfo.clientName,
            clientLocation: res.data.data.clientInfo.clientLocation
          })
      }
    })
  },
  serviceList:function(e){
    var that = this
    
    var serviceList = that.data.serviceList
    
    that.setData({//更新到data里面
    
    yearShow: e.currentTarget.dataset.select,
    
    serviceList: that.data.serviceList
    
    })
    
    },

    // 日历
    onDisplay() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    formatDate(date) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth().length>1?date.getMonth() + 1 : '0'+(date.getMonth()+1)}-${date.getDate()}`;
    },
    onConfirm(event) {
      this.setData({
        show: false,
        defaultDate: this.formatDate(event.detail),
      });
      this.query();
    },
  onShow: function(){
    this.getTabBar().init();
  },
  onclick:function(e){
    console.log(e)
    var orderId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/manage/orderDetail/orderDetail?orderId='+orderId,
    })
  },
  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },
})