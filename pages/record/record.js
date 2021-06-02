// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //下拉刷新
    scrolltop:20,
    refreshText:null,
    icon:null,
    shouldRefresh:false,
    istouching:false,
    //scroll高度
    scrollHeight:60,
    platServerList:[
      
    ],
    believeServerList:[
      
    ],
    active:0,
    value:'',
    serviceList:[

      { context: "家庭保洁",total:56, select: 1 },
      
      { context: "商业保洁",total:43, select: 2},
      
      { context: "钟点工",total:27, select: 3},
      
      { context: "护工",total:33, select: 4},
      
      { context: "其他",total:18, select: 5},
      
      ],
      list: ['家庭保洁', '商业保洁', '钟点工','护工'],
      result: ['家庭保洁', '钟点工'],
      show: false,
      minDate: new Date(2010, 0, 1).getTime(),
      maxDate: new Date(2010, 0, 31).getTime(),
  },
  onLoad: function(){
    this.loadPage()
    //处理高度tab：44px，底部50px
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          scrollHeight:result.windowHeight-94
        })
        console.log(this.data.scrollHeight)
      },
    })
  },
  loadPage: function () {
    var that = this
    wx.login({
      success: function(res) {
        console.log('进入login方法')
        var code = res.code;
        console.log(code);
        wx.request({
          url: 'http://129.211.68.243:8080/login/login',
          method: 'GET',
          data: {
            code: code
          },
          success: function (res) {
            var openid = res.data
            wx.setStorageSync('openid', openid)
            console.log(openid)
            wx.request({
              url: 'http://129.211.68.243:8080/client_server/info',
              header: {
                'content-type': 'application/json' // 默认值
              },
              method: 'GET',
              data:{
                clientId: openid
              },
              success:function(res){
                console.log(res)
                var list = res.data.data
                console.log(list)
                that.setData({
                  platServerList:list,
                  believeServerList: list
                })
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
  },
  serviceList:function(e){
    var that = this
    
    var serviceList = that.data.serviceList
    
    that.setData({//更新到data里面
    
    yearShow: e.currentTarget.dataset.select,
    
    serviceList: that.data.serviceList
    
    })
    
    },

    // 日历
    onDisplay() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    formatDate(date) {
      date = new Date(date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail),
      });
    },
  onShow: function(){
    this.getTabBar().init();
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onChange1(event) {
    this.setData({
      result: event.detail
    });
  },
  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop() {},

  //跳转到服务人详情页
  toServerInfo:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/record/serverInfo/serverInfo?id='+id,
    })
  },
  //扫描二维码
    //跳转到信任服务人详情页
    toBelieveInfo:function(e){
      console.log(e)
      var id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '/pages/record/believeInfo/believeInfo?id='+id,
      })
    },
  
  toAddServer:function(e){
    var that = this
    wx.scanCode({
      success(res){
        console.log(res.result)
        var serverId = res.result
        var clientId = wx.getStorageSync('openid')
        if(serverId==clientId){
          wx.showToast({
            title: '禁止添加自己',
          })
        }else{
          wx.request({
            url: 'http://129.211.68.243:8080/client_server/info',
            method: 'POST',
            data: {
              serverId: serverId,
              clientId: clientId
            },
            success:function(){
              wx.showToast({
                title: '添加服务人成功',
                icon: 'success',
                duration: 2000
              })
              onload();
        // if(serverId==clientId){
        //   wx.showToast({
        //     title: '禁止添加自己本人',
        //   })
        // }else{
        //   wx.request({
        //     url: 'http://129.211.68.243:8080/client_server/info',
        //     method: 'POST',
        //     data: {
        //       serverId: serverId,
        //       clientId: clientId
        //     },
        //     success:function(){
        //       wx.showToast({
        //         title: '添加服务人成功',
        //         icon: 'success',
        //         duration: 2000
        //       })
        //       onload();
              
        //     },
        //     fail:function(){
        //       wx.showToast({
        //         title: '添加失败，请检查网络',
        //       })
        //     }
        //   })
        // }
        
              }
        })
        }
      }
      })
    },
  onPullDownRefresh: function () {
    this.onLoad(); //重新加载onLoad()
  },
  
  //自定义下拉刷新
  // onReady: function () {
  //   const arr = []
  //   for (let i = 0; i < 100; i++) arr.push(i)
  //   this.setData({
  //     arr
  //   })

  //   setTimeout(() => {
  //     this.setData({
  //       triggered: true,
  //     })
  //   }, 1000)
  // },

  onPulling(e) {
    console.log('onPulling:', e)
  },

  onRefresh() {
    if (this._freshing) return
    this._freshing = true
    setTimeout(() => {
      this.setData({
        triggered: false,
      })
      this._freshing = false
    }, 1000)
    this.loadPage()
  },

  onRestore(e) {
    console.log('onRestore:', e)
  },

  onAbort(e) {
    console.log('onAbort', e)
  },
})