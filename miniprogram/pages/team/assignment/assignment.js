const db = wx.cloud.database()
const _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teamid: '',
        activity:[]
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
    over:function(e){
      console.log(e.target.dataset.id)
      db.collection('activity').doc(e.target.dataset.id)
      .update({
        data:{
          state:'已结束'
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that =this
        wx.getStorage({
          key: 'teamID',
          success(res) {
            db.collection('activity')
            .where({
            team_loginid:res.data
            })
           .get({
            success:function(res){
                console.log('活动获取成功',res)        
                that.setData({
                    activity:res.data
                })
             },
             fail:function(res){
                console.log('活动获取失败',res)
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