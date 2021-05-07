// pages/todoService/todoService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serverId: "",
    name:"",
    gender:"",
    age:"",
    phoneNum:"",
    location:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      serverId: options.serverId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var serverId = that.data.serverId;
    var requestUrl = "http://129.211.68.243:8080/server/getServerInfo/" + serverId;
    wx.request({
      url: requestUrl,
      method:"GET",
      header: {
        'content-type': 'application/json' // GET方式
      },
      success (res) {
        var gender = "未知";
        if(res.data.serverGender == 1){
          gender = "男"
        }
        else if(res.data.serverGender == 2){
          gender = "女"
        }
        that.setData({
          name:res.data.serverName,
          gender: gender,
          age:res.data.serverAge,
          phoneNum:res.data.serverTel,
          location:res.data.serverLocation,
        })
      }
    })
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