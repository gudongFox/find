// pages/todoService/todoService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partnerName:"",
    partnerGender:"",
    partnerAge:"",
    partnerPhoneNum:"",
    partnerLocation:"",
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var serverId = options.partnerId;
    var requestUrl = "http://129.211.68.243:8080/server/getServerInfo/" + serverId;
    wx.request({
      url: requestUrl,
      method:"GET",
      header:{
        'content-type': 'application/json' // GET方式
      },
      success(res){
        // 判断性别
        var gender = "未知"
        if(res.data.serverGender == 1){
          gender = "男";
        }else if(res.data.serverGender == 2){
          gender = "女";
        }
        // 设置data
        that.setData({
          partnerName:res.data.serverName,
          partnerGender:gender,
          partnerAge:res.data.serverAge,
          partnerPhoneNum:res.data.serverTel,
          partnerLocation:res.data.serverLocation,
        })
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