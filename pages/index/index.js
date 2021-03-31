//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    active: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    option1: [
      { text: '全部商品', value: 0 },
      { text: '新款商品', value: 1 },
      { text: '活动商品', value: 2 },
    ],
    value1: 0
  },

  onLoad: function () {
    wx.login({
      success: function(res) {
        console.log('进入login方法')
        var code = res.code;
        console.log(code);
        wx.request({
          url: 'https://api.wexin.qq.com/sns/jscode2session',
          method: 'GET',
          data: {
            appid: 'wx3d2c71c080e41cf9',
            secret: '1ed37421758b2a94c83c30e52f3d8e5d',
            js_code: code
          },
          success: function (res) {
            var openid = ''
            openid = res.data.openid;
            console.log(openid)
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
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // tabbar切换
  onShow: function () {
    this.getTabBar().init();
  },
  onclick: function () {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  }
})
