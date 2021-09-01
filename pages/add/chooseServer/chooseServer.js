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
    serverId: '',
    demand: {},
    direct: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(e){
    var that = this
    let myComponent = that.selectComponent('#myComponent')
    var serverId = e.id
    myComponent.query(serverId);
    console.log(wx.getStorageSync('demand'))
    var demand = wx.getStorageSync('demand')
    wx.request({
      url: 'http://101.34.21.175:8080/server/getWorkTime/'+serverId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success:function(res){
        console.log(res)
        var list = res.data.serverInfo
        console.log(list)
        if(list.serverGender == 1){
          list.serverGender = "男"
        }else{
          list.serverGender = "女"
        }
        list.servertype = demand.serviceProject
        list.times = demand.directServeTimes
        that.setData({
          server:list,
          direct: demand.direct,
          serverId: serverId
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
    var demand = wx.getStorageSync('demand')
    var server = that.data.server
    var mandator = demand.direct == true ? 0 : 1
    console.log(demand)
    wx.request({
      url: 'http://101.34.21.175:8080/demand/detail',
      header: {'content-type': 'application/json'},
      method: 'POST',
      data:{
        "demandId": demand.demandId,
        "clientId": demand.clientId,
        "demandComment": demand.demandComment,
        "endTime": demand.endTime,
        "intervalDays": demand.serviceInterval,
        "mandatorId": demand.mandatorId,
        "serverId": server.serverId,
        "serviceProject": demand.serviceProject,
        "startTime": demand.startTime,
        "times": demand.times,
        "mandatorId": mandator
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