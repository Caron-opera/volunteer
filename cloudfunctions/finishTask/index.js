// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    console.log(event)
    //   return await db.collection('task')
    //     .doc(event.id)
    //     .update({
    //         data:{
    //             task_situation: '完成'
    //         },
    //         success(res){
    //             console.log(res)
    //         }
    //     })
}