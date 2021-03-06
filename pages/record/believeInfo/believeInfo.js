// pages/record/serverInfo/serverInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    server: {},
    showSchedule: false
  },
  onLoad:function(e){
    var that = this
    var serverId = e.id
    let myComponent = that.selectComponent('#myComponent')
    myComponent.query(serverId);
    wx.request({
      url: 'http://101.34.21.175:8080/server/getServerInfo/'+serverId,
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
  },
  showSchedules:function(){
    var that = this
    that.setData({
      showSchedule: true
    })
  }
})