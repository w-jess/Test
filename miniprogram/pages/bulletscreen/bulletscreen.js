// bulletscreen.js

Page({

  /**
   * Page initial data
   */


  data: {
    inputText: '',
    text: '请输入弹幕',

    sliderValOfFontSize:50,
    fontSize: 300,
    fontColor:'white',
    backgroundColor:'black',

    animateTime:10,
    sliderValOfAnimateTime:50,

    currentTab: 0,
    textMoveAnimate:null,
    colorArr:[
      { color: 'pink' },
      { color: "red" },
      { color: "blue" },
      { color: "yellow" },
      { color: "white" },
      { color: "aqua" },
      { color: "green" },
      { color: "skyblue" },
      { color: "hotpink" },
      { color: "black" }
    ]
  },
  //改变背景颜色
  setBackGroundColor(e){
    console.log(e.target.dataset.index);
    let index = e.target.dataset.index;

    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      backgroundColor: selectColor
    })
  },

  // 选择弹幕的字体颜色
  setColor(e){
    // console.log(e.target.dataset.index);
    let index = e.target.dataset.index;
    
    let that = this;
    let selectColor = that.data.colorArr[index].color;
    that.setData({
      fontColor:selectColor
    })
  },
  //改变弹幕滚动速度
  changeTextSpeend(e){
    console.log(e.detail.value);
    let sliderVal = e.detail.value;
    let that = this;
    //50 默认 10s
    //0 是 15s
    //100 是 5s
    that.setData({
      animateTime: sliderVal * -0.1 + 15,
      sliderValOfAnimateTime: sliderVal
    })
  },

  // 改变字号
  changeFontSize(e){
    //获取滑竿的值
    console.log(e.detail.value);
    let sliderVal = e.detail.value;
    let that = this;
    //运算边界值
    //50 对应 300rpx 的字号
    //0 对应 150rpx
    //100 对应 450rpx

    that.setData({
      fontSize: sliderVal * 3 + 150,
      sliderValOfFontSize: sliderVal
    })

  },



  // input失去焦点时获取输入的文字
  inputBlur(e) {
    let that = this;
    let inputVal = e.detail.value;
    // console.log(inputVal);
    that.setData({
      inputText: inputVal
    }) 
  },

  sendBtn() {
    let that = this;
    wx.cloud.callFunction({
      name: 'msgSecCheck',
      data: {
        content: that.data.inputText 	//传入我得到的文本内容
      }
    }).then(ckres => {
      console.log(ckres)
      //写审核通过之后的操作 if == 0
      if (ckres.result.errCode == 0) {
        that.setData({
          text: that.data.inputText
        })
      } else if (that.data.inputText == '') {
         wx.showModal({
           title: '发送失败',
           content: '发送不能为空',
           showCancel: false
         })
      }
      else {
        wx.showModal({
          title: '发送失败',
          content: '检测到敏感词,请注意言论',
          showCancel: false
        })
      }
    })
    
  },



  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    // console.log(e.detail.current);
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    
  },

 
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }

  
})

