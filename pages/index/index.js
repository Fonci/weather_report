
Page({
  data: {
    location: '',//城市经纬度/位置信息
    cityName: '',//城市名称
    searchList: [],//搜索城市列表
    weatherNow: {},//实时天气
    weatherHour: {},//24小时天气
    weatherDaily: {},//7天天气
    time: new Date().getHours(),//当前小时
    showSearchList: false,
  },
  onLoad: function () {
    this.getCurrentCity()
  },
  // 获取当前城市
  getCurrentCity() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // 定位当前城市的经纬度
        that.setData({
          location: res.longitude + "," + res.latitude
        })
        that.getCity(that.data.location);//获取城市
      }
    })
  },
  // 根据搜索内容 查询出相应城市列表
  bindInputCity(e) {
    var that = this;
    if (e.detail.value) {
      that.getCity(e.detail.value)
    } else {
      that.getCurrentCity()
    }
  },
  // 获取搜索城市的location id
  getLocation(options) {
    this.setData({
      showSearchList: false
    })
    this.getCity(options.target.dataset.location)
  },
  // 获取城市信息
  getCity(location) {
    var that = this;
    wx.request({
      url: 'https://geoapi.heweather.net/v2/city/lookup',
      data: {
        location: location,
        key: "da0ccd314e2849bd8f17e706d07680d1"
      },
      success(res) {
        if (res.data.status == 200) {
          if (res.data.location.length == 1) {
            that.setData({
              cityName: res.data.location[0].adm1 +
                "-" + res.data.location[0].adm2 +
                "-" +
                res.data.location[0].name,
              location: res.data.location[0].id
            })
            that.getWeather('now', that.data.location);//实时天气
            that.getWeather('24h', that.data.location);//24小时天气
            that.getWeather('7d', that.data.location);//7天天气
          } else if (res.data.location.length > 1) {
            that.setData({
              searchList: res.data.location
            })
            if (that.data.searchList.length == 1 || that.data.searchList.length > 1) {
              that.setData({
                showSearchList: true
              })
            }
          }

        }

      }
    })
  },
  getWeather(path, location) {
    var that = this;
    wx.request({
      url: 'https://devapi.heweather.net/v7/weather/' + path,
      data: {
        location: location,
        key: "da0ccd314e2849bd8f17e706d07680d1"
      },
      success(res) {
        if (res.data.code == 200) {
          if (path == 'now') {
            that.setData({
              weatherNow: res.data.now
            })
          } else if (path == '24h') {
            that.setData({
              weatherHour: res.data.hourly
            })
          } else if (path == '7d') {
            that.setData({
              weatherDaily: res.data.daily
            })


          }

        }
      }
    })
  }
})