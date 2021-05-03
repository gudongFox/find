var app = getApp();
// import Dialog from 'path/to/@vant/weapp/dist/dialog/dialog';

// Page({
//   onLogout(){
//     Dialog.confirm({
//       title:"H",
//       message:"M"
//     })
//       .then(()=>{
//         wx.navigateTo({
//           url: 'pages/nav/nav',
//         })
//       })
//       .catch(()=>{
//         wx.navigateTo({
//           url: 'pages/index/index',
//         })
//       });
//   },
// })

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
    serverProfile:"https://thirdwx.qlogo.cn/mmopen/vi_32/sHPrgfrTWlUuMveposfYmp2l1suPricsaxuP5OX3WnX8vye9QqcbMfwBZbibg18NkRJ247UPgWtH0l5icOwicyXQHA/132",
    serverName:"李玲",
    serverLocation:"成都市杜甫草堂",
    

    numClient:15,
    numPartner:12,
    numOrder:36,
    numDelegation:15
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
    
    clickInfo:function(){
      wx.navigateTo({
        url: '/pages/infoServer/infoServer',
      })
    },
  
  }

})