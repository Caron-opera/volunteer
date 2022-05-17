const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tasklist:[],
    activity_id:'',
    task_id:''
  },
  overTask:function(e){
    let that = this 
    console.log(that.data.task_id)
    db.collection('activity')
    .get({
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    that.setData({
      activity_id:options.id
    })
    console.log(that.data.activity_id)
    wx.cloud.callFunction({
      name:'task-vol',
      data: {
          activity_id:that.data.activity_id
      }
    }).then(res => {
      console.log(res.result.list)
      that.setData({
        tasklist:res.result.list
      })
    }).catch(err => {
      console.log('错误')
    })
    // 获取任务信息
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})