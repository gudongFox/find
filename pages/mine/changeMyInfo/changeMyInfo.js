// pages/mine/changeMyInfo/changeMyInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientId:'',
    clientSessionKey:'',
    clientName:'',
    clientGender:'',
    clientAge:'',
    clientTel:'',
    clientLocation:'',
    clientProfile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var clientInfo = JSON.parse(decodeURIComponent(options.URINewInfo));
    that.setData({
      clientId:clientInfo.clientId,
      clientSessionKey:clientInfo.clientSessionKey,
      clientName:clientInfo.clientName,
      clientGender:clientInfo.clientGender,
      clientAge:clientInfo.clientAge,
      clientTel:clientInfo.clientTel,
      clientLocation:clientInfo.clientLocation,
      clientProfile:clientInfo.clientProfile
    })
  },
  saveInfo:function(){
    var that = this
    var clientGender = that.data.clientGender
    if(clientGender == "男"){
      clientGender = 1
    }else{
      clientGender = 2
    }
    console.log(that.data.clientId)
    console.log(that.data.clientSessionKey)
    console.log(that.data.clientName)
    console.log(that.data.clientGender)
    console.log(that.data.clientAge)
    console.log(that.data.clientTel)
    console.log(that.data.clientLocation)
    console.log(that.data.clientProfile)

    wx.request({
      url: 'http://101.34.21.175:8080/client/info',
      method: 'PATCH',
      data:{
        "clientId":that.data.clientId,
        "clientSessionKey":that.data.clientSessionKey,
        "clientName":that.data.clientName,
        "clientGender":clientGender,
        "clientAge":that.data.clientAge,
        "clientTel":that.data.clientTel,
        "clientLocation":that.data.clientLocation,
        "clientProfile":that.data.clientProfile
      },
      success:function(res){
        console.log(res)
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