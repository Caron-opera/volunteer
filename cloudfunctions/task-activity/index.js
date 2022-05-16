// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('task').aggregate()
    .lookup({
      from: 'activity',
      localField: 'activity_id',
      foreignField: '_id',
      as: 'names'
    })
    .match({
      volunteer_openid:event.volunteer_openid,
      task_situation:'未完成'
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