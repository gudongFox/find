const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: "",
    isHide: true,
    id: '',
    name: ''
  },

  onLoad: function () {
  },

  bindGetUserInfo: function (e) {
    wx.getUserProfile({
      desc:'正在获取',//不写不弹提示框
    success:function(res){
      app.globalData.userInfo=res.userInfo //存储用户信息
      console.log(res.userInfo.avatarUrl)
      wx.request({
        url: 'http://129.211.68.243:8080/client/info',
        // url: 'http://localhost:8080/client/info',
        method: 'POST',
        data:{
          "clientId":wx.getStorageSync('openid'),
          "clientSessionKey":"test",
          "clientName":res.userInfo.nickName,
          "clientGender":res.userInfo.gender,
          "clientAge":18,
          "clientTel":"13368227224",
          "clientLocation":"北京市",
          "clientProfile":res.userInfo.avatarUrl
        }
      })
      wx.request({
        url: 'http://129.211.68.243:8080/server/info',
        // url: 'http://localhost:8080/server/info',
        method: 'POST',
        data:{
          "serverId":wx.getStorageSync('openid'),
          "serverSessionKey":"test",
          "serverName":res.userInfo.nickName,
          "serverGender":res.userInfo.gender,
          "serverAge":18,
          "serverTel":"13368227224",
          "serverLocation":res.userInfo.province+" "+res.userInfo.city,
          "serverProfile":res.userInfo.avatarUrl
        }
      })
      console.log('获取成功: ',res)
      wx.showToast({
        title:'授权成功',
        mask:true
      }),
      setTimeout(res=>{
        //跳转到上级界面
        wx.redirectTo({
          url: '../nav/nav',
        })
      }, 1500)
    },
    fail:function(err){
      console.log("获取失败: ",err)
      wx.redirectTo({
        url: '../nav/nav',
      })
    }
  })
  }
})