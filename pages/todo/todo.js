// pages/manage/todo/todo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNumber: '',
    time:'待服务人处理',
    clientName: '马先生',
    tel: '13368227224',
    location: '重庆市南岸区花红路',
    doorNumber: '',
    serviceType: '家庭保洁',
    serverName: '王阿姨',
    beginTime: '2021-5-5 8:00',
    times: '',
    remark: '',
    intervalDays: ''

  },
  onLoad:function(e){
    var that = this
    var demandId = e.demandId
    wx.request({
      url: 'http://129.211.68.243:8080/demand/detail/',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      data:{
        demandId: demandId,
        clientId: wx.getStorageSync('openid')
      },
      success:function(res){
        console.log(res)
        var clientInfo = res.data.data.clientInfo
        var demandsInfo = res.data.data.demandsInfo
        that.setData({
          clientName:clientInfo.clientName,
          tel: clientInfo.clientTel,
          location: clientInfo.clientLocation,
          serviceType: demandsInfo[0].serviceProject,
          serverName: demandsInfo[0].serverName,
          beginTime: demandsInfo[0].startTime,
          times: demandsInfo[0].times,
          remark:demandsInfo[0].demandComment,
          intervalDays: demandsInfo[0].intervalDays
        })
      }
    })
  }
  
})