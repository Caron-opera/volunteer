const db = wx.cloud.database()
const _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        team:[],
    },
    // tabbar功能逻辑
    navToteam: function(){
      wx.redirectTo({
        url: '../org_team/org_team'
      })
    },
    navTotask:function(){
      wx.redirectTo({
        url: '../org_task/org_task'
      })
    },
    navToup:function(){
      wx.redirectTo({
        url: '../up/up'
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that =this
        db.collection('team')
        .get({
            success:function(res){
                console.log('活动获取成功',res)        
                that.setData({
                    team:res.data
                })
             },
             fail:function(res){
                console.log('活动获取失败',res)
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

    },
    onShow: function () {
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad()  
      }
})