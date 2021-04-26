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
        text: '2 -填写订单内容',
        
      },
      {
        text: '3 -选择服务人',
        
      },
      {
        text: '4 -服务人形成订单',
        
      }
    ],
    kinds: [
      {text: '家庭保洁'},
      {text: '商业保洁'},
    ],
    user: [
      {id: null},
      {name: '李先生'},
      {tel: '13368227224'},
      {location: '成都市锦江文化中心'},
      {number: '虎溪花园，4-5-6-1'}
    ],
    date: null,
    time: null,
    price: null,
    times: null,
    remark: null
  },
  onChange(event) {
    console.log(event.detail)
  },

  formSubmit: function(e){
    this.setData({
      date: e.detail.value.date,
      time: e.detail.value.time,
      price: e.detail.value.price,
      times: e.detail.value.times,
      remark: e.detail.value.remark
    })
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
  },
  chooseServer:function(){
    wx.navigateTo({
      url: '../add/chooseServer/chooseServer',
      success:function(res){
        console.log("选择客户");
      },
      fail:function(res){
        console.log("跳转失败");
      }
    })
  },

  onLoad:function(option){
    //获得客户信息
    console.log(option)
    this.setData({
      'user[0].id': option.id
    })
    console.log(this.data.user[0].id)
  }
})