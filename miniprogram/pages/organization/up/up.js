const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
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
  
upload_img:function(){
    let that = this 
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(res){
          var timestamp = Date.parse(new Date());
          timestamp =timestamp / 1000;
          console.log("当前时间戳为：" + timestamp);
        //   tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
            cloudPath:'product/'+timestamp+'.png',
            filePath: tempFilePaths[0],//文件路径
            success(res){
                // get resource ID
                console.log(res.fileID)
                that.setData({
                    img:that.data.img.concat(res.fileID)
                })
            },
            fail:function(res){
                // handle error
            }
        })
      }
    })
},
delete: function(e){
  let that = this
  that.setData({
      img:''
  })
  wx.cloud.deleteFile({
      fileList:[e.currentTarget.dataset.src],
      success:res=>{
          // handle success
          console.log(res.fileList)
      },
      fail:err=>{
          // handle error
      },
    })
  },
  // 提交表单
  submit: function(e) {
    let that = this
    console.log(e.detail.value)
    console.log(that.data.img)
    db.collection('activity').add({
      data: {
        all_num: e.detail.value.all_num,
        start_time: e.detail.value.start_time,
        start_signtime: e.detail.value.start_signtime,
        end_time: e.detail.value.end_time,
        end_signtime: e.detail.end_signtime,
        name: e.detail.value.name,
        src: that.data.img,
        team: e.detail.value.team,
        team_loginid: e.detail.value.team_ID,
        site: e.detail.value.site,
        state: '报名中',
        detail: e.detail.value.detail,
        // detail: '活动详情',
        request: e.detail.value.request,
        // request: '活动要求',
        num: '0'
      },
      success:function(res){
        wx.showToast({
          title: '添加活动成功',
        })
        wx.redirectTo({
          url: '../org_task/org_task',
        })
      }
    })
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