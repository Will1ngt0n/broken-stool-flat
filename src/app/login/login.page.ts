import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    this.email = this.loginForm.get('email').value
    this.password = this.loginForm.get('password').value
    return this.authService.loginWithEmail(this.email, this.password).then(result => {
      console.log(result);
      if(result.operationType === "signIn"){
        this.route.navigate(['landing'])
      }
    })
  }
}
