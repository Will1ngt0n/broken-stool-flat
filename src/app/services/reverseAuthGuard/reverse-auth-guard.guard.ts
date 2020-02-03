import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuardGuard implements CanActivate {
  constructor(private authService : AuthService, private router : Router){ }
  canActivate() : boolean{
    if(this.authService.checkingAuthStateBoolean()){
      console.log(false);  
      this.router.navigate(['landing'])
      return false
    }else{
      console.log(true);
      return true
    }
  }
}
