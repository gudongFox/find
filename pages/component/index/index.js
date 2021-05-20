// pages/component/index/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    activeTab: 0,
    itemList: [],
    historyItemList: [],
    historyToday: (new Date().getFullYear())+"年"+(new Date().getMonth()+1)+"月"+(new Date().getDate()+"日")
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
      // serverId = "liling";
      if (that.data.activeTab == 3) {
        // 查询历史订单
        wx.request({
          url: "http://129.211.68.243:8080/server/getAllOrder/" + serverId,
          method: "GET",
          header: {
            'content-type': 'application/json' // GET方式
          },
          success(res) {
            console.log("历史订单");
            console.log(res);
            var historyItemList = [];
            for (var i = 0; i < res.data.length; i++) {
              let clientInfo = res.data[i].ClientInfo;
              let orderInfo = res.data[i].orderInfo;
              // 判断是否为历史订单
              var now = new Date();
              var orderTime = orderInfo.startTime;
              now = that.formatDate(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes())
              orderTime = that.formatDate(Number(orderTime.split(" ")[0].split("-")[0]), Number(orderTime.split(" ")[0].split("-")[1]), Number(orderTime.split(" ")[0].split("-")[2]), Number(orderTime.split(" ")[1].split(":")[0]), Number(orderTime.split(" ")[1].split(":")[1]))
              if (now < orderTime) {
                continue;
              }
              // if (now.getFullYear() < Number(orderTime.split(" ")[0].split("-")[0])) {
              //   continue;
              // } else if (now.getMonth() + 1 < Number(orderTime.split(" ")[0].split("-")[1])) {
              //   continue;
              // } else if (now.getDate() < Number(orderTime.split(" ")[0].split("-")[2])) {
              //   continue;
              // } else if (now.getHours() < Number(orderTime.split(" ")[1].split(":")[0])) {
              //   continue;
              // } else if (now.getMinutes() < Number(orderTime.split(" ")[1].split(":")[1])) {
              //   continue;
              // }
              let iconName = "wap-home-o";
              if (orderInfo.serviceProject == "商业保洁") {
                iconName = "hotel-o";
              } else if (orderInfo.serviceProject == "钟点工") {
                iconName = "underway-o";
              }
              // 格式化上门时间
              let serviceTime = "上门时间：未定";
              if (orderInfo.startTime != null) {
                let startTime = orderInfo.startTime;
                // var endTime = orderInfo.endTime;
                serviceTime = startTime.substring(5, 7) + "/" + startTime.substring(8, 10) + " " + startTime.substring(11, 13) + ":" + startTime.substring(14, 16)
              }
              // 先对数据进行JSON
              // 再对数据进行URI编码
              var URIClientInfo = encodeURIComponent(JSON.stringify(clientInfo))
              var URIOrderInfo = encodeURIComponent(JSON.stringify(orderInfo))
              var tmp = {
                historyClickUrl: "/pages/historyService/historyService?URIClientInfo=" + URIClientInfo + "&URIOrderInfo=" + URIOrderInfo,
                historyOrderIconName: iconName,
                historyOrderDate: orderInfo.startTime.substring(0, 4) + "年" + orderInfo.startTime.substring(5, 7) + "月" + orderInfo.startTime.substring(8, 10) + "日",
                historyOrderServiceProject: orderInfo.serviceProject,
                historyOrderClientName: clientInfo.clientName,
                historyOrderServiceTime: serviceTime,
                historyOrderIsMulti: orderInfo.times + "次",
                historyOrderClientLocation: clientInfo.clientLocation,
                clientProfile: clientInfo.clientProfile,
              };
              historyItemList.push(tmp);
            }
            that.setData({
              historyItemList: historyItemList,
            })
          }
        })
      }
    },

    formatDate: function (y, mon, d, h, min) {
      if (mon < 10) {
        mon = "0" + mon;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (min < 10) {
        min = "0" + min;
      }
      return y + mon + d + h + min;
    },

    selectDate: function(event){
      var date = event.detail;
      this.setData ({
        historyToday: date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日"
      });
    },

  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      var that = this;
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      // serverId = "liling"
      wx.request({
        url: 'http://129.211.68.243:8080/server/getOrderToday/' + serverId,
        method: "GET",
        header: {
          'content-type': 'application/json', // 默认值
          // 'content-type': 'application/x-www-form-urlencoded',//POST方式
        },
        success: function (res) {
          // console.log("一周日程表");
          // console.log(res);
          var itemList = [];
          for (var i = 0; i < res.data.length; i++) {
            let orderInfo = res.data[i].orderInfo;
            let ClientInfo = res.data[i].ClientInfo;
            // 判断是否为历史订单
            // 若今日日期大于订单日期，则为历史订单
            var now = new Date();
            var orderTime = orderInfo.startTime;
            now = that.formatDate(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes())
            orderTime = that.formatDate(Number(orderTime.split(" ")[0].split("-")[0]), Number(orderTime.split(" ")[0].split("-")[1]), Number(orderTime.split(" ")[0].split("-")[2]), Number(orderTime.split(" ")[1].split(":")[0]), Number(orderTime.split(" ")[1].split(":")[1]))
            if (now > orderTime) {
              continue;
            }
            // 设置服务类型图标
            let iconName = "wap-home-o";
            if (orderInfo.serviceProject == "商业保洁") {
              iconName = "hotel-o";
            } else if (orderInfo.serviceProject == "钟点工") {
              iconName = "underway-o";
            }
            // 格式化上门时间
            let serviceTime = "上门时间：未定";
            if (orderInfo.startTime != null) {
              let startTime = orderInfo.startTime;
              // var endTime = orderInfo.endTime;
              serviceTime = startTime.substring(5, 7) + "/" + startTime.substring(8, 10) + " " + startTime.substring(11, 13) + ":" + startTime.substring(14, 16)
            }
            // 先对数据进行JSON
            // 再对数据进行URI编码
            var URIClientInfo = encodeURIComponent(JSON.stringify(ClientInfo))
            var URIOrderInfo = encodeURIComponent(JSON.stringify(orderInfo))
            let tmp = {
              clickUrl: "/pages/todoService/todoService?URIClientInfo=" + URIClientInfo + "&URIOrderInfo=" + URIOrderInfo,
              iconName: iconName,
              serviceProject: orderInfo.serviceProject,
              clientName: ClientInfo.clientName,
              serviceTime: serviceTime,
              isMulti: orderInfo.times + "次",
              clientLocation: ClientInfo.clientLocation,
              clientProfile: ClientInfo.clientProfile,
            }
            itemList.push(tmp);
          }
          that.setData({
            itemList: itemList,
          })
        }
      })
    }
  }
})