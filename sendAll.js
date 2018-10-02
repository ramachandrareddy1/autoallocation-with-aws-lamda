const taskModel = require('./model').Task;
const userModel = require('./model').User;
const notification = require('./notify');
const mongoose = require('mongoose');
const email= require('./sendEmail');
const _= require('lodash');
module.exports = {
    sendToAllDrivers:sendAll
};


function sendAll(event,cb){
    let taskId= event.taskId;
    let driverArry=event.driverData;
    let expiry= event.autoAllocation.sendToAll.expiry;


    if(driverArry.length){
        let promiseArry=[];
     taskModel.findOne({_id:mongoose.Types.ObjectId(taskId)}).then((taskData)=>{
         for(let i=0;i<driver.length;i++){
          promiseArry.push(sendNotifications((taskData,driver.endArn,4,expiry)));
          }
         return Promise.all(promiseArry).then(()=>{
             console.log('sending notifcation to all drivers')
              process.exit(0);
          }).catch((err)=>{console.log('err',err)});
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


function sendNotifications(taskDetails, endpointArn, flag,expiry) {
    return notification.sendPushNotification(taskDetails,endArn,4,timeout);
}

function getadminDetails(adminId) {
    return userModel.find({cognitoSub:adminId})
}
function taskDetails(taskId) {
 return taskModel.find({_id:mongoose.Types.ObjectId(taskId)})
}






