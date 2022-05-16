const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_loginid:'',
    message:[]
  },
  // 模拟tabbar
  navToassign: function(){
    wx.redirectTo({
      url: '../assignment/assignment'
    })
  },
  navTomate:function(){
    wx.redirectTo({
      url: '../teammate/teammate'
    })
  },
  navToteam:function(){
    wx.redirectTo({
      url: '../team_home/team_home'
    })
  },
  agree:function(e){
    console.log(e)
    let that = this
    db.collection('vo_act')
    .where({
      activity_id:e.target.dataset.activity_id,
      volunteer_openid:e.target.dataset.volunteer_openid
    })
    .update({
      data:{
        activity_id:e.target.dataset.activity_id,
        volunteer_openid:e.target.dataset.volunteer_openid,
        team_loginid:that.data.team_loginid,
        situation:'已通过',
      },success:function(res){
        wx:wx.redirectTo({
          url: '../teammate/teammate',
        })
      }
    })
  },
  refuse:function(e){
    console.log(e)
    let that = this
    db.collection('vo_act')
    .where({
      activity_id:e.target.dataset.activity_id,
      volunteer_openid:e.target.dataset.volunteer_openid
    })
    .update({
      data:{
        activity_id:e.target.dataset.activity_id,
        volunteer_openid:e.target.dataset.volunteer_openid,
        team_loginid:that.data.team_loginid,
        situation:'未通过',
      },success:function(res){
        wx:wx.redirectTo({
          url: '../teammate/teammate',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'teamID',
      success(res) {
        console.log(res.data)
        // that.setData({
        //   team_loginid:res.data
        // })
        wx.cloud.callFunction({
          name:'voact-volunteer',
          data: {
            team_loginid:res.data
          }
        }).then(res => {
          console.log(res.result)
          that.setData({
            message:res.result.list
          })
        }).catch(err => {
        })
      }
  })
   
  },
  // 重载
  onShow: function () {
    const pages = getCurrentPages()
    const perpage = pages[pages.length - 1]
    perpage.onLoad()  
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

  },
})