const db = wx.cloud.database()
Page({
    /**
     * 页面的初始数据
     */
    data: {  
        activity:null,
        id:'',
        openid:''
    },
    join:function(){
      let that = this
      wx.getStorage({
        key:'openId',
        success(res){
          that.setData({
            openid:res.data
          })
          db.collection('vo_act')
          .where({
            volunteer_openid:res.data,
            activity_id:that.data.id
          })
          .get({
            success(res){
              if(res.data==''){
                db.collection('vo_act').add({
                  data:{
                    situation:'审核中',
                    team_loginid:that.data.activity.team_loginid,
                    volunteer_openid:that.data.openid,
                    activity_id:that.data.id
                  },success:function(res){
                    wx.showToast({
                      title: '参与成功',
                    })
                },fail:function(res){
                  // 
                }
                })
              }else{
                wx.showToast({
                  title: '已经参加过了',
                  icon:'none'
                })
            }}
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        console.log('活动的id已经获取到了',options.id)
        db.collection('activity').doc(options.id).get({
            success:function(res){
                console.log('活动详细信息获取成功',res)
                that.setData({
                    activity:res.data,
                    id:options.id
                })
            },fail:function(res){
                console.log('商品详细信息获取失败',res)
            }
        })
}
})