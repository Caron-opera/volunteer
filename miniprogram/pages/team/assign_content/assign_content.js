const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_id:'',
    nickname:'',
    activity_name:'',
    team_name:'',
    volunteer_openid:'',
  },
  submit:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.content!==''){
        db.collection('task').add({
            data:{
                content:e.detail.value.content,
                activity_id:that.data.activity_id,
                team_loginid:that.data.team_loginid,
                task_situation:'未完成',
                volunteer_openid:that.data.volunteer_openid,
                team_loginid:that.data.team_loginid
            },success:function(res){
                wx.showToast({
                  title: '提交成功',
                })
                wx.redirectTo({
                  url: '../assignment/assignment',
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
    let that = this
    wx.getStorage({
      key: 'teamID',
      success(res) {
        that.setData({
          team_loginid:res.data
        })
        db.collection('team')
        .where({
        team_loginid:res.data
        })
       .get({
        success:function(res){     
            that.setData({
                team_name:res.data[0].name,
            })
         },
         fail:function(res){
         }
    })
      }
  })
    that.setData({
      activity_id:options.activity_id,
      volunteer_openid:options.volunteer_openid,
      nickname:options.nickname
    })
    db.collection('activity')
    .where({
      _id:that.data.activity_id
    })
    .get({
      success(res){
        that.setData({
          activity_name:res.data[0].name
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