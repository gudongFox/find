var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
  },

  /* 组件的初始数据 */
  data: {
    serverId:"",
    serverProfile:"https://thirdwx.qlogo.cn/mmopen/vi_32/sHPrgfrTWlUuMveposfYmp2l1suPricsaxuP5OX3WnX8vye9QqcbMfwBZbibg18NkRJ247UPgWtH0l5icOwicyXQHA/132",
    serverName:"",
    serverLocation:"",
    
    numClient:0,
    numPartner:0,
    numOrder:0,
    numDelegation:0,
  },
  

  /* 组件声明周期函数 */
  lifetimes: {
    ready: function () {
      var that = this;
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      serverId = "liling";
      // 获取姓名、地址
      wx.request({
        url: "http://localhost:8080/server/getServerInfo/" + serverId,
        method:"GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success (res) {
          that.setData({
            serverId: serverId,
            serverName:res.data.serverName,
            serverLocation:res.data.serverLocation,
          })
        }
      })
      // 获取客户数
      wx.request({
        url: "http://localhost:8080/server/getClient/" + serverId,
        method:"GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success (res) {
          that.setData({
            numClient: res.data.length,
          })
        }
      })
      // 获取伙伴数目
      wx.request({
        url: "http://localhost:8080/server/getPartner/" + serverId,
        method:"GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success (res) {
          that.setData({
            numPartner: res.data.length,
          })
        }
      })
      // 获取所有订单
      wx.request({
        url: "http://localhost:8080/server/getAllOrder/" + serverId,
        method:"GET",
        header: {
          'content-type': 'application/json' // GET方式
        },
        success (res) {
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
    logout:function(){
      wx.navigateTo({
        url: '/pages/nav/nav',
      })
    },
    
    clickInfo:function(){
      wx.navigateTo({
        url: '/pages/infoServer/infoServer?serverId=' + this.data.serverId,
      })
    },
  
  }

})