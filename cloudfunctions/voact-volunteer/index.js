// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const $ = db.command.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("vo_act").aggregate()
    .lookup({
      from: "volunteer",
      localField: 'volunteer_openid',
      foreignField: '_openid',
      as: 'vol'
    })
    .lookup({
      from: "activity",
      localField: 'activity_id',
      foreignField: '_id',
      as: 'act'
    })
    .match({
      team_loginid: event.team_loginid
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$vol', 0]), $.arrayElemAt(['$act', 0]), '$$ROOT'])
    })
    .project({
      vol: 0,
      act: 0
    })
    .end({
      success: function (res) {
        return res;
      },
      fail(error) {
        return error;
      }
    })
  }
