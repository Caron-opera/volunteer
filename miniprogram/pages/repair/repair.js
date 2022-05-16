const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    nickname:'',
    age:'',
    skill:[],
    avatarurl:'',
    phone:''
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
                  avatarurl:res.fileID
                })
                
            },
            fail:function(res){
                // handle error
                console.log('======',that.data.avatarurl)
            }
        })
      }
    })
},
delete: function(e){
  let that = this
  that.setData({
    avatarurl:''
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
      }
    })
    db.collection('volunteer')
    .where({
      _openid: that.openid
    })
    .get({
      success:function(res){    
           console.log(res)
        that.setData({
           nickname:res.data[0].nickname,
           avatarurl:res.data[0].avatarurl,
           skill:res.data[0].skill,
           age:res.data[0].age,
           phone:res.data[0].phone
        })
     }
    })
  },
  submit:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.nickname!==""&&e.detail.value.age!==""&&e.detail.value.phone!==""){
      db.collection('volunteer')
      .where({
        _openid:that.data.openid
      })
      .update({
          data:{
            avatarurl:that.data.avatarurl,
            nickname:e.detail.value.nickname,
            age:e.detail.value.age,
            skill:[e.detail.value.skill1,e.detail.value.skill2],
            phone:e.detail.value.phone
          },success:function(res){
              wx.showToast({
                title: '提交成功',
              })
              wx.redirectTo({
                url: '../home/home',
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