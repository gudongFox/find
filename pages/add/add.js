// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demand:{demandId:"",clientId:"",serviceProject:"",mandatorId:"0",startTime:"",endTime:"",times:"",intervalDays:"0",demandComment:""},
    believeServerList:[
      {clientInfo:{},serverInfo:{serverAge:30,serverGender:1,serverId:"0",serverLocation:"",serverName:"",serverSessionKey:"",serverTel:"",imageUrl:'https://img.yzcdn.cn/vant/cat.jpeg'}},
    ],
    // 上门日期选择器相关
    isShowDateSelection:false,
    isShowTimeSelection: false,
    showServiceKind: false,
    showCustomer: false,
    showTime: false,
    showTeam:false,
    end:false, 
    steps: [
      {
        text: '1 -选择服务类型',
      },
      {
        text: '2 -填写订单内容',
      },
      {
        text: '3 -选择服务人',
      },
      {
        text: '4 -服务人形成订单',
      }
    ],
    serviceProject: [
      {id:0,text: '家庭保洁'},
      {id:1,text: '商业保洁'},
    ],
    hour: null,
    day: null,
    time: null,
    times: null,
    demandComment: null
  },
  // 设置上门日期
  setServiceDate:function(){
    this.setData({
      isShowDateSelection:true
    })
  },
  confirmDate:function(val){
    let dateObj = new Date(val.detail);
    let y = dateObj.getFullYear();
    let m = dateObj.getMonth() + 1;
    let d = dateObj.getDate(); 
    this.setData({
      day:y + "-" + m + "-" + d,
      isShowDateSelection:false
    })
  },
  cancelDate:function(){
    this.setData({
      isShowDateSelection:false
    })
  },
  // 设置上门时间
  setServiceTime:function(){
    this.setData({
      isShowTimeSelection:true
    })
  },
  confirmTime:function(val){
    this.setData({
      time:val.detail,
      isShowTimeSelection:false
    })
  },
  cancelTime:function(){
    this.setData({
      isShowTimeSelection:false
    })
  },
  onChange(event) {
    console.log(event.detail)
  },
  chooseServicePerson:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/add/chooseServer/chooseServer?id='+id,
      success:function(res){
        console.log("选择服务人");
      },
      fail:function(res){
        console.log("跳转失败");
      }
    })
  },
  show1:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id
    that.setData({
      showServiceKind: true,
      ['demand.serviceProject']: that.data.serviceProject[id].text
    })
  },
  change1:function(){
    var that = this;
    that.setData({
      showServiceKind: false
    })
  },
  show3:function(e){
    var that = this;
    var demand = that.data.demand
    var endT = that.data.time
    var temp = Number(endT.substring(0,2))
    temp = temp + Number(that.data.hour)
    temp = temp.toString()
    endT = temp + endT.substring(2,endT.length)
    console.log(endT)

    that.setData({
      showTime: true,
      ['demand.clientId']: wx.getStorageSync('openid'),
      ['demand.startTime']: that.data.day + " " + that.data.time + ":00",
      ['demand.endTime']: that.data.day + " " + endT + ":00",
      ['demand.times']: that.data.times,
      ['demand.demandComment']: that.data.demandComment
    }),
    console.log(demand)
    wx.setStorageSync('demand', demand)
    console.log(wx.getStorageSync('demand'))
  },
  change3:function(){
    var that = this;
    that.setData({
      showTime: false
    })
  },
  show4:function(e){
    var that = this;
    that.setData({
      showTeam: true,
      end: true
    })
  },
  change4:function(){
    var that = this;
    that.setData({
      showTeam: false,
      end: false
    })
  },
  backIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad:function(option){
    var that = this
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: 'http://129.211.68.243:8080/client_server/info',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      data:{
        clientId: openid
      },
      success:function(res){
        console.log(res)
        var list = res.data.data
        console.log(list)
        that.setData({
          believeServerList:list
        })
      }
    })
  },
  onShow:function(option){
    
  }
})