// pages/mine/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['家庭保洁', '商业保洁', '钟点工','护工'],
    result: ['家庭保洁', '护工'],
    sure: "0",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('onLoad') 
    },

    onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  chooseGender(event) {
    this.setData({
      radio: event.detail,
    });
  },

  chooseType(event) {
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

  sureRegister(event){
    this.setData({
      sure: "1",
    });
  }
})