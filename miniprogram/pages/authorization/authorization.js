// pages/authorization/authorization.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
    nickName: '',
    id: '',
    canIUse:wx.canIUse('button.open-type.getUserInfo'),
    openid:''
  },
  login(e) {
    let that = this
    wx.login({
      success(res) {
        // 取code来换openid
          if (res.code) {
              console.log(res.code)
              let code = res.code
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                data: {
                    js_code: code,
                    appid: 'wx9c1d9ad672bd3551',
                    secret: '96752886337790dffc14ab64c79d63ef',
                    grant_type: 'authorization_code'
                },
                success(res) {
                    // console.log(res.data.openid)
                    let openId = res.data.openid
                    // 存openId
                    wx.setStorage({
                        key: 'openId',
                        data: openId
                    })
                    // 取openId
                    wx.getStorage({
                        key: 'openId',
                        success(res) {
                            // console.log('openId:' + res.data)
                            that.setData({
                              openid:res.data
                            })
                        }
                    })
                }
              })
          }
      }
    })
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
          // 把数据存在data里
                // console.log(res.userInfo)
                that.setData ({
                  avatar:res.userInfo.avatarUrl,
                  nickName:res.userInfo.nickName,
              })
              // 检查该数据是否为数据库已有数据
              db.collection('volunteer').where({_openid:that.data.openid}).get({
                success(res){
                  if(res.data==""){
                    db.collection('volunteer')
                    .add({
                    data:{
                      avatarurl:that.data.avatar,
                      nickname:that.data.nickName
                    }
                    })
                  }
                }
              })
              wx.redirectTo({
                url: '../start_self/start_self',
                  })
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function () {
    let that =this
      // 查看是否授权
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            // 已经授权了
            // 本地存openId然后取出来赋值给openid
            wx.login({
              success(res) {
                // 取code来换openid
                  if (res.code) {
                      console.log(res.code)
                      let code = res.code
                      wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session',
                        data: {
                            js_code: code,
                            appid: 'wx9c1d9ad672bd3551',
                            secret: '96752886337790dffc14ab64c79d63ef',
                            grant_type: 'authorization_code'
                        },
                        success(res) {
                            // console.log(res.data.openid)
                            let openId = res.data.openid
                            // 存openId
                            wx.setStorage({
                                key: 'openId',
                                data: openId
                            })
                            // 取openId
                            wx.getStorage({
                                key: 'openId',
                                success(res) {
                                    // console.log('openId:' + res.data)
                                    that.setData({
                                      openid:res.data
                                    })
                                }
                            })
                        }
                      })
                  }
              }
            })
            // 把志愿者数据存数据库
            wx.getUserInfo({
              success: function(res) {
                // 把数据存在data里
                // console.log(res.userInfo)
                that.setData ({
                    avatar:res.userInfo.avatarUrl,
                    nickName:res.userInfo.nickName,
                })
                // 检查该数据是否为数据库已有数据
                db.collection('volunteer').where({_openid:that.data.openid}).get({
                  success(res){
                    if(res.data==""){
                      db.collection('volunteer')
                      .add({
                      data:{
                        avatarurl:that.data.avatar,
                        nickname:that.data.nickName
                      }
                      })
                    }
                  }
                })
                wx.switchTab({
                  url: '../start/start',
                })
              }
            })
          }
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