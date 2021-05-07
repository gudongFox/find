// pages/record/serverInfo/serverInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server: {
      serverId: 0,
      serverName: "张老师",
      gender: "女",
      serverAge: "48",
      servertype: "家庭保洁/钟点工",
      serverLocation: "虎溪花园，4栋3-3-1",
      times: "7",
      remark: "服务质量不错"
      }
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
        that.setData({
          server:list
        })
      }
    })
  }
})