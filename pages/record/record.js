// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    platServerList:[
      {id:0,name:"李阿姨",type:"家庭保洁",location:"虎溪花园，4栋3-3-1",recommand:true,imageUrl:'https://img.yzcdn.cn/vant/cat.jpeg'},
      {id:1,name:"李阿姨",type:"家庭保洁",location:"虎溪花园，4栋3-3-1",recommand:true,imageUrl:'https://img.yzcdn.cn/vant/cat.jpeg'}
    ],
    believeServerList:[
      {id:3,name:"李阿姨",type:"家庭保洁",location:"虎溪花园，4栋3-3-1",recommand:true,imageUrl:'https://img.yzcdn.cn/vant/cat.jpeg'},
      {id:4,name:"李阿姨",type:"家庭保洁",location:"虎溪花园，4栋3-3-1",recommand:true,imageUrl:'https://img.yzcdn.cn/vant/cat.jpeg'}
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
  }
})