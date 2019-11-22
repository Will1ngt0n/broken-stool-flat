import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-services/auth.service';
import * as firebase from 'firebase'
import { AlertController } from '@ionic/angular';

declare var window
var provider = new firebase.auth.GoogleAuthProvider();
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginForm
  number
  password
  registrationForm
  smsSent
  confirmationResult = ''
  inputCode
  constructor(  
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public alertController: AlertController
    ) {
      let person = {}
      person = {'hello': {
        tree : 'hi',
        flower: false,
        houses: {
          'double-storey': true,
          'flat-house': false
        }
      }}
      console.log(person);
      
      this.smsSent = false
      firebase.auth().languageCode = 'en';
  this.registrationForm = formBuilder.group({
    number: [this.number, Validators.compose([Validators.required])]
  })
  }
googleSignIn(){
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential;
    // The signed-in user info.
    var user = result.user
    console.log(user);
    
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    console.log(error);
    
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

  requestCode(){
    this.number = this.registrationForm.get('number').value
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.number, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
        //this.presentAlert();
      }
    })
  }
  login(code){
    if(this.confirmationResult !== ''){
      //var code = this.inputCode
      return this.authService.login(code, this.confirmationResult).then(result => {
        console.log(result);
      })
    }
  }

  addUser(){
    this.number = this.registrationForm.get('number').value
    console.log(this.number);
    let array : Array<any> = this.number.split('')
    console.log(array);
    let countryCode = '+27'
    if(array[0] ==='0'){
      array.splice(0, 1)
      this.number = countryCode + array.join('')
      console.log(this.number);
      
    }
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('yeah yeah yeah');
      },
      'expired-callback': error => {
      }
    });
    console.log(window.recaptchaVerifier);
    let appVerifier = window.recaptchaVerifier
    return this.authService.requestLogin(this.number, appVerifier).then(result => {
      if(result.success === true){
        console.log(result);
        this.confirmationResult = result.result
        console.log(this.confirmationResult);
        this.alert()
      }
    })
    // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaParameters, result => {
    //   console.log(result);

    // })
      
    
  }
  async alert(){
    const alert = await this.alertController.create({
      header: 'Verfification code',
      subHeader: 'Enter verification code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter code'
        }],
      buttons: [{
        text: 'Submit',
        role: 'submit',
        cssClass: 'secondary',
        handler: (result) => {
          console.log(result.code);
          this.login(result.code)
        }
      }]
    });

    await alert.present();
  }
}
