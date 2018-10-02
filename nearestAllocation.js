
const taskModel = require('./model').Task;
const userModel =  require('./model').User;
const notification = require('./notify');
const mongoose = require('mongoose');
const email= require('./sendEmail');
const _= require('lodash');
module.exports = {
   nearestAllo:nearByAllo
};


function nearByAllo(event,cb){
    let taskId= event.taskId;
    let driverArry=event.driverData;
    let expiry= event.autoAllocation.nearest.expiry;

    if(driverArry.length){
          taskId=mongoose.Types.ObjectId(taskId)
        taskModel.findOne({_id:taskId}).then((taskData)=>{
            if(!_.isEmpty(taskData)) {
                taskData=taskData.toObject();
                Promise.all([assignNearestDriverForcefully(taskId, driver[0]), notification.sendPushNotification(taskData, driver[0].endArn, 4,expiry)])
                    .then(()=>{
                        process.exit(0);
                    })
            }
            else{
                process.exit(0);
            }

        })

    }else{
        taskDetails(taskId).then((res)=>{
            let taskDetails=(res && res.length)?res[0]:null;
            if(taskDetails){
                let adminId= taskDetails.clientId;
                return getadminDetails(adminId).then((adminData)=>{
                    let adminDetails= adminData[0];
                    return email.sendEmailToAdmin(adminDetails,taskDetails);
                })

            }else{
                process.exit(0);
            }
        }).catch((err)=>{console.log(err);process.exit(0)})
    }
}


  function assignNearestDriverForcefully(taskId,driverInfo){
    taskModel.update({_id:taskId},{$set:{taskStatus:1,driver:driverInfo._id}});

  }

function getadminDetails(adminId) {
    return userModel.find({cognitoSub:adminId})
}
function taskDetails(taskId) {
    return taskModel.find({_id:mongoose.Types.ObjectId(taskId)})
}
