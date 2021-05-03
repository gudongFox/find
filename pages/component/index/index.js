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
    clickUrl:"/pages/todoService/todoService",
    itemList:[
      {
        iconName:"wap-home-o",
        serviceProject:"家庭保洁",
        clientName:"马先生",
        serviceDate:"07/08 08:00～10:00",
        isMulti:"多次",
        clientLocation:"虎溪花园，4栋5-1",
        clientProfile:"https://img.yzcdn.cn/vant/cat.jpeg",
      },
      {
        iconName:"wap-home-o",
        serviceProject:"家庭保洁",
        clientName:"张女士",
        serviceDate:"07/08 10:00～12:00",
        isMulti:"1次",
        clientLocation:"虎溪花园，4栋5-1",
        clientProfile:"",
      },
      {
        iconName:"wap-home-o",
        serviceProject:"家庭保洁",
        clientName:"赵先生",
        serviceDate:"07/08 14:00～16:00",
        isMulti:"多次",
        clientLocation:"虎溪花园，4栋5-1",
        clientProfile:"https://img.yzcdn.cn/vant/cat.jpeg",
      }
    ],

    historyClickUrl:"/pages/historyService/historyService",
    historyItemList:[
      {
        historyOrderIconName:"wap-home-o",
        historyOrderDate:"2020/07/07",
        historyOrderServiceProject:"家庭保洁",
        historyOrderClientName:"王先生",
        historyOrderServiceTime:"07/07 08:00～10:00",
        historyOrderIsMulti:"多次",
        historyOrderClientLocation:"虎溪花园，4栋5-1",
        clientProfile:"",
      },
      {
        historyOrderIconName:"wap-home-o",
        historyOrderDate:"2020/07/04",
        historyOrderServiceProject:"家庭保洁",
        historyOrderClientName:"李先生",
        historyOrderServiceTime:"07/04 08:00～10:00",
        historyOrderIsMulti:"多次",
        historyOrderClientLocation:"虎溪花园，4栋5-1虎溪花园，4栋5-1虎溪花园，4栋5-1",
        clientProfile:"https://img.yzcdn.cn/vant/cat.jpeg",
      },
    ],

    active:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
