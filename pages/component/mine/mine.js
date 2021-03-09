var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'My'
    }
  },

  /* 组件的初始数据 */
  data: {
    num:65,
    total:207,
    success:95.4+'%',
    score:3.5
  },
  

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {

    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    click:function(){
      wx.redirectTo({
        url: '/pages/nav/nav',
      })
    },
  }

})