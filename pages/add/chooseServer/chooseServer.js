// pages/add/chooseCustomer/chooseCustomer.js
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
      },
      demand: wx.getStorageSync('demand')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(e){
    var that = this
    var serverId = e.id
    wx.request({
      url: 'http://localhost:8080/server/getServerInfo/'+serverId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success:function(res){
        var list = res.data
        console.log(that.data.demand)
        that.setData({
          server:list
        })
      }
    })
  },
  backAdd: function(option){
    wx.navigateBack({
      delta: 1,
    })
  },
  backIndex: function(){
    var that = this;
    var demand = that.data.demand
    var server = that.data.server
    wx.request({
      url: 'http://localhost:8080/demand/detail',
      header: {'content-type': 'application/json'},
      method: 'POST',
      data:{
        "demandId": demand.demandId,
        "clientId": demand.clientId,
        "demandComment": demand.demandComment,
        "demandId": demand.demandId,
        "endTime": '',
        "intervalDays": demand.intervalDays,
        "mandatorId": demand.mandatorId,
        "serverId": server.serverId,
        "serviceProject": demand.serviceProject,
        "startTime": '',
        "times": demand.times
      },
      success:function(res){
        console.log('保存成功')
        wx.switchTab({
          url: '/pages/index/index',
        })
        let pages = getCurrentPages()
        let prePage = pages[pages.length - 3]
        prePage.onLoad()
        
      },
      fail:function(res){
        console.log('保存失败')
      }
    })
  }
})