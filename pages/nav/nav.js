// pages/nav/nav.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jump:function(){
    wx.switchTab({
      url: '../record/record',
    })
   },
   jump1:function(){
    wx.reLaunch({
      url: '../indexs/indexs',
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: function(res) {
        console.log('进入login方法')
        var code = res.code;
        console.log(code);
        wx.request({
          url: 'http://localhost:8080/login/login',
          method: 'GET',
          data: {
            code: code
          },
          success: function (res) {
            var openid = res.data
            wx.setStorageSync('openid', openid)
            console.log(openid)
            wx.request({
              url: 'http://localhost:8080/client/info',
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'GET',
              data:{
                clientId: openid
              },
              success:function(res){
                //后台如果存在用户信息
                console.log(res)
                if(res.data.data != null){
                  wx.setStorageSync('openid', openid)
                  console.log("用户存在后台")
                }else{
                        wx.showToast({
                        title: '请授权登录！',
                        icon: 'none',
                        duration: 1500,
                        success: function () {
                        //定时器，未授权1.5秒后跳转授权页面
                        setTimeout(function () {
                        wx.reLaunch({
                          url: '../login/login',
                        })
                      }, 1500);
                     }
                   })
                }
              }
            })
          },
          fail: function (res) {
                console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res);
              }
        });
      },
      fail: function(){
        console.log('调用失败')
      }
    });
 
   // 判断用户是否授权登录
    // wx.getSetting({
    //   success: function (res) {
    //     console.log(1)
    //     console.log(res)
    //     // 判断是否授权
    //     if (res.authSetting['scope.userInfo']) {
    //        //获取用户信息
    //        wx.getUserProfile({
    //         desc:'正在获取',
    //         success: function (res) {
    //           console.log(2)
    //           //用户已经授权过，添加用户信息
    //           var that = this
    //           wx.setStorageSync('nickName', res.userInfo.nickName)
    //           wx.setStorageSync('avatarUrl', res.userInfo.avatarUrl)
    //           console.log(wx.getStorageSync('avatarUrl'))
    //         },
    //         fail:function(err){
    //           console.log("获取失败")
    //         }
    //       });
    //     }else{
    //       wx.showToast({
    //          title: '请授权登录！',
    //          icon: 'none',
    //          duration: 1500,
    //          success: function () {
    //       //定时器，未授权1.5秒后跳转授权页面
    //          setTimeout(function () {
    //          wx.reLaunch({
    //          url: '../login/login',
    //             })
    //           }, 1500);
    //          }
    //         })
    //     }
    //   }
    // })
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