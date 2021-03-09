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
      value: 'Car'
    }
  },

  /* 组件的初始数据 */
  data: {
    active:0,
    value:'',
    serviceList:[

      { context: "家庭保洁",total:56, select: 1 },
      
      { context: "商业保洁",total:43, select: 2},
      
      { context: "钟点工",total:27, select: 3},
      
      { context: "护工",total:33, select: 4},
      
      { context: "其他",total:18, select: 5},
      
      ],
      show: false,
      minDate: new Date(2010, 0, 1).getTime(),
      maxDate: new Date(2010, 0, 31).getTime(),
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
      onChange(e) {
        this.setData({
          value: e.detail,
        });
      },
      onSearch() {
        Toast('搜索' + this.data.value);
      },
      onClick() {
        Toast('搜索' + this.data.value);
      },
  }
  
})