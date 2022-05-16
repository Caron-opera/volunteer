// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('vo_act').aggregate()
    .lookup({
      from: 'activity',
      localField: 'team_loginid',
      foreignField: 'team_loginid',
      as: 'names'
    })
    .match({
      volunteer_openid:event.volunteer_openid
    })
    .replaceRoot({
      newRoot: $.mergeObjects([$.arrayElemAt(['$names', 0]), '$$ROOT'])
    })
    .project({
      names: 0
    })
    .end({
      success:function(res){
        return res;
      },
      fail(error) {
        return error;
      }
    })
}