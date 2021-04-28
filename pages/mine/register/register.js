// pages/mine/register/register.js
Page({

  /**
   * 页面的初始数据
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
      checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad') 
    },

    onChange(event) {
      this.setData({
        checked: event.detail,
      });
    },
})