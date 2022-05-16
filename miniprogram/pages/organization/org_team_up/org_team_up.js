// pages/org_team_up/org_team_up.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submit:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.leader!==""&&e.detail.value.name!==""&&e.detail.value.password!==""&&e.detail.value.team_loginid!==""&&e.detail.value.phone!==""){
        db.collection('team').add({
            data:{
              leader:e.detail.value.leader,
              name:e.detail.value.name,
              password:e.detail.value.password,
              team_loginid:e.detail.value.team_loginid,
              phone:e.detail.value.phone
            },success:function(res){
                wx.showToast({
                  title: '提交成功',
                })
                wx.redirectTo({
                  url: '../org_team_up/org_team_up',
                })
            }
        })
    }else{
        wx.showToast({
          title: '你还有未填信息',
          icon:"none"
        })
    }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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