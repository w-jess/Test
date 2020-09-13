//index.js
Page({

  data: {
    rotate:0,
    area:"东偏北",
    detailArea:90
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.onCompassChange(function (res) {
      console.log(res)
      var rotate = 360 - res.direction.toFixed(0)
      var area = parseInt(rotate/90)
      var detailArea = rotate%90
      that.setData({
        rotate:rotate
      })
      if(area==0){
        that.setData({
          area:"西偏北",
          detailArea: 90-detailArea
        })
      }else if(area==1){
        that.setData({
            area: "西偏南",
            detailArea: detailArea
        })
      } else if (area == 2) {
        that.setData({
          area: "东偏南",
          detailArea: 90-detailArea
        })
      }else{
        that.setData({
          area: "东偏北",
          detailArea: detailArea
        })
      }
    });
  },
  onUnload: function () {
    wx.offCompassChange()
  }
})
