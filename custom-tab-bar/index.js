Component({
  data: {
    active: null,
    list: [
      {
        "url": "/pages/record/record",
        "icon": "friends-o",
        "text": "服务人"
      },
      {
        "url": "/pages/index/index",
        "icon": "wap-nav",
        "text": "新需求"
      },
      {
        "url": "/pages/manage/manage",
        "icon": "other-pay",
        "text": "订单记录"
      },
      {
        "url": "/pages/mine/mine",
        "icon": "manager-o",
        "text": "我的"
      }
    ]
  },
  methods: {
    onChange(e){
      console.log(e,'e')
      wx.switchTab({
        url: this.data.list[e.detail].url
      });
      // this.setData({active: e.detail});
    },
    init(){
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});