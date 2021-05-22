// pages/mine/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var clientInfo = JSON.parse(decodeURIComponent(options.URINewInfo));
    // 解析性别
    if (clientInfo.clientGender == 1) {
      clientInfo.clientGender = "男";
    } else if (clientInfo.clientGender == 2) {
      clientInfo.clientGender = "女";
    } else {
      clientInfo.clientGender = "未知";
    }
    that.setData({
      clientInfo:clientInfo
    })
  },
  toChangeMyInfo:function(){
    var clientInfo = this.data.clientInfo
    var URINewInfo = encodeURIComponent(JSON.stringify(clientInfo));
    wx.navigateTo({
      url: '/pages/mine/changeMyInfo/changeMyInfo?URINewInfo='+URINewInfo,
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

  }
})