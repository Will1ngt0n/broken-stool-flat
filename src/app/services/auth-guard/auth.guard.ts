import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthService, private router : Router){ }
  
  canActivate() : boolean{
    //let boolean : boolean
    //this.authService.checkingAuthState()
    if(this.authService.checkingAuthStateBoolean()){
      console.log(true);
      return true
    }else{
      console.log(false);
      this.router.navigate(['home/FAQs'])
      return false
    }
  }
}
