// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //下拉刷新
    scrolltop:20,
    refreshText:null,
    icon:null,
    shouldRefresh:false,
    istouching:false,
    //scorll-view的高度
    scrollHeight:600,
    orderList:[],
    historyList:[],
    clentName:'',
    clientLocation:'',
    value: 0,
    active:0,
    minDate: '2021-01-01',
    maxDate: new Date().toLocaleDateString(),
    defaultDate: new Date().toLocaleDateString(),
    month: new Date().getMonth()+1,
    day: new Date().getDate()
  },
  onLoad: function () {
    var that = this
    //处理scroll-view的高度，底部的空白占80px
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          scrollHeight:result.windowHeight-80
        })
      },
    })
    var date = new Date()
    var y = date.getFullYear().toString()
    var m = date.getMonth()+1
    m = m > 9 ? m : '0'+m
    that.setData({
      minDate: y+'-' + m + '-01'
    })
    that.query()
    
  },
  query: function(){
    var that = this;
    // console.log(that.data.defaultDate.getDate())
    var date = that.data.defaultDate
    console.log(that.formatDate(date))
    wx.request({
      url: 'http://101.34.21.175:8080/order/detail',
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
            var d = parseInt(s.substring(3,5)).toString()
            list[i].startTime = parseInt(s.substring(0,2))+"月"+ d +"日，"+s.substring(6,11) + '-' + s1
          }
          wx.request({
            url: 'http://101.34.21.175:8080/server/info',
            method:"GET",
            data:{
              serverId: list[i].serverId,
            },
            success:function(res){
              var imageUrl = res.data.data.serverInfo.serverProfile
              list[i].imageUrl = imageUrl
              that.setData({
                historyList:list
              })
            }
          })
        }
        that.setData({
          historyList: list
        })
      }
    }),
    wx.request({
      url: 'http://101.34.21.175:8080/order/detail',
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
            list[i].startTime = parseInt(s.substring(0,2))+"月"+ parseInt(s.substring(3,5))+"日，"+s.substring(6,11) + '-' + s1
          }
          wx.request({
            url: 'http://101.34.21.175:8080/server/info',
            method:"GET",
            data:{
              serverId: list[i].serverId,
            },
            success:function(res){
              var imageUrl = res.data.data.serverInfo.serverProfile
              list[i].imageUrl = imageUrl
              that.setData({
                orderList:list
              })
            }
          })
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
    var time = e.currentTarget.dataset.time
    var image = e.currentTarget.dataset.image
    wx.navigateTo({
      url: '/pages/manage/orderDetail/orderDetail?orderId='+orderId+'&time='+time+'&image='+image,
    })
  },
  lastMon: function () {
    var that = this;
    // 应该判断当前年月是否小于等于允许的最小年月
    // 是则可以执行操作，否则将按钮变灰
    var nowDate = new Date(this.data.minDate);
    var nowYear = nowDate.getFullYear();
    var nowMon = nowDate.getMonth() + 1;
    if (nowMon > 1) {
      var newMon = nowMon - 1;
      var newDay = 1;
      switch (newMon) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          newDay = 31;
        case 2:
          newDay = 28;
        case 4:
        case 6:
        case 9:
        case 11:
          newDay = 30;
      }
      // 判断平年闰年
      if (newMon == 2 && nowYear / 4 == 0) {
        if (nowYear % 100 == 0) {
          if (nowYear / 400 == 0) {
            newDay = 29;
          } else {
            newDay = 28;
          }
        } else {
          newDay = 29;
        }
      }
      that.setData({
        minDate: new Date(nowYear + '/' + (nowMon - 1) + '/1').getTime(),
        defaultDate: new Date(nowYear + '/' + (nowMon - 1) + '/1').getTime(),
        maxDate: new Date(nowYear + '/' + newMon + '/' + newDay).getTime(),
      })
    } else {
      that.setData({
        minDate: new Date((nowYear - 1) + '/12/1').getTime(),
        defaultDate: new Date((nowYear - 1) + '/12/1').getTime(),
        maxDate: new Date((nowYear - 1) + '/12/31').getTime(),
      })
    }
  },

  nextMon: function () {
    var that = this;
    // 应该判断当前年月是否大于今天
    // 是则可以执行操作，否则将按钮变灰
    var nowDate = new Date(this.data.minDate);
    var nowYear = nowDate.getFullYear();
    var nowMon = nowDate.getMonth() + 1;
    var nowDay = nowDate.getDate();
    if (nowMon < 12) {
      var newMon = nowMon + 1;
      var newDay = 1;
      switch (newMon) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          newDay = 31;
        case 2:
          newDay = 28;
        case 4:
        case 6:
        case 9:
        case 11:
          newDay = 30;
      }
      // 判断平年闰年
      if (newMon == 2 && nowYear / 4 == 0) {
        if (nowYear % 100 == 0) {
          if (nowYear / 400 == 0) {
            newDay = 29;
          } else {
            newDay = 28;
          }
        } else {
          newDay = 29;
        }
      }
      that.setData({
        minDate: new Date(nowYear + '/' + newMon + '/1').getTime(),
        defaultDate: new Date(nowYear + '/' + newMon + '/1').getTime(),
        maxDate: new Date(nowYear + '/' + newMon + '/' + newDay).getTime(),
      })
    } else {
      that.setData({
        minDate: new Date((nowYear + 1) + '/1/1').getTime(),
        defaultDate: new Date((nowYear + 1) + '/1/1').getTime(),
        maxDate: new Date((nowYear + 1) + '/1/31').getTime(),
      })
    }
  },
  //自定义下拉刷新
  onPulling(e) {
  },

  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 1000)
    this.onLoad()
  },

  onRestore(e) {
  },

  onAbort(e) {
  },
})