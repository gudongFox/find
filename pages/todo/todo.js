// pages/manage/todo/todo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNumber: '2021.5.5',
    time:'待服务人处理',
    clientName: '马先生',
    tel: '13368227224',
    location: '重庆市南岸区花红路',
    doorNumber: '城南家园五组团一栋一单元11-5',
    serviceType: '家庭保洁',
    serverName: '王阿姨',
    beginTime: '2021-5-5 8:00',
    remark: ''

  },
  onLoad:function(e){
    var that = this
    var demandId = e.id
    wx.request({
      url: 'http://localhost:8080/demand/detail/'+demandId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success:function(res){
        console.log(res)
        var list = res.data
        console.log(list)
        that.setData({
        })
      }
    })
  }
  
})