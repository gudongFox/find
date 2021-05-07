// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demandList:[{
      demandId:3,clientId:"zhanglaoshi",serviceProject:"家庭保洁",mandatorId:"0",mandatorName:"",serverId:"liling",serverName:"李玲",startTime:"2020-07-08T00:00:00",endTime:"2020-07-08T02:00:00",times:10,intervalDays:7,demandComment:""
    },
    {
      demandId:4,clientId:"zhanglaoshi",serviceProject:"钟点工",mandatorId:"0",mandatorName:"",serverId:"liling",serverName:"李玲",startTime:"2020-07-08T00:00:00",endTime:"2020-07-08T02:00:00",times:10,intervalDays:7,demandComment:""
    }],
    value: 0,
    active:0,
    show: false,
    minDate: new Date(2010, 0, 1).getTime(),
    maxDate: new Date(2010, 0, 31).getTime(),
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/demand/detail',
      method:"GET",
      data:{
        clientId:wx.getStorageSync('openid')
      },
      success:function(res){
        var list = res.data.data.demandsInfo
        for(let i = 0; i < list.length; i++){
          var s = list[i].startTime;
          if(s != null){
            s = s.substring(0,10)
            console.log(s)
            list[i].startTime = s
          }
        }
          that.setData({
            demandList:list
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
  onclick:function(){
    wx.navigateTo({
      url: '/pages/add/add',
    })
  }
})