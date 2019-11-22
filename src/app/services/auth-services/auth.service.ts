import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AlertController } from '@ionic/angular';
declare var window
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email
  password
  //confirmationResult
  constructor(public alertCtrl: AlertController) { }
  requestLogin(number, appVerifier){
    return firebase.auth().signInWithPhoneNumber(number, appVerifier).then(confirmationResult => {
      window.confirmationResult = confirmationResult;

      let result = {success: true, result: confirmationResult}
      return result
    }).catch((error) => {
      let result = {success: false, result: error}
      return result
    });
  }

  login(code, confirmationResult){
    return confirmationResult.confirm(code).then( (result) => {
      var user = result.user; console.log(user);
      return user
    }).catch(function (error) {
      console.log(error);
      return error
    });
  }
  //Adding new users to the database
  register(email, password){
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
      let userEmail = email;
      let userName = name;
      let userID = data.user.uid;
      //let now = moment().format('LLLL')
      console.log(userID)
      firebase.firestore().collection('Users/').doc(userID).set({
        email: userEmail,
        name: userName,
        role: 'Admin',
        hasProfilePic: false,
        hasRequestedLink: false,          //when the user has requested to link his/her account with someone else
        hasReceivedLinkRequest: false,    //when the user has received a link request from another user
        //registeredAt: now
      })
      return data
     }).catch((error) => {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorMessage)
       // ...
       return error
     })
  }
  //Allowing users to reset their password
  passwordReset(emailAddress){
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      console.log("Email has been sent")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
  //Function : Routing logged out users to the login page
  signOut(){
    return new Promise((resolve, reject) =>{
      firebase.auth().signOut().then(()=> {
        // Sign-out successful.
        
        resolve()
        this.checkingAuthState().then(data=>{
          console.log(data);
        });
        
      }).catch(error => {
        // An error happened.
      });
    })
  }
​
  getUserProfile(userId)  {
    return firebase.firestore().collection("Users/").doc(userId).get().then((snapshot) =>{
      // Edit
      let profile = snapshot.data()
      if(profile.hasProfilePic){
        return firebase.storage().ref('userDisplayPic/' + userId).getDownloadURL().then(url =>{
            profile['profilePicUrl'] = url
            return profile
          })
      }else{
          profile['profilePicUrl'] = "../assets/icon/person.png"
          return profile
      }
    })
  }
​
  checkingAuthState(){
    return new Promise((resolve, reject) =>{
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          console.log(user);
          
          resolve (user)
        }else{
          console.log('not logged in');
          
        }
      })
    })
  }
​
  savePic(image){
    // this.login(this.email, this.password).then((userID) =>{
    //   let storageRef = firebase.storage().ref('userDisplayPic/' + userID)
    //   return storageRef.put(image).then((data) => {
    //     console.log('Saved');
    //   })
    // })
  }


  //delete?
  retrievingUserInfo(uid){
    return new Promise((resolve, reject) => {
      var userRoot = firebase.database().ref("Users").child(uid)
      userRoot.once("value", snap => {
        //console.log(userRoot);
        let values = snap.val()
        console.log(values["name"]);
        console.log(values["email"]);
        let userProfile = {
          key: snap.key,
          displayName : values["name"],
          email : values["email"],
        }
        resolve (userProfile)
      })
      
    })
  }

  updateProfile(userID, newUsername, username, newEmail, email){
    return new Promise((resolve, reject) => {
      if(newUsername !== username){
        firebase.firestore().collection('Users/').doc(userID).update({
          name: newUsername
        })
        //return 'Profile has been reset'
      }
      console.log(newEmail);
      console.log(email);
      
      
      if(newEmail !== email){
        var user = firebase.auth().currentUser;
        console.log(user);
        firebase.firestore().collection('Users/').doc(userID).update({
          email: newEmail
        })
        user.updateEmail(newEmail).then((data) => {
          let message = 'Profile has been reset'
          console.log(data);
        }).catch(function(error) {
          // An error happened.
        });
      }
      resolve ()
    })
  }


}
