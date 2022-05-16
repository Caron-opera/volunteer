const db = wx.cloud.database()
const _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
      team_loginid:'',
      team:[],
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let that = this
      wx.getStorage({
        key: 'teamID',
        success(res){
          that.setData({
            team_loginid:res.data
          })
          db.collection('team')
          .where({
            team_loginid:that.data.team_loginid
          }) 
          .get({
            success(res){
              that.setData({
                team:res.data[0]
              })
            }
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