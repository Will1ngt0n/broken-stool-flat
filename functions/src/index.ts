import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var nodemailer = require('nodemailer');

const smtpTransport = require('nodemailer-smtp-transport');


exports.sendMail = functions.database.ref('/TestingEmail/{ID}').onCreate((snapshot, context) => {
   console.log(snapshot.val());
   //const value = snapshot.val()
   const mailOptions = {
      from: 'Testing <will.last.long3@gmail.com>',  // You can write any mail Adress you want this doesn't effect anything
      to: 'willington.mnisi@gmail.com', // This mail adress should be filled with any mail you want to read it
      title: 'Name',
      subject: 'Your question has been answered', // Sample Subject for you template
      html: '<body style="margin: 0; padding: 0;">'
   }
   var transporter : any = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      auth: {
          user: 'Willington Mnisi <will.last.long3@gmail.com',
          pass: 'iamlasting'
      }
   }))
   transporter.sendMail(mailOptions, function (error : any, info : any) {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
})


// var transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//      user: 'youremail@gmail.com',
//      pass: 'yourpassword'
//    }
//  });
 
//  var mailOptions = {
//    from: 'youremail@gmail.com',
//    to: 'myfriend@yahoo.com',
//    subject: 'Sending Email using Node.js',
//    text: 'That was easy!'
//  };
 
//  transporter.sendMail(mailOptions, function(error, info){
//    if (error) {
//      console.log(error);
//    } else {
//      console.log('Email sent: ' + info.response);
//    }
//  });

