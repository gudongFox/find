// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
        text: '2 -录入客户信息',
        
      },
      {
        text: '3 -确定上门时间',
        
      },
      {
        text: '4 -选服务候选人',
        
      },
      {
        text: '5 -形成订单',
        
      },
    ],
    kinds: [
      {text: '家庭保洁'},
      {text: '商业保洁'},
      {text: '钟点工'},
      {text: '护工'},
    ],
    user: [
      {name: '李先生'},
      {tel: '13368227224'},
      {location: '成都市锦江文化中心'},
      {number: '虎溪花园，4-5-6-1'}
    ]
    
  },
  onChange(event) {
    console.log(event.detail)
  },
  show1:function(e){
    var that = this;
    that.setData({
      showServiceKind: true
    })
  },
  change1:function(){
    var that = this;
    that.setData({
      showServiceKind: false
    })
  },
  show2:function(e){
    var that = this;
    that.setData({
      showCustomer: true
    })
  },
  change2:function(){
    var that = this;
    that.setData({
      showCustomer: false
    })
  },
  show3:function(e){
    var that = this;
    that.setData({
      showTime: true
    })
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
  }


})