// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.min');
Page({
  data: {
    currentWeather: {},
    dayWeather: [],
    temperature: '',
    time: new Date().getHours()
  },
  onLoad: function () {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'iTEqURO4U17I6cGX56MAXeebeu96rRkx'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      console.log(data)

      // weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        currentWeather: data.currentWeather[0],
        dayWeather: data.originalData.results[0].weather_data,
        temperature: (data.currentWeather[0].date).match(/\：(\S*)\)/)[1]
      })
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  }
})