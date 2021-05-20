// pages/component/schedule/schedule.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myValue: String
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
      ["8:00",false,false,false,false,false,false,false],
      ["",false,false,false,false,false,false,false],
      ["",false,false,false,false,false,false,false],
      ["",false,false,false,false,false,false,false],
      ["12:00",false,false,false,false,false,false,false],
      ["",false,false,false,false,false,false,false],
      ["",false,false,false,false,false,false,false],
      ["",false,false,false,false,false,false,false],
      ["下午",false,false,false,false,false,false,false],
      ["6:00",false,false,false,false,false,false,false],
      ],
      sevenDay:[],
      weekDays:[],
      checked: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.setData({
        checked: event.detail,
      });
    },
    //获得指定时间之后七天日期，date：yyyy-MM-dd
    getSevenTime:function(date){
      var that = this
      var base = new Date(date).getTime()
      var oneDay = 24 * 3600 *1000;
      var date = []
      var week = []
      var data = [Math.random()*300];
      var time = new Date(base);
      date.push([time.getMonth() + 1, time.getDate()].join('.'));
      week.push([time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-'));
      for(var i = 0; i < 6; i++){
        var now = new Date(base += oneDay);
        date.push([now.getMonth()+1,now.getDate()].join('.'));
        week.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
        data.push(Math.round(Math.random() - 0.5) * 20 + data[i - 1]);
      }
      console.log(week)
      var weekDays= []
      for(var i = 0; i < week.length; i++){
        weekDays.push(that.fundWeek(week[i]))
      }
      var newdate = date
      console.log(newdate)
      var newWeekDays = weekDays
      console.log(newWeekDays)
      that.setData({
        sevenDay: newdate,
        weekDays: newWeekDays
      })
    },
    //获取指定日期是周几,datestr: yyyy-MM-dd
    fundWeek:function(datestr){
      var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
      var week = weekArray[new Date(datestr).getDay()];
      console.log(week);
      return week;
    },
    //日期相减
    getNumberOfDays:function(date1,date2){
      //date1：开始日期，date2结束日期
      var a1 = Date.parse(new Date(date1));
      var a2 = Date.parse(new Date(date2));
      var day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
      return day
    },
    query: function(serverId){
      var that = this
      var date = new Date()
      //当前是星期几，返回0-6代表星期日到星期六
      var weekday = date.getDay() || 7
      var y = date.getFullYear()
      var m =date.getMonth() + 1
      m = m > 9? m : '0'+m
      var d = date.getDate()
      d = d > 9 ? d : '0'+d
      var time = y + "-" + m + "-" + d
      var list = that.data.listData
      console.log(serverId)
      console.log(time)
      console.log(that.getSevenTime(time))
      wx.request({
        url: 'http://129.211.68.243:8080/server/getOrderWeek/'+serverId,
        method: "GET",
        success:function(res){
          var orderList = res.data
          console.log(orderList)
          for(var i = 0; i < orderList.length; i++){
            var orderInfo = orderList[i].orderInfo
            var starDay = orderInfo.startTime.substring(0,10)
            var startTime = orderInfo.startTime.substring(11,13)
            var endTime = orderInfo.endTime.substring(11,13)
            console.log(starDay)
            console.log(startTime)
            console.log(endTime)
            var col = that.getNumberOfDays(starDay,time) + 1
            console.log("列"+col)
            var row = parseInt(startTime)-8
            console.log(parseInt(startTime)-8)
            console.log(parseInt(endTime)-parseInt(startTime))
            for(var j = 0;j < parseInt(endTime)-parseInt(startTime);j++){
              list[row][col] = true
              console.log(list[row+j][col])
            }
          }
          setTimeout(function(){
            var newList = list
            console.log(newList)
            that.setData({
              listData: newList
            })
          },1000)
          
        }
      })
    }
  },
})
