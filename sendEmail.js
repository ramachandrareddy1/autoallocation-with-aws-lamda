const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports={
    sendEmailToAdmin:sendEmailTo
}



function sendEmailTo(adminDetails,taskDetails) {
     adminDetails= adminDetails.toObject();
     taskDetails= taskDetails.toObject();
     console.log(adminDetails.email);
    const msg = {
        to: adminDetails.email,
        from: 'support@deliforce.io',
        subject: 'Autocation was failed',
        html: '<strong>Hi,<br>'+adminDetails.name+' Your given taskId'+ taskDetails.taskId+ 'customerName:'+taskDetails.name+' related task Autoallocation was field due to Drivers are offline/busy or drivers are not accept the task</strong>',
    };

    return new Promise((reslove,reject)=>{
        sgMail.send(msg,(err,data)=>{
            if(err){
                console.log('send grid error',err);
                process.exit(0);
            }else{
                console.log('sendgrid success');
                process.exit(0);
            }
        });
    })
}

