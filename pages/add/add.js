// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    demand:{},
    believeServerList:[],
    // 上门日期选择器相关
    isShowDateSelection:false,
    isShowTimeSelection: false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    currentTime: "12:00",
    showServiceKind: false,
    showCustomer: false,
    showTime: false,
    showTeam:false,
    end:false, 
    flag: false,
    steps: [
      {
        text: '1 -选择服务类型',
      },
      {
        text: '2 -填写订单内容(可暂不填)',
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
    hour: 0,
    day: '2021-05-18',
    time: "12:00",
    times: 1,
    demandComment: "",
    serviceInterval: 0
  },
  //默认时间
  onLoad:function(){
    var that = this
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    var h = date.getHours() + 1
    month = month > 9 ? month : '0'+month
    day = day > 9 ? day : '0' + day
    h = h > 9 ? h : '0' + h
    that.setData({
      day: year + '-' + month + '-' + day,
      time: h + ":00"
    })
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
    m = m > 9 ? m : '0'+m
    let d = dateObj.getDate(); 
    d = d > 9 ? d : '0'+d
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
  // 设置服务时长
  setHour: function (e) {
    this.setData({
      hour: e.detail
    })
  },
  // 设置总次数
  setTimes: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  // 设置周期
  setServiceInterval: function (e) {
    this.setData({
      serviceInterval: e.detail
    })
  },
  // 设置备注
  setDemandComment: function (e) {
    this.setData({
      demandComment: e.detail.value
    })
  },
  // 设置总次数
  setServiceTotalTimes: function (e) {
    this.setData({
      times: e.detail
    })
  },
  chooseServicePerson:function(e){
    console.log(e)
    var that = this
    var id = e.currentTarget.dataset.id
    var list = that.data.believeServerList
    for(var i = 0; i < list.length; i++){
      if(id == list[i].serverInfo.serverId){
        that.setData({
          ['demand.direct']:list[i].direct,
          ['demand.directServeTimes']: list[i].directServeTimes
        })
        wx.setStorageSync('demand', that.data.demand)
      }
    }
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
    that.setData({
      showTime: true,
      ['demand.clientId']: wx.getStorageSync('openid'),
      ['demand.startTime']: that.data.day + " " + that.data.time + ":00",
      ['demand.endTime']: that.data.day + " " + endT + ":00",
      ['demand.times']: that.data.times,
      ['demand.demandComment']: that.data.demandComment,
      ['demand.serviceInterval']: that.data.serviceInterval
    }),
    console.log(demand)
    var begin = that.data.day
    that.showServer(begin,demand.startTime)
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
  //服务人信息
  showServer:function(day,startTime){
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
        var list = res.data.data
        var list1 = []
        console.log(list.length)
        for(var i = 0; i < list.length; i++){
          that.serverTime(list[i],day,startTime)
          that.getImage(list[i])
          list1.push(list[i])
        }
        setTimeout(()=>{
          that.setData({
            believeServerList:list1
          })
          console.log(list1)
        },100)
      }
    })
  },
  //根据下单时间查询每个服务人的当前时间可不可以接服务
  serverTime:function(list,day,serverTime){
    var that = this
    var serverId = list.serverInfo.serverId
    wx.request({
      url: 'http://129.211.68.243:8080/server/getOrderByDate/'+serverId+'/'+day,
      method: 'GET',
      success:function(res){
        var serverList = res.data
        if(serverList.length == 0 || serverList == null){
          console.log("不存在订单")
          list.direct = true
        }
        for(var i = 0;i < serverList.length; i++){
          if(serverList[i].orderInfo.startTime == serverTime){
            console.log("时间冲突")
            list.direct = false
          }else{
            list.direct = true
          }
        }
      }
    })
  },
  //获取头像
  getImage: function(list){
    var serverId = list.serverInfo.serverId
    wx.request({
      url: 'http://129.211.68.243:8080/server/info',
      method:"GET",
      data:{
        serverId: serverId,
      },
      success:function(res){
        var imageUrl = res.data.data.serverInfo.serverProfile
        list.imageUrl = imageUrl
      }
    })
  }
})