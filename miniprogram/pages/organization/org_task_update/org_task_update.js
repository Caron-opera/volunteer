const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_num:'',
    team:'',
    name:'',
    start_signtime:'',
    end_signtime:'',
    end_time:'',
    src:'',
    id:''
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('activity').doc(options.id).get({
      success(res){
          console.log('信息获取成功',res)
          that.setData({
            all_num:res.data.all_num,
            team:res.data.team,
            name:res.data.name,
            start_signtime:res.data.start_signtime,
            end_signtime:res.data.end_signtime,
            end_time:res.data.end_time,
            src:res.data.src,
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