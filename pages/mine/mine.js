// pages/mine/mine.js
var image_scr = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:65,
    total:207,
    success:95.4+'%',
    score:3.5,
    myImage: "https://img.yzcdn.cn/vant/cat.jpeg",
    name:"咕咚",
    clientInfo:[]
  },
  click:function(){
    wx.redirectTo({
      url: '../nav/nav',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    wx.request({
      url: 'http://101.34.21.175:8080/client/info',
      method:"GET",
      data:{
        clientId:wx.getStorageSync('openid')
      },
      success:function(res){
        var clientInfo = res.data.data.client
        console.log(res)
        console.log(clientInfo.clientProfile)
        that.setData({
          myImage: clientInfo.clientProfile,
          name: clientInfo.clientName,
          clientInfo:clientInfo
        })
      }
    })
  },
  toMyInfo:function(){
    var clientInfo = this.data.clientInfo
    var URINewInfo = encodeURIComponent(JSON.stringify(clientInfo));
    wx.navigateTo({
      url: '/pages/mine/myInfo/myInfo?URINewInfo='+URINewInfo,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onShow: function(){
    this.getTabBar().init();
  }
})