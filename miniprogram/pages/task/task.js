const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    task:[],
    id:''
  },
  finish:function(e){
    let that = this
    console.log(e.target.dataset.id)
    that.setData({
      id:e.target.dataset.id
    })
    db.collection('task')
    .where({_id:that.id})
    .update({
      data:{
        task_situation: '完成@@@'
      },success(res){
        console.log(res)
      }
    })
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
        console.log(res.data)
        wx.cloud.callFunction({
          name:'task-activity',
          data: {
            volunteer_openid:res.data
          }
        }).then(res => {
          console.log(res.result.list)
          that.setData({
            task:res.result.list
          })
        }).catch(err => {
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