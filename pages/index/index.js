//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    demandList:[{
      demandId:3,clientId:"zhanglaoshi",serviceProject:"家庭保洁",mandatorId:"0",mandatorName:"",serverId:"liling",serverName:"李玲",startTime:"2020-07-08T00:00:00",endTime:"2020-07-08T02:00:00",times:10,intervalDays:7,demandComment:""
    },
    {
      demandId:4,clientId:"zhanglaoshi",serviceProject:"钟点工",mandatorId:"0",mandatorName:"",serverId:"liling",serverName:"李玲",startTime:"2020-07-08T00:00:00",endTime:"2020-07-08T02:00:00",times:10,intervalDays:7,demandComment:""
    }],
    active: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    value1: 0
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/demand/detail',
      method:"GET",
      data:{
        clientId:wx.getStorageSync('openid'),
      },
      success:function(res){
        var list = res.data.data.demandsInfo
        console.log(res)
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
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // tabbar切换
  onShow: function () {
    this.getTabBar().init();
  },
  onclick: function () {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  //跳转到订单详情页
  toServiceInfo:function(e){
    console.log(e)
    var demandId = e.currentTarget.dataset.id
    var clientId = wx.getStorageSync('openid')
    wx.navigateTo({
      url: '/pages/todo/todo?demandId='+demandId,
    })
  }
})
