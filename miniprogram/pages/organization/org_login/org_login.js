const db = wx.cloud.database()
Page({
    data: {

    },
  formsubmit:function(e){
      console.log(e)
      if(e.detail.value.zhanghu!==""&&e.detail.value.pwd!==""){
          db.collection('organization')
          .where({
            org_loginid:e.detail.value.zhanghu,
            password:e.detail.value.pwd
        })
          .get({
              success:function(res){
                  console.log(res)
                  if(res.data.length == 0){
                      wx.showToast({
                          title:'账户或密码错误',
                          icon:'none'
                      })
                  }else{
                    // 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
                    wx.navigateTo({
                      url: '../org_task/org_task'
                    })
                  }
              },fail:function(res){
                  console.log(res)
              }
          })
      }else{
          wx.showToast({
            title: '你还有信息未填',
            icon:'none'
          })
      }
  },

    onLoad: function (options) {

    },
})