const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    nickname:'',
    age:'',
    skill:[],
    avatarurl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'openId',
      success(res) {
        that.setData({
          openid:res.data
        })
      }
    })
    db.collection('volunteer')
    .where({
      _openid: that.openid
    })
    .get({
      success:function(res){    
           console.log(res)
        that.setData({
           nickname:res.data[0].nickname,
           avatarurl:res.data[0].avatarurl,
           skill:res.data[0].skill,
        })
     }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})