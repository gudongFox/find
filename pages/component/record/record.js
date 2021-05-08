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
    activeTab:0,
    substituteList:[],
    partnerList:[],

  },

  /* 组件声明周期函数 */
  lifetimes: {
    ready: function(){
      this.clickTab();
    },

    attached: function () {

    },
    moved: function () { 

    },
    detached: function () { 

    },
  },

  /* 组件的方法列表 */
  methods: {
    changeTab: function(event){
      this.setData({
        activeTab: event.detail.name,
      })
    },

    clickTab: function(){
      var that = this;
      // 获取用户ID
      var serverId = wx.getStorageSync('openid');
      // console.log("获取openid");
      // console.log(serverId);
      var mandatorId = serverId;
      // mandatorId = "liling"
      if(that.data.activeTab == 0){
        // 查询与伙伴间的未结算委托订单
        var requestUrl = "http://129.211.68.243:8080/server/getUnFinOrderInfo/" + mandatorId;
        wx.request({
          url: requestUrl,
          method:"GET",
          header:{
            'content-type': 'application/json' // GET方式
          },
          success(res){
            // console.log("未结算委托订单");
            // console.log(res);
            var substituteList = [];
            for(var i = 0; i < res.data.length; i++){
              var tmp = {
                substituteClickUrl:"/pages/unfinishedService/unfinishedService?serverId=" + res.data[i].server.serverId + "&serverName=" + res.data[i].server.serverName + "&serverProfile=" + res.data[i].server.serverProfile,
                substitutedClientProfile: res.data[i].server.serverProfile,
                substitutedClientName:res.data[i].server.serverName,
                substitutedUnfinishedTimes:"未结算(" + res.data[i].UnFinOrderNum + ")",
                substitutedClientLocation:res.data[i].server.serverLocation,
                serviceTimes:"服务(" + res.data[i].manOrderNum + ")",
                substituteTimes:"委托(" + res.data[i].orderNum + ")",
              };
              substituteList.push(tmp);
            }
            that.setData({
              substituteList:substituteList,
            }) 
          }
        })
      }
      else{
        // 查询伙伴名单
        var requestUrl = "http://129.211.68.243:8080/server/getPartner/" + mandatorId;
        wx.request({
          url: requestUrl,
          method:"GET",
          header:{
            'content-type': 'application/json' // GET方式
          },
          success(res){
            // console.log("伙伴名单");
            // console.log(res);
            var partnerList = [];
            for(var i = 0; i < res.data.length; i++){
              var tmp = {
                partnerClickUrl:"/pages/infoPartner/infoPartner?partnerId=" + res.data[i].serverId,
                partnerProfile: res.data[i].serverProfile,
                partnerName:res.data[i].serverName,
                partnerLocation:res.data[i].serverLocation,
                partnerServiceTimes:"服务( )",
                partnerSubstituteTimes:"委托( )",
              };
              partnerList.push(tmp);
            }
            that.setData({
              partnerList:partnerList,
            })
          }
        })
      }
    },
  }
  
})