// pages/component/manage/manage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeTab: 0,

    demandList: [
      // {
      //   clickUrl:"/pages/newDemandServer/newDemandServer",
      //   iconName:"wap-home-o",
      //   serviceProject:"家庭保洁",
      //   clientName:"马先生",
      //   serviceTime:"上门时间：未定",
      //   isMulti:"多次",
      //   clientLocation:"虎溪花园，4栋5-1",
      //   serviceStatus:"待处理",
      // },
    ],

    substituteList: [
      // {
      //   substituteClickUrl:"/pages/serverSubstitute/serverSubstitute",
      //   substitutedClientProfile:"https://img.yzcdn.cn/vant/cat.jpeg",
      //   substitutedClientName:"王阿姨",
      //   substitutedServiceObj:"家庭保洁",
      //   substitutedClientLocation:"成都市锦兴路",
      //   serviceTimes:"服务(13)",
      //   substituteTimes:"委托(7)",
      // },
    ],

    maxDistance: 1,
    maxInterDistance: 1,
    minServicLength: 1.0,
    maxInterLength: 1.0,
  },


  /*
  组件的生命周期方法
  */
  lifetimes: {
    ready: function () {
      this.clickTab();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeTab: function (event) {
      this.setData({
        activeTab: event.detail.name,
      });
    },

    clickTab: function () {
      var that = this;
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      serverId = "liling";
      if (that.data.activeTab == 0) {
        // 查询客户新需求
        wx.request({
          url: "http://localhost:8080/server/getDemand/" + serverId,
          method: "GET",
          header: {
            'content-type': 'application/json' // GET方式
          },
          success(res) {
            // console.log(res);
            var demandList = [];
            for (var i = 0; i < res.data.length; i++) {
              var clientInfo = res.data[i].client;
              var demandInfo = res.data[i].demand;
              var iconName = "wap-home-o";
              if (demandInfo.serviceProject == "商业保洁") {
                iconName = "hotel-o";
              } else if (res.data[i].servicePeoject == "钟点工") {
                iconName = "underway-o";
              }
              var serviceTime = "上门时间：未定";
              if (demandInfo.startTime != null) {
                var startTime = demandInfo.startTime;
                serviceTime = startTime.substring(5, 7) + "/" + startTime.substring(8, 10) + " " + startTime.substring(11, 13) + ":" + startTime.substring(14, 16)
              }
              // 先对数据进行JSON
              // 再对数据进行URI编码, 如果不进行这一步操作, 数据有可能会被截断, 少量数据没有问题, 如果是一个大的对象, 就容易被截断获取不到完整的数据
              var URIClientInfo = encodeURIComponent(JSON.stringify(clientInfo))
              var URIDemandInfo = encodeURIComponent(JSON.stringify(demandInfo))
              var tmp = {
                clickUrl: "/pages/newDemandServer/newDemandServer?URIClientInfo=" + URIClientInfo + "&URIDemandInfo=" + URIDemandInfo,
                iconName: iconName,
                serviceProject: demandInfo.serviceProject,
                clientName: clientInfo.clientName,
                serviceTime: serviceTime,
                isMulti: demandInfo.times + "次",
                clientLocation: clientInfo.clientLocation,
                serviceStatus: "待处理",
              };
              demandList.push(tmp);
            }
            that.setData({
              demandList: demandList,
            })
          }
        })
      } else if (that.data.activeTab == 1) {
        // 查询直接客户名单
        wx.request({
          url: "http://localhost:8080/server/getClient/" + serverId,
          method: "GET",
          header: {
            'content-type': 'application/json' // GET方式
          },
          success(res) {
            // console.log(res);
            var substituteList = [];
            var listLen = res.data.length;
            for (var i = 0; i < listLen; i++) {
              var clientInfo = res.data[i];
              if (clientInfo.mostProject == null) {
                clientInfo.mostProject = "暂无";
              }
              // 先对数据进行JSON
              // 对数据进行URI编码, 如果不进行这一步操作, 数据有可能会被截断, 少量数据没有问题, 如果是一个大的对象, 就容易被截断获取不到完整的数据
              var URIClientInfo = encodeURIComponent(JSON.stringify(clientInfo))
              var tmp = {
                substituteClickUrl: "/pages/serverSubstitute/serverSubstitute?URIClientInfo=" + URIClientInfo,
                substitutedClientProfile: "",
                substitutedClientName: clientInfo.clientInfo.clientName,
                substitutedServiceObj: clientInfo.mostProject,
                substitutedClientLocation: clientInfo.clientInfo.clientLocation,
                serviceTimes: "服务(" + clientInfo.orderNum + ")",
                substituteTimes: "委托(" + clientInfo.ManOrderNum + ")",
              };
              substituteList.push(tmp);
            }
            that.setData({
              substituteList: substituteList,
            })
          }
        })
      }
    },

    // 改变出发上门最大距离
    changeMaxDis: function (event) {
      var that = this;
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      serverId = "liling";
      var maxDistance = event.detail;
      var maxInterDistance = that.data.maxInterDistance;
      var minServicLength = that.data.minServicLength;
      var maxInterLength = that.data.maxInterLength;
      var requestUrl = "http://localhost:8080/server/updateServerParameter/" + serverId + "/" + maxDistance + "/" + maxInterDistance + "/" + minServicLength + "/" + maxInterLength;
      wx.request({
        url: requestUrl,
        method: "POST",
        header: {
          // 'content-type': 'application/json' // GET方式
          "content-type": "application/x-www-form-urlencoded" // POST方式
        },
        success(res) {
          that.setData({
            maxDistance: event.detail,
          })
        }
      })
    },
    // 改变两单间隔最大距离
    changeMaxInterDis: function (event) {
      var that = this;
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      serverId = "liling";
      var maxDistance = that.data.maxDistance;
      var maxInterDistance = event.detail;
      var minServicLength = that.data.minServicLength;
      var maxInterLength = that.data.maxInterLength;
      var requestUrl = "http://localhost:8080/server/updateServerParameter/" + serverId + "/" + maxDistance + "/" + maxInterDistance + "/" + minServicLength + "/" + maxInterLength;
      wx.request({
        url: requestUrl,
        method: "POST",
        header: {
          // 'content-type': 'application/json' // GET方式
          "content-type": "application/x-www-form-urlencoded" // POST方式
        },
        success(res) {
          that.setData({
            maxInterDistance: event.detail,
          })
        }
      })
    },
    // 改变最小服务时长
    changeMinServiceLen: function (event) {
      var that = this;
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      serverId = "liling";
      var maxDistance = that.data.maxDistance;
      var maxInterDistance = that.data.maxInterDistance;
      var minServicLength = event.detail;
      var maxInterLength = that.data.maxInterLength;
      var requestUrl = "http://localhost:8080/server/updateServerParameter/" + serverId + "/" + maxDistance + "/" + maxInterDistance + "/" + minServicLength + "/" + maxInterLength;
      wx.request({
        url: requestUrl,
        method: "POST",
        header: {
          // 'content-type': 'application/json' // GET方式
          "content-type": "application/x-www-form-urlencoded" // POST方式
        },
        success(res) {
          that.setData({
            minServicLength: event.detail,
          })
        }
      })
    },
    // 改变两单间隔最大时间
    changeMaxInterLen: function (event) {
      var that = this;
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      serverId = "liling";
      var maxDistance = that.data.maxDistance;
      var maxInterDistance = that.data.maxInterDistance;
      var minServicLength = that.data.minServicLength;
      var maxInterLength = event.detail;
      var requestUrl = "http://localhost:8080/server/updateServerParameter/" + serverId + "/" + maxDistance + "/" + maxInterDistance + "/" + minServicLength + "/" + maxInterLength;
      wx.request({
        url: requestUrl,
        method: "POST",
        header: {
          // 'content-type': 'application/json' // GET方式
          "content-type": "application/x-www-form-urlencoded" // POST方式
        },
        success(res) {
          that.setData({
            maxInterLength: event.detail,
          })
        }
      })
    },

  },
})