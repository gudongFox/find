// pages/component/schedule/schedule.js
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
    listData:[
      {"code":"上午","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"8:00","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"中午","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"12:00","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"下午","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      {"code":"6:00","monday":"1","tuesday":"2","wednesday":"3","thursday":"4","friday":"5","saturday":"6","sunday":"7"},
      ],
      checked: false,
  },

  /**
   * 组件的方法列表
   */
  // methods: {
  //   onChange(event) {
  //     this.setData({
  //       checked: event.detail,
  //     });
  //   },
  // }
})
