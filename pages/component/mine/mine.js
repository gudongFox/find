import QRCode from "../../../utils/weapp-qrcode.js"
import drawQrcode from "../../../utils/weapp.qrcode.esm.js"
var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {},

  /* 组件的初始数据 */
  data: {
    serverId: "",
    serverProfile: "",
    serverName: "",
    serverLocation: "",

    numClient: 0,
    numPartner: 0,
    numOrder: 0,
    numDelegation: 0,

    showQR: false,
    winWidth: 375,
    popWidth: 375 / 2,
    qrWidth: 375 / 2 - 20,
  },


  /* 组件声明周期函数 */
  lifetimes: {
    ready: function () {
      var that = this;
      // 获取屏幕宽度与高度
      var winWidth = wx.getSystemInfoSync().windowWidth;
      that.setData({
        winWidth: winWidth,
        popWidth: winWidth / 2,
        qrWidth: winWidth / 2 - 20,
      });
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      // serverId = "liling";
      // 获取姓名、地址
      wx.request({
        url: "http://129.211.68.243:8080/server/getServerInfo/" + serverId,
        method: "GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success(res) {
          that.setData({
            serverId: serverId,
            serverProfile: res.data.serverProfile,
            serverName: res.data.serverName,
            serverLocation: res.data.serverLocation,
          })
        }
      })
      // 获取客户数
      wx.request({
        url: "http://129.211.68.243:8080/server/getClient/" + serverId,
        method: "GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success(res) {
          that.setData({
            numClient: res.data.length,
          })
        }
      })
      // 获取伙伴数目
      wx.request({
        url: "http://129.211.68.243:8080/server/getPartner/" + serverId,
        method: "GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success(res) {
          that.setData({
            numPartner: res.data.length,
          })
        }
      })
      // 获取所有订单
      wx.request({
        url: "http://129.211.68.243:8080/server/getAllOrder/" + serverId,
        method: "GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success(res) {
          that.setData({
            numOrder: res.data.length,
          })
        }
      })
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    logout: function () {
      wx.navigateTo({
        url: '/pages/nav/nav',
      })
    },

    clickInfo: function () {
      wx.navigateTo({
        url: '/pages/infoServer/infoServer?serverId=' + this.data.serverId,
      })
    },

    getQRCode: function (options) {
      // wx.navigateTo({
      //   url: '/pages/makeQRCode/makeQRCode',
      // })
      this.setData({
        showQR: true,
      });
      drawQrcode({
        width: this.data.qrWidth,
        height: this.data.qrWidth,
        canvasId: 'myQrcode',
        text: wx.getStorageSync('openid'),
        _this: this,
        x: 10,
        y: 10,
      })
    },

    closeQR: function () {
      this.setData({
        showQR: false,
      });
    },


  }

})