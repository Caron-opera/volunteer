// 云函数入口文件
const cloud = require('wx-server-sdk')
 
cloud.init()
const db = cloud.database()
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('vo_act').aggregate()
    .lookup({
      from: 'volunteer',
      localField: 'volunteer_openid',
      foreignField: '_openid',
      as: 'names'
    })
    .match({
      activity_id: event.activity_id,
      situation: '已通过'
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
 