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
    historyToday: (new Date().getFullYear()) + "年" + (new Date().getMonth() + 1) + "月" + (new Date().getDate() + "日"),
    minDate: new Date('2021/04/15').getTime(),
    defaultDate: new Date().getTime(),
    maxDate: new Date().getTime(),

    chosenDate: "", //被选中的查询待执行订单的日期
  },

  /**
   * 组件的方法列表
   */
  methods: {

    mydata: function (e) {
      this.selectToDo(e.detail.data);
    },

    changeTab: function (event) {
      this.setData({
        activeTab: event.detail.name,
      });
    },

    clickTab: function () {
      var that = this;
      console.log(that.data.activeTab)
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      // serverId = "liling";
      // if(that.data.activeTab == 1){
      //   that.lifetimes.attached()
      // }
      if (that.data.activeTab == 2) {
        // 查询历史订单
        var date = new Date()
        var hisToday = that.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes())
        console.log(hisToday)
        wx.request({
          url: "http://129.211.68.243:8080/server/getOrderByDate/" + serverId + "/" + hisToday.substring(0, 4) + "-" + hisToday.substring(4, 6) + '-' + hisToday.substring(6, 8),
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

    selectDate: function (event) {
      var that = this;
      var serverId = wx.getStorageSync('openid');
      var date = event.detail;
      this.setData({
        historyToday: date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      });
      var hisToday = that.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes())
      wx.request({
        url: "http://129.211.68.243:8080/server/getOrderByDate/" + serverId + "/" + hisToday.substring(0, 4) + "-" + hisToday.substring(4, 6) + '-' + hisToday.substring(6, 8),
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

    },

    // 根据提起查询待执行订单
    // date格式：2021-01-01
    selectToDo: function (date) {
      console.log("今天的待执行订单");
      console.log(date);
      var that = this;
      var serverId = wx.getStorageSync('openid');
      wx.request({
        url: 'http://129.211.68.243:8080/server/getOrderByDate/' + serverId + "/" + date,
        method: "GET",
        header: {
          'content-type': 'application/json', // 默认值
          // 'content-type': 'application/x-www-form-urlencoded',//POST方式
        },
        success: function (res) {
          console.log("待执行订单");
          console.log(res);
          var itemList = [];
          for (var i = 0; i < res.data.length; i++) {
            // 客户信息
            let orderInfo = res.data[i].orderInfo;
            // 需求信息
            let ClientInfo = res.data[i].ClientInfo;
            // 判断是否为历史订单
            // 若今日日期大于订单日期，则为历史订单
            // 今天
            var now = new Date();
            // 订单日期
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
    },

    lastMon: function () {
      var that = this;
      // 应该判断当前年月是否小于等于允许的最小年月
      // 是则可以执行操作，否则将按钮变灰
      var nowDate = new Date(this.data.minDate);
      var nowYear = nowDate.getFullYear();
      var nowMon = nowDate.getMonth() + 1;
      if (nowMon > 1) {
        var newMon = nowMon - 1;
        var newDay = 1;
        switch (newMon) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            newDay = 31;
          case 2:
            newDay = 28;
          case 4:
          case 6:
          case 9:
          case 11:
            newDay = 30;
        }
        // 判断平年闰年
        if (newMon == 2 && nowYear / 4 == 0) {
          if (nowYear % 100 == 0) {
            if (nowYear / 400 == 0) {
              newDay = 29;
            } else {
              newDay = 28;
            }
          } else {
            newDay = 29;
          }
        }
        that.setData({
          chosenDate: nowYear + "年" + (nowMon - 1) + "月",
          minDate: new Date(nowYear + '/' + (nowMon - 1) + '/1').getTime(),
          defaultDate: new Date(nowYear + '/' + (nowMon - 1) + '/1').getTime(),
          maxDate: new Date(nowYear + '/' + newMon + '/' + newDay).getTime(),
        })
      } else {
        that.setData({
          chosenDate: (nowYear - 1) + "年" + "12月",
          minDate: new Date((nowYear - 1) + '/12/1').getTime(),
          defaultDate: new Date((nowYear - 1) + '/12/1').getTime(),
          maxDate: new Date((nowYear - 1) + '/12/31').getTime(),
        })
      }
    },

    nextMon: function () {
      var that = this;
      // 应该判断当前年月是否大于今天
      // 是则可以执行操作，否则将按钮变灰
      var nowDate = new Date(this.data.minDate);
      var nowYear = nowDate.getFullYear();
      var nowMon = nowDate.getMonth() + 1;
      var nowDay = nowDate.getDate();
      if (nowMon < 12) {
        var newMon = nowMon + 1;
        var newDay = 1;
        switch (newMon) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            newDay = 31;
          case 2:
            newDay = 28;
          case 4:
          case 6:
          case 9:
          case 11:
            newDay = 30;
        }
        // 判断平年闰年
        if (newMon == 2 && nowYear / 4 == 0) {
          if (nowYear % 100 == 0) {
            if (nowYear / 400 == 0) {
              newDay = 29;
            } else {
              newDay = 28;
            }
          } else {
            newDay = 29;
          }
        }
        that.setData({
          chosenDate: nowYear + "年" + newMon+ "月",
          minDate: new Date(nowYear + '/' + newMon + '/1').getTime(),
          defaultDate: new Date(nowYear + '/' + newMon + '/1').getTime(),
          maxDate: new Date(nowYear + '/' + newMon + '/' + newDay).getTime(),
        })
      } else {
        that.setData({
          chosenDate: (nowYear + 1) + "年" + "1月",
          minDate: new Date((nowYear + 1) + '/1/1').getTime(),
          defaultDate: new Date((nowYear + 1) + '/1/1').getTime(),
          maxDate: new Date((nowYear + 1) + '/1/31').getTime(),
        })
      }
    },

  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {
      var that = this;
      var serverId = wx.getStorageSync('openid');

      var today = new Date()
      that.setData({
        chosenDate: (new Date().getFullYear())+"年"+(new Date().getMonth() + 1)+"月",
        minDate: new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/1').getTime()
      })

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