const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leader:'',
    name:'',
    password:'',
    phone:'',
    team_loginid:'',
    id:''
  },
  delete:function(e){
    let that = this
    db.collection('team').doc(that.data.id).remove({
        success(res){
            console.log('删除成功',res.data)
            wx.switchTab({
              url: '../org_team/org_team',
            })
        }
    })
},
submit:function(e){
  let that = this
  console.log(e)
  if(e.detail.value.leader!==""&&e.detail.value.name!==""&&e.detail.value.password!==""&&e.detail.value.team_loginid!==""&&e.detail.value.phone!==""){
      db.collection('team').doc(that.data.id).update({
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
              wx.switchTab({
                url: '../org_team/org_team',
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
    db.collection('team').doc(options.id).get({
      success(res){
          console.log('信息获取成功',res)
          that.setData({
            leader:res.data.leader,
            team_loginid:res.data.team_loginid,
            name:res.data.name,
            password:res.data.password,
            phone:res.data.phone,
            id:res.data._id
        })
      },fail(res){
          console.log('分类信息获取失败',res)
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