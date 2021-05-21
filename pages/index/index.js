//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    demandList:[],
    active: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    value1: 0
  },

  onLoad: function () {
    wx.stopPullDownRefresh()
    var that = this;
    wx.request({
      url: 'http://129.211.68.243:8080/demand/detail',
      method:"GET",
      data:{
        clientId:wx.getStorageSync('openid'),
      },
      success:function(res){
        var list = res.data.data.demandsInfo
        for(let i = 0; i < list.length; i++){
          var s = list[i].startTime;
          var s1 = list[i].endTime
          if(s != null){
            s = s.substring(5,16)
            s1 = s1.substring(11,16)
            list[i].startTime = parseInt(s.substring(0,2))+"月"+ parseInt(s.substring(4,5))+"日，"+s.substring(6,11) + '-' + s1
          }
          wx.request({
            url: 'http://129.211.68.243:8080/server/info',
            method:"GET",
            data:{
              serverId: list[i].serverId,
            },
            success:function(res){
              var imageUrl = res.data.data.serverInfo.serverProfile
              list[i].imageUrl = imageUrl
              that.setData({
                demandList:list
              })
            }
          })
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
    var image = e.currentTarget.dataset.image
    wx.navigateTo({
      url: '/pages/todo/todo?demandId='+demandId+'&image='+image,
    })
  },
  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },
})
