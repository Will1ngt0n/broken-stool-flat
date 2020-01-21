import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//const Firestore = require('@google-cloud/firestore');

// exports.deleteSale = functions.firestore.document('Specials/{specials}').onWrite( (change : any, context : any) => {
    
// })

// exports.sendEmail = functions.firestore.document('AnsweredQuestions/{doc}').onCreate( (change : any, context : any) => {
//     console.log(change);
//     console.log(context);
    
    
// })
// exports.sendEmail = functions.firestore.document('Updates/{update}').onCreate( (snap: {data: () => any }, context : any) => {
//     console.log(snap.data());
//     // console.log(context.params.userId);
//     // console.log('logging results', snap.data());
    
//     // const data = snap.data().timestamp

//     // console.log(data);
//     return admin.firestore().collection('TestingJust').add({
//         timestamp: 'dfdfdfd'
//     })
    

    
// })

// exports.getShortsImageLink = functions.firestore.document('Products/Dankie Jesu/Shorts/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getVestsImageLink = functions.firestore.document('Products/Dankie Jesu/Vests/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getCapsImageLink = functions.firestore.document('Products/Dankie Jesu/Caps/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getBucketHatsImageLink = functions.firestore.document('Products/Dankie Jesu/Bucket Hats/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getCropTopsImageLink = functions.firestore.document('Products/Dankie Jesu/Crop Tops/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getTShirtsImageLink = functions.firestore.document('Products/Dankie Jesu/T-Shirts/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getBagsImageLink = functions.firestore.document('Products/Dankie Jesu/Bags/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getSweatersImageLink = functions.firestore.document('Products/Dankie Jesu/Sweaters/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getHoodiesImageLink = functions.firestore.document('Products/Dankie Jesu/Hoodies/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getTrackSuitsImageLink = functions.firestore.document('Products/Dankie Jesu/Track Suits/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getBeaniesImageLink = functions.firestore.document('Products/Dankie Jesu/Beanies/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getTraditionalImageLink = functions.firestore.document('Products/Dankie Jesu/Traditional/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getFormalImageLink = functions.firestore.document('Products/Dankie Jesu/Formal/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
// exports.getSmartCasualImageLink = functions.firestore.document('Products/Dankie Jesu/Smart Casual/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
//    console.log(snap.data()) 
// })
exports.getSportsImageLink = functions.firestore.document('Products/Kwanga/Sports/{productID}').onCreate( (snap : { data : () => any}, context : any) => {
   console.log(snap.data())
   console.log(context);
   console.log(snap);
   
   
})
// exports.update = functions.firestore.document('Updates/{update}').onUpdate( (change: any, context : any) => {
//     console.log(change.after);
    
// })
// exports.checkSales = functions.firestore.document('userProfile').onUpdate( (change : any, context : any ) => {
//     console.log(change);

// })