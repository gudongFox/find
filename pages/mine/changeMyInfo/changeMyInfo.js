// pages/mine/changeMyInfo/changeMyInfo.js
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
    that.setData({
      clientInfo:clientInfo
    })
  },
  saveInfo:function(){
    var that = this
    var clientInfo = that.data.clientInfo
    if(clientInfo.clientGender == "男"){
      clientInfo.clientGender = 1
    }else{
      clientInfo.clientGender = 2
    }
    wx.request({
      url: 'http://129.211.68.243:8080/client/info',
      method: 'PATCH',
      data:{
        "clientId":clientInfo.clientId,
        "clientSessionKey":clientInfo.clientSessionKey,
        "clientName":clientInfo.clientName,
        "clientGender":clientInfo.clientGender,
        "clientAge":clientInfo.clientAge,
        "clientTel":clientInfo.clientTel,
        "clientLocation":clientInfo.clientLocation,
        "clientProfile":clientInfo.clientProfile
      },
      success:function(){
        console.log("保存成功")
      }
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