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
    clickUrl:"/pages/newDemandServer/newDemandServer",
    demandList:[
      {
        iconName:"wap-home-o",
        servicePeoject:"家庭保洁",
        clientName:"马先生",
        serviceTime:"上门时间：未定",
        isMulti:"多次",
        clientLocation:"虎溪花园，4栋5-1",
        serviceStatus:"待处理",
      },
      {
        iconName:"wap-home-o",
        servicePeoject:"家庭保洁",
        clientName:"王先生",
        serviceTime:"上门时间：未定",
        isMulti:"1次",
        clientLocation:"虎溪花园，4栋5-1",
        serviceStatus:"待处理",
      },
    ],

    substituteClickUrl:"/pages/serverSubstitute/serverSubstitute",
    substituteList:[
      {
        substitutedClientProfile:"https://img.yzcdn.cn/vant/cat.jpeg",
        substitutedClientName:"王阿姨",
        substitutedServiceObj:"家庭保洁",
        substitutedClientLocation:"成都市锦兴路",
        serviceTimes:"服务(13)",
        substituteTimes:"委托(7)",
      },
      {
        substitutedClientProfile:"https://img.yzcdn.cn/vant/cat.jpeg",
        substitutedClientName:"何老师",
        substitutedServiceObj:"钟点工",
        substitutedClientLocation:"成都市锦兴路",
        serviceTimes:"服务(3)",
        substituteTimes:"委托(5)",
      },
    ],

    active:0,
    maxDistance:2,
    maxInterDistance:2,
    minServicLength:3,
    maxInterLength:2.5,
  },
  onChange(e){
    this.setData({
      active:e.detail
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
