import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
​
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email
  password
  loginForm
  emailPattern : string = "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
   
  constructor(private authService : AuthService, private formBuilder: FormBuilder, private route : Router) {
    this.loginForm = formBuilder.group({
      email: [this.email, Validators.compose([Validators.required])],
      password: [this.password, Validators.compose([Validators.required])]
    })
  }
​
  ngOnInit() {
  }
  resetPassword(){
    this.email = this.loginForm.get('email').value
    //this.password = this.loginForm.get('password').value
   return this.authService.passwordReset(this.email).then(result => {
     console.log(result);
     
   })
  }
  login(){
    var errorMessage;
    var subHeader;
    
  const loading = document.createElement('ion-loading');
  loading.spinner = null;
  loading.duration = 5000;
  loading.message = 'Please wait...';
  loading.translucent = true;
  loading.cssClass = 'custom-class custom-loading';

  document.body.appendChild(loading);
  loading.present();

  
  const alert = document.createElement('ion-alert');
  alert.header = 'Error';
  alert.subHeader = "";
  alert.message = "";
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
    this.email = this.loginForm.get('email').value
    this.password = this.loginForm.get('password').value
    console.log(this.email);
    
    return this.authService.loginWithEmail(this.email, this.password).then(result => {
      console.log(result);
      if(result.operationType === "signIn"){
        loading.dismiss()
        setTimeout(() => {
        this.route.navigate(['landing'])
          
        }, 100);
      }
    },(Error => {
      console.log(Error.code);
      loading.dismiss()
      if (Error.code == "auth/wrong-password"){
        alert.subHeader = "Incorrect Password"
        alert.message = "Check your details or reset your password."
      }
      alert.present();
      
    }))
  }
}