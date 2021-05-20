// pages/record/serverInfo/serverInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server: {}
  },
  onLoad:function(e){
    var that = this
    var serverId = e.id
    wx.request({
      url: 'http://129.211.68.243:8080/server/getServerInfo/'+serverId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success:function(res){
        console.log(res)
        var list = res.data
        console.log(list)
        if(list.serverGender == 1){
          list.serverGender = "男"
        }else{
          list.serverGender = "女"
        }
        that.setData({
          server:list
        })
      }
    })
  }
})