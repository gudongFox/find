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
    minDate: new Date(2010, 0, 1).getTime(),
    maxDate: new Date(2010, 0, 31).getTime(),
  },
  onLoad: function () {
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
        var historyList = []
        var readyList = []
        for(let i = 0; i < list.length; i++){
          var s = list[i].startTime;
          if(s != null){
            s = s.substring(0,10)
            list[i].startTime = s
            var now = Date.parse(new Date())
            if(Date.parse(s) < now){
              list[i].finished = true
            }
            if(list[i].finished == false){
              readyList.push(list[i])
            }else{
              historyList.push(list[i])
            }
          }
        }
          that.setData({
            orderList:readyList,
            historyList: historyList,
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
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail),
      });
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
  }
})